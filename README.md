<img src="./assets/logoR.svg" alt="repeatit" height="100"/>

[![License](https://img.shields.io/github/license/rytsh/repeatit?color=red&style=flat-square)](https://raw.githubusercontent.com/rytsh/repeatit/master/LICENSE)
[![repeatit.io](https://img.shields.io/badge/website-repeatit.io-blue?style=flat-square)](https://repeatit.io)

Go template playground with wasm.

Frontend developed with __sveltekit__ in prerender mode.

## Features

__-__ switch html and text  
__-__ sprig, helm functions  
__-__ html view  
__-__ share template, input and settings  
__-__ full html output and link generated  

<details><summary>Development</summary>

Build wasm file

```sh
make build
```

Run frontend

```sh
make build-front-install run
```

Make local test first and to try other things use `ngrok` like tools before tag new version.

Add new tag with starts `v[0-9]` to publish new version of website.

</details>
