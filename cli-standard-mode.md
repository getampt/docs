---
title: Standard Mode
description: CLI to run commands from your terminal to manage the lifecycle of your Ampt application.
---

Standard mode allows developers to run commands from your terminal without having to open an interactive session. Login is still required.

!!! note
Standard Mode is for running one off commands including headless mode when using for [CI/CD](/docs/cicd/) or other automated commands. Developers should use the [Interactive Shell](/docs/cli-interactive-shell/) when iterating on code.
!!!

---

## `ampt login`

Logs the user in via the browser. You will need to verify the code you see in the browser.

```terminal title=Terminal, copy=false
> ampt login

ℹ︎ Your browser should open automatically.
ℹ︎ If not, open the following login url:
→︎ https://ampt.dev/activate?user_code=XXXX-XXXX
ℹ︎ Your confirmation code is: XXXX-XXXX
⚠︎ This code will expire in 15 minutes.
```

## `ampt logout`

Logs the user out of the current session

```terminal title=Terminal, copy=false
> ampt logout
```

## `ampt share [NAME] [--container]`

Deploys the code AND data from your sandbox to a preview stage named NAME. If no NAME is provided, a randomly generated name will be created for you.

A preview environment is an ephermeral environment that you can use to easily share your work with others. Previews allow you to create a stable snapshots of your sandbox so that you can get feedback while continuing to make changes to your own version.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

Use `--region <code>` to specify the region where the preview environment will be created.

```terminal title=Terminal, copy=false
> ampt share my-preview-env
```

!!! note
Ampt now supports the [Lambda Container Packaging format](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html) when building and deploying applications. This allows bundled application code to exceed the standard 250MB limit imposed by Lambda functions. This feature is currently in **BETA** and supports bundled application sizes up to 2GB.

To share your application using the container packaging format, simply add `--container` to the `share` command. This only needs to be done the first time you deploy a new preview environment and may take a few minutes to complete. If you share to an existing preview environment that was created using the `--container` flag, you do not need to use the flag again.
!!!

## `ampt deploy [NAME] [--container]`

Deploys the code from your local directory to the provided permanent environment. If no NAME is provided, it will prompt you for an environment name.

A permanent environment is a long-lived stage/environment to host your app. Common names for permanent environments are `prod`, `staging`, `qa`, and `dev`.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

Use `--region <code>` to specify the region where the new environment will be created.

```terminal title=Terminal, copy=false
> ampt deploy prod
```

!!! note
Ampt now supports the [Lambda Container Packaging format](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html) when building and deploying applications. This allows bundled application code to exceed the standard 250MB limit imposed by Lambda functions. This feature is currently in **BETA** and supports bundled application sizes up to 2GB.

To deploy your application using the container packaging format, simply add `--container` to the `deploy` command when you are deploying a new environment. This only needs to be done the first time you deploy an environment and may take a few minutes to complete.
!!!

## `ampt install [PACKAGENAME]`

Installs the specified npm package into your application. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

Install an npm dependency:

```terminal title=Terminal, copy=false
> ampt install @ampt/data
```

Install a dev dependency with `--save-dev` or `-D`:

```terminal title=Terminal, copy=false
> ampt install @11ty/eleventy -D
```

## `ampt uninstall [PACKAGENAME]`

Uninstalls the specified npm package from your application.

```terminal title=Terminal, copy=false
> ampt uninstall @11ty/eleventy
```

## `ampt run [SCRIPTNAME | FILEPATH][-- npm-arguments [-- script-arguments]]`

Runs the npm script `ampt:<SCRIPTNAME>` in your `package.json` or the `FILEPATH` of a JavaScript/TypeScript file locally on your sandbox. The script will have access to the selected stage's params, data, and storage.

**See [Running Scripts](/docs/scripts/) for more detailed usage information!**

```json title=package.json, copy=false
{
  "name": "my-ampt-app",
  ...
  "scripts": {
    "start": "ampt",
    "ampt:build": "eleventy" // Namespaced npm script
    ...
  },
  ...
}
```

Run `ampt:build` from your `package.json`:

```terminal title=Terminal, copy=false
> ampt run build
```

Run the local script `./scripts/migrate.js` directly:

```terminal title=Terminal, copy=false
> ampt run ./scripts/migrate.js
```

## `ampt import [FILENAME] [--overwrite]`

Imports [data](/docs/data) from the `FILENAME` in your local directory to your **sandbox**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `-o` or `--overwrite` flag, all data will be cleared and reseeded.

```terminal title=Terminal, copy=false
> ampt import data.json --overwrite
```

## `ampt export [FILENAME] [--overwrite]`

Exports data from your **sandbox** to a JSON file named `FILENAME` in your current working directory. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `-o` or `--overwrite` flag to overwrite the existing file.

```terminal title=Terminal, copy=false
> ampt export my-exported-data.json
```

## `ampt version`

Displays the running version of the CLI. `-v` flag is the short form for version.

```terminal title=Terminal, copy=false
> ampt version
v1.0.28
```

## `ampt url`

Displays the current URL of your **sandbox**.

```terminal title=Terminal, copy=false
> ampt url

→ https://~~~italic text-gray-400~{your-sandbox-url}~~~.ampt.dev
```

## `ampt open`

Opens the dashboard to the current app in your default browser.

```terminal title=Terminal, copy=false
> ampt open

ℹ View your app in the dashboard
→ https://ampt.dev/~~~italic text-gray-400~{your-dashboard-link}~~~
```

## `ampt help`

Displays a help screen that shows all the available commands and their options.
