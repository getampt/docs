---
title: Node-based Web Frameworks
description: Build apps on Ampt using your favorite web frameworks with zero boilerplate.
---

The [`http`](/docs/http) interface from the `@ampt/sdk` provides a `node` interface (v0.0.1-beta.43>) method that lets you integrate your favorite Node-based web frameworks into an Ampt app. The `http.node.use` method wraps the instance of your framework and exposes any defined routes on the root of your public `*.ampt.app` URL.

Ampt runs your web frameworks automatically, so you **DO NOT** need to use `.listen` or `.createServer`.

Below are some examples for the most popular web frameworks.

!!! note
The default request timeout for web frameworks is 29 seconds.
!!!

## Express.js

```javascript
import { http } from "@ampt/sdk";

import express from "express";
const expressApp = express();

expressApp.use("/express", (req, res) => {
  res.send("hello express");
});

http.useNodeHandler(expressApp);
// in v0.0.1-beta.43
http.node.use("/api", expressApp);
```

## Connect

```javascript
import { http } from "@ampt/sdk";
import connect from "connect";
const connectApp = connect();

connectApp.use("/connect", (req, res) => {
  res.end("hello connect");
});
http.useNodeHandler(connectApp);
```

## Koa

```javascript
import { http } from "@ampt/sdk";
import Koa from "koa";
import KoaRouter from "@koa/router";

const koaRouter = new KoaRouter();
const koaApp = new Koa();
koaRouter.get("/koa", (ctx, _next) => {
  ctx.status = 200;
  ctx.body = "hello koa";
});

koaApp.use(koaRouter.routes()).use(koaRouter.allowedMethods());
http.useNodeHandler(koaApp);
// in v0.0.1-beta.43
http.node.use("/api", koaApp);
```

## Restana

```javascript
import { http } from "@ampt/sdk";
import restana from "restana";
const restanaApp = restana();

restanaApp.get("/restana", (req, res) => {
  res.send("hello restana");
});
http.useNodeHandler(restanaApp);
// in v0.0.1-beta.43
http.node.use("/api", restanaApp);
```

## Fastify

```javascript
import { http } from "@ampt/sdk";
import fastify from "fastify";
const fastifyApp = fastify();

fastifyApp.get("/fastify", (req, res) => {
  res.send("hello fastify");
});
http.useNodeHandler(fastifyApp);
// in v0.0.1-beta.43
http.node.use("/api", fastifyApp);
```
