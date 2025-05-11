# MyNxWs

## [Presets](https://canary.nx.dev/nx-api/nx/documents/create-nx-workspace#presets)

# Steps to reproduce

## 1. Generate nx ws

    npx create-nx-workspace@latest my-nx-ws --preset=ts --packageManager=yarn

## 2. Generate libraries

    mkdir -p libs/my-lib
    yarn nx generate @nx/js:library --directory libs/my-lib --name my-lib --bundler vite --unitTestRunner vitest --linter eslint --config workspace
    yarn nx generate @nx/js:library --directory libs/my-lib2 --name my-lib2 --bundler vite --unitTestRunner vitest --linter eslint --config workspace

    yarn nx test my-lib
    yarn nx test my-lib2
    yarn nx run-many --target=test --all

## 3. Generate apps

    yarn nx generate @nx/web:app --directory apps/my-app1 --name my-app1 --linter eslint --bundler vite --unitTestRunner vitest --useProjectJson --dry-run
    yarn nx generate @nx/web:app --directory apps/my-app1 --name my-app1 --linter eslint --bundler vite --unitTestRunner vitest
    yarn nx generate @nx/web:app --directory apps/my-app2 --name my-app2 --linter eslint --bundler vite --unitTestRunner vitest

    yarn add -DW sass-embedded

    yarn nx test my-app1
    yarn nx test my-app2

#### They recommend

Для Vanilla JavaScript/TypeScript + Vite: Ви можете спочатку створити базовий веб-застосунок за допомогою @nx/web:app і потім налаштувати Vite для нього, використовуючи генератор @nx/vite:configuration.

    nx generate @nx/web:app ім'я-вашого-web-застосунку
    nx generate @nx/vite:configuration --project=ім'я-вашого-web-застосунку

As result I almost followed this way to make my-app2 working with `solid.js`.

## 4. Add dom configuration

`tsconfig.base.json`

```
    "lib": ["es2022", "dom"],
    "module": "ESNext",
```

## 5. Update `my-app2` to `solid.js` app

    yarn add solid-js
    yarn add -D vitest @solidjs/testing-library babel-preset-solid vite-plugin-solid vitest-dom

## 6. Results

### 6.1. Execute all tests

You can execute all units from the root directory

    rm -rf **/node_modules **/dist
    yarn
    yarn nx run-many --target=test --all

### 6.2. Build

For example:

    yarn nx run my-app2:build

### 6.4. Execute

    yarn nx show projects
    yarn nx run my-app1:serve
    yarn nx run my-app1:lint

    yarn nx run-many --target=lint --all
    yarn nx run-many --target=lint --all --fix
    yarn nx format

### 6.3. VSCode testing plugin

If you want use special VSCode plugins like `Vitest` `vitest.dev` - you may face with VSCode issue when Vitest Explorer VSCode Extension doesn't read your testing configuration correctly and it leads to `❌ Client-only API called on the server side` issue in VSCode.

I have not figured out how to resolve the described issue.

## 8.Linter

### 8.1. Biome

#### 8.1.1. How to migrate ESLint to biome

    yarn remove eslint prettier \
        @typescript-eslint/eslint-plugin \
        @typescript-eslint/parser \
        eslint-config-prettier \
        eslint-plugin-prettier \
        eslint-plugin-solid

    rm -f .eslintrc.js .eslintrc.cjs .eslintrc.json \
      .prettierrc .prettierrc.json .prettierrc.js \
      .prettierignore

    yarn add -DW @biomejs/biome
    npx biome init

#### 8.1.2. Biome info links

Files created

- biome.json
  Your project configuration. See https://biomejs.dev/reference/configuration

Next Steps

1. Setup an editor extension
   Get live errors as you type and format when you save.
   Learn more at https://biomejs.dev/guides/integrate-in-editor/

2. Try a command
   biome check checks formatting, import sorting, and lint rules.
   biome --help displays the available commands.

3. Migrate from ESLint and Prettier
   biome migrate eslint migrates your ESLint configuration to Biome.
   biome migrate prettier migrates your Prettier configuration to Biome.

4. Read the documentation
   Find guides and documentation at https://biomejs.dev/guides/getting-started/

5. Get involved with the community
   Ask questions and contribute on GitHub: https://github.com/biomejs/biome
   Seek for help on Discord: https://biomejs.dev/chat

#### 8.1.3. Biome issues?

I'd like keep unwrapped arrays, but biome formats it into single line (no option to customize described formatting)

## 7. Alternative configuration

- consider to move vite and vitest configurations to the root place (dropping separate configurations for every test in separate way)
