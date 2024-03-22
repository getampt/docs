---
title: Migrating Nuxt Applications to Ampt
description: Use Ampt's powerful development workflows to deploy and manage your Nuxt applications on AWS.
---

Nuxt is an open source, full stack framework that allows you to build applications with file-based routing and server-side rendering. It's based on Vue.js and is highly extensible with its 200+ modules. This guide will walk you through migrating an existing Nuxt application using the Ampt adapter.

**Prerequisites**

- An existing Nuxt application (or [create a new one](https://nuxt.com/docs/getting-started/installation))
- Basic understanding of Node.js, full stack apps, Vue.js, and Nuxt
- An Ampt account ([sign up here](https://ampt.dev))
- The Ampt CLI installed (run `npm i @ampt/cli -g` in your terminal)

!!! note
Ensure all dependencies are compatible with Node.js 18+. See the available Ampt runtime versions [here](/docs/runtime/#runtime-version).
!!!

## Install the @ampt/nuxt adapter

Navigate to the project folder and add `@ampt/nuxt` to your project using npm. This dependency is used to make the application compatible with AWS.

```terminal
npm install @ampt/nuxt
```

## Change the entry point of the application

We need to change the entrypoint of the application to make it compatible with Ampt. Create an `index.ts` file in the root of your project:

```javascript title=index.ts
import "@ampt/nuxt/server";
```

Add/update the following line in your package.json:

```javascript title=package.json
{
  ...
  "main": "index.ts",
  ...
}
```

## Add Ampt to Nuxt configuration

Add the `@ampt/nuxt` adapter to your `nuxt.config.js` file as follows:

```javascript title=nuxt.config.js
import withAmpt from "@ampt/nuxt";

export default defineNuxtConfig(
  withAmpt({
    devtools: { enabled: true },
  })
);
```

## Add Scripts for Dev Mode and Build Step

Ampt allows you to run the Nuxt dev server within the "Ampt context", giving you local access to remote resources in your developer sandbox. To enable this, add a `ampt:dev` script in your `package.json` as follows:

```javascript title=package.json
"scripts": {
   …
   "ampt:dev": "nuxt dev"
 }
```

This will let you start the local Nuxt development server by running `dev` in the Ampt shell or with the `ampt dev` command when starting the shell.

You also need to define an `ampt:build` script to run the `nuxt build && ampt-nuxt-build` step. This script will be automatically run when you deploy the application to a permanent stage or to create a short-lived preview environment. It will also ensure access to remote resources during the build process.

```javascript title=package.json
"scripts": {
   …
   "ampt:build ": "nuxt build && ampt-nuxt-build"
 }
```

## Start building with Ampt

That's it! We have completed all the steps necessary to migrate an existing Nuxt application to Ampt. You can start working on this application by running `ampt` in your project folder.

This will prompt you for an app name, and then create a new application in your Ampt account. You'll be connected to your dedicated developer sandbox with a unique URL. You must run `build` in the Ampt Shell to build the application and make it available via your developer sandbox's URL.

To start the local Nuxt development server, run `dev` within the Ampt Shell (or `ampt dev`). The Nuxt dev server will start up and display a localhost URL. You can now iterate on your Nuxt app and test locally, including accessing resources like `params`, `events`, `data`, and more in your developer sandbox. Remember to run `build` any time you want to update the Nuxt build and view it on the remote URL.

Note that the URL for your developer sandbox goes offline when you're not connected via the CLI. You need to deploy your application to a permanent stage to share your app with the world. Simply run `deploy prod` to deploy your application to a stage named `prod`. This command will automatically provision an isolated Ampt Environment on AWS and then build and deploy your Nuxt application.

!!! note
AWS accounts are owned and automatically managed for you by Ampt. You **DO NOT** need to set up your own cloud accounts. If you're interested in deploying to your own AWS accounts, please contact us via [support@getampt.com](mailto:support@getampt.com).
!!!

## Next Steps

Congratulations! You can now use Ampt to leverage the full power of AWS and host your Nuxt application without complex configurations or managing infrastructure. Be sure to check out our [docs](/docs) to learn more about what's possible with Ampt. And be sure to [join our discord](/discord) to connect with other Ampt users.
