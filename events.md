---
title: Events
description: Build event-driven workflows to handle async tasks just by writing code.
---

The Ampt SDK (`@ampt/sdk`) supports publishing and handling events so you can easily build event-driven workflows in your applications. Events let you do work "in the background" and allow you to decouple your application to make it more scalable and resilient to errors. Events can also be published "in the future" if you need to do the work at a later time asynchronously.

For example, instead of sending a welcome email to a new user immediately in an API handler, you can send a `user.joined` event and send the email from the event handler 5 minutes later. This makes your API much more responsive and means your API will not fail if the email server is not available.

## Publishing events with `events.publish()`

To publish an event you use the `events.publish()` method, and provide a name and a "body" that contains application-specific data to send in the event.

```javascript
import { events } from "@ampt/sdk";
import { api } from "@ampt/api";

api("my-api")
  .router("/events")
  .post("/", async (event) => {
    const body = await event.request.body();
    // publish event immediately
    events.publish("my-event", body);
    return event.status(204);
  });
```

You can delay when an event is published using the `after` option. For example, this will send the `user.joined` event in one day:

```javascript
await events.publish(
  "user.joined",
  { after: "1 day" },
  {
    user_id: "2b6mgh78g334",
    email: "newuser@example.com",
  }
);
```

`after` must be greater than zero, and can be up to one year in the future. It can be expressed in any of these formats:

- a number of milliseconds to wait before sending the event
- a unix epoch timestamp in milliseconds, such as the output from Date.getTime()
- a string containing a date and time in UTC format, such as "2022-01-14T17:46:05.811Z"
- a **[Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** containing the date and time when the event should be sent. You can use **[dayjs](https://www.npmjs.com/package/dayjs)** for complex data calculations.
- a string in the format "<number> <units>", such as "1 day". Units can be seconds, minutes, hours, days, weeks, months, or years, and can be either singular or plural, so "1 day" and "1 days" are equivalent. Calculations are done in UTC. If you need to take daylight savings into account, you'll need to calculate the date yourself and provide it as a string in UTC format.

The body you send in the event can be any data type that can be JSON stringified. The event, including its body and metadata must be less than 256 KB.

## Handling events with `events.on()`

To handle an event you use the `events.on()` method, and provide the event name and a handler function.

For example, this will call the handler when a "user.joined" event is received.

```javascript
events.on("user.joined", async (event, context) => {
  // send a welcome email using event.body.email
});
```

The handler receives an `event` object with these properties:

- **id**: the event identifier string
- **name**: the event name, such as "user.joined" in the example above
- **body**: the body that was provided to `events.publish()`
- **time**: the timestamp when `events.publish()` was called, as epoch time in milliseconds
- **delay**: the amount of time the event was delayed, in milliseconds
- **attempt**: the number times event handling has been attempted

The `context` object has one method:

- **setTimeout(milliseconds)**: set the timeout for the event handler, in milliseconds

There can be more than one handler for a given event name. To add another handler just call `events.on()` again with the same event name. Your handlers will be called in the order they are defined in your code. It's also ok if there are no handlers for an event, the event will just be ignored.

Internally, events are placed in a queue and processed as fast as possible. The actual time an event is processed will be on or after the "after" parameter provided to the `.publish()` call, and depends on how much load your application is receiving. You can't rely on the event being processed at an exact time or within a given time window.

There is no guarantee that events will be processed in order, and no guarantee that your handler will only get called once for each event, so your application needs to handle out-of-order events and duplicate events.

If any of your handlers throw an error, processing is considered to have failed. Failed events are retried every six minutes, for up to 14 days, after which the event is dropped.

When multiple handlers are defined for the same event, the same `time`, `delay` and `attempt` properties are passed to all handlers even if only one of your handlers throws an error.

### Discarding events

Events can be discarded by successfully returning from the handler without doing any work. This could be done based on the event body, the number of attempts, or the age of the event. For example, if your event schema evolves over time, you may need to detect and discard old events:

```javascript
events.on("user.joined", { timeout: 10000 }, async (event, context) => {
  if (!event.body.firstName) {
    // discard the event if it doesn't have a firstName
    return;
  }

  // send a welcome email
});
```

You may use the `time` and `delay` properties to determine the age of an event, either including or excluding the `delay`. The age of an event excluding the delay can be calculated as `Date.now() - event.time - event.delay`, or `Date.now() - event.time` if you want to include the delay.

For example, to discard events older than five hours:

```javascript
const ONE_HOUR_MS = 60 * 60 * 1000;

events.on("user.joined", { timeout: 10000 }, async (event, context) => {
  try {
    // try to send a welcome email
  } catch (err) {
    if (Date.now() - event.time < 5 * ONE_HOUR_MS) {
      // retry the event
      throw err;
    }
    // discard the event if it's more than five hours old
    console.error(
      `Failed to send welcome email for: ${event.body.email}, error: ${err.message}`
    );
  }
});
```

To discard an event after three attempts:

```javascript
const ONE_HOUR_MS = 60 * 60 * 1000;

events.on("user.joined", { timeout: 10000 }, async (event, context) => {
  try {
    // try to send a welcome email
  } catch (err) {
    if (event.attempt < 3) {
      // retry the event
      throw err;
    }
    // give up after 3 attempts
    console.error(
      `Failed to send welcome email for: ${event.body.email}, error: ${err.message}`
    );
  }
});
```

If you only need to attempt to handle an event once, you can simply catch all errors and successfully return:

```javascript
events.on("user.joined", { timeout: 10000 }, async (event, context) => {
  try {
    // try to send a welcome email
  } catch (err) {
    // give up after 1 attempt
    console.error(
      `Failed to send welcome email for: ${event.body.email}, error: ${err.message}`
    );
  }
});
```

Note that event handlers are invoked **at least once** so it's possible the handler could be called multiple times in the case of an error in another handler.

### Timeouts

By default handlers must finish within 5 seconds, otherwise the handler will fail and the event will be retried. You can increase the timeout by setting the `timeout` option when calling `events.on()`.

```javascript
events.on("user.joined", { timeout: 10000 }, async (event, context) => {
  // send a welcome email using event.body.email
});
```

You can also use the `context.setTimeout()` method to adjust the timeout at runtime.

```javascript
events.on("user.joined", async (event, context) => {
  context.setTimeout(10000);
  // send a welcome email using event.body.email
});
```

The maximum timeout for an event handler is 60 seconds.
