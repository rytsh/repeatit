#!/usr/bin/env bash
#
# Build the project
# Eray Ates <eates23@gmail.com>

function usage() {
  cat - <<EOF
Building dockerfile
Usage: $0 <OPTIONS>
OPTIONS:
  --build
    Compile and generate wasm file

  -h, --help
    This help page
EOF
}

# Parse the command line arguments
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  --build)
    R_BUILD="Y"
    ;;
  -h | --help )
    usage
    exit
    ;;
  *)
    echo "Unknown option: $1"
    usage
    exit 1
    ;;
esac; shift 1; done
if [[ "$1" == '--' ]]; then shift; fi

if [[ "$R_BUILD" == "Y" ]]; then
  echo "Building..."
  GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o ./_web/public/wasm/repeatit.wasm ./cmd/jsgo/main.go
fi

if [[ "$R_BUILD" == "Y" ]]; then
  echo "Extracting env variables..."
  grep github.com/Masterminds/sprig/v3 go.mod | cut -d " " -f3 | xargs -I{} echo VITE_SPRIG_VERSION={} > _web/.env
  go version | cut -d " " -f3- | xargs -I{} echo VITE_GO_VERSION={} >> _web/.env
fi
