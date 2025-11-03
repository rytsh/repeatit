<img src="assets/logoR.svg#gh-light-mode-only" alt="repeatit" width="220"/>
<img src="assets/logoR_light.svg#gh-dark-mode-only" alt="repeatit" width="220"/>

[![License](https://img.shields.io/github/license/rytsh/repeatit?color=red&style=flat-square)](https://raw.githubusercontent.com/rytsh/repeatit/master/LICENSE)
[![repeatit.io](https://img.shields.io/badge/website-repeatit.io-blue?style=flat-square)](https://repeatit.io)

Go template playground with wasm.

__-__ switch html and text  
__-__ sprig, helm functions  
__-__ html view  
__-__ share template, input and settings  

> Download binary/static from [releases](https://github.com/rytsh/repeatit/releases) or try docker image:

```sh
docker run -it --rm -p 8080:8080 ghcr.io/rytsh/repeatit:latest
```

---

<details><summary>Server Configuration</summary>

Add config file `repeatit.[yaml|yml|json|toml]` in root of the container or use environment variables.

> Environment variables have prefix `REPEATIT_` and use `_` instead of `.`.  
> For example `REPEATIT_PATH_PREFIX=/repeatit`.

```yaml
log_level: info
address: ":8080"
path_prefix: "" # for example "/repeatit"
encoding:
  disabled: false
  encoding: # empty list's default to ["gzip"]
    - gzip
cors:
  allow_origins:
    - "*" # for example "https://example.com"
  allow_methods:
    - GET
    - HEAD
    - PUT
    - POST
    - PATCH
    - DELETE
  allow_headers: []
  allow_credentials: false
  unsafe_wildcard_origin_with_allow_credentials: false
  expose_headers: []
  max_age: 0
```

</details>

<details><summary>Development</summary>

Frontend developed with __sveltekit__ in prerender mode.

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
