---
title: Running Scripts
description: Learn how to run scripts that can access and manipulate your Ampt environments.
---

You can run npm scripts with access to an environment's parameters, data and storage using the `ampt run [script]` command.

This is useful for tasks like data migrations or integration tests using a custom test runner.

`ampt run [script]` will run `npm run ampt:[script]` in your local environment, with access to one of your environments. If you don't specify any options the script will access your developer sandbox by default.

> When the Ampt shell is running you can omit "ampt" from the `ampt run` command, and just use `run [script]`.

## Options

The `ampt run [script]` command has the following options:

- `--stage <name>`: run the script with access to a named stage
- `--test-stage`: run the script with access to a temporary test stage that is automatically deleted after the script completes

> Note: if you specify `--test-stage`, the `--stage` option will be ignored if it is present.

## Additional npm and script arguments

You can pass additional arguments to npm by adding a double dash followed by the arguments. If you also need to pass additional arguments to the npm script, you can add another double dash followed by the script arguments.

For example `ampt run migrate --stage staging -- --if-present -- script-argument --script-option` will result in running the command `npm run ampt:migrate --if-present -- script-argument --script-option` using the environment from the `staging` stage.

## Example: running a migration script

In your `package.json` define a script named "ampt:migrate" which runs "./scripts/migrate.js":

```json title="package.json", copy=false
{
  ...
  "scripts": {
    "ampt:migrate": "./scripts/migrate.js"
  }
  ...
}
```

The migration script can access the stage's parameters, data, and storage:

```javascript title="migrate.js", copy=false
import { params, storage } from "@ampt/sdk";
import { data } from "@ampt/data";

async function main() {
  await data.set("some:value", { some: "value" });
}

main();
```

To run the script with access to your developer sandbox:

`ampt run migrate`

To run on a stage called "staging":

`ampt run migrate --stage staging`

Use a double dash to pass additional options to the script:

`ampt run migrate --stage staging -- some-option`

## Example: custom test runner

If you would like to run tests locally against a stage, and would prefer not to use Ampt's built-in test runner, you could define an "ampt:test" script. For example, to use jest:

```json title="package.json", copy=false
{
  ...
  "scripts": {
    "ampt:test": "jest"
  },
  ...
}
```

Install jest:

`npm install --save-dev jest`

Create a Jest configuration that auto-loads your app:

```javascript title="jest.config.js", copy=false
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/index.js"],
};
```

Then to run your tests against your developer sandbox:

`ampt run test`

To run the tests against a "staging" stage:

`ampt run test --stage staging`

To use a temporary test instance:

`ampt run test --test-stage`

You can use a double dash to pass additional arguments to jest:

`ampt run test --test-stage -- test-pattern`
