import App from "@/App.svelte";
import "@/style/global.scss";

import { initWasm } from "@/helper/wasm";

initWasm();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
