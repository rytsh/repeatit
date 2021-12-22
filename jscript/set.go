package jscript

import "syscall/js"

func SetFunctions() func() {
	renderjs := js.FuncOf(Render)
	js.Global().Set("render", renderjs)

	return func() {
		renderjs.Release()
	}
}
