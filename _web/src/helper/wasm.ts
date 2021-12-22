import { loading } from "@/store";

const initWasm = (wasmFile = "./wasm/repeatit.wasm") => {
  if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer();
      return await WebAssembly.instantiate(source, importObject);
    };
  }

  const go = new Go();
  WebAssembly.instantiateStreaming(fetch(wasmFile), go.importObject).then((result) => {
    go.run(result.instance);
    loading.set(false);
  }).catch((err) => {
    console.error(err);
  });
};

export { initWasm };
