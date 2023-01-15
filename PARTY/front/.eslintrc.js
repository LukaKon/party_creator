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
    // "react/function-component-definition": "warn",
    "react/function-component-definition": [
      "off",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/prefer-default-export": "off",
    "no-unused-vars": "warn",
    "no-use-before-define": "warn",
    quotes: "off",
  },
};
