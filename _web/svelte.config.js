import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

console.log("> ENV:", process.env.NODE_ENV);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [tailwindcss(), vitePreprocess()],
  compilerOptions: {
    sourcemap: !(process.env.NODE_ENV == "production"),
  },

  paths: {
    base: "./",
  },

  kit: {
    adapter: adapter(),
    prerender: {
      handleMissingId: 'warn',
    },
  },
};

export default config;
