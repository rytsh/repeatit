module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "sm-max": { "max": "639px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
