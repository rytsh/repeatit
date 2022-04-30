module.exports = {
  env: {
    "browser": true,
    "jest": true,
    "node": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "tsconfigRootDir": __dirname,
    "project": ["./tsconfig.json"],
    "extraFileExtensions": [".svelte", ".html"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
  ],
  plugins: ["html", "svelte3", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  ignorePatterns: ['*.cjs'],
  settings: {
    "html/html-extensions": [".html"],
    "svelte3/typescript": require("typescript"),
    "svelte3/ignore-styles": () => true,
  },
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "new-cap": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "jsx-quotes": "warn",
    "quote-props": ["error", "consistent"],
    "require-jsdoc": "off",
    "max-len": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "spaced-comment": ["error", "always", { "markers": ["/"] }],
  },
};
