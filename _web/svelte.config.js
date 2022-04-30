import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import * as path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({ name: "scss" }),
  compilerOptions: {
    sourcemap: !(process.env.NODE_ENV == "production" && process.env.npm_lifecycle_event != "dev"),
  },

  paths: {
    base: "./",
  },

  kit: {
    adapter: adapter(),
    browser: {
      hydrate: true,
      router: false,
    },
    prerender: {
      default: true,
    },
    vite: () => ({
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
    }),
  },
};

export default config;
