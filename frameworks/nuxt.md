---
title: Nuxt
description: Integrate with Nuxt to build full stack applications powered by Vue.js.
---

Ampt allows developers to integrate with their existing [Nuxt](https://nuxt.com/docs) applications.

!!! note
Ampt currently supports Nuxt 3.x and above.
!!!

Install `@ampt/nuxt` in your project:

```terminal title=Terminal
> npm install @ampt/nuxt --save
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/nuxt
```

Add the `ampt:dev` and `ampt:build` scripts to configure how you start the development server inside interactive shell and how you build your application. You will need to update `package.json` file as follows:

- add `ampt:dev` script for running the Nuxt dev server
- add `ampt:build` script for running next build and ampt-nuxt-build
- set `main` to `index.js` which will be the entrypoint for the server

This is an example of what your `package.json` should look like::

```json title=package.json, copy=false
{
  "name": "my-nuxt-app",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "ampt:build": "nuxt build && ampt-nuxt-build",
    "ampt:dev": "next dev",
  },
  ...
}
```

Add the ampt integration to your `nuxt.config.js` file:

```javascript header=false
// nuxt.config.js
import withAmpt from "@ampt/nuxt";
export default defineNuxtConfig(
  withAmpt({
    devtools: { enabled: true },
  })
);
```

Nuxt uses [nitro](https://nitro.unjs.io/) under the hood, which builds the server and client bundles separately. The `withAmpt` wrapper will persist your Nuxt config, only adding the necessary changes to enable Ampt.

The changes are as follows:

```javascript header=false
nitro: {
    preset: 'node',
    serveStatic: false
}
```

If you have either of these set in your existing Nuxt/Nitro config, they will be overwritten.

Add the file `index.js` (or `index.ts`) to the root of your project, and add the following code:

```javascript header=false
// index.js
import "@ampt/nuxt/server";
```

This add the Nuxt server to your application's entrypoint.

Start the interactive shell and run `dev` to start your development server

```terminal title=Terminal, copy=false
> ampt
> dev
```

This will start the Nuxt dev server, and you can access your application at the outputted localhost url.

Run `build` in the interactive shell to create your build artifacts:

```terminal title=Terminal, copy=false
> build
```

This will run the `ampt:build` script so your application will be available from the sandbox URL.
