module.exports = {
  mode: "jit",
  content: ["./src/app.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
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
