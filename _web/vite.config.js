// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import devtoolsJson from 'vite-plugin-devtools-json';
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), devtoolsJson()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5555",
        changeOrigin: true,
        secure: true,
        ws: true,
        followRedirects: true,
      },
    },
    port: process.env.PORT ?? 3000,
  },
};

export default config;

