package translate

import (
	"bytes"
	"fmt"
)

// Execute executes the template with the given data.
func Execute(v any, tmp TemplateExecuter) ([]byte, error) {
	var buff bytes.Buffer

	// Execute the template and write the output to the buffer
	if err := tmp.Execute(&buff, v); err != nil {
		return nil, fmt.Errorf("execute template error: %w", err)
	}

	return buff.Bytes(), nil
}
