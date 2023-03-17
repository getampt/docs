# Ampt Documentation

With Ampt, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern JavaScript and TypeScript right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom APIs, connect to third-party APIs and services, and even use familiar backend frameworks like [Express.js and Koa](/building-blocks/http-request-handling).

Ampt provides multiple standalone packages that integrate seamlessly with the runtime, and doesn't require you to ever think about infrastructure. You can use as little or as many as you like. The SDKs are designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

**NOTE:** Ampt is still in early private beta and not recommended for production usage.

## Getting Started

It's very straightforward to get started with Ampt and have an app up and running in less than a minute. Just make sure you navigate to an empty directory in your terminal and have npm installed. Then run the following command to install and start Ampt.

```bash
npm i -g @ampt/cli
ampt
```

You'll be prompted to create a new app or work on an existing app. Creating an new app will provide you with a set of templates for some inspiration. After selecting your template, Ampt spins up your sandbox in just a few seconds. All your logs will be streamed directly into the interactive shell and your changes will be instantly synced anddeployed to your developer sandbox. Happy coding!

You can manage your application parameters, view metrics, browse and update data, access blob storage, and much more using the Ampt Dashboard. During private beta, access to the Ampt dashboard is limited to only beta users.

## SDK and Built-in Solutions

The SDK is automatically available to your application and the interfaces can be selectively imported into your scripts like this:

```javascript
import { storage, params, events, schedule, http } from "@ampt/sdk";
import { api } from "@ampt/api";
import { data } from "@ampt/data";
```

The core SDK (`@ampt/sdk`) includes some basic interfaces to help you get started:

- [HTTP](/building-blocks/http-request-handling.md)
- [Storage](/building-blocks/storage.md)
- [Events](/building-blocks/events.md)
- [Scheduled Tasks](/building-blocks/scheduled-tasks.md)
- [Params](/building-blocks/params.md)

For more specific use cases, you can install additional Ampt solutions:

- [@ampt/api](/building-blocks/api.md)
- [@ampt/data](/building-blocks/data.md)

If you intend to use an existing framework with Ampt, such as Express or Remix, view the following guides below:

- [Using Express](/building-blocks/http-request-handling.md#expressjs)
- [Using Connect](/building-blocks/http-request-handling.md#connect)
- [Using Koa](/building-blocks/http-request-handling.md#koa)
- [Using Restana](/building-blocks/http-request-handling.md#restana)
- [Using Fastify](/building-blocks/http-request-handling.md#fastify)
- [Using Remix](/building-blocks/frameworks/remix.md)
- [Using Astro](/building-blocks/frameworks/astro.md)

## Ampt CLI

To manage Ampt applications from your terminal, you can use the Ampt CLI.

- [Ampt CLI Interactive Shell](/ampt-cli/interactive-shell.md)
- [Ampt CLI Standard Mode](/ampt-cli/standard-mode.md)
