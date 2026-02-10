import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,      // ← das aktiviert require, module, process, console usw.
      },
      ecmaVersion: 2022,
      sourceType: "commonjs", // ← wichtig für require()
    },
    rules: {
      "no-console": "off",          // console.log erlauben (du nutzt es aktiv)
      "no-undef": "error",          // bleibt aktiv
      // Optional: mehr Regeln hinzufügen, z. B.
      // "semi": ["error", "always"],
      // "quotes": ["error", "single"],
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];
