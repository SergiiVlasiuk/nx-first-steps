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

### 6.3. VSCode testing plugin

If you want use special VSCode plugins like `Vitest` `vitest.dev` - you may face with VSCode issue when Vitest Explorer VSCode Extension doesn't read your testing configuration correctly and it leads to `❌ Client-only API called on the server side` issue in VSCode.

I have not figured out how to resolve the described issue.

## 7. Alternative configuration

- consider to move vite and vitest configurations to the root place (dropping separate configurations for avery test in separate way)
