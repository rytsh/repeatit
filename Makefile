MAIN_FILE := cmd/jsgo/main.go
VERSION   := $(or $(IMAGE_TAG),$(shell git describe --tags --first-parent --match "v*" 2> /dev/null || echo v0.0.0))
OUTPUT    := _web/static/wasm/repeatit-$(VERSION).wasm

LOCAL_BIN_DIR := $(PWD)/bin

.DEFAULT_GOAL := help

.PHONY: run
run: ## Run the application
	@cd _web && pnpm run dev --host

.PHONY: build
build: values ## Build the binary file
	@echo "> Building $(MAIN_FILE) version $(VERSION)"
	GOOS=js GOARCH=wasm go build -trimpath -ldflags="-s -w -X main.version=$(VERSION)" -o $(OUTPUT) $(MAIN_FILE)

.PHONY: build-front
build-front: ## Build the front
	@cd _web && pnpm install --prefer-offline && pnpm run build

.PHONY: preview
preview: ## Preview the front
	@cd _web && pnpm run preview

.PHONY: values
values: ## Extract versions
	@echo "> Extracting package versions"
	@grep github.com/Masterminds/sprig/v3 go.mod | xargs echo | cut -d " " -f2 | xargs -I{} echo VITE_SPRIG_VERSION={} > _web/.env
	@go version | cut -d " " -f3- | xargs -I{} echo VITE_GO_VERSION="GOOS=js GOARCH=wasm {}" >> _web/.env
	@echo VITE_REPEATIT_VERSION="$(VERSION)" >> _web/.env
	@cat _web/.env

.PHONY: lint
lint: ## Lint Go files
	@golangci-lint --version
	@GOPATH="$(shell dirname $(PWD))" golangci-lint run ./...

.PHONY: test
test: ## Run unit tests
	@go test -v -race -cover ./...

.PHONY: coverage
coverage: ## Run unit tests with coverage
	@go test -v -race -cover -coverpkg=./... -coverprofile=coverage.out -covermode=atomic ./...
	@go tool cover -func=coverage.out

.PHONY: html
html: ## Show html coverage result
	@go tool cover -html=./coverage.out

.PHONY: html-gen
html-gen: ## Export html coverage result
	@go tool cover -html=./coverage.out -o ./coverage.html

.PHONY: html-wsl
html-wsl: html-gen ## Open html coverage result in wsl
	@explorer.exe `wslpath -w ./coverage.html` || true

.PHONY: help
help: ## Display this help screen
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
