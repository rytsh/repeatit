const tailwindcssNesting = require('tailwindcss/nesting')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  mode: "jit",
  content: ["./src/app.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          200: "#252422",
          500: "#808080",
        },
      },
      screens: {
        "sm-max": { "max": "639px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    tailwindcssNesting,
    tailwindcss,
    autoprefixer,
    process.env.NODE_ENV == "production" &&
    cssnano({
      preset: 'default'
    })
  ],
};
