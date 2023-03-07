---
title: Building Applications
menuText: Building Applications
description: Ampt provides an easy-to-use SDK's for building applications quickly and easily.
menuOrder: 3
has_children: true
has_toc: false
---

# Building Applications on Ampt

With Ampt, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern [JavaScript](/docs/get-started/supported-languages#javascript) and [TypeScript](/docs/get-started/supported_languages#typescript) right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom functions, connect to third-party APIs and services, and even use familiar backend frameworks like [Express.js and Koa](/docs/building-blocks/frameworks).

You can supercharge your applications by using our **Serverless Development Kits (SDK)**. Ampt provides multiple standalone packages that integrate seamlessly with the runtime, and don't require you to ever think about infrastructure. You can use as little or as many as you like. The SDKs are designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

## Serverless Development Kits (SDK)

The SDK is automatically available to your application and the interfaces can be selectively imported into your scripts like this:

```javascript
import { storage, params } from "@ampt/sdk";
import { api } from "@ampt/api";
import { data } from "@ampt/data";
```

The core SDK (`@ampt/sdk`) includes some basic primitives to help you get started:

- [Storage](/docs/building-blocks/storage)
- [Events](/docs/building-blocks/events)
- [Scheduled Tasks](/docs/building-blocks/scheduled-tasks)
- [HTTP](/docs/building-blocks/http)
- [Params](/docs/building-blocks/params)
- [Assets](/docs/building-blocks/static-assets)

For more advanced usage, you can install additional Ampt SDKs that can all be used together:

- [@ampt/api](/docs/building-blocks/api)
- [@ampt/data](/docs/building-blocks/data)

If you intend to use an existing web framework with Ampt, such as Express or Remix:

- [Using Express](/docs/building-blocks/frameworks/api-frameworks#express)
- [Using Remix](/docs/building-blocks/frameworks/remix)
- [Using React](/docs/building-blocks/frameworks/react)
- [Using Astro](/docs/building-blocks/frameworks/astro)

## Additional Concepts

- [Apps and Instances](/cloud/docs/apps/apps-instances)
- [Serving Static Assets](/cloud/docs/apps/static-assets)
- [Using TypeScript](/cloud/docs/apps/typescript)
