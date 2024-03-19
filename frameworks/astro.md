---
title: Astro
description: Integrate with Astro to build full stack applications.
---

Ampt allows developers to integrate with their existing Astro applications.

Install `@ampt/astro` in your project:

```terminal title=Terminal
> npm install @ampt/astro --save
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/astro
```

You will need to add the dev and build scripts to configure how you start the development server inside interactive shell and how you package your application. You will need to update `package.json` file as follows:

- add `ampt:dev` script for running the Astro dev server
- add `ampt:build` script for running astro build
- set `main` to `dist/entry` which is the entrypoint for the server

!!! note
Astro version 4.0 requires the Node.js 20 runtime and builder. New apps default to Node.js 20, but if you're upgrading an existing app, you'll need to specify "nodejs20" as the `runtime` and `buildRuntime` in your package.json.
!!!

```json title=package.json, copy=false
{
  "name": "my-astro-app",
  "main": "dist/entry",
  "type": "module",
  "scripts": {
    "ampt:dev": "astro dev",
    "ampt:build": "astro check && astro build",
  },
  "ampt": {
    "org": "your-org",
    "app": "your-app",
    "runtime": "nodejs20",
    "buildRuntime": "nodejs20",
  }
  ...
}
```

Add the ampt integration to your `astro.config.mjs` file:

```javascript header=false
// astro.config.mjs

import { defineConfig } from "astro/config";
import ampt from "@ampt/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [ampt() /* other integrations */],
});
```

Start the interactive shell and run `build` to create your artifacts:

```terminal title=Terminal, copy=false
> ampt
> build
```

Start the interactive shell and run `dev` to start your development server

```terminal title=Terminal, copy=false
> ampt
> dev
```
