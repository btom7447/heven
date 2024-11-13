import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    ...pluginJs.configs.recommended,  // Spread the recommended config here
    ...pluginReact.configs.flat.recommended,  // Spread React config here
    rules: {
      'no-unused-vars': 'warn',  // Add your custom rule
    },
  },
];
