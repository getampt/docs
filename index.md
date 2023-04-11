---
title: Get started with Ampt
description: Ampt lets developers use their local IDE to write apps using their favorite JavaScript frameworks and packages, then automatically provisions, manages, and optimizes cloud infrastructure by inferring requirements from the code.
---

## Installation

1. Ampt requires the installation of the Ampt CLI tool. Navigate to an empty directory in your terminal and make sure you have npm installed. Then run the following command to install and start Ampt.

```terminal title=Terminal
> npm i -g @ampt/cli
> ampt
```

2. You will be prompted to login to your Ampt account. The CLI will attempt to open a browser window to the Ampt dashboard. If your browser window doesn't open automatically, copy and paste the link provided in the CLI. Sign in or create an Ampt account.
3. Once signed in, confirm the code in the CLI matches the code in the browser.
4. Select "Create new app" from the menu, and a select a template.
5. Ampt will spin up your sandbox in just a few seconds. All your logs will be streamed directly into the interactive shell and your changes will be instantly synced and deployed to your developer sandbox every time you save your work.
6. Happy coding!

You can manage your application parameters, view metrics, browse and update data, access blob storage, and much more using the [Ampt Dashboard](https://ampt.dev). During private beta, access to the Ampt dashboard is limited to only beta users.
