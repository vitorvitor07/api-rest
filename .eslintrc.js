module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: "off",
    "import/no-extraneous-dependencies": "off",
    "operator-linebreak": "off",
    "comma-dangle": "off",
    "no-param-reassign": "off",
    "no-console": "off",
    "class-methods-use-this": "off",
    "import/first": "off",
    "object-curly-newline": "off",
  },
};
