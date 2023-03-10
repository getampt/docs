
# Ampt: Developer Platform that gets out of your way

With Ampt, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern JavaScript and TypeScript right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom APIs, connect to third-party APIs and services, and even use familiar backend frameworks like [Express.js and Koa](/docs/building-blocks/http-request-handling#integrating-with-node-based-web-frameworks).

Ampt provides multiple standalone packages that integrate seamlessly with the runtime, and don't require you to ever think about infrastructure. You can use as little or as many as you like. The SDKs are designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

{%note%}

**Note:** Ampt is still in early private beta and not recommended for production usage. 

{%endnote%}

## Getting Started 

It's very straightforward to get started with Ampt and have a running app in a minute. Just make sure you are navigated into an empty folder in your Terminal and you have npm installed. All you need to do is to run the following command to start Ampt.

```bash
npm i -g @ampt/cli
ampt
```

You'll prompted to create a new app or work on an existing app. Creating an existing app will provide you some set of templates for some inspiration. After selecting your template, Ampt spins up your sandbox in less than 30 seconds. All your logs will be streamed into interactive shell, all your changes will be synced to your sandbox almost immediately. Happy coding! 

You can manage your application params, view metrics, browse and maintain data and binary storage of your application using Ampt Dashboard. During private beta, access to Ampt dashboard is limited to only beta users. 

## SDK and Built-in Solutions

The SDK is automatically available to your application and the interfaces can be selectively imported into your scripts like this:

```javascript
import { storage, params, events, schedule, http } from "@ampt/sdk";
import { api } from "@ampt/api";
import { data } from "@ampt/data";
```

The core SDK (`@ampt/sdk`) includes some basic primitives to help you get started:

- [HTTP](/building-blocks/http-request-handling.md) 
- [Storage](/building-blocks/storage.md)
- [Events](/building-blocks/events.md)
- [Scheduled Tasks](/building-blocks/scheduled-tasks.md)
- [Params](/building-blocks/params.md)

For more advanced usage, you can install additional Ampt solutions that can all be used together:

- [@ampt/api](/building-blocks/api.md)
- [@ampt/data](/building-blocks/data.md)

If you intend to use an existing web framework with Ampt, such as Express or Remix:

- [Using Express](/building-blocks/http-request-handling.md#expressjs)
- [Using Connect](/building-blocks/http-request-handling.md#connect)
- [Using Koa](/building-blocks/http-request-handling.md#koa)
- [Using Restana](/building-blocks/http-request-handling.md#restana)
- [Using Fastify](/building-blocks/http-request-handling.md#fastify)
- [Using Remix](/building-blocks/frameworks/remix)
- [Using Astro](/building-blocks/frameworks/astro)

## Ampt CLI 

To manage Ampt applications from your terminal, you can use the Ampt CLI. 

- [Ampt CLI Interactive Shell](/ampt-cli/interactive-shell.md)
- [Ampt CLI Standard Mode](/ampt-cli/standard-mode.md)
