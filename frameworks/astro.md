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

```json title=package.json, copy=false
{
  "name": "my-astro-app",
  "main": "dist/entry",
  "type": "module",
  "scripts": {
    "ampt:dev": "astro dev --experimental-integrations --experimental-ssr",
    "ampt:build": "astro build --experimental-integrations --experimental-ssr"
  },
  ...
}
```

Add the ampt integration to your `astro.config.mjs` file:

```javascript header=false
// astro.config.mjs

import { defineConfig } from "astro/config";
import ampt from "@ampt/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [ampt(), svelte()],
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
