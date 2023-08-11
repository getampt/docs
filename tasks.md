---
title: Tasks
description: Built-in task interface to handle recurring and one-off tasks.
---

Ampt supports long-running tasks using the `task` interface of the `@ampt/sdk`. Tasks are useful for long-running workloads that aren't suitable for event, data, and storage handlers such as:

- ETL tasks
- Periodic batch calculations
- Periodic checks on the existence or correctness of database records or stored files

You can schedule tasks to run periodically with the `.every()` method to repeat on a regular time interval or the `.cron()` method to have more fine-grained control using cron expressions.

You can also schedule tasks to run immediately or at a specific time in the future with the `.run()` method.

## Defining a Task

Before using a task you must define it and give it a unique name using the `task` method of the `@ampt/sdk`. This method takes three arguments, a **name**, **configuration object**, and a **handler** function. The configuration object is optional, and default configuration will be used if it's omitted.

```javascript
import { task } from "@ampt/sdk";

// Use default configuration
const myTask = task("my task", (event) => {
  console.log("Running my task");
});

// Or with configuration
const myTask2 = task("my task 2", { timeout: 30000 }, (event) => {
  console.log("Running my task");
});
```

!!! note
Task names must be unique, and no longer than 64 characters.
!!!

The **handler** is a function that takes two arguments, an **event** object and a **context** object. The event object contains information about the task, including any body that was specified when the task was scheduled:

```json header=false
{
  target: string      // internal identifier, in the format `task:<name>`
  id: string          // identifier for the task execution
  executionId: string // identifier for the task execution
  name: string        // task name
  body: any,          // body passed to the task when scheduled
  time: number        // the time when the task's handler was called
  delay: number       // the delay between when the task was scheduled and when it was run
}
```

The context object contains methods for interacting with the task:

- **progress(message, percent)**: report progress to the task history
- **setTimeout(timeout)**: change the timeout for the task

A task's handler doesn't need to return anything, but if it does the return value will be JSON stringified and stored in the task's history. If the result is not JSON stringifiable, or the size of the stringified result is greater than 64KB it will be ignored. The function can also return a promise if it needs to do asynchronous work.

```javascript
import { task } from "@ampt/sdk";

const myTask = task("my task", async (event, context) => {
  // Do some work
  await doSomeWork();
  return "some result";
});
```

## Scheduling tasks with `.every()`

To run a task periodically you can use the `.every()` method. This method takes two arguments, a **rate expression** and an optional **body** to pass to the task handler.

For example, the following will log "I run every hour!" every hour:

```javascript
import { task } from "@ampt/sdk";

const hourlyTask = task("hourly task", (event) => {
  // This code block will run every hour!
  console.log("I run every hour!");
});

hourlyTask.every("1 hour", { foo: "bar" });
```

A **rate expression** consists of a **numeric value** and a **unit**. Valid **units** are `minute`, `minutes`, `hour`, `hours`, `day` and `days`. Maximum frequency is 1 minute.

## Scheduling tasks with `.cron()`

If you need more control over your scheduled tasks, you can use the `.cron()` method. This method also takes two arguments, a **cron expression** and an optional **body** to pass to the task handler.

!!! note
Ampt uses an extended cron format as opposed to traditional UNIX format.
!!!

For example, the following will log "I run on Tuesdays!" every Tuesday at midnight UTC:

```javascript
import { task } from "@ampt/sdk";

const tuesdayTask = task("Tuesday batch task", (event) => {
  // This code block will run at midnight on Tuesdays!
  console.log("I run on Tuesdays!");
});

tuesdayTask.cron("0 0 ? * TUE *", { foo: "bar" });
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

## Running tasks at a specific time with `.run()`

Ampt tasks can also be started immediately or up to one year in the future using the `.run()` method.

For example the following will start the "welome" task an hour after a new user is created:

```javascript
import { task } from "@ampt/sdk";
import { data } from "@ampt/data";

const welcomeTask = task("welcome", ({ body }) => {
  console.log("Sending welcome email to:", body.email);
});

data.on("created:user:*", async ({ item }) => {
  await welcomeTask.run("1 hour", { email: item.value.email });
});
```

To run a task immediately, omit the first parameter:

```javascript
await welcomeSchedule.run({ email: item.value.email });
```

The format of the first parameter is the same as the "after" parameter when publishing events. It can be expressed in any of these formats:

- a number of milliseconds to wait before sending the event
- a unix epoch timestamp in milliseconds, such as the output from Date.getTime()
- a string containing a date and time in UTC format, such as "2022-01-14T17:46:05.811Z"
- a **[Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** containing the date and time when the event should be sent. You can use **[dayjs](https://www.npmjs.com/package/dayjs)** for complex data calculations.
- a string in the format "&lt;number&gt; &lt;units&gt;", such as "1 day". Units can be seconds, minutes, hours, days, weeks, months, or years, and can be either singular or plural, so "1 day" and "1 days" are equivalent. Calculations are done in UTC. If you need to take daylight savings into account, you'll need to calculate the date yourself and provide it as a string in UTC format.

The body you send to the task can be any data type that can be JSON stringified, and is published as an event that must be less than 256 KB including the body and metadata.

The return value of the `.run()` method is a promise that resolves to the execution ID of the scheduled task, in the format `{ id: "<execution ID>" }`:

```javascript
const { id } = await welcomeTask.run("1 hour", { email: item.value.email });

console.log("Task execution ID:", id);
```

## Timeouts

By default tasks will timeout after 30 seconds. To change the default, you can specify an object as your second parameter with the `timeout` option. Timeouts are specified in milliseconds and must be a positive integer. As of now (during private beta), scheduled tasks support a maximum timeout of 30 minutes (1800000ms).

```javascript
task("long running task", { timeout: 1200000 }, (event) => {
  // This task can run up to 20 minutes
  console.log("This will take a while...");
});
```

If a task can take a variable amount of time to complete, you can change the timeout at runtime by calling the `.setTimeout()` method on the context object:

```javascript
task("long running task", { timeout: 120000 }, (event, context) => {
  // Usually this task should run within 2 minutes, but we can change it
  event.setTimeout(300000);
  console.log("The task is going to need more time...");
});
```

## Progress

Tasks can report progress by calling the `.progress()` method on the context object, which takes two arguments: a **message** string, and a **percent** between 0 and 1. These values are stored in the task's history.

```javascript
task("long running task", (event, context) => {
  context.progress("Half-way done...", 0.5);
});
```

## Task history

A record of each task execution is stored in the task's history and retained for 14 days. Task history is available in the Ampt dashboard, under the "Tasks" tab for your environment.

The state of a task execution can be retrieved using the `task.state()` method:

```javascript
const state = await task.state(executionId);
```

The state object contains the following properties:

- **id** - the execution ID of the task execution
- **name** - the name of the task
- **state** - the state of the execution: "created", "scheduled", "submitted", "completed", or "failed"
- **body** - the JSON-stringified body that was specified when the task was run
- **createdAt** - the date and time the task execution was created
- **scheduledAt** - the date and time the task was scheduled
- **submittedAt** - the date and time the task was submitted to a worker
- **completedAt** - the date and time the task completed
- **failedAt** - the date and time the task failed
- **progressMessage** - the last progress message sent by the task
- **progressPercent** - the last progress percent sent by the task
- **errorMessage** - the error message if the task failed
- **errorStack** - the error stack if the task failed
- **result** - the JSON-stringified result of the task if it completed successfully

## Error handling

If a task handler throws an error, it will not be retried. In a future release, it will be possible to retry failed tasks.
