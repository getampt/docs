---
title: HTTP Request Handling
description: Easy-to-use interface to handle incoming http requests without needing a web framework.
---

Ampt provides a fetch based HTTP request handler as part of `@ampt/sdk`.`http`  interface allows developers with various functions: 

- Integrating with existing Node-based web frameworks such as express, connect and more.
- Returning custom error pages for 4xx and 5xx responses.
- Serving any static assets without dealing with any API framework.

## Integrating with Node-based Web Frameworks

If you want to build with your favorite API framework or migrate an existing API to Ampt, we are providing dead simple way to integrate with well-known frameworks. Below find the examples for the modern web frameworks. 

**NOTE**: The default request timeout is 29 seconds for the web frameworks. 

### Express.js

```javascript
import { http } from '@ampt/sdk';

import express from 'express';
const expressApp = express();

expressApp.use('/express', (req, res) => {
  res.send('hello express')
});

http.useNodeHandler(expressApp);
```

### Connect

```javascript
import { http } from '@ampt/sdk';
import connect from 'connect';
const connectApp = connect();

connectApp.use('/connect', (req, res) => {
  res.end('hello connect')
})
http.useNodeHandler(connectApp);
```

### Koa

```javascript
import { http } from '@ampt/sdk';
import Koa from 'koa';
import KoaRouter from '@koa/router';

const koaRouter = new KoaRouter();
const koaApp = new Koa();
koaRouter.get('/koa', (ctx, _next) => {
  ctx.status = 200
  ctx.body = 'hello koa'
});

koaApp.use(koaRouter.routes()).use(koaRouter.allowedMethods());
http.useNodeHandler(connectApp);
```

### Restana

```javascript
import { http } from '@ampt/sdk';
import restana from 'restana';
const restanaApp = restana();

restanaApp.get('/restana', (req, res) => {
  res.send('hello restana')
});
http.useNodeHandler(restanaApp);
```

### Fastify

```javascript
import { http } from '@ampt/sdk';
import fastify from 'fastify';
const fastifyApp = fastify();

fastifyApp.get('/fastify', (req, res) => {
  res.send('hello fastify')
});
http.useNodeHandler(fastifyApp);
```

## Custom Error Responses

When a request is made for an HTTP path that is not handled, Ampt will return a default plain text 404 response. You can send a static HTML response using `http.on(404, <path>)`. For example, using a file named `404.html` in the root of your project:

```javascript
import { http } from "@ampt/sdk"

http.on(404, '404.html')
```

For a single-page application you would use  `static/index.html` so all paths will load your site’s index.html page.

```javascript
import { http } from "@ampt/sdk"

http.on(404, 'static/index.html')
```

To return a dynamic response, your application needs to handle the requested path and return the desired response. The details of how to do this depend on the framework you are using. For example, using express you can add a default handler:

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
{"message":"Internal Server Error"}
```

To return a custom error response, your application must catch any errors and send the desired response. How you do that depends on the framework you are using. Using express you could use an error handler:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
