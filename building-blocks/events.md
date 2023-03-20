---
title: Events
description: Ampt provides an easy way to build event-driven workflows and allows you to handle async tasks. 
---

Ampt SDK(`@ampt/sdk`) supports publishing and handling events so you can easily build event-driven flows in your applications. Events let you do work "in the background" and allow you to decouple your application to make it more scalable and resilient to errors. Events can also be published "in the future" if you need to do the work at a later time asynchronously.

For example, instead of sending a welcome email to a new user immediately in an API handler, you can send a `user.joined` event and send the email from the event handler 5 minutes later. This makes your API much more responsive and means your API will not fail if the email server is not available.

## Publishing events with `events.publish()`

To publish an event you use the `events.publish()` method, and provide a name and a "body" that contains application-specific data to send in the event.

```javascript
import { events } from "@ampt/sdk";
import {api} from "@ampt/api"

api('my-api').router('/events')
  .post('/', async (event) => {
    const body = await event.request.body()
		// publish event immediately
    events.publish('my-event', body)
    return event.status(204)
})
```

You can delay when an event is published using the "after" option. For example, this will send the `user.joined` event in one day:

```javascript
await events.publish("user.joined", { after: "1 day" }, {
  user_id: "2b6mgh78g334",
  email: "newuser@example.com"
});
```

`after` must be greater than zero, and can be up to one year in the future. It can be expressed in any of these formats:

- a number of milliseconds to wait before sending the event
- a unix epoch timestamp in milliseconds, such as the output from Date.getTime()
- a string containing a date and time in UTC format, such as "2022-01-14T17:46:05.811Z"
- a **[Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** containing the date and time when the event should be sent. You can use **[dayjs](https://www.npmjs.com/package/dayjs)** for complex data calculations.
- a string in the format "<number> <units>", such as "1 day". Units can be seconds, minutes, hours, days, weeks, months, or years, and can be either singular or plural, so "1 day" and "1 days" are equivalent. Calculations are done in UTC. If you need to take daylight savings into account, you'll need to calculate the date yourself and provide it as a string in UTC format.

The body you send in the event can be any data type that can be JSON stringified. The event, including its body and metadata must be less than 256KB.

## Handling events with `events.on()`

To handle an event you use the `events.on()` method, and provide the event name and a handler function.

For example, this will call the handler when a "user.joined" event is received.

```javascript
events.on("user.joined", async ({ body }) => {
   // send a welcome email using body.email
})
```

The handler receives an object with these properties:

- **id**: the event identifier string
- **name**: the event name, such as "user.joined" in the example above
- **body**: the body that was provided to `events.publish()`
- **time**: the timestamp when `events.publish()` was called, as epoch time in milliseconds
- **delay**: the amount of time the event was delayed, in milliseconds

There can be more than one handler for a given event name. To add another handler just call `events.on()` again with the same event name. Your handlers will be called in the order they are defined in your code. It's also ok if there are no handlers for an event, the event will just be ignored.

Internally, events are placed in a queue and processed as fast as possible. The actual time an event is processed will be on or after the "after" parameter provided to the `.publish()` call, and depends on how much load your application is receiving. You can't rely on the event being processed at an exact time or within a given time window.

There is no guarantee that events will be processed in order, and no guarantee that your handler will only get called once for each event, so your application needs to handle out-of-order events and duplicate events.

If any of your handlers throw an error, processing is considered to have failed. Failed events are retried every six minutes, for up to 14 days, after which the event is dropped.
