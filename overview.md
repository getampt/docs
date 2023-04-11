---
title: How Ampt Works
description: Ampt lets developers rapidly build native cloud apps without complicated configs or struggling with infrastructure.
---

Ampt is a developer tool, account orchestrator, deployment engine, and cloud management utility all rolled into one.

With Ampt, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern JavaScript and TypeScript right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom APIs, connect to third-party APIs and services, use familiar backend frameworks like [Express.js](/docs/http/#express.js) and [Koa](/docs/http/#koa), or even fullstack frameworks like [Astro](/docs/frameworks/astro/), [Remix](/docs/frameworks/remix/), and [Next.js](/docs/frameworks/next/).

Ampt provides multiple standalone modules that integrate seamlessly with the runtime, and doesn't require you to ever think about infrastructure. You can use as little or as many as you like. The SDKs are designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

!!! caution
Ampt is in early **PRIVATE BETA** and **NOT RECOMMENDED** for production use.
!!!

## Core Interfaces and Modules

The `@ampt/sdk` provides access to the core interfaces. These can be selectively imported into your scripts like this:

```javascript header=false
import { storage, params, events, schedule } from "@ampt/sdk";
```

The SDK (`@ampt/sdk`) includes:

- [HTTP](/docs/http/)
- [Storage](/docs/storage/)
- [Events](/docs/events/)
- [Scheduled Tasks](/docs/scheduled-tasks/)
- [Parameters](/docs/parameters)
- [WebSockets](/docs/websockets)

For more specific use cases, you can install additional modules:

- [@ampt/api](/docs/api/)
- [@ampt/data](/docs/data/)

If you intend to use an existing framework with Ampt, such as Express or Remix, view the following guides below:

- [Using Express](/docs/http/#expressjs)
- [Using Connect](/docs/http/#connect)
- [Using Koa](/docs/http/#koa)
- [Using Restana](/docs/http/#restana)
- [Using Fastify](/docs/http/#fastify)
- [Using Remix](/docs/frameworks/remix/)
- [Using Astro](/docs/frameworks/astro/)
- [Using Next.js](/docs/frameworks/next/)

## Ampt CLI

To manage Ampt applications from your terminal, you can use the Ampt CLI.

- [Ampt CLI Interactive Shell](/docs/cli-interactive-shell)
- [Ampt CLI Standard Mode](/docs/cli-standard-mode)
