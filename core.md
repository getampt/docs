---
title: Core
description: Access invocation meta data for your application requests.
---

The `core` interface provides access to underlying invocation meta data on every request. This information can be used for debugging, correlating requests, etc.

## Using the `core` interface

The `core` interface can be imported from the `@ampt/sdk` and returns three getters:

- `requestId`: The AWS reqId that can be correlated with log entries.
- `event`: The raw AWS event object passed from the event source mapping.
- `context`: The AWS context object of the invocation.

!!! note
The structure of the `event` and `context` objects depend on the underlying compute platform (Lambda, Fargate, App Runner). The `requestId` will always return a string.
!!!

The getter must be accessed from within a handler (e.g. `task`, `events.on()`, `data.on()`) or an HTTP framework's route/middleware.

```javascript title=Accessing core meta data, copy=false
import { core, events } from "@ampt/sdk";

events.on("user.created", async (evt) => {
  console.log("Event Details:", evt);
  console.log({
    reqId: core.requestId,
    event: core.event,
    context: core.context,
  });
});
```
