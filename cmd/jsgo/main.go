//go:build wasm

package main

import (
	"github.com/rytsh/repeatit/jscript"
	"github.com/rytsh/repeatit/translate"
)

func main() {
	c := make(chan struct{})

	translate.SetGlobalTemplate(translate.NewTemplate())

	release := jscript.SetFunctions()
	defer release()

	println("WASM initialized")

	<-c
}
