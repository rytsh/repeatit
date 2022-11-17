package translate

import (
	"fmt"

	"github.com/BurntSushi/toml"
	"gopkg.in/yaml.v3"
)

// Decode decodes the YAML/JSON and returns the result as a map.
func Decode(data string, t string) (any, error) {
	switch t {
	case "raw":
		// readall
		return data, nil
	case "yaml":
		var v any
		if err := yaml.Unmarshal([]byte(data), &v); err != nil {
			return nil, err
		}
		return v, nil
	case "toml":
		var v any
		if err := toml.Unmarshal([]byte(data), &v); err != nil {
			return nil, err
		}
		return v, nil
	default:
		return nil, fmt.Errorf("unknown decode type: %s", t)
	}
}
