---
title: WebSockets
description: Built-in WebSockets interface to manage real-time communications between your app and client browsers.
---

Ampt provides a simple interface to interact with WebSocket connections to your app. Your app's websocket is available at it's url, but using the `wss://` protocol instead of `https://`.

Interact with WebSockets using the "ws" interface of the `@ampt/sdk`.

## Listening for Events

There are three main events you can define listeners for using the `ws` interface: 'connected', 'disconnected' and 'message'. Every handler is passed a `SocketConnection` instance that includes the connection ID and metadata for new connections.

```javascript
import { ws, SocketConnection } from "@ampt/sdk";

ws.on("connected", (connection: SocketConnection) => {
  // handle connection
});

ws.on("disconnected", (connection: SocketConnection, reason?: string) => {
  // handle disconnect
});

ws.on("message", (connection: SocketConnection, data: string | Object) => {
  // handle incoming message
  // if the message content is JSON formatted, it is automatically parsed and passed as an object.
});
```

## Timeouts

You can increase a handler's timeout via a config object:

```javascript
ws.on("connected", { timeout: 30000 }, (connection: SocketConnection) => {});
```

The default timeout for WebSocket handlers is 5 seconds, and the maximum is 60 seconds.

## Managing Connections

Ampt provides the websocket interface, but it is up to the developer to manage the incoming connections. This can be done with any persisted data interface, below is an example using `@ampt/data`:

!!! caution
Using `@ampt/data` to manage connections can lead to connection states being deleted when using the `import --overwrite` command in Sandbox environments. Eventually, Ampt will optionally manage your active connections for you.
!!!

```javascript
import { ws, SocketConnection } from "@ampt/sdk";
import { data } from "@ampt/data";

type LatLong = {
    lat: number
    long: number
}

ws.on('connected', async (connection: SocketConnection) => {
  const {
    connectionId,
    meta
  } = connection;
  const { connectedAt, queryStringParameters } = meta;
  await data.set(`connection:${connectionId}`, {
    connectionId,
    connectedAt,
    username: queryStringParameters?.name,
  });
});

ws.on('disconnected', async (connection: SocketConnection, reason?: string) => {
  await data.remove(`connection:${connection.connectionId}`);
});

ws.on<LatLong>('message', async (connection: SocketConnection, incomingMessage: LatLong) => {
  const { connectionId } = connection
  const existingConnection = await data.get(`connection:${connectionId}`);
  const { lat, long } = incomingMessage;
  if (existingConnection) {
    await data.set(`current_location:${existingConnection.username}`, {
      lat,
      long,
    });
  }
});
```

Closing connections just requires the connection ID.

```javascript
import { ws } from "@ampt/sdk";

// ... other handlers
ws.on("message", async (connection, msg) => {
  if (msg?.disconnectMe) {
    await ws.close(connection.connectionId);
    // or
    await connection.close();
  }
});
```

Or if you want to close all connections:

```javascript
// .. in some handler
const connections = await data.get("connection:*");
await ws.close(connections.items.map((item) => item.value.connectionId));
```

## Sending Messages

To send messages to clients, all that is required is the connection ID. Either a string or an object can be passed as `data`:

```javascript
ws.on("connected", async (connection) => {
  await ws.send(connection.connectionId, "Welcome to Ampt WebSockets!");
  // or
  await ws.send(connection.connectionId, {
    message: "Welcome to Ampt WebSocket!",
  });
  // or
  await connection.send("Welcome to Ampt WebSockets!");
});
```

Depending on the client implementation, messages received in JSON format will need to be parsed.

By default, `ws.send` will throw an error if the provided `connectionId` is no longer connected. If you'd like to omit this error, set it in the function's `options` param:

```javascript
ws.on('connected', async (connection) => {
  try {
    await ws.send(connection.connectionId, "Welcome to Ampt WebSockets!", { throwIfNotConnected: false });
  } catch (e: InvalidConnectionError) {
    console.log("You won't see this")
  }
});
```

If your connection representation is out of sync, you can check if a client is still connected with `.isConnected()`

```javascript
ws.on("connected", async (connection) => {
  const { connectionId } = connection;
  if (await ws.isConnected(connectionId)) {
    await ws.send(connectionId, "Welcome to Ampt WebSockets!");
  } else {
    console.log(`Connection ${connectionId} is not connected!`);
  }
});
```

## Connection from a Client

You can connect to your Ampt App's websocket with any websocket library/utility.

Using `wscat`

```terminal title=Terminal
> wscat -c wss://your-app-url.ampt.app
```

Or in the browser:

```javascript
const websocket = new WebSocket("wss://your-app-url.ampt.app");
websocket.addEventListener("open", () => {
  console.log("Connected to Ampt WS");
});
```

## Limits

!!! caution
WebSocket connection attempts will be rejected with a status code of 403 if your Sandbox Environment is not currently active.
!!!

| Environment Type | Burst Limit (concurrent requests) | Rate Limit (messages per second) |
| ---------------- | --------------------------------- | -------------------------------- |
| **Sandbox**      | 10                                | 10                               |
| **Preview**      | 50                                | 100                              |
| **Stage**        | 5,000                             | 10,000                           |
