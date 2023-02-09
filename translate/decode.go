package translate

import (
	"fmt"

	"github.com/BurntSushi/toml"
	"gopkg.in/yaml.v3"
)

// Decode decodes the raw, yaml/json, toml and returns the result.
func Decode(data, codec string) (any, error) {
	switch codec {
	case "raw":
		// read all
		return data, nil
	case "yaml":
		var v any
		if err := yaml.Unmarshal([]byte(data), &v); err != nil {
			return nil, err //nolint:wrapcheck // show raw error
		}

		return v, nil
	case "toml":
		var v any
		if err := toml.Unmarshal([]byte(data), &v); err != nil {
			return nil, err //nolint:wrapcheck // show raw error
		}

		return v, nil
	default:

		return nil, fmt.Errorf("unknown decode type: %s", codec)
	}
}
