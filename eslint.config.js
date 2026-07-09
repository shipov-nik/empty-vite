import { createRequire } from "node:module";

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";

const require = createRequire(import.meta.url);

const fsdLayersSlices = require("@feature-sliced/eslint-config/rules/layers-slices");
const fsdPublicApi = require("@feature-sliced/eslint-config/rules/public-api/lite");

const toErrorRules = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([rule, value]) => [
      rule,
      Array.isArray(value) ? ["error", ...value.slice(1)] : value,
    ]),
  );

export default defineConfig(
  {
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
  },
  { ignores: ["dist", "node_modules", "eslint.config.js"] },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
  },
  { files: ["**/*.{ts,tsx}"] },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      prettier: pluginPrettier,
      import: pluginImport,
      boundaries,
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      ...fsdLayersSlices.settings,
      ...fsdPublicApi.settings,
      "boundaries/include": ["src/**/*.{ts,tsx}"],
    },
  },
  {
    rules: {
      ...pluginPrettier.configs.recommended.rules,
      ...configPrettier.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prefer-const": "error",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
      ...toErrorRules(fsdLayersSlices.rules),
      ...toErrorRules(fsdPublicApi.rules),
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/entities/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/features/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/widgets/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/pages/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/app",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/app/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "*.{css,scss,module.scss}",
              group: "index",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
);
