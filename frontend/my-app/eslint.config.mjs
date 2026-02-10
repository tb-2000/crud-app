import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],

    {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }, // aktiviert JSX-Parsing explizit
      },
    },
    settings: {
      react: {
        version: "detect", // oder "18.0" / "17.0" – "detect" ist meist am sichersten
      },
    },
    rules: {
      "no-console": "off",
      "no-undef": "error",
      // Optional: typische React-Regeln anpassen
      "react/jsx-uses-react": "off",     // nicht nötig bei neuen JSX-Transform
      "react/react-in-jsx-scope": "off", // nicht nötig bei neuen JSX-Transform
      "react/prop-types": "off",         // wenn du kein PropTypes nutzt
      // "react-hooks/rules-of-hooks": "error",
      // "react-hooks/exhaustive-deps": "warn",
    },
  },

  {
    ignores: ["node_modules/**", "dist/**", "build/**", ".vite/**"],
  },
];