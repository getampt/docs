---
title: SvelteKit
description: Integrate with SvelteKit for a full-stack development experience.
---

You can integrate your Svelte application with Ampt and achieve a full stack development experience for your applications. Follow the below steps to integrate your Svelte application with Ampt.

Install the `@ampt/sveltekit` adapter:

```terminal title=Terminal
npm install @ampt/sveltekit --save
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/sveltekit
```

Create an `index.js` or `index.ts` file that imports the Ampt Svelte server wrapper:

```javascript header=false
import "@ampt/sveltekit/server";
```

Modify your `svelte.config.js` to use the Ampt adapter:

!!! note
For any static assets (such as images) you will need to add a folder to your project that is _not_ the `static` folder, as it gets overwritten with your app content on build. You can specify this folder in your Svelte config, as shown below. The default folder is `assets`. The contents of this folder will get copied to `static/` on build.
!!!

```javascript header=false
import { vitePreprocess } from "@js/kit/vite";
import adapter from "@ampt/kit";

/** @type {import('@js/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    files: {
      assets: "images",
    },
    adapter: adapter(),
  },
};

export default config;
```

You will need to add the dev and build scripts to configure how you start the development server inside interactive shell and how you package your application. You will need to update `package.json`:

- set `main` to `index.js` or `index.ts`
- add `ampt:build` script to run the build
- add `ampt:dev` script to run the dev server

```javascript title=package.json, copy=false
{
	"name": "my--app",
	"main": "index.ts",
	"scripts": {
		"ampt:dev": "vite dev",
		"ampt:build": "vite build",
    },
    ...
}
```
