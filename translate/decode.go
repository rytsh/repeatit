package translate

import (
	"io"

	"gopkg.in/yaml.v3"
)

// Decode decodes the YAML/JSON and returns the result as a map.
func Decode(r io.Reader) (map[string]interface{}, error) {
	dict := make(map[string]interface{})

	decoder := yaml.NewDecoder(r)
	if err := decoder.Decode(&dict); err != nil {
		return nil, err
	}

	return dict, nil
}
