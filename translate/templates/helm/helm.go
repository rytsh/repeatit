// These functions copied from https://github.com/helm/helm/blob/main/pkg/engine/funcs.go
package helm

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"text/template"

	"github.com/BurntSushi/toml"
	"github.com/Masterminds/sprig/v3"
	"sigs.k8s.io/yaml"
)

const warnStartDelim = "HELM_ERR_START"
const warnEndDelim = "HELM_ERR_END"
const recursionMaxNums = 1000

func warnWrap(warn string) string {
	return warnStartDelim + warn + warnEndDelim
}

// FuncMap returns a mapping of all of the functions that Engine has.
func FuncMap() func(t *template.Template) template.FuncMap {
	f := sprig.TxtFuncMap()
	delete(f, "env")
	delete(f, "expandenv")

	// Add some extra functionality
	extra := template.FuncMap{
		"toToml":        toTOML,
		"toYaml":        toYAML,
		"fromYaml":      fromYAML,
		"fromYamlArray": fromYAMLArray,
		"toJson":        toJSON,
		"fromJson":      fromJSON,
		"fromJsonArray": fromJSONArray,

		// This is a placeholder for the "include" function, which is
		// late-bound to a template. By declaring it here, we preserve the
		// integrity of the linter.
		"include":  func(string, any) string { return "not implemented" },
		"tpl":      func(string, any) any { return "not implemented" },
		"required": func(string, any) (any, error) { return "not implemented", nil },
		// Provide a placeholder for the "lookup" function, which requires a kubernetes
		// connection.
		"lookup": func(string, string, string, string) (map[string]any, error) {
			return map[string]any{}, nil
		},
	}

	for k, v := range extra {
		f[k] = v
	}

	// Add the `required` function here so we can use lintMode
	f["required"] = func(warn string, val any) (any, error) {
		if val == nil {
			return val, errors.New(warnWrap(warn))
		} else if _, ok := val.(string); ok {
			if val == "" {
				return val, errors.New(warnWrap(warn))
			}
		}
		return val, nil
	}

	// Override sprig fail function for linting and wrapping message
	f["fail"] = func(msg string) (string, error) {
		return "", errors.New(warnWrap(msg))
	}

	// When DNS lookups are not enabled override the sprig function and return
	// an empty string.
	f["getHostByName"] = func(_ string) string {
		return ""
	}

	return func(t *template.Template) template.FuncMap {
		includedNames := make(map[string]int)

		f["include"] = includeFun(t, includedNames)
		f["tpl"] = tplFun(t, includedNames, false)
		return f
	}
}

// 'include' needs to be defined in the scope of a 'tpl' template as
// well as regular file-loaded templates.
func includeFun(t *template.Template, includedNames map[string]int) func(string, any) (string, error) {
	return func(name string, data any) (string, error) {
		var buf strings.Builder
		if v, ok := includedNames[name]; ok {
			if v > recursionMaxNums {
				return "", errors.Join(fmt.Errorf("unable to execute template"), fmt.Errorf("rendering template has a nested reference name: %s", name))
			}
			includedNames[name]++
		} else {
			includedNames[name] = 1
		}
		err := t.ExecuteTemplate(&buf, name, data)
		includedNames[name]--
		return buf.String(), err
	}
}

// As does 'tpl', so that nested calls to 'tpl' see the templates
// defined by their enclosing contexts.
func tplFun(parent *template.Template, includedNames map[string]int, strict bool) func(string, any) (string, error) {
	return func(tpl string, vals any) (string, error) {
		t, err := parent.Clone()
		if err != nil {
			return "", errors.Join(err, fmt.Errorf("cannot clone template"))
		}

		// Re-inject the missingkey option, see text/template issue https://github.com/golang/go/issues/43022
		// We have to go by strict from our engine configuration, as the option fields are private in Template.
		// TODO: Remove workaround (and the strict parameter) once we build only with golang versions with a fix.
		if strict {
			t.Option("missingkey=error")
		} else {
			t.Option("missingkey=zero")
		}

		// Re-inject 'include' so that it can close over our clone of t;
		// this lets any 'define's inside tpl be 'include'd.
		t.Funcs(template.FuncMap{
			"include": includeFun(t, includedNames),
			"tpl":     tplFun(t, includedNames, strict),
		})

		// We need a .New template, as template text which is just blanks
		// or comments after parsing out defines just adds new named
		// template definitions without changing the main template.
		// https://pkg.go.dev/text/template#Template.Parse
		// Use the parent's name for lack of a better way to identify the tpl
		// text string. (Maybe we could use a hash appended to the name?)
		t, err = t.New(parent.Name()).Parse(tpl)
		if err != nil {
			return "", errors.Join(err, fmt.Errorf("cannot parse template %q", tpl))
		}

		var buf strings.Builder
		if err := t.Execute(&buf, vals); err != nil {
			return "", errors.Join(err, fmt.Errorf("error during tpl function execution for %q", tpl))
		}

		// See comment in renderWithReferences explaining the <no value> hack.
		return strings.ReplaceAll(buf.String(), "<no value>", ""), nil
	}
}

// toYAML takes an interface, marshals it to yaml, and returns a string. It will
// always return a string, even on marshal error (empty string).
//
// This is designed to be called from a template.
func toYAML(v any) string {
	data, err := yaml.Marshal(v)
	if err != nil {
		// Swallow errors inside of a template.
		return ""
	}
	return strings.TrimSuffix(string(data), "\n")
}

// fromYAML converts a YAML document into a map[string]any.
//
// This is not a general-purpose YAML parser, and will not parse all valid
// YAML documents. Additionally, because its intended use is within templates
// it tolerates errors. It will insert the returned error message string into
// m["Error"] in the returned map.
func fromYAML(str string) map[string]any {
	m := map[string]any{}

	if err := yaml.Unmarshal([]byte(str), &m); err != nil {
		m["Error"] = err.Error()
	}
	return m
}

// fromYAMLArray converts a YAML array into a []any.
//
// This is not a general-purpose YAML parser, and will not parse all valid
// YAML documents. Additionally, because its intended use is within templates
// it tolerates errors. It will insert the returned error message string as
// the first and only item in the returned array.
func fromYAMLArray(str string) []any {
	a := []any{}

	if err := yaml.Unmarshal([]byte(str), &a); err != nil {
		a = []any{err.Error()}
	}
	return a
}

// toTOML takes an interface, marshals it to toml, and returns a string. It will
// always return a string, even on marshal error (empty string).
//
// This is designed to be called from a template.
func toTOML(v any) string {
	b := bytes.NewBuffer(nil)
	e := toml.NewEncoder(b)
	err := e.Encode(v)
	if err != nil {
		return err.Error()
	}
	return b.String()
}

// toJSON takes an interface, marshals it to json, and returns a string. It will
// always return a string, even on marshal error (empty string).
//
// This is designed to be called from a template.
func toJSON(v any) string {
	data, err := json.Marshal(v)
	if err != nil {
		// Swallow errors inside of a template.
		return ""
	}
	return string(data)
}

// fromJSON converts a JSON document into a map[string]any.
//
// This is not a general-purpose JSON parser, and will not parse all valid
// JSON documents. Additionally, because its intended use is within templates
// it tolerates errors. It will insert the returned error message string into
// m["Error"] in the returned map.
func fromJSON(str string) map[string]any {
	m := make(map[string]any)

	if err := json.Unmarshal([]byte(str), &m); err != nil {
		m["Error"] = err.Error()
	}
	return m
}

// fromJSONArray converts a JSON array into a []any.
//
// This is not a general-purpose JSON parser, and will not parse all valid
// JSON documents. Additionally, because its intended use is within templates
// it tolerates errors. It will insert the returned error message string as
// the first and only item in the returned array.
func fromJSONArray(str string) []any {
	a := []any{}

	if err := json.Unmarshal([]byte(str), &a); err != nil {
		a = []any{err.Error()}
	}
	return a
}
