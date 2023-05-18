---
title: HTTP Request Handling
description: Easy-to-use interface to handle incoming http requests.
---

Ampt provides a fetch based HTTP request handler as part of the `@ampt/sdk`. The `http` interface provides developers with various functions including:

- Integrating with existing Node-based web frameworks such as Express, Connect, etc.
- Returning custom error pages for 4xx and 5xx responses.
- Serving static assets without needing an API framework.

## Integrating with Node-based Web Frameworks

The [`http`](/docs/http) interface from the `@ampt/sdk` provides a `useNodeHandler` method that lets you integrate your favorite Node-based web frameworks into an Ampt app. The `http.useNodeHandler` method wraps the instance of your framework and exposes any defined routes on the root of your public `*.ampt.app` URL.

Ampt runs your web frameworks automatically, so you **DO NOT** need to use `.listen` or `.createServer`. Here is an example of an Express.js app:

```javascript title=Express.js example, copy=false
import { http } from "@ampt/sdk";

import express from "express";
const expressApp = express();

expressApp.use("/express", (req, res) => {
  res.send("hello express");
});

http.useNodeHandler(expressApp);
// in v0.0.1-beta.43
http.node.use(expressApp);
```

You can control which routes get routed to your Node-based Framework by using a prefix. By default, _all_ routes will be sent to the framework's handler.

!!! caution
The prefix argument for `.useNodeHandler` is only available in `@ampt/sdk` version `0.0.1-beta.42` and above.
!!!

```javascript title=Express.js example, copy=false
// all `/api` prefixed routes will be handled in Express, 404's included
http.useNodeHandler("/api", expressApp);
// in v0.0.1-beta.43
http.node.use("/api", expressApp);

// Routes that do not start with `/api` and are not found will hit this
http.on(404, "404.html");
```

For examples of other popular web frameworks, please visit our [Node-based Web Frameworks](/docs/frameworks/node-based/) documentation.

## Custom Error Responses

When a request is made to an HTTP path that is not handled, Ampt will return a default plain text 404 response. You can send a static HTML response using `http.on(404, <path>)`. For example, using a file named `404.html` in the root of your project:

```javascript
import { http } from "@ampt/sdk";

http.on(404, "404.html");
```

!!! caution
If using a framework that ingests all routes, the _404 Response from the framework will be returned and not fall through to the http.on handler_.
!!!

For a single-page application you would use `static/index.html` so all paths will load your site's index.html page.

```javascript
import { http } from "@ampt/sdk";

http.on(404, "static/index.html");
```

When your application throws an exception, by default Ampt will return a JSON response:

```json header=false
{ "message": "Internal Server Error" }
```

To return a custom error response, your application must catch any errors and send the desired response. How you do that depends on the framework you are using. Using Express you could use an error handler:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

## Reading static assets from application code

Although static assets can be read from the file system in sandboxes, they are not stored in the file system when your application is deployed to a stage. We recommend that you _not_ read static assets from your application. Any files your application needs at runtime should be stored within your project outside the "static" folder. For example, you can create an "assets" folder to hold images or html files that your application can then read from the file system at runtime.

If your application still needs to read static files, it is possible to do so using the `http.readStaticFile(relativePath)` method. This will return a `ReadableStream` instance that you can use to read the file. For example to read an image in your project that is in "static/images/image.jpeg" and process it using `jimp` you could use:

```javascript
import { http } from "@ampt/sdk";

const stream = await http.readStaticFile("images/image.jpeg");
const chunks: Uint8Array[] = [];

// convert ReadableStream to Buffer
for await (const chunk of stream) {
  chunks.push(chunk);
}

const buffer = Buffer.concat(chunks);
const image = await Jimp.read(buffer);
```

!!! caution
By default, `readStaticFile` returns a `ReadableStream` instance. If you need an instance of `Readable`, use `http.node.readStaticFile`.
!!!

This can also be used to serve custom 404 HTML pages from within an HTTP framework, if desired.

To return a dynamic response, your application needs to handle the requested path and return the desired response. The details of how to do this depend on the framework you are using. For example, using Express you can add a default handler:

```javascript
import { http } from "@ampt/sdk"
import express from "express"

const app = express()

app.use('/api', ...)

app.use((req, res) => {
  // a basic 404 response
  res.status(404).send('Sorry that page was not found')

  // if you want to return your 404 page
  // node.readStaticFile (0.0.1-beta.43) returns a "Readable" instance
  const notFoundHtmlFile = await http.node.readStaticFile("404.html")
  res.header('Content-Type', 'text/html')
  res.status(404)
  return notFoundHtmlFile.pipe(res)
})
```
