import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",   // oder "warn" wenn du console verbieten willst
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];
