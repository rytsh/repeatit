<script>
  import Code from "@/lib/ui/Code.svelte";
  import CodePart from "./CodePart.svelte";
</script>

<div class="bg-white dark:text-white dark:bg-[#1b1b1f] px-4 py-2">
  <div class="prose dark:prose-invert">
    <p>
      This website is running only from the browser and it uses go templates on
      WASM to render the templates.
    </p>
    <p>
      Below are some examples of Go templates and functions available in this
      environment.
    </p>
    <p>
      Get basic knowledge from <a
        href="https://pkg.go.dev/text/template"
        target="_blank"
        class="hover:text-black hover:bg-amber-200"
        >https://pkg.go.dev/text/template</a
      >
    </p>
    <h4>Go Template Examples</h4>
    <div>
      <CodePart
        title={`For loop`}
        description="Iterate over a slice and print each element."
        template={`{{ range $index, $element := .data.items }}
{{- mustToPrettyJson $element }}
{{ end }}`}
        input={`data:
  items:
  - id: 1
    name: John
  - id: 2
    name: Jane`}
        output={`{
  "id": 1,
  "name": "John"
}
{
  "id": 2,
  "name": "Jane"
}
`}
      />
      <CodePart
        title={`If statement`}
        description="Check functions <b>eq</b>, <b>ne</b>, <b>lt</b>, <b>le</b>, <b>gt</b>,
      <b>ge</b> but arguments should be comparable types and result is boolean."
        template={`{{if eq (int .result) 10 -}}
Result is 10
{{- else if eq (int .result) 0 -}}
Result is 0
{{- else -}}
unknown
{{- end}}`}
        input={`data:
  result: 10`}
        output={`Result is 10`}
      />
      <CodePart
        title={`Range with number`}
        description="Generates a sequence of integers from 0 up to (but not including) the given number."
        template={`{{ range $x := 5 }}
{{- $x }}
{{ end }}`}
        output={`0
1
2
3
4`}
      />
      <CodePart
        title={`With`}
        description="Use with to limit the scope of a variable inside of a template. If we
        want to reach outer scope, we can use <b>$.</b> syntax."
        template={`{{ with .name -}}
Name {{ .user }}; outer value is {{ $.value }}
{{- end }}`}
        input={`name:
  user: "Xavier"
value: 10`}
        output={`Name Xavier; outer value is 10`}
      />
      <CodePart
        title={`Variables`}
        description="Define and use variables in templates."
        template={`{{- $greeting := "Hello" -}}
{{- $name := .name -}}
{{ $greeting }}, {{ $name }}!`}
        input={`name: "Alice"`}
        output="Hello, Alice!"
      />
      <CodePart
        title={`index`}
        description="Access elements in arrays, slices, or maps by index or key."
        template={`{{- $firstItem := index .items 0 -}}
First item: {{ $firstItem }}`}
        input={`items: ["apple", "banana", "cherry"]`}
        output="First item: apple"
      />
      <CodePart
        title={`Comments`}
        description="Comments are ignored during template execution."
        template={`{{/* This is a comment and will be ignored */ -}}`}
      />
      <CodePart
        title={`define(string)`}
        description={`Nested template definition. <a href="https://pkg.go.dev/text/template#hdr-Nested_template_definitions" target="_blank">https://pkg.go.dev/text/template#hdr-Nested_template_definitions</a>`}
        template={`{{- define "mytemplate" }}Hello, {{ .name }}!{{ end -}}
{{ template "mytemplate" . }}`}
        input={`name: "World"`}
        output="Hello, World!"
      />
    </div>
    <h3>Function References</h3>
    <h4 class="bg-gray-200 dark:bg-gray-700">Helm functions</h4>
    <div>
      <CodePart
        title={`tpl(string, interface {}) string`}
        description="Renders a template string with the given context."
        template={`{{ tpl "Hello, {{ .name }}!" . }}`}
        input={`name: "World"`}
        output="Hello, World!"
      />
      <CodePart
        title={`include(string, interface {}) string`}
        description="Renders a named template with the given context."
        template={`{{- define "mytemplate" }}Hello, {{ .name }}!{{ end -}}
{{ include "mytemplate" . }}`}
        input={`name: "World"`}
        output="Hello, World!"
      />
      <CodePart
        title={`required(string, interface {}) interface {}`}
        description="Fails if the given value is empty."
        template={`{{ required "Value is required" .value }}`}
        input={`value: ""`}
        output="program fail, exit code 1"
      />
      <CodePart
        title={`toToml(interface {}) string`}
        description="Encodes a value to TOML string."
        template={`{{ toToml .data }}`}
      />
      <CodePart
        title={`toYaml(interface {}) string`}
        description="Encodes a value to YAML string."
        template={`{{ toYaml .data }}`}
      />
      <CodePart
        title={`fromYaml(string) interface {}`}
        description="Decodes a YAML string to a value."
        template={`{{ fromYaml "name: John\\nage: 30" }}`}
      />
      <CodePart
        title={`fromYamlArray(string) []interface {}`}
        description="Decodes a YAML string to an array."
        template={`{{ fromYamlArray "- item1\\n- item2\\n- item3" }}`}
      />
      <CodePart
        title={`fromJsonArray(string) []interface {}`}
        description="Decodes a JSON array string."
        template={`{{ fromJsonArray "[1,2,3]" }}`}
      />
    </div>
    <hr />
    <h4 class="bg-gray-200 dark:bg-gray-700">Sprig Functions</h4>
    <div>
      <CodePart
        title={`abbrev(int, string) string`}
        template={`{{ abbrev 10 "Hello World" }}`}
        output="Hello W..."
      />
      <CodePart
        title={`abbrevboth(int, int, string) string`}
        template={`{{ abbrevboth 5 10 "1234 5678 9123" }}`}
        output="...5678..."
      />
      <CodePart
        title={`add([]interface {}) int64`}
        template={`{{ add 1 2 3 4 5 }}`}
        output="15"
      />
      <CodePart
        title={`add1(interface {}) int64`}
        template={`{{ add1 1 }}`}
        output="2"
      />
      <CodePart
        title={`add1f(interface {}) float64`}
        template={`{{ add1f 1.1 }}`}
        output="2.1"
      />
      <CodePart
        title={`addf([]interface {}) float64`}
        template={`{{ addf 1.1 2.2 3.3 4.4 5.5 }}`}
        output="16.5"
      />
      <CodePart
        title={`adler32sum(string) string`}
        template={`{{ adler32sum "Hello World" }}`}
        output="403375133"
      />
      <CodePart
        title={`ago(interface {}) string`}
        description="Timestamp to human readable time ago."
        template={`{{ ago 1687989601 }}`}
        output="11s"
      />
      <CodePart
        title={`all([]interface {}) bool`}
        template={`{{ all true true false }}`}
        output="false"
      />
      <CodePart
        title={`any([]interface {}) bool`}
        template={`{{ any true true false }}`}
        output="true"
      />
      <CodePart
        title={`append(interface {}, interface {}) []interface {}`}
        description="First argument must be a slice."
        template={`{{ append . "add" }}`}
        output="[1 add]"
      />
      <CodePart
        title={`atoi(string) int`}
        template={`{{ atoi "123" }}`}
        output="123"
      />
      <CodePart
        title={`b32dec(string) string`}
        template={`{{ b32dec "MZXW6YTBOI======" }}`}
        output="foobar"
      />
      <CodePart
        title={`b32enc(string) string`}
        template={`{{ b32enc "foobar" }}`}
        output="MZXW6YTBOI======"
      />
      <CodePart
        title={`b64dec(string) string`}
        template={`{{ b64dec "SGVsbG8gV29ybGQ=" }}`}
        output="Hello World"
      />
      <CodePart
        title={`b64enc(string) string`}
        template={`{{ b64enc "Hello World" }}`}
        output="SGVsbG8gV29ybGQ="
      />
      <CodePart
        title={`base(string) string`}
        description="path.Base function."
        template={`{{ base "/foo/bar/baz.js" }}`}
        output="baz.js"
      />
      <CodePart
        title={`bcrypt(string) string`}
        description="golang.org/x/crypto/bcrypt package's GenerateFromPassword function."
        template={`{{ bcrypt "Hello World" }}`}
        output="$2a$10$dTu/HetKKYglHR1bs9mBFeGkOFgIMAabTdC0TNPh5ucVJLQLTfVYG"
      />
      <CodePart
        title={`biggest(interface {}, []interface {}) int64`}
        template={`{{ biggest 1 2 3 4 5 }}`}
        output="5"
      />
      <CodePart
        title={`buildCustomCert(string, string) (sprig.certificate, error)`}
      />
      <CodePart
        title={`camelcase(string) string`}
        template={`{{ camelcase "hello_world" }}`}
        output="HelloWorld"
      />
      <CodePart
        title={`cat([]interface {}) string`}
        template={`{{ cat "Hello" "World" }}`}
        output="Hello World"
      />
      <CodePart
        title={`ceil(interface {}) float64`}
        template={`{{ ceil 1.1 }}`}
        output="2"
      />
      <CodePart
        title={`chunk(int, interface {}) [][]interface {}`}
        template={`{{ chunk 2 (list 1 2 3 4 5) }}`}
        output="[[1 2] [3 4] [5]]"
      />
      <CodePart
        title={`clean(string) string`}
        description="path.Clean function."
        template={`{{ clean "/foo/bar/.." }}`}
        output="/foo"
      />
      <CodePart
        title={`coalesce([]interface {}) interface {}`}
        description="Returns the first non-empty value."
        template={`{{ coalesce "" "Hello World" }}`}
        output="Hello World"
      />
      <CodePart
        title={`compact(interface {}) []interface {}`}
        description="Removes nil/empty values from a list."
        template={`{{ list 1 "" nil 2 | compact }}`}
        output="[1 2]"
      />
      <CodePart
        title={`concat([]interface {}) interface {}`}
        description="Concatenates multiple lists into one."
        template={`{{ list 1 2 | concat (list 3 4) }}`}
        output="[1 2 3 4]"
      />
      <CodePart
        title={`contains(string, string) bool`}
        description="strings.Contains function but arguments are reversed."
        template={`{{ contains "World" "Hello World" }}`}
        output="true"
      />
      <CodePart
        title={`date(string, interface{}) string`}
        description="Date can be a time.Time or an int, int32, int64."
        template={`{{ date "2006-01-02" 1690151142 }}`}
        output="2023-07-24"
      />
      <CodePart
        title={`dateInZone(string, interface {}, string) string`}
        description="Format a date in a specific timezone."
        template={`{{ dateInZone "2006-01-02" 1690151142 "UTC" }}`}
        output="2023-07-24"
      />
      <CodePart
        title={`dateModify(string, time.Time) time.Time`}
        description="Modifies a time.Time by a duration string."
        template={`{{ dateModify "2h" now }}`}
      />
      <CodePart
        title={`dateInZone(string, interface{}, string) time.Time`}
        description="Modifies a time.Time by a duration string in a specific timezone."
        template={`{{ dateInZone "2h" now "UTC" }}`}
      />
      <CodePart
        title={`date_modify(string, time.Time) time.Time`}
        description="Alias for dateModify."
      />
      <CodePart
        title={`decryptAES(string, string) (string, error)`}
        description="Decrypts text with AES-256 GCM."
      />
      <CodePart
        title={`deepCopy(interface {}) interface {}`}
        description="Creates a deep copy of a value."
        template={`{{ deepCopy . }}`}
      />
      <CodePart
        title={`deepEqual(interface {}, interface {}) bool`}
        description="Tests for deep equality between two values."
        template={`{{ deepEqual .a .b }}`}
      />
      <CodePart
        title={`default(interface {}, []interface {}) interface {}`}
        description="Returns default value if given value is empty."
        template={`{{ .value | default "default value" }}`}
        output="default value"
      />
      <CodePart
        title={`derivePassword(uint32, string, string, string, string) string`}
        description="Derives a password using the Master Password algorithm."
      />
      <CodePart
        title={`dict([]interface {}) map[string]interface {}`}
        template={`{{ dict "a" 1 "b" 2 }}`}
        output="map[a:1 b:2]"
      />
      <CodePart
        title={`dig([]interface {}) (interface {}, error)`}
        description="Traverses nested maps/objects using a path."
        template={`{{ dig "user" "name" "default" . }}`}
      />
      <CodePart
        title={`dir(string) string`}
        description="path.Dir function."
        template={`{{ dir "/foo/bar/baz.js" }}`}
        output="/foo/bar"
      />
      <CodePart
        title={`div(interface {}, interface {}) int64`}
        description="Integer division."
        template={`{{ div 10 2 }}`}
        output="5"
      />
      <CodePart
        title={`divf(interface {}, []interface {}) float64`}
        description="Float division."
        template={`{{ divf 10 3 }}`}
        output="3.333333"
      />
      <CodePart
        title={`duration(interface {}) string`}
        template={`{{ duration "3600" }}`}
        output="1h0m0s"
      />
      <CodePart
        title={`durationRound(interface {}) string`}
        description="Rounds duration to the most significant unit."
        template={`{{ durationRound "3h45m" }}`}
        output="4h"
      />
      <CodePart
        title={`empty(interface {}) bool`}
        template={`{{ empty "" }}`}
        output="true"
      />
      <CodePart
        title={`encryptAES(string, string) (string, error)`}
        description="Encrypts text with AES-256 GCM."
      />
      <CodePart
        title={`env(string) string`}
        description="Disabled in Helm for security reasons."
        template={`{{ env "HOME" }}`}
        output="/home/rytsh"
      />
      <CodePart
        title={`expandenv(string) string`}
        description="Disabled in Helm for security reasons."
        template={`{{ expandenv "$HOME" }}
{{ expandenv "\${USER}" }}`}
        output={`/home/rytsh
rytsh`}
      />
      <CodePart
        title={`ext(string) string`}
        description="path.Ext function."
        template={`{{ ext "/foo/bar/baz.js" }}`}
        output=".js"
      />
      <CodePart
        title={`fail(string) (string, error)`}
        template={`{{ fail "FAILED PROGRAM" }}`}
        output="program fail, exit code 1"
      />
      <CodePart
        title={`first(interface {}) interface {}`}
        description="Returns the first item of a list."
        template={`{{ list 1 2 3 | first }}`}
        output="1"
      />
      <CodePart
        title={`float64(interface {}) float64`}
        description="Converts to float64."
        template={`{{ "3.14" | float64 }}`}
        output="3.14"
      />
      <CodePart
        title={`floor(interface {}) float64`}
        description="Returns the floor of a float."
        template={`{{ 3.7 | floor }}`}
        output="3"
      />
      <CodePart
        title={`fromJson(string) interface {}`}
        description="Decodes a JSON string."
        template={`{{ fromJson "{\\"name\\":\\"John\\"}" }}`}
      />
      <CodePart
        title={`genCA(string, int) (sprig.certificate, error)`}
        description="Generates a new self-signed CA certificate."
      />
      <CodePart
        title={`genCAWithKey(string, int, string) (sprig.certificate, error)`}
        description="Generates a CA certificate with a given private key."
      />
      <CodePart
        title={`genPrivateKey(string) string`}
        description="Generates a private key (rsa, dsa, ecdsa, ed25519)."
        template={`{{ genPrivateKey "rsa" }}`}
      />
      <CodePart
        title={`genSelfSignedCert(string, []interface {}, []interface {}, int) (sprig.certificate, error)`}
        description="Generates a self-signed certificate."
      />
      <CodePart
        title={`genSelfSignedCertWithKey(string, []interface {}, []interface {}, int, string) (sprig.certificate, error)`}
        description="Generates a self-signed certificate with a given key."
      />
      <CodePart
        title={`genSignedCert(string, []interface {}, []interface {}, int, sprig.certificate) (sprig.certificate, error)`}
        description="Generates a certificate signed by a CA."
      />
      <CodePart
        title={`genSignedCertWithKey(string, []interface {}, []interface {}, int, sprig.certificate, string) (sprig.certificate, error)`}
        description="Generates a certificate signed by a CA with a given key."
      />
      <CodePart
        title={`get(map[string]interface {}, string) interface {}`}
        description="Gets a value from a map by key."
        template={`{{ get .data "key" }}`}
        input={`data:
  key: "value"`}
        output="value"
      />
      <CodePart
        title={`getHostByName(string) string`}
        description="Resolves hostname to IP address."
      />
      <CodePart
        title={`has(interface {}, interface {}) bool`}
        description="Tests whether a list contains an element."
        template={`{{ list 1 2 3 | has 2 }}`}
        output="true"
      />
      <CodePart
        title={`hasKey(map[string]interface {}, string) bool`}
        description="Tests whether a map contains a key."
        template={`{{ hasKey .data "name" }}`}
        input={`data:
  name: "Ada"`}
        output="true"
      />
      <CodePart
        title={`hasPrefix(string, string) bool`}
        description="Tests whether a string has a prefix."
        template={`{{ hasPrefix "Hello" "Hello World" }}`}
        output="true"
      />
      <CodePart
        title={`hasSuffix(string, string) bool`}
        description="Tests whether a string has a suffix."
        template={`{{ hasSuffix "World" "Hello World" }}`}
        output="true"
      />
      <CodePart
        title={`hello() string`}
        description="Returns 'Hello!'."
        template={`{{ hello }}`}
        output="Hello!"
      />
      <CodePart
        title={`htmlDate(interface {}) string`}
        description="Formats a date for HTML date input."
        template={`{{ now | htmlDate }}`}
      />
      <CodePart
        title={`htmlDateInZone(interface {}, string) string`}
        description="Formats a date for HTML date input in a timezone."
      />
      <CodePart
        title={`htpasswd(string, string) string`}
        description="Generates bcrypt hash for htpasswd."
        template={`{{ htpasswd "username" "password" }}`}
      />
      <CodePart
        title={`indent(int, string) string`}
        description="Indents every line with the given number of spaces."
        template={`{{ .text | indent 4 }}`}
        input={`text: |-
  line1
  line2`}
        output={`    line1
    line2`}
      />
      <CodePart
        title={`initial(interface {}) []interface {}`}
        description="Returns all but the last item of a list."
        template={`{{ list 1 2 3 4 | initial }}`}
        output="[1 2 3]"
      />
      <CodePart
        title={`initials(string) string`}
        description="Returns the initials of a name."
        template={`{{ initials "John Doe" }}`}
        output="JD"
      />
      <CodePart
        title={`int(interface {}) int`}
        description="Converts to int."
        template={`{{ "123" | int }}`}
        output="123"
      />
      <CodePart
        title={`int64(interface {}) int64`}
        description="Converts to int64."
        template={`{{ "123" | int64 }}`}
        output="123"
      />
      <CodePart
        title={`isAbs(string) bool`}
        description="Checks if a path is absolute."
        template={`{{ isAbs "/foo/bar" }}`}
        output="true"
      />
      <CodePart
        title={`join(string, interface {}) string`}
        description="Joins a list with a separator."
        template={`{{ list "a" "b" "c" | join "-" }}`}
        output="a-b-c"
      />
      <CodePart
        title={`kebabcase(string) string`}
        description="Converts to kebab-case."
        template={`{{ kebabcase "HelloWorld" }}`}
        output="hello-world"
      />
      <CodePart
        title={`keys([]map[string]interface {}) []string`}
        description="Returns the keys of a map."
        template={`{{ keys .data }}`}
        input={`data:
  name: "Alice"
  age: 30`}
        output="[name age]"
      />
      <CodePart
        title={`kindIs(string, interface {}) bool`}
        description="Tests if a value is of a specific kind."
        template={`{{ kindIs "int" 123 }}`}
        output="true"
      />
      <CodePart
        title={`kindOf(interface {}) string`}
        description="Returns the kind of a value."
        template={`{{ kindOf 123 }}`}
        output="int"
      />
      <CodePart
        title={`last(interface {}) interface {}`}
        description="Returns the last item of a list."
        template={`{{ list 1 2 3 | last }}`}
        output="3"
      />
      <CodePart
        title={`list([]interface {}) []interface {}`}
        description="Creates a list from arguments."
        template={`{{ list 1 2 3 }}`}
        output="[1 2 3]"
      />
      <CodePart
        title={`lower(string) string`}
        description="Converts to lowercase."
        template={`{{ "HELLO" | lower }}`}
        output="hello"
      />
      <CodePart
        title={`max(interface {}, []interface {}) int64`}
        description="Returns the maximum integer."
        template={`{{ max 1 5 3 }}`}
        output="5"
      />
      <CodePart
        title={`maxf(interface {}, []interface {}) float64`}
        description="Returns the maximum float."
        template={`{{ maxf 1.1 5.5 3.3 }}`}
        output="5.5"
      />
      <CodePart
        title={`merge(map[string]interface {}, []map[string.interface {}) interface {}`}
        description="Merges maps, giving precedence to the dest map."
        template={`{{ merge .dst .src }}`}
      />
      <CodePart
        title={`mergeOverwrite(map[string.interface {}, []map[string.interface {}) interface {}`}
        description="Merges maps, giving precedence to the source map."
        template={`{{ mergeOverwrite .dst .src }}`}
      />
      <CodePart
        title={`min(interface {}, []interface {}) int64`}
        description="Returns the minimum integer."
        template={`{{ min 1 5 3 }}`}
        output="1"
      />
      <CodePart
        title={`minf(interface {}, []interface {}) float64`}
        description="Returns the minimum float."
        template={`{{ minf 1.1 5.5 3.3 }}`}
        output="1.1"
      />
      <CodePart
        title={`mod(interface {}, interface {}) int64`}
        description="Returns the modulo."
        template={`{{ mod 10 3 }}`}
        output="1"
      />
      <CodePart
        title={`mul(interface {}, []interface {}) int64`}
        description="Multiplies integers."
        template={`{{ mul 2 3 4 }}`}
        output="24"
      />
      <CodePart
        title={`mulf(interface {}, []interface {}) float64`}
        description="Multiplies floats."
        template={`{{ mulf 2.5 3.0 }}`}
        output="7.5"
      />
      <CodePart
        title={`mustAppend(interface {}, interface {}) ([]interface {}, error)`}
        description="Appends to a list, returns error on failure."
      />
      <CodePart
        title={`mustChunk(int, interface {}) ([][]interface {}, error)`}
        description="Chunks a list, returns error on failure."
      />
      <CodePart
        title={`mustCompact(interface {}) ([]interface {}, error)`}
        description="Compacts a list, returns error on failure."
      />
      <CodePart
        title={`mustDateModify(string, time.Time) (time.Time, error)`}
        description="Modifies a date, returns error on failure."
      />
      <CodePart
        title={`mustDeepCopy(interface {}) (interface {}, error)`}
        description="Deep copies a value, returns error on failure."
      />
      <CodePart
        title={`mustFirst(interface {}) (interface {}, error)`}
        description="Gets first item, returns error on failure."
      />
      <CodePart
        title={`mustFromJson(string) (interface {}, error)`}
        description="Decodes JSON, returns error on failure."
      />
      <CodePart
        title={`mustHas(interface {}, interface {}) (bool, error)`}
        description="Checks list membership, returns error on failure."
      />
      <CodePart
        title={`mustInitial(interface {}) ([]interface {}, error)`}
        description="Gets all but last item, returns error on failure."
      />
      <CodePart
        title={`mustLast(interface {}) (interface {}, error)`}
        description="Gets last item, returns error on failure."
      />
      <CodePart
        title={`mustMerge(map[string.interface {}, []map[string.interface {}) (interface {}, error)`}
        description="Merges maps, returns error on failure."
      />
      <CodePart
        title={`mustMergeOverwrite(map[string.interface {}, []map[string.interface {}) (interface {}, error)`}
        description="Merges maps with overwrite, returns error on failure."
      />
      <CodePart
        title={`mustPrepend(interface {}, interface {}) ([]interface {}, error)`}
        description="Prepends to a list, returns error on failure."
      />
      <CodePart
        title={`mustPush(interface {}, interface {}) ([]interface {}, error)`}
        description="Pushes to a list, returns error on failure."
      />
      <CodePart
        title={`mustRegexFind(string, string) (string, error)`}
        description="Finds regex match, returns error on failure."
      />
      <CodePart
        title={`mustRegexFindAll(string, string, int) ([]string, error)`}
        description="Finds all regex matches, returns error on failure."
      />
      <CodePart
        title={`mustRegexMatch(string, string) (bool, error)`}
        description="Tests regex match, returns error on failure."
      />
      <CodePart
        title={`mustRegexReplaceAll(string, string, string) (string, error)`}
        description="Replaces all regex matches, returns error on failure."
      />
      <CodePart
        title={`mustRegexReplaceAllLiteral(string, string, string) (string, error)`}
        description="Replaces all regex matches literally, returns error on failure."
      />
      <CodePart
        title={`mustRegexSplit(string, string, int) ([]string, error)`}
        description="Splits by regex, returns error on failure."
      />
      <CodePart
        title={`mustRest(interface {}) ([]interface {}, error)`}
        description="Gets all but first item, returns error on failure."
      />
      <CodePart
        title={`mustReverse(interface {}) ([]interface {}, error)`}
        description="Reverses a list, returns error on failure."
      />
      <CodePart
        title={`mustSlice(interface {}, []interface {}) (interface {}, error)`}
        description="Slices a list, returns error on failure."
      />
      <CodePart
        title={`mustToDate(string, string) (time.Time, error)`}
        description="Parses a date, returns error on failure."
      />
      <CodePart
        title={`mustToJson(interface {}) (string, error)`}
        description="Encodes to JSON, returns error on failure."
      />
      <CodePart
        title={`mustToPrettyJson(interface {}) (string, error)`}
        description="Encodes to pretty JSON, returns error on failure."
      />
      <CodePart
        title={`mustToRawJson(interface {}) (string, error)`}
        description="Encodes to raw JSON, returns error on failure."
      />
      <CodePart
        title={`mustUniq(interface {}) ([]interface {}, error)`}
        description="Returns unique items, returns error on failure."
      />
      <CodePart
        title={`mustWithout(interface {}, []interface {}) ([]interface {}, error)`}
        description="Filters out items, returns error on failure."
      />
      <CodePart
        title={`must_date_modify(string, time.Time) (time.Time, error)`}
        description="Alias for mustDateModify."
      />
      <CodePart
        title={`nindent(int, string) string`}
        description="Indents with a newline prepended."
        template={`{{ "text" | nindent 4 }}`}
      />
      <CodePart
        title={`nospace(string) string`}
        description="Removes all whitespace."
        template={`{{ "hello world" | nospace }}`}
        output="helloworld"
      />
      <CodePart
        title={`nothing([]interface {}) string`}
        description="Returns an empty string."
        template={`{{ nothing }}`}
        output=""
      />
      <CodePart
        title={`now() time.Time`}
        description="Returns the current time."
        template={`{{ now }}`}
      />
      <CodePart
        title={`omit(map[string.interface {}, []string) map[string.interface {}`}
        description="Removes keys from a map."
        template={`{{ omit .data "key1" "key2" }}`}
      />
      <CodePart
        title={`osBase(string) string`}
        description="Returns the last element of path (OS-specific)."
        template={`{{ osBase "/foo/bar" }}`}
      />
      <CodePart
        title={`osClean(string) string`}
        description="Cleans a path (OS-specific)."
        template={`{{ osClean "/foo//bar" }}`}
      />
      <CodePart
        title={`osDir(string) string`}
        description="Returns directory of path (OS-specific)."
        template={`{{ osDir "/foo/bar/file.txt" }}`}
      />
      <CodePart
        title={`osExt(string) string`}
        description="Returns file extension (OS-specific)."
        template={`{{ osExt "file.txt" }}`}
      />
      <CodePart
        title={`osIsAbs(string) bool`}
        description="Checks if path is absolute (OS-specific)."
        template={`{{ osIsAbs "/foo/bar" }}`}
      />
      <CodePart
        title={`pick(map[string.interface {}, []string) map[string.interface {}`}
        description="Selects only specified keys from a map."
        template={`{{ pick .data "key1" "key2" }}`}
      />
      <CodePart
        title={`pluck(string, []map[string.interface {}) []interface {}`}
        description="Extracts a field from each map in a list."
        template={`{{ pluck "name" .users }}`}
      />
      <CodePart
        title={`plural(string, string, int) string`}
        description="Returns singular or plural based on count."
        template={`{{ plural "cat" "cats" 2 }}`}
        output="cats"
      />
      <CodePart
        title={`prepend(interface {}, interface {}) []interface {}`}
        description="Prepends an item to a list."
        template={`{{ list 2 3 | prepend 1 }}`}
        output="[1 2 3]"
      />
      <CodePart
        title={`push(interface {}, interface {}) []interface {}`}
        description="Appends an item to a list."
        template={`{{ list 1 2 | push 3 }}`}
        output="[1 2 3]"
      />
      <CodePart
        title={`quote([]interface {}) string`}
        description="Wraps strings in double quotes and joins."
        template={`{{ list "a" "b" | quote }}`}
        output={`"a" "b"`}
      />
      <CodePart
        title={`randAlpha(int) string`}
        description="Generates random alphabetic string."
        template={`{{ randAlpha 10 }}`}
      />
      <CodePart
        title={`randAlphaNum(int) string`}
        description="Generates random alphanumeric string."
        template={`{{ randAlphaNum 10 }}`}
      />
      <CodePart
        title={`randAscii(int) string`}
        description="Generates random ASCII string."
        template={`{{ randAscii 10 }}`}
      />
      <CodePart
        title={`randBytes(int) (string, error)`}
        description="Generates random bytes (base64 encoded)."
      />
      <CodePart
        title={`randInt(int, int) int`}
        description="Generates random int in range [min, max)."
        template={`{{ randInt 1 100 }}`}
      />
      <CodePart
        title={`randNumeric(int) string`}
        description="Generates random numeric string."
        template={`{{ randNumeric 10 }}`}
      />
      <CodePart
        title={`regexFind(string, string) string`}
        description="Finds first regex match."
        template={`{{ regexFind "[0-9]+" "abc123def" }}`}
        output="123"
      />
      <CodePart
        title={`regexFindAll(string, string, int) []string`}
        description="Finds all regex matches."
        template={`{{ regexFindAll "[0-9]+" "a1b2c3" -1 }}`}
      />
      <CodePart
        title={`regexMatch(string, string) bool`}
        description="Tests if string matches regex."
        template={`{{ regexMatch "[0-9]+" "123" }}`}
        output="true"
      />
      <CodePart
        title={`regexQuoteMeta(string) string`}
        description="Quotes regex meta characters."
        template={`{{ regexQuoteMeta "a.b" }}`}
        output="a\\.b"
      />
      <CodePart
        title={`regexReplaceAll(string, string, string) string`}
        description="Replaces all regex matches."
        template={`{{ regexReplaceAll "[0-9]+" "a1b2" "X" }}`}
        output="aXbX"
      />
      <CodePart
        title={`regexReplaceAllLiteral(string, string, string) string`}
        description="Replaces all regex matches (literal replacement)."
        template={`{{ regexReplaceAllLiteral "[0-9]+" "a1b2" "$1" }}`}
        output="a$1b$1"
      />
      <CodePart
        title={`regexSplit(string, string, int) []string`}
        description="Splits string by regex."
        template={`{{ regexSplit "[,;]" "a,b;c" -1 }}`}
        output="[a b c]"
      />
      <CodePart
        title={`repeat(int, string) string`}
        description="Repeats a string n times."
        template={`{{ repeat 3 "ab" }}`}
        output="ababab"
      />
      <CodePart
        title={`replace(string, string, string) string`}
        description="Replaces all occurrences."
        template={`{{ replace "o" "0" "hello" }}`}
        output="hell0"
      />
      <CodePart
        title={`rest(interface {}) []interface {}`}
        description="Returns all but the first item."
        template={`{{ list 1 2 3 | rest }}`}
        output="[2 3]"
      />
      <CodePart
        title={`reverse(interface {}) []interface {}`}
        description="Reverses a list."
        template={`{{ list 1 2 3 | reverse }}`}
        output="[3 2 1]"
      />
      <CodePart
        title={`round(interface {}, int, []float64) float64`}
        description="Rounds a float to n decimal places."
        template={`{{ round 3.14159 2 }}`}
        output="3.14"
      />
      <CodePart
        title={`semver(string) (*semver.Version, error)`}
        description="Parses a semantic version string."
        template={`{{ semver "1.2.3" }}`}
      />
      <CodePart
        title={`semverCompare(string, string) (bool, error)`}
        description="Compares semantic versions."
        template={`{{ semverCompare "^1.2.0" "1.2.3" }}`}
        output="true"
      />
      <CodePart
        title={`seq([]int) string`}
        description="Generates a sequence of integers."
        template={`{{ seq 1 5 }}`}
        output="1 2 3 4 5"
      />
      <CodePart
        title={`set(map[string.interface {}, string, interface {}) map[string.interface {}`}
        description="Sets a key in a map."
        template={`{{ set .data "key" "value" }}`}
      />
      <CodePart
        title={`sha1sum(string) string`}
        description="Computes SHA1 hash."
        template={`{{ sha1sum "hello" }}`}
      />
      <CodePart
        title={`sha256sum(string) string`}
        description="Computes SHA256 hash."
        template={`{{ sha256sum "hello" }}`}
      />
      <CodePart
        title={`shuffle(string) string`}
        description="Randomly shuffles a string."
        template={`{{ shuffle "hello" }}`}
      />
      <CodePart
        title={`slice(interface {}, []interface {}) interface {}`}
        description="Returns a slice of a list."
        template={`{{ list 1 2 3 4 5 | slice 1 3 }}`}
        output="[2 3]"
      />
      <CodePart
        title={`snakecase(string) string`}
        description="Converts to snake_case."
        template={`{{ snakecase "HelloWorld" }}`}
        output="hello_world"
      />
      <CodePart
        title={`sortAlpha(interface {}) []string`}
        description="Sorts a list alphabetically."
        template={`{{ list "c" "a" "b" | sortAlpha }}`}
        output="[a b c]"
      />
      <CodePart
        title={`split(string, string) map[string.string`}
        description="Splits string into a map."
        template={`{{ split "," "a,b,c" }}`}
      />
      <CodePart
        title={`splitList(string, string) []string`}
        description="Splits string into a list."
        template={`{{ splitList "," "a,b,c" }}`}
        output="[a b c]"
      />
      <CodePart
        title={`splitn(string, int, string) map[string.string`}
        description="Splits string into n parts."
        template={`{{ splitn "," 2 "a,b,c" }}`}
      />
      <CodePart
        title={`squote([]interface {}) string`}
        description="Wraps strings in single quotes and joins."
        template={`{{ list "a" "b" | squote }}`}
        output="'a' 'b'"
      />
      <CodePart
        title={`sub(interface {}, interface {}) int64`}
        description="Subtracts integers."
        template={`{{ sub 5 3 }}`}
        output="2"
      />
      <CodePart
        title={`subf(interface {}, []interface {}) float64`}
        description="Subtracts floats."
        template={`{{ subf 5.5 3.2 }}`}
        output="2.3"
      />
      <CodePart
        title={`substr(int, int, string) string`}
        description="Returns substring from start to end."
        template={`{{ substr 0 5 "Hello World" }}`}
        output="Hello"
      />
      <CodePart
        title={`swapcase(string) string`}
        description="Swaps case of letters."
        template={`{{ swapcase "Hello" }}`}
        output="hELLO"
      />
      <CodePart
        title={`ternary(interface {}, interface {}, bool) interface {}`}
        description="Returns first value if true, else second."
        template={`{{ ternary "yes" "no" true }}`}
        output="yes"
      />
      <CodePart
        title={`title(string) string`}
        description="Converts to Title Case."
        template={`{{ title "hello world" }}`}
        output="Hello World"
      />
      <CodePart
        title={`toDate(string, string) time.Time`}
        description="Parses a date string with format."
        template={`{{ toDate "2006-01-02" "2023-07-24" }}`}
      />
      <CodePart
        title={`toDecimal(interface {}) int64`}
        description="Converts to decimal integer."
        template={`{{ toDecimal 0x10 }}`}
        output="16"
      />
      <CodePart
        title={`toJson(interface {}) string`}
        description="Encodes to JSON string."
        template={`{{ toJson .data }}`}
      />
      <CodePart
        title={`toPrettyJson(interface {}) string`}
        description="Encodes to pretty JSON string."
        template={`{{ toPrettyJson .data }}`}
      />
      <CodePart
        title={`toRawJson(interface {}) string`}
        description="Encodes to JSON without HTML escaping."
        template={`{{ toRawJson .data }}`}
      />
      <CodePart
        title={`toString(interface {}) string`}
        description="Converts to string."
        template={`{{ toString 123 }}`}
        output="123"
      />
      <CodePart
        title={`toStrings(interface {}) []string`}
        description="Converts a list to strings."
        template={`{{ toStrings (list 1 2 3) }}`}
      />
      <CodePart
        title={`trim(string) string`}
        description="Trims whitespace from both ends."
        template={`{{ trim "  hello  " }}`}
        output="hello"
      />
      <CodePart
        title={`trimAll(string, string) string`}
        description="Trims specified characters from both ends."
        template={`{{ trimAll "$" "$hello$" }}`}
        output="hello"
      />
      <CodePart
        title={`trimPrefix(string, string) string`}
        description="Trims prefix from string."
        template={`{{ trimPrefix "Mr. " "Mr. Smith" }}`}
        output="Smith"
      />
      <CodePart
        title={`trimSuffix(string, string) string`}
        description="Trims suffix from string."
        template={`{{ trimSuffix " Jr." "John Jr." }}`}
        output="John"
      />
      <CodePart
        title={`trimall(string, string) string`}
        description="Alias for trimAll."
      />
      <CodePart
        title={`trunc(int, string) string`}
        description="Truncates a string to n characters."
        template={`{{ trunc 5 "Hello World" }}`}
        output="Hello"
      />
      <CodePart
        title={`tuple([]interface {}) []interface {}`}
        description="Creates an immutable list."
        template={`{{ tuple 1 2 3 }}`}
      />
      <CodePart
        title={`typeIs(string, interface {}) bool`}
        description="Tests if value is of a specific type."
        template={`{{ typeIs "string" "hello" }}`}
        output="true"
      />
      <CodePart
        title={`typeIsLike(string, interface {}) bool`}
        description="Tests if value is like a specific type."
        template={`{{ typeIsLike "int" 123 }}`}
      />
      <CodePart
        title={`typeOf(interface {}) string`}
        description="Returns the type of a value."
        template={`{{ typeOf "hello" }}`}
        output="string"
      />
      <CodePart
        title={`uniq(interface {}) []interface {}`}
        description="Returns unique items from a list."
        template={`{{ list 1 2 2 3 | uniq }}`}
        output="[1 2 3]"
      />
      <CodePart
        title={`unixEpoch(time.Time) string`}
        description="Converts time to Unix timestamp."
        template={`{{ now | unixEpoch }}`}
      />
      <CodePart
        title={`unset(map[string.interface {}, string) map[string.interface {}`}
        description="Removes a key from a map."
        template={`{{ unset .data "key" }}`}
      />
      <CodePart
        title={`until(int) []int`}
        description="Generates a range from 0 to n-1."
        template={`{{ until 5 }}`}
        output="[0 1 2 3 4]"
      />
      <CodePart
        title={`untilStep(int, int, int) []int`}
        description="Generates a range with step."
        template={`{{ untilStep 0 10 2 }}`}
        output="[0 2 4 6 8]"
      />
      <CodePart
        title={`untitle(string) string`}
        description="Removes title case."
        template={`{{ untitle "Hello World" }}`}
        output="hello world"
      />
      <CodePart
        title={`upper(string) string`}
        description="Converts to uppercase."
        template={`{{ upper "hello" }}`}
        output="HELLO"
      />
      <CodePart
        title={`urlJoin(map[string.interface {}) string`}
        description="Joins URL parts into a complete URL."
        template={`{{ urlJoin .urlParts }}`}
      />
      <CodePart
        title={`urlParse(string) map[string.interface {}`}
        description="Parses a URL into parts."
        template={`{{ urlParse "https://example.com/path" }}`}
      />
      <CodePart
        title={`uuidv4() string`}
        description="Generates a random UUID v4."
        template={`{{ uuidv4 }}`}
      />
      <CodePart
        title={`values(map[string.interface {}) []interface {}`}
        description="Returns all values from a map."
        template={`{{ values .data }}`}
      />
      <CodePart
        title={`without(interface {}, []interface {}) []interface {}`}
        description="Filters items out of a list."
        template={`{{ list 1 2 3 4 | without 2 4 }}`}
        output="[1 3]"
      />
      <CodePart
        title={`wrap(int, string) string`}
        description="Wraps text at specified column width."
        template={`{{ wrap 10 "This is a long text" }}`}
      />
      <CodePart
        title={`wrapWith(int, string, string) string`}
        description="Wraps text with custom separator."
        template={`{{ wrapWith 10 "\\n" "This is a long text" }}`}
      />
    </div>
  </div>
</div>
