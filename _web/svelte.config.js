import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";


console.log("> ENV:", process.env.NODE_ENV);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({
    postcss: true,
  })],
  compilerOptions: {
    sourcemap: !(process.env.NODE_ENV == "production"),
  },

  paths: {
    base: "./",
  },

  kit: {
    adapter: adapter(),
  },
};

export default config;
