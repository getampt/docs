---
title: Migrating Remix Applications to Ampt
description: Use Ampt's powerful development workflows to deploy and manage your Remix applications on AWS.
---

[Remix](https://remix.run/), defined by the maintainers as a "centerstack", is a React framework that combines a Vite compiler with server-side-rendering capabilities. It's mainly used as an alternative to Next.js for building full stack web applications based on React. This guide will walk you through migrating an existing Remix application using the Ampt integration.

**Prerequisites**

- An existing Remix application (or [create a new one](https://remix.run/docs/en/main/start/quickstart))
- Basic understanding of Node.js, full stack apps, React, and Remix
- An Ampt account ([sign up here](https://ampt.dev))
- The Ampt CLI installed (run `npm i @ampt/cli -g` in your terminal)

!!! note
Ensure all dependencies are compatible with Node.js 18+. See the available Ampt runtime versions [here](/docs/runtime/#runtime-version).
!!!

## Install the @ampt/remix adapter

Navigate to the project folder and add `@ampt/remix` to your project using npm. This dependency is used to make the application compatible with AWS.

```terminal
npm install @ampt/remix
```

## Change the entry point of the application

We need to change the entrypoint of the application to make it compatible with Ampt. Create an `index.mjs` file in the root of your project:

```javascript title=index.mjs
import "@ampt/remix";
```

Add/update the following line in your package.json:

```javascript title=package.json
{
  ...
  "main": "index.mjs",
  ...
}
```

## Update the Vite configuration

Add the following settings to your `vite.config.ts` file to ensure Ampt compatibility:

```javascript title=vite.config.ts
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "static",
  serverBuildPath: "build/index.js",
  publicPath: "/",
  serverModuleFormat: "cjs",
};
```

## Add Scripts for Dev Mode and Build Step

Ampt allows you to run the Remix dev server within the "Ampt context", giving you local access to remote resources in your developer sandbox. To enable this, add a `ampt:dev` script in your `package.json` as follows:

```javascript title=package.json
"scripts": {
   …
   "ampt:dev": "remix dev"
 }
```

This will let you start the local Remix development server by running `dev` in the Ampt shell or with the `ampt dev` command when starting the shell.

You also need to define an `ampt:build` script to run the `remix build` step. This script will be automatically run when you deploy the application to a permanent stage or to create a short-lived preview environment. It will also ensure access to remote resources during the build process.

```javascript title=package.json
"scripts": {
   …
   "ampt:build ": "remix build"
 }
```

## Start building with Ampt

That's it! We have completed all the steps necessary to migrate an existing Remix application to Ampt. You can start working on this application by running `ampt` in your project folder.

This will prompt you for an app name, and then create a new application in your Ampt account. You'll be connected to your dedicated developer sandbox with a unique URL. You must run `build` in the Ampt Shell to build the application and make it available via your developer sandbox's URL.

To start the local Remix development server, run `dev` within the Ampt Shell (or `ampt dev`). The Remix dev server will start up and display a localhost URL. You can now iterate on your Remix app and test locally, including accessing resources like `params`, `events`, `data`, and more in your developer sandbox. Remember to run `build` any time you want to update the Remix build and view it on the remote URL.

Note that the URL for your developer sandbox goes offline when you're not connected via the CLI. You need to deploy your application to a permanent stage to share your app with the world. Simply run `deploy prod` to deploy your application to a stage named `prod`. This command will automatically provision an isolated Ampt Environment on AWS and then build and deploy your Remix application.

!!! note
AWS accounts are owned and automatically managed for you by Ampt. You **DO NOT** need to set up your own cloud accounts. If you're interested in deploying to your own AWS accounts, please contact us via [support@getampt.com](mailto:support@getampt.com).
!!!

## Next Steps

Congratulations! You can now use Ampt to leverage the full power of AWS and host your Remix application without complex configurations or managing infrastructure. Be sure to check out our [docs](/docs) to learn more about what's possible with Ampt. And be sure to [join our discord](/discord) to connect with other Ampt users.
