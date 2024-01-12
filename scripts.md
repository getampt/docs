---
title: Running Scripts
description: Learn how to run scripts that can access and manipulate your Ampt environments.
---

You can run npm scripts with access to an environment's parameters, data and storage using the `ampt run [script]` command.

This is useful for tasks like data migrations or integration tests using a custom test runner.

`ampt run [script]` will run `npm run ampt:[script]` in your local environment, with access to one of your environments. If you don't specify any options the script will access your developer sandbox by default.

If you provide a path to a JS or TS file, Ampt will run it directly using Node.js within the same environment using Ampt's runtime loader. Things like `esbuild`, `ts-node`, and `tsx` are not necessary for handling TypeScript.

> When the Ampt shell is running you can omit "ampt" from the `ampt run` command, and just use `run [script]`.

## Options

The `ampt run [script]` command has the following options:

- `--env <name>`: run the script with access to a named environment
- `--test-env`: run the script with access to a temporary test environemnt that is automatically deleted after the script completes

> Note: if you specify `--test-env`, the `--env` option will be ignored if it is present.

## Additional npm and script arguments

When running TS/JS files directly, you can pass additional arguments to the script as usual.

For example `ampt run ./scripts/migrate.js --foo bar` will pass `--foo bar` to the script directly.

When running a `package.json` script, you can pass additional arguments by adding a double dash followed by the arguments. If you also need to pass additional arguments, you can add another double dash followed by the script arguments.

For example `ampt run migrate --env staging -- --if-present -- script-argument --script-option` will result in running the command `npm run ampt:migrate --if-present -- script-argument --script-option` using the environment from the `staging` environment.

## Example: running a migration script

In your `package.json` define a script named "ampt:migrate" which runs "node ./scripts/migrate.js":

```json title="package.json", copy=false
{
  ...
  "scripts": {
    "ampt:migrate": "node ./scripts/migrate.js"
  }
  ...
}
```

Or, if you want to run it directly:

`ampt run ./scripts/migrate.js`

The migration script can access the environment's parameters, data, and storage:

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

To run on a environment called "staging":

`ampt run migrate --env staging`

Use a double dash to pass additional options to the script:

`ampt run migrate --env staging -- some-option`

## Example: Custom test runner

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

Then to run your tests against your developer sandbox:

`ampt run test`

To run the tests against a "staging" environment:

`ampt run test --env staging`

To use a temporary test instance:

`ampt run test --test-env`

You can use a double dash to pass additional arguments to jest:

`ampt run test --test-env -- test-pattern`
