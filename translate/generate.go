package translate

import (
	"bytes"
	"fmt"
)

// Execute executes the template with the given data.
func Execute(v map[string]interface{}, tmp TemplateExecuter) ([]byte, error) {
	var b bytes.Buffer

	// Execute the template and write the output to the buffer
	if err := tmp.Execute(&b, v); err != nil {
		return nil, fmt.Errorf("execute template error: %w", err)
	}

	return b.Bytes(), nil
}
