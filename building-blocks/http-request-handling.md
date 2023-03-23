---
title: HTTP Request Handling
description: Easy-to-use interface to handle incoming http requests.
---

Ampt provides a fetch based HTTP request handler as part of the `@ampt/sdk`. The `http` interface provides developers with various functions:

- Integrate with existing Node-based web frameworks such as Express, Connect and more.
- Return custom error pages for 4xx and 5xx responses.
- Serve any static assets without needing an API framework.

## Integrating with Node-based Web Frameworks

If you want to build using your favorite web framework or migrate an existing app to Ampt, we provide a simple way to integrate them. Below are some examples for the most popular web frameworks.

!!! note
The default request timeout is 29 seconds for web frameworks.
!!!

### Express.js

```javascript
import { http } from "@ampt/sdk";

import express from "express";
const expressApp = express();

expressApp.use("/express", (req, res) => {
  res.send("hello express");
});

http.useNodeHandler(expressApp);
```

### Connect

```javascript
import { http } from "@ampt/sdk";
import connect from "connect";
const connectApp = connect();

connectApp.use("/connect", (req, res) => {
  res.end("hello connect");
});
http.useNodeHandler(connectApp);
```

### Koa

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
http.useNodeHandler(connectApp);
```

### Restana

```javascript
import { http } from "@ampt/sdk";
import restana from "restana";
const restanaApp = restana();

restanaApp.get("/restana", (req, res) => {
  res.send("hello restana");
});
http.useNodeHandler(restanaApp);
```

### Fastify

```javascript
import { http } from "@ampt/sdk";
import fastify from "fastify";
const fastifyApp = fastify();

fastifyApp.get("/fastify", (req, res) => {
  res.send("hello fastify");
});
http.useNodeHandler(fastifyApp);
```

## Custom Error Responses

When a request is made to an HTTP path that is not handled, Ampt will return a default plain text 404 response. You can send a static HTML response using `http.on(404, <path>)`. For example, using a file named `404.html` in the root of your project:

```javascript
import { http } from "@ampt/sdk";

http.on(404, "404.html");
```

For a single-page application you would use `static/index.html` so all paths will load your site's index.html page.

```javascript
import { http } from "@ampt/sdk";

http.on(404, "static/index.html");
```

To return a dynamic response, your application needs to handle the requested path and return the desired response. The details of how to do this depend on the framework you are using. For example, using Express you can add a default handler:

```javascript
import { http } from "@ampt/sdk"
import express from "express"

const app = express()

app.use('/api', ...)

app.use((req, res) => {
  res.status(404).send('Sorry that page was not found')
})
```

When your application throws an exception, by default Ampt will return a JSON response:

```json
{ "message": "Internal Server Error" }
```

To return a custom error response, your application must catch any errors and send the desired response. How you do that depends on the framework you are using. Using Express you could use an error handler:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```
