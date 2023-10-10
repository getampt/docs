---
title: NestJS
description: Integrate with NestJS to build server-side applications on Ampt.
---

Ampt allows developers to integrate with their existing [NestJS](https://docs.nestjs.com/) applications.

Install `@ampt/nestjs` in your project:

```terminal title=Terminal
> npm install @ampt/nestjs --save
```

or run this when you’re in the interactive shell:

```terminal title=Terminal
> install @ampt/nestjs
```

Add the `ampt:dev` and `ampt:build` scripts to configure how you start the development server inside the interactive shell and how you build your application. You will need to update your `package.json` file as follows:

- add `ampt:dev` script for running the NestJS dev server locally
- add `ampt:build` script for running nest build
- set `main` to be your Nest application entrypoint in the build output, by default it is `dist/main.js`.

This is an example of what your `package.json` should look like:

```json title=package.json, copy=false
{
  "name": "my-nestjs-app",
  "main": "dist/main.js",
  "type": "module",
  "scripts": {
    "ampt:build": "nest build",
    "ampt:dev": "nest dev",
  },
  ...
}
```

To get your Nest app running with Ampt, open your NestJS entrypoint (usually `src/main.ts`). Add the following code to the top of the file:

```javascript header=false
import { AppModule } from "./app.module"; // Default NestJS root, change if needed
import withAmpt from "@ampt/nestjs";

withAmpt(AppModule);
```

If your app needs any set up or side effects upon initialization, such as CORS, you can pass `NestApplicationOptions` to the `withAmpt` function, or use the provided setup function:

```javascript header=false
withAmpt(AppModule, { cors: true });
// or
withAmpt(AppModule, async (app) => {
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
});
// or
withAmpt(AppModule, { cors: true }, async (app) => {
  // any other setup can go here
});
```

The provided set up function will recieve an instance of your NestJS application, after its creation with `NestFactory.create`. You do _not_ need to call `app.listen` or `app.init` yourself, the adapter will do this for you.

Now, you are all set to run NestJS on Ampt!

To work on your app locally, run the following command:

```terminal title=Terminal
ampt dev
```

This will start the NestJS dev server locally, and you can access it at `http://localhost:3000` (or whatever port set via `process.env.PORT`).
To get your app running on your sandbox, you need to run the `build` step in the Ampt shell:

```terminal title=Terminal
> build
```

Once completed, the build output will be synced, and you'll be able to access your app via the Ampt sandbox URL.
