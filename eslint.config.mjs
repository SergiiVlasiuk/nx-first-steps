import nx from "@nx/eslint-plugin";

export default [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: [
      "**/dist",
      "**/vite.config.*.timestamp*",
      "**/vitest.config.*.timestamp*",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "no-extra-semi": "error",
      "@typescript-eslint/no-unused-vars": [
        // 'warn',
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "*",
              // Поточне налаштування дозволяє будь-які залежності між бібліотеками.
              // Якщо ви хочете обмежити залежності на основі тегів, вам потрібно буде
              // визначити конкретні пари тегів (sourceTag та onlyDependOnLibsWithTags).
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
      //

      "@nx/dependency-checks": "error",
      // '@nx/dependency-checks': [
      //   'error',
      //   {
      //     ignoredFiles: [
      //       '{projectRoot}/eslint.config.{js,cjs,mjs}',
      //       '{projectRoot}/vite.config.{js,ts,mjs,mts}',
      //     ],
      //   },
      // ],
    },
  },

  // This block is useful if you have specific linting rules
  // that apply only to these file types.
  // You can also add additional rules or override existing ones
  // for these file types.
  {
    files: ["**/*.cts", "**/*.mts", "**/*.cjs", "**/*.mjs"],
    // Override or add rules here
    rules: {},
  },

  {
    // Цей блок спрацьовує для всіх JSON- та JSONC-файлів
    files: ["**/*.json", "**/*.jsonc"],
    languageOptions: {
      // Підключаємо парсер, що розуміє коментарі у JSON
      parser: await import("jsonc-eslint-parser"),
    },
    plugins: {
      jsonc: await import("eslint-plugin-jsonc"),
    },
    rules: {
      // Наприклад, перевіряти на дублікат ключів у JSON
      "jsonc/no-dupe-keys": "error",
      // Правила форматування ключів у певному порядку
      "jsonc/sort-keys": [
        "warn",
        {
          pathPattern: "^$", // Hits the root properties
          order: ["name", "version", "private", "publishConfig"],
        },
        {
          pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
          order: { type: "asc" },
        },
      ],
    },
  },
];
