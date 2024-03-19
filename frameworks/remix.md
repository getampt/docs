---
title: Remix
description: Integrate with Remix for a full-stack development experience.
---

You can integrate your Remix application with Ampt and achieve a full stack development experience for your applications. Follow the below steps to integrate your Remix application with Ampt.

Install the `@ampt/remix` adapter:

```terminal title=Terminal
> npm install @ampt/remix --save
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/remix
```

Configure Remix to write assets to the `static` folder, and the server script to `build/index.js`

```javascript header=false
// remix.config.js

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "static",
  serverBuildPath: "build/index.js",
  publicPath: "/",
};
```

Create `server.mjs` that will be used as the new entry point for your application:

```javascript header=false
// server.mjs

import "@ampt/remix";
```

You will need to add the dev and build scripts to configure how you start the development server inside interactive shell and how you package your application. You will need to update `package.json`:

- set `main` to `server.mjs`
- add `ampt:build` script to run the build
- add `ampt:dev` script to run the dev server

```javascript title=package.json, copy=false
{
  "name": "my-remix-app",
  "main": "server.mjs",
  "scripts": {
    "ampt:build": "remix build",
    "ampt:dev": "remix dev",
  },
  ...
}
```
