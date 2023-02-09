//go:build js && wasm
// +build js,wasm

package main

import (
	"github.com/rytsh/repeatit/jscript"
	"github.com/rytsh/repeatit/translate"
)

var version = "v0.0.0"

func main() {
	c := make(chan struct{})

	translate.SetGlobalTemplate(translate.NewTemplate())

	release := jscript.SetFunctions()
	defer release()

	println("WASM initialized %s", version)

	<-c
}
