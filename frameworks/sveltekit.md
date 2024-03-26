---
title: SvelteKit
description: Integrate with SvelteKit for a full-stack development experience.
---

You can integrate your SvelteKit application with Ampt and achieve a full stack development experience for your applications. Follow the below steps to integrate your SvelteKit application with Ampt.

Install the `@ampt/sveltekit` adapter:

```terminal title=Terminal
npm install @ampt/sveltekit
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/sveltekit
```

Create an `index.js` or `index.ts` file that imports the Ampt SvelteKit server wrapper:

```javascript header=false
import "@ampt/sveltekit/server";
```

Modify your `svelte.config.js` to use the Ampt adapter:

```javascript header=false
import adapter from "@ampt/sveltekit"
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
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
