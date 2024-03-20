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

!!! note
Astro version 4.0 requires the Node.js 20 runtime and builder. New apps default to Node.js 20, but if you're upgrading an existing app, you'll need to specify "nodejs20" as the `runtime` and `buildRuntime` in your package.json.
!!!

```json title=package.json, copy=false
{
  "name": "my-astro-app",
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

!!! caution
When using Astro's "server" output mode, `@ampt/astro` will _automatically_ set the "main" field of your "package.json" to `dist/entry.js`. This is required for Ampt to run your Astro application in SSR mode.
!!!

If you want to use Astro's "static" or "hybrid" modes, you can use the following configuration:

````javascript header=false
// astro.config.mjs

import { defineConfig } from "astro/config";
import { params } from '@ampt/sdk'
import ampt from "@ampt/astro";

// If you are using a custom domain, you can override the site parameter based on the Ampt environment's name
const url = params('ENV_NAME') === 'prod' ? 'https://your-custom-domain.com' : params('AMPT_URL')

// https://astro.build/config
export default defineConfig({
  output: "static", // or "hybrid"
  site: url,
  integrations: [ampt() /* other integrations */],
});

!!! caution
Astro requires a `site` parameter to be set in the `astro.config.mjs` file when using "static" or "hybrid" output modes. You can use the `params` library from the `@ampt/sdk` to get the `AMPT_URL` parameter from the environment, which will always be set by Ampt. However, if you are using a custom domain, be sure to override this value with it in the relevent environments.
!!!

If using "static" or "hybrid" output modes, be sure to remove any entrypoints you may have defined in "package.json" for the "main" field. This is not required for these output modes, as the `index.html` file will be the entrypoint for your application.

Start the interactive shell and run `build` to create your artifacts:

```terminal title=Terminal, copy=false
> ampt
> build
````

Start the interactive shell and run `dev` to start your development server

```terminal title=Terminal, copy=false
> ampt
> dev
```
