module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // "import/prefer-default-export": "off",
    "react/function-component-definition": {
      namedComponents: "arrow-function",
      unnamedComponents: "arrow-function",
    },
    "no-unused-vars": "warn",
    "no-use-before-define": "warn",
    quotes: "off",
  },
};