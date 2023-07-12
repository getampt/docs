---
title: Schedules
description: Built-in schedule interface to handle recurring or one-off tasks.
---

Ampt supports setting up schedules, which you can create using the `schedule` interface of the `@ampt/sdk`. Schedules are useful for:

- Periodic batch calculations
- Periodic checks on the existence or correctness of database records or stored files
- Scheduling one-off future tasks

You can either use the `.every()` method for having tasks repeat on a regular time interval or the `.cron()` method to have more fine-grained control. You can name the schedulers to identify the workloads.

!!! note
The name of the schedule can be up to 64 characters.
!!!

## Scheduling with `.every()`

If you need a schedule to repeat every hour, or every 5 days, you can use the `.every()` method. This method takes two arguments, a **rate expression** and the function you'd like to run.

For example, the following will log "I run every hour!" every hour:

```javascript
import { schedule } from "@ampt/sdk";

schedule("hourly health check").every("1 hour", () => {
  // This code block will run every hour!
  console.log("I run every hour!");
});
```

A **rate expression** consists of a **numeric value** and a **unit**. Valid **units** are `minute`, `minutes`, `hour`, `hours`, `day` and `days`. Maximum frequency is 1 minute.

## Scheduling with `.cron()`

If you need more control over your scheduled tasks, you can use the `.cron()` method. This method also takes two arguments, a **cron expression** and the function you'd like to run.

!!! note
Ampt uses an extended cron format as opposed to traditional UNIX format.
!!!

For example, the following will log "I run on Tuesdays!" every Tuesday at midnight UTC:

```javascript
schedule("Tuesday batch task").cron("0 0 ? * TUE *", () => {
  // This code block will run at midnight on Tuesdays!
  console.log("I run on Tuesdays!");
});
```

!!! note
Ampt uses an extended cron format as opposed to traditional UNIX format. **Cron expressions** consist of six required fields:

| Field        | Values          | Wildcards      |
| ------------ | --------------- | -------------- |
| Minutes      | 0-59            | , - \* /       |
| Hours        | 0-23            | , - \* /       |
| Day-of-month | 1-31            | , - \* ? / L W |
| Month        | 1-12 or JAN-DEC | , - \* /       |
| Day-of-week  | 1-7 or SUN-SAT  | , - \* ? L #   |
| Year         | 1970-2199       | , - \* /       |

!!!

### Wildcards

- The , (comma) wildcard includes additional values. In the Month field, JAN,FEB,MAR would include January, February, and March.
- The - (dash) wildcard specifies ranges. In the Day field, 1-15 would include days 1 through 15 of the specified month.
- The _ (asterisk) wildcard includes all values in the field. In the Hours field, _ would include every hour. You cannot use \* in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other.
- The / (forward slash) wildcard specifies increments. In the Minutes field, you could enter 1/10 to specify every tenth minute, starting from the first minute of the hour (for example, the 11th, 21st, and 31st minute, and so on).
- The ? (question mark) wildcard specifies one or another. In the Day-of-month field you could enter 7 and if you didn't care what day of the week the 7th was, you could enter ? in the Day-of-week field.
- The L wildcard in the Day-of-month or Day-of-week fields specifies the last day of the month or week.
- The W wildcard in the Day-of-month field specifies a weekday. In the Day-of-month field, 3W specifies the weekday closest to the third day of the month.
- The # wildcard in the Day-of-week field specifies a certain instance of the specified day of the week within a month. For example, 3#2 would be the second Tuesday of the month: the 3 refers to Tuesday because it is the third day of each week, and the 2 refers to the second day of that type within the month.

## Scheduling one-off tasks with `.task()` and `.at()`

!!! note
The `.task()` and `.at()` methods are deprecated in favor of the new **[`task` interface](/tasks)**.
!!!

Ampt Schedules also support one-off delayed workloads that can run at a specific time, up to one year in the future.

To do this, declare a schedule group with a `.task()` listener. This handler will receive all delayed tasks queued with `.at()` within the schedule group.

For example, queueing future work on a user sign-up:

```javascript
import { schedule } from "@ampt/sdk";
import { data } from "@ampt/data";

const welcomeSchedule = schedule("welcome");

welcomeSchedule.task((event) => {
  console.log("Sending welcome email to", event.body.email);
});

data.on("created:user:*", async ({ item }) => {
  await welcomeSchedule.at("1 hour", { email: item.value.email });
});
```

The format of the first argument of `.at()` is the same as the "after" parameter when publishing events. It can be expressed in any of these formats:

- a number of milliseconds to wait before sending the event
- a unix epoch timestamp in milliseconds, such as the output from Date.getTime()
- a string containing a date and time in UTC format, such as "2022-01-14T17:46:05.811Z"
- a **[Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** containing the date and time when the event should be sent. You can use **[dayjs](https://www.npmjs.com/package/dayjs)** for complex data calculations.
- a string in the format "<number> <units>", such as "1 day". Units can be seconds, minutes, hours, days, weeks, months, or years, and can be either singular or plural, so "1 day" and "1 days" are equivalent. Calculations are done in UTC. If you need to take daylight savings into account, you'll need to calculate the date yourself and provide it as a string in UTC format.

The body you send to the task can be any data type that can be JSON stringified, and is published as an event that must be less than 256 KB including the body and metadata.

`.task()` handlers receive an event of this type:

```json header=false
{
  target: string
  id: string
  name: string
  body: {
    source: 'schedule-task',
    name: string
    date: number
    payload: any
  },
  time: number
  delay: number
}
```

## Timeouts

By default, scheduled tasks will timeout after 30 seconds. To change the default, you can specify an object as your second parameter with a `timeout` key. Timeouts are specified in milliseconds and must be a positive integer. As of now, scheduled tasks support a maximum timeout of 300 seconds (5 minutes).

```javascript
schedule("two times a day").every("12 hours", { timeout: 300000 }, () => {
  // This will run every 12 hours and timeout after 5 mins!
  console.log("I run every 12 hours!");
});
```
