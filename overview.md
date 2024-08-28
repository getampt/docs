---
title: How Ampt Works
description: Ampt lets developers rapidly build native cloud apps without complicated configs or struggling with infrastructure.
---

Ampt is a developer tool, account orchestrator, deployment engine, and cloud management utility all rolled into one.

<div class="relative" style="padding-top: 56.25%">
  <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/OEgTGqZ1a70" title="Ampt: Revolutionize Your Cloud Development Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

With Ampt, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern JavaScript and TypeScript right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom APIs, and connect to third-party APIs and services. You can also use familiar backend frameworks like [Express.js](/docs/frameworks/node-based/#express.js) and [Koa](/docs/frameworks/node-based#koa), fetch-based API frameworks like [Hono](/docs/frameworks/fetch-based/#hono) and [ElysiaJS](/docs/frameworks/fetch-based/#elysiajs), or fullstack frameworks like [Next.js](/docs/frameworks/next/), [Astro](/docs/frameworks/astro/), and [Remix](/docs/frameworks/remix/).

Ampt provides multiple standalone modules that integrate seamlessly with the runtime, without ever needing to think about infrastructure. You can use as little or as many as you like. The SDKs are designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

## Core Interfaces and Modules

The `@ampt/sdk` provides access to the core interfaces. These can be selectively imported into your scripts like this:

```javascript header=false
import { storage, params, events, schedule } from "@ampt/sdk";
```

The SDK (`@ampt/sdk`) includes:

- [HTTP](/docs/http/)
- [Storage](/docs/storage/)
- [Events](/docs/events/)
- [Tasks](/docs/tasks/)
- [Parameters](/docs/parameters)
- [WebSockets](/docs/websockets)

For more specific use cases, you can install additional modules:

- [@ampt/data](/docs/data/)
- [@ampt/ai](/docs/ai/)
- [@ampt/sql](/docs/sql/) (BETA)
- [@ampt/api](/docs/api/)

If you intend to use an existing framework with Ampt, such as Express or Remix, view the following guides below:

- [Express](/docs/frameworks/node-based/#express.js)
- [Hono](/docs/frameworks/fetch-based/#hono)
- [Connect](/docs/frameworks/node-based/#connect)
- [Koa](/docs/frameworks/node-based/#koa)
- [Restana](/docs/frameworks/node-based/#restana)
- [Fastify](/docs/frameworks/node-based/#fastify)
- [Remix](/docs/frameworks/remix/)
- [Astro](/docs/frameworks/astro/)
- [Next.js](/docs/frameworks/next/)
- [Nuxt.js](/docs/frameworks/nuxt/)
- [SvelteKit](/docs/frameworks/sveltekit/)
- [Eleventy](/docs/frameworks/eleventy/)
- [Angular](/docs/frameworks/angular/)
- [ElysiaJS](/docs/frameworks/fetch-based/#elysiajs)
- [itty-router](/docs/frameworks/fetch-based/#itty-router)

## Ampt CLI

Building applications with Ampt requires installing and using the Ampt CLI in your terminal.

- [Ampt CLI Interactive Shell](/docs/cli-interactive-shell)
- [Ampt CLI Standard Mode](/docs/cli-standard-mode)
