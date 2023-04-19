---
title: API
description: Built-in modern fetch-based web framework to create APIs fast.
---

Ampt provides a modern web framework to group API handlers and define routers and endpoints for your application. `@ampt/api` is designed to simplify the process of building RESTful APIs and making requests to them.

!!! caution
`@ampt/api` is experimental and subject to change. **DO NOT** use this for production apps.
!!!

## Defining an API

Ampt allows developers to define APIs that can be protected with basic validation and middleware support.

The code below shows defining a public API:

```javascript
import { api } from "@ampt/api";

// define a public api and create a new router
const publicApi = api("public").router("/api");

publicApi.get("/hello", async (event) => {
  return event.status(200).body({ message: "Hello from the public api!" });
});
```

Ampt API also allows developers to build protected API's using middleware and provides a way to validate the query parameters. The code below shows a protected API:

```javascript
import { api } from "@ampt/api";

async function auth(event) {
  const { headers } = event.request;
  if (!headers.get("Authorization")) {
    return event.status(401);
  }
  event.context.userId = "123";
}
const privateApi = api("protected").router("/admin", undefined, auth);

// this API is only reachable by the user with userId equals to 123
privateApi.get("/hello", async (event) => {
  return event.status(200).body({ message: "Hello from the private api!" });
});
```

## Supported methods

The following is a list of common API methods supported in the Ampt API.

Methods accept a `path` and `callback` parameter.

| Method   | Description                                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| all()    | This method is like the standard app.METHOD() methods, except it matches all HTTP verbs.                                                                           |
| delete() | Routes HTTP DELETE requests to the specified path with the specified callback functions.                                                                           |
| get()    | Routes HTTP GET requests to the specified path with the specified callback functions.                                                                              |
| post()   | Routes HTTP POST requests to the specified path with the specified callback functions.                                                                             |
| put()    | Routes HTTP PUT requests to the specified path with the specified callback functions.                                                                              |
| patch()  | Routes HTTP PATCH requests to the specified path with the specified callback functions.                                                                            |
| use()    | Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path. |

```javascript
// post method that takes the callback function as the second parameter
// this function takes APIEvent Object as a parameter
publicApi.post("/submit", async (event) => {
  const body = await event.request.body();

  return event.status(200).body({
    body,
    message: "You just posted data",
  });
});
```

## API Objects

### `HttpEvent` Object

An `HttpEvent` object is passed to callback functions for HTTP methods and has the following attributes:

- `request`: `ApiRequest` object. See a sample object for a GET request below:
- `context`: Utility object that can be read and written to from middleware logic.
- `params`: Object containing specified parameters matched in the URL
- `response`: `ApiResponse` object that will be returned from the endpoint
- The `HttpEvent` object has some helper functions to be used for returning response or chaining the calls
  - `status(code, body)`: Sets the response status to the code. Body is optional, default text/plain message is sent if body is not provided.
  - `redirect(location, code = 3xx)`: Sets the location header and status code for a redirect response.
  - `body({JSONorStringorHTMLBody})`: Sets the event body to be returned by the API.

### `ApiRequest` Object

This object includes all the information about the request for RESTful API. Request body could be retrieved by awaiting the `body()` method of `event.request`.

### `ApiResponse` Object

This object includes to response object to be returned by the RESTful API. See the sample JSON for a GET request.

```json
{
  "status": 200,
  "headers": { "content-type": "application/json" },
  "body": undefined
}
```

## Specifying paths

Paths are specified using simple string representations. Dynamic parameters can be set using the `:paramName` syntax. This value will be available in your callback function via the `event.params` object.

Path parameters can be type checked at runtime using the syntax below:

```javascript
import { v, api } from "@ampt/api";

const publicApi = api("public").router("/users", { id: v.string() });
publicApi.patch("/:id", async (event) => {
  const { id } = event.params;
  // application logic
  return event.body({ item });
});
```

If path parameters are not supplied in the `.router()` call, they can be optionally unwrapped in your handler:

```javascript
import { api } from "@ampt/api";

const publicApi = api("public").router("/users");
publicApi.patch("/:id", async (event) => {
  const userId = event.params?.id;

  if (userId) {
    // application logic
    return event.body({ item });
  }

  return event.status(404);
});
```

## Serving files through API

To send files stored at Ampt Storage, developers can use `getDownloadUrl` function.

```javascript
const files = api("files").router("/files", { path: v.string() }, auth);

files.get("/:path*", async (event) => {
  return event.redirect(
    await storage("uploads").getDownloadUrl(
      `${event.context.userId}/${event.params.path}`
    ),
    307
  );
});
```

## Handling CORS

To allow CORS (Cross Origin Resource Sharing), you can use a middleware function.

```javascript
import { v, api } from "@ampt/api";

function cors(event: any) {
  const { headers } = event.request;

  // To allow all Origins
  event.response.headers.append("Access-Control-Allow-Origin", "*");
  // For local dev (i.e. localhost)
  event.response.headers.append(
    "Access-Control-Allow-Origin",
    "http://localhost:$PORT"
  );

  event.response.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  if (headers.get("Access-Control-Request-Headers"))
    event.response.headers.append(
      "Access-Control-Allow-Headers",
      headers.get("Access-Control-Request-Headers")
    );
}

const publicApi = api("public").router("/users", { id: v.string() }, cors);
```

If you want to only allow CORS in development (personal environments), you can use the INSTANCE_TYPE param to set it dynamically:
This closes cross origin requests on stage environments, for better security.

```javascript
import { v, api } from "@ampt/api";
import { params } from "@ampt/sdk";

function cors(event: any) {
  const { headers } = event.request;

  if (params("ENVIRONMENT_TYPE") === "personal") {
    event.response.headers.append(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );

    event.response.headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );

    if (headers.get("Access-Control-Request-Headers"))
      event.response.headers.append(
        "Access-Control-Allow-Headers",
        headers.get("Access-Control-Request-Headers")
      );
  }
}
```
