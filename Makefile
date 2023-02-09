MAIN_FILE := cmd/jsgo/main.go
VERSION   := $(or $(IMAGE_TAG),$(shell git describe --tags --first-parent --match "v*" 2> /dev/null || echo v0.0.0))
OUTPUT    := _web/static/wasm/repeatit-$(VERSION).wasm

LOCAL_BIN_DIR := $(PWD)/bin

## golangci configuration
GOLANGCI_CONFIG_URL   := https://raw.githubusercontent.com/worldline-go/guide/main/lint/.golangci.yml
GOLANGCI_LINT_VERSION := v1.51.1

.DEFAULT_GOAL := help

.PHONY: run build build-front preview values golangci lint run test coverage help

run: ## Run the application
	@cd _web && pnpm run dev --host

build: values ## Build the binary file
	@echo "> Building $(MAIN_FILE) version $(VERSION)"
	GOOS=js GOARCH=wasm go build -trimpath -ldflags="-s -w -X main.version=$(VERSION)" -o $(OUTPUT) $(MAIN_FILE)

build-front: ## Build the front
	@cd _web && pnpm install --prefer-offline && pnpm run build

preview: ## Preview the front
	@cd _web && pnpm run preview

values: ## Extract versions
	@echo "> Extracting package versions"
	@grep github.com/Masterminds/sprig/v3 go.mod | xargs echo | cut -d " " -f2 | xargs -I{} echo VITE_SPRIG_VERSION={} > _web/.env
	@go version | cut -d " " -f3- | xargs -I{} echo VITE_GO_VERSION="GOOS=js GOARCH=wasm {}" >> _web/.env
	@echo VITE_REPEATIT_VERSION="$(VERSION)" >> _web/.env
	@cat _web/.env

.golangci.yml:
	@$(MAKE) golangci

golangci: ## Download .golangci.yml file
	@curl --insecure -o .golangci.yml -L'#' $(GOLANGCI_CONFIG_URL)

bin/golangci-lint-$(GOLANGCI_LINT_VERSION):
	@curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(LOCAL_BIN_DIR) $(GOLANGCI_LINT_VERSION)
	@mv $(LOCAL_BIN_DIR)/golangci-lint $(LOCAL_BIN_DIR)/golangci-lint-$(GOLANGCI_LINT_VERSION)

lint: .golangci.yml bin/golangci-lint-$(GOLANGCI_LINT_VERSION) ## Lint Go files
	@$(LOCAL_BIN_DIR)/golangci-lint-$(GOLANGCI_LINT_VERSION) --version
	@GOPATH="$(shell dirname $(PWD))" $(LOCAL_BIN_DIR)/golangci-lint-$(GOLANGCI_LINT_VERSION) run ./...

test: ## Run unit tests
	@go test -v -race -cover ./...

coverage: ## Run unit tests with coverage
	@go test -v -race -cover -coverpkg=./... -coverprofile=coverage.out -covermode=atomic ./...
	@go tool cover -func=coverage.out

html: ## Show html coverage result
	@go tool cover -html=./coverage.out

html-gen: ## Export html coverage result
	@go tool cover -html=./coverage.out -o ./coverage.html

html-wsl: html-gen ## Open html coverage result in wsl
	@explorer.exe `wslpath -w ./coverage.html` || true

help: ## Display this help screen
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
