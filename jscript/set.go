package jscript

import "syscall/js"

func SetFunctions() {
	js.Global().Set("render", js.FuncOf(Render))
}
