---
title: Building your app
description: Build and deploy app bundles with Ampt.
---

## Building your app

If you are using a SPA framework like React, Vue, or Svelte, you will need to build your app before deploying it to Ampt. You can use a build tool like Vite, Webpack, or Rollup to do this.

When deploying to a stage environment using the `deploy` command, or from a Git triggered deploy, Ampt's builder runs `install`, `rebuild`, and `ampt:build` (from your app's `package.json` scripts) to build your app. If you need to run additional build steps, you can add them to the `ampt:build` script in your `package.json` file.

```json
{
  "scripts": {
    "ampt:build": "vite build; echo 'Additional build steps here...'"
  }
}
```

After your build is complete, a `prune` step is run to remove any unnecessary dependencies from your final bundle.

Depending on the detected package manager your app is using, the following commands are run:

| Command | npm                                                | yarn                                                  | pnpm                        |
| ------- | -------------------------------------------------- | ----------------------------------------------------- | --------------------------- |
| Install | `npm install --prefer-online --no-fund --no-audit` | `yarn install`                                        | `pnpm --shamefully-hoist i` |
| Rebuild | `npm rebuild`                                      | `yarn --force`                                        | `pnpm rebuild`              |
| Prune   | `npm prune --production --no-audit --no-fund`      | `yarn --production --ignore-scripts --prefer-offline` | `no-op`                     |

!!! note
PNPM uses shamefully-hoist to install all dependencies in the root of the project. This is to ensure that all dependencies are available at runtime. This is necessary because Ampt's builder does not support the `node_modules` symlink that PNPM uses by default.
!!!

To override any of these commands, you can add a `ampt:build:install`, `ampt:build:rebuild`, or `ampt:build:prune` script to your `package.json` file.

```json
{
  "scripts": {
    "ampt:build:install": "echo 'Custom install command here...'",
    "ampt:build:rebuild": "echo 'Custom rebuild command here...'",
    "ampt:build:prune": "echo 'Custom prune command here...'"
  }
}
```
