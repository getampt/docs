---
title: Fetch-based API Frameworks
description: Build apps on Ampt with frameworks that follow web standards and use the fetch API.
---

Ampt's standards-compliant runtime lets app developers take advantage of the speed, small size, and portability of web-standard frameworks like [Hono](https://hono.dev/), [ElysiaJS](https://elysiajs.com/), and [Itty Router](https://itty.dev/itty-router).

!!! note
The default request timeout for web frameworks is 29 seconds.
!!!

## Hono

Hono is a fast yet fully featured web framework with the familiar style of returning a Response from your handlers. Your handlers receive a "Context" object that provides some helpers for building responses. It also supports middleware and includes a few out of the box for authentication, caching, CORS and so on. Hono supports JSX for returning server-rendered HTML, which is fully supported by Ampt.

Setting up Hono with Ampt is easy thanks to its `app.fire()` method, which calls "addEventListener()" under the hood, so using Hono with Ampt is as simple as:

```typescript
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.fire();
```

## Itty Router

Itty Router bills itself as being the smallest "feature-rich" router out there, and at 450 bytes it's kinda hard to argue with that. It has a clean and simple approach that defers creating the response until after all the middleware and handlers have run, which makes your code very concise.

Setting it up with Ampt is easy. The Router object has a `handle` method that you can use to handle the fetch event:

```typescript
import { error, text, Router } from "itty-router";

const router = Router();

router.get("/hello", () => "Hello world");

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(router.handle(event.request).then(text).catch(error));
});
```

## ElysiaJS

ElysiaJS is another fast web-standard framework that is targeted at Bun users, but also works on any standard-compliant runtime. It has support for end-to-end type safety so you can write type-safe client-side code with auto-complete. It also has a long list of plugins for many common use cases including authorization, GraphQL, and tRPC.

To set it up with Ampt, you can use ElysiaJS's `fetch` method:

```typescript
import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia");

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.fetch(event.request));
});
```
