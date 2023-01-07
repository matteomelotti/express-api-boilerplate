module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [],
  extends: [
    "plugin:import/typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    indent: ["error", 2],
    radix: "off",
    semi: ["error", "always"],
    "comma-dangle": "off",
    "operator-linebreak": ["error", "after", { overrides: { "?": "ignore", ":": "ignore" } }],
    "max-len": ["error", { code: 120 }],
    "prefer-arrow-callback": 0,
    "consistent-return": 2,
    "no-unused-vars": 1,
    "no-undef": ["error", { typeof: true }],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": 0,
      },
    },
  ],
};
