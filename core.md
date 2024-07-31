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

## Setting Timeouts

The `context` getter will return a `setTimeout` function that lets you dynamically override the current handler's timeout.

Ampt interfaces that define handlers like [tasks](/docs/tasks), [events](/docs/events), and [storage](/docs/tasks), provide a `context` object as part of the handler signature (e.g. `task("", async (event, context) => { })`). Other handlers, such as those defined by [Fetch-based frameworks](/docs/frameworks/fetch-based/) and [Ampt Data](/docs/data/) listeners don't provide a native way to adjust the timeout.

You can use `core.context.setTimeout(1000)` to dynamically set the timeout of any handler. Timeouts are in milliseconds and cannot exceed 5 minutes.

!!! caution
`setTimeout()` can be executed anywhere within the handler, but should be run before any other processes that could caused the handler to exceed the default timeout.
!!!
