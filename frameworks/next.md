---
title: Next.js
description: Integrate with Next.js to build full stack applications.
---

Ampt allows developers to integrate with their existing [Next.js](https://nextjs.org/) applications.

!!! note
Ampt currently supports Next.js 12.x. Support for Next.js 13 is coming soon.
!!!


Install `@ampt/nextjs` in your project:

```bash
npm install @ampt/nextjs
```

or run this when you’re in the interactive shell:

```bash
install @ampt/nextjs
```

Add the `ampt:dev` and `ampt:build` scripts to configure how you start the development server inside interactive shell and how you build your application. You will need to update `package.json` file as follows:

- add `ampt:dev` script for running the Next.js dev server
- add `ampt:build` script for running next build and ampt-next-build
- set `main` to `index.js` which will be the entrypoint for the server

This is an example of what your `package.json` should look like::

```javascript
{
  "name": "my-nextjs-app",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "ampt:build": "next build && ampt-next-build",
    "ampt:dev": "next dev",
  },
  ...
}
```

Add the ampt integration to your `next.config.js` file:

```javascript
// next.config.js

import withAmpt from "@ampt/nextjs";

const config = withAmpt({
  reactStrictMode: true,
  swcMinify: true,
});

export default config;
```

Add the file `index.js` to the root of your project, and add the following code:

```javascript
// index.js

import "@ampt/nextjs/entrypoint";
```

This adds the Next.js server and image optimization to your application's entrypoint.

Start the interactive shell and run `dev` to start your development server

```bash
% ampt

> dev
```

This will output a localhost URL you can visit to see your application running.

Run `build` in the interactive shell to create your build artifacts:

```bash
> build
```

This will run the `ampt:build` script so your application will be available from the sandbox URL.
