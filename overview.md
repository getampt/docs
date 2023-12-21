---
title: How Ampt Works
description: Ampt lets developers rapidly build native cloud apps without complicated configs or struggling with infrastructure.
---

Ampt is a developer tool, account orchestrator, deployment engine, and cloud management utility all rolled into one.

<div class="relative" style="padding-top: 56.25%">
  <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/OEgTGqZ1a70" title="Ampt: Revolutionize Your Cloud Development Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

With Ampt, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern JavaScript and TypeScript right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom APIs, connect to third-party APIs and services, use familiar backend frameworks like [Express.js](/docs/http/#express.js) and [Koa](/docs/http/#koa), or fullstack frameworks like [Astro](/docs/frameworks/astro/), [Remix](/docs/frameworks/remix/), and [Next.js](/docs/frameworks/next/).

Ampt provides multiple standalone modules that integrate seamlessly with the runtime, and doesn't require you to ever think about infrastructure. You can use as little or as many as you like. The SDKs are designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

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
- [@ampt/ai](/docs/ai/) (BETA)
- [@ampt/sql](/docs/sql/) (BETA)
- [@ampt/api](/docs/api/) (BETA)

If you intend to use an existing framework with Ampt, such as Express or Remix, view the following guides below:

- [Express](/docs/http/#expressjs)
- [Connect](/docs/http/#connect)
- [Koa](/docs/http/#koa)
- [Restana](/docs/http/#restana)
- [Fastify](/docs/http/#fastify)
- [Remix](/docs/frameworks/remix/)
- [Astro](/docs/frameworks/astro/)
- [Next.js](/docs/frameworks/next/)
- [Nuxt.js](/docs/frameworks/nuxt/)
- [SvelteKit](/docs/frameworks/sveltekit/)
- [Angular](/docs/frameworks/angular/)

## Ampt CLI

To manage Ampt applications from your terminal, you can use the Ampt CLI.

- [Ampt CLI Interactive Shell](/docs/cli-interactive-shell)
- [Ampt CLI Standard Mode](/docs/cli-standard-mode)
