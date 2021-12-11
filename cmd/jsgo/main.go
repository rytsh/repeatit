//go:build wasm

package main

import (
	"github.com/rytsh/repeatit/jscript"
	"github.com/rytsh/repeatit/translate"
)

func main() {
	c := make(chan struct{})

	translate.SetGlobalTemplate(translate.NewTemplate())

	jscript.SetFunctions()

	println("WASM initialized")

	<-c
}
