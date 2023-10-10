---
title: Angular
description: Integrate with Angular
---

Ampt allows developers to integrate with their existing Angular applications.

First, you will need to modify your package.json `build` and `dev` commands to be used within the Ampt shell by setting an `ampt:` prefix:

```json title=package.json, copy=false
{
  "name": "my-angular-app",
  "scripts": {
    "ampt:build": "ng build",
    "ampt:dev": "ng serve",
    ...
  },
  ...
}
```

This allows you to run `dev` and `build` within the Ampt shell, along with specifying the build step when deployed with `ampt deploy`.

Next, modify the build output directory to be `static` in your `angular.json` file. This allows Ampt to properly serve your Angular app from the root of your public `*.ampt.app` URL.

```json title=angular.json, copy=false
{
  "projects": {
    "my-angular-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "static",
            ...
          }
        },
        ...
      }
    }
  }
}
```

Now, start the interactive shell and run `build` to create your artifacts:

```terminal title=Terminal, copy=false
> ampt
> build
```

After the sync is complete, navigate to your personal sandbox url to see your Angular app running on Ampt.

To run the the app locally, run `dev` in the Ampt shell.

```terminal title=Terminal, copy=false
> ampt
> dev
```

Since Angular generates a Single Page Application (SPA), be sure to follow the instructions in the [SPAs](spas.md) section regarding ignoring buildtime only files and managing SPA dependencies.
