---
title: Next.js
description: Integrate with Next.js to build full stack applications.
---

Ampt allows developers to build applications using the [Next.js](https://nextjs.org/) framework.

We strive to support all the latest Next.js features, but if you find something missing, please [let us know](https://getampt.com/contact).

!!! note
This documentation applies to Next.js version 13.4.13 and up. For older versions, please see the [legacy documentation](/docs/frameworks/next-legacy).

Next.js requires the latest version of the Ampt runtime. To use Next.js, you will need to set `ampt.runtime` to `nodejs18` in your `package.json` file.
!!!

If you don't already have a Next.js project, see the [Next.js docs](https://nextjs.org/docs) to get started.

Once you have your project set up, install `@ampt/nextjs` in your project:

```terminal title=Terminal
> npm install @ampt/nextjs --save
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/nextjs
```

Add the `ampt:dev` and `ampt:build` scripts to configure how you start the development server inside interactive shell and how you build your application. You will need to update `package.json` file as follows:

- set `main` to `index.js` which will be the entrypoint for the server
- add `ampt:dev` script for running the Next.js dev server
- add `ampt:build` script for running `ampt-next build`
- set `ampt.runtime` to `nodejs18` to use the latest Node.js runtime

This is an example of what your `package.json` should look like::

```json title=package.json, copy=false
{
  "name": "my-nextjs-app",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "build": "next build",
    "ampt:build": "ampt-next build",
    "ampt:dev": "next dev",
  },
  "ampt": {
    "runtime": "nodejs18"
  }
  ...
}
```

Add the file `index.js` to the root of your project, and add the following code:

```javascript header=false
// index.js

import "@ampt/nextjs/entrypoint";
```

This adds the Next.js server and image optimization to your application's entrypoint.

Start the interactive shell and run `dev` to start your development server

```terminal title=Terminal, copy=false
> ampt
> dev
```

This will output a localhost URL you can visit to see your application running.

Run `build` in the interactive shell to create your build artifacts:

```terminal title=Terminal, copy=false
> build
```

This will run the `ampt:build` script so your application will be available from the sandbox URL.

Use the `ampt deploy` command when you are ready to deploy a stage environment.
