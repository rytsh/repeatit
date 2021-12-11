package jscript

import (
	"errors"
	"strings"
	"syscall/js"

	"github.com/rytsh/repeatit/translate"
)

func Render(this js.Value, args []js.Value) interface{} {
	mainArgs := args

	handler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		resolve := args[0]
		reject := args[1]

		go func() {
			data, err := renderWithError(mainArgs)
			if err != nil {
				errorConstructor := js.Global().Get("Error")
				errorObject := errorConstructor.New(err.Error())
				reject.Invoke(errorObject)
			} else {
				resolve.Invoke(js.ValueOf(data))
			}
		}()

		return nil
	})

	promiseConstructor := js.Global().Get("Promise")

	return promiseConstructor.New(handler)
}

func renderWithError(args []js.Value) (interface{}, error) {
	reader := strings.NewReader(args[0].String())

	values, err := translate.Decode(reader)
	if err != nil {
		return nil, errors.New("failed to decode input; " + err.Error())
	}

	text := args[1].String()

	selectedTemplate := translate.TXT
	if args[2].String() == "html" {
		selectedTemplate = translate.HTML
	}

	funcList := strings.Split(args[3].String(), ",")

	result, err := translate.GlobalTemplate.Ext(values, text, selectedTemplate, funcList)
	if err != nil {
		return nil, errors.New("render; " + err.Error())
	}

	return string(result), nil
}
