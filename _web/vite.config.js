import * as path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import { minifyHtml, injectHtml } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    svelte({ preprocess: preprocess({ name: "scss" }) }),
    process.env.NODE_ENV == "production" ? minifyHtml(): null,
    process.env.NODE_ENV == "production" ? injectHtml({
      data: {
        analytics: `
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DLDSWZ7265"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-DLDSWZ7265');
          </script>`,
      },
    }) : injectHtml({
      data: {
        analytics: "",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: process.env.NODE_ENV == "production" ? false : true,
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
});
