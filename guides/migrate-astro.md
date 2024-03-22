---
title: Migrating Astro Applications to Ampt
description: Use Ampt's powerful development workflows to deploy and manage your Astro apps on AWS.
---

Astro is a web framework designed for content-driven websites that enables Server-Side Rendering (SSR) capabilities for serving dynamic HTML and types of content. It is UI library agnostic (works with React, Vue, SvelteKit, and more) and is highly extensible with a rich integration ecosystem featuring MDX, Tailwind, and of course, Ampt. This guide will walk you through migrating an existing Astro application using the Ampt integration.

**Prerequisites**

- An existing Astro application (or [create a new one](https://docs.astro.build/en/install/auto/) with the Astro CLI)
- Basic understanding of Node.js and full stack apps
- An Ampt account ([sign up here](https://ampt.dev))
- The Ampt CLI installed (run `npm i @ampt/cli -g` in your terminal)

!!! note
For Astro 4.0, please ensure that all project dependencies are compatible with Node 20+. You may need to upgrade your Astro v3 app first before starting the migration. Check the migration guide [here](https://docs.astro.build/en/guides/upgrade-to/v4/).
!!!

## Install the @ampt/astro Package

Navigate to the project folder and add `@ampt/astro` to your project using npm. This dependency will be used to build the application compatible with AWS.

```terminal
npm install @ampt/astro
```

## Change the entry point of the application

We need to change the entrypoint of the application to make it compatible with Ampt. Add the following line to the package.json

```javascript title=package.json
{
  ...
  "main": "entry/dist",
  ...
}
```

## Add Necessary Configuration to Build

Add the `@ampt/astro` integration to your `astro.config.mjs` file as follows:

```javascript title=astro.config.mjs
import { defineConfig } from "astro/config";
import ampt from "@ampt/astro";

export default defineConfig({
  output: "hybrid", // or "server" or "static"
  integrations: [ampt() /* other integrations */],
});
```

## Add Scripts for Dev Mode and Build Step

Ampt allows you to run the Astro dev server within the "Ampt context", giving you local access to remote resources in your developer sandbox. To enable this, add a `ampt:dev` script in your `package.json` as follows:

```javascript title=package.json
"scripts": {
   …
   "ampt:dev": "astro dev"
 }
```

This will let you start the local Astro development server by running `dev` in the Ampt shell or with the `ampt dev` command when starting the shell.

You also need to define an `ampt:build` script to run the `astro build` step. This script will be automatically run when you deploy the application to a permanent stage or to create a short-lived preview environment. It will also ensure access to remote resources during the build process.

```javascript title=package.json
"scripts": {
   …
   "ampt:build ": "astro check && astro build"
 }
```

## Start building with Ampt

That's it! We have completed all the steps necessary to migrate an existing Astro application to Ampt. You can start working on this application by running `ampt` in your project folder.

This will prompt you for a app name, and then create a new application in your Ampt account. You'll be connected to your dedicated developer sandbox with a unique URL. You must run `build` in the Ampt Shell to build the application and make it available via your developer sandbox's URL.

To start the local Astro development server, run `dev` within the Ampt Shell (or `ampt dev`). The Astro dev server will start up and display a localhost URL. You can now iterate on your Astro app and test locally, including accessing resources like `params`, `events`, `data`, and more in your developer sandbox. Remember to run `build` any time you want to update the Astro build and view it on the remote URL.

Note that the URL for your developer sandbox goes offline when you’re not connected via the CLI. You need to deploy your application to a permanent stage to share your app with the world. Simply run `deploy prod` to deploy your application to a stage named `prod`. This command will automatically provision an isolated Ampt Environment on AWS and then build and deploy your Astro application.

!!! note
AWS accounts are owned and automatically managed for you by Ampt. You **DO NOT** need to set up your own cloud accounts. If you're interested in deploying to your own AWS accounts, please contact us via [support@getampt.com](mailto:support@getampt.com).
!!!

## Next Steps

Congratulations! You can now use Ampt to leverage the full power of AWS and host your Astro application without complex configurations or managing infrastructure. Be sure to check out our [docs](/docs) to learn more about what's possible with Ampt. And be sure to [join our discord](/discord) to connect with other Ampt users.
