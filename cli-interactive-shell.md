---
title: Interactive Shell
description: Interactive Shell to connect to your developer sandbox and manage Ampt environments.
---

The interactive shell allows developers to connect to their **sandbox** from their local IDE, auto sync code changes, stream logs, and manage the lifecycle of your application.

!!! note
A sandbox is a temporary environment that's **ONLY ACTIVE** when the interactive shell is connected. The URL for your sandbox will present a notification page when the interactive shell is not connected.
!!!

To enter the interactive shell, run the `ampt` command from your terminal. If you do not have the `@ampt/cli` NPM package installed globally, you can also run `npm i -g @ampt/cli`.

Additional flags can be passed to the `ampt` command to configure the behavior of the interactive shell.

- `--seed`: Seed [data](/docs/data) to your sandbox from your `data.json` file on initialization.
- `--reseed`: Enable automatic [data](/docs/data) reseeding when the `data.json` file is updated.
- `--org`: Overwrites the organization of the project in your current directory.
- `--app`: Overwrites the app of the project in your current directory.
- `--region`: Use the specified region when creating a new environment. This applies to the `share` and `deploy` commands, and when creating a new sandbox environment.

To exit the interactive shell, type `exit` or `quit`. The below commands are available in the interactive shell.

---

## `dev`

Starts the local development server in a child process, if a script named `ampt:dev` is defined in `package.json`.

## `share [NAME]`

Deploys the code AND data from your sandbox to a preview environment named NAME. If no NAME is provided, a randomly generated name will be created for you.

A preview environment is an ephemeral environment that you can use to easily share your work with others. Previews allow you to create a stable snapshots of your sandbox so that you can get feedback while continuing to make changes to your own version.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › share my-preview-env
```

## `deploy [NAME]`

Deploys the code from your sandbox to a permanent environment named NAME. If no NAME is provided, Interactive Shell prompts you to enter a name.

A permanent environment is a long-lived environment to host your app. Common names for permanent environments are `prod`, `staging`, `qa`, and `dev`.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › deploy prod
```

## `import [FILENAME] [--overwrite]`

Imports [data](/docs/data) from the `FILENAME` in your local directory to your **sandbox**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `-o` or `--overwrite` flag, all data will be cleared and reseeded.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › import data.json --overwrite
```

## `export [FILENAME] [--overwrite]`

Exports data from your **sandbox** to a JSON file named `FILENAME` in your current working directory. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `-o` or `--overwrite` flag to overwrite the existing file.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › export my-exported-data.json
```

## `install [PACKAGENAME]`

Installs the specified npm package into your application, and syncs your sandbox once it's done. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

```terminal title=Terminal, copy=false
ampt ⚡

# Install an npm dependency
⚡ › install @ampt/data

# Install a dev dependency with `--save-dev` or `-D`
⚡ › install @11ty/eleventy -D
```

## `uninstall [PACKAGENAME]`

Uninstalls the specified npm package from your application, and syncs your sandbox once it's done.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › uninstall @11ty/eleventy
```

## `run [SCRIPTNAME | FILEPATH][-- npm-arguments [-- script-arguments]]`

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
ampt ⚡

⚡ › run build
```

Run the local script `./scripts/migrate.js` directly:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › run ./scripts/migrate.js
```

## `version`

Displays the current running version of the CLI.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › version
v1.0.28
```

## `url`

Displays the current URL of your **sandbox**.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › url

→ https://~~~italic text-gray-400~{your-sandbox-url}~~~.ampt.dev
```

## `open`

Opens the dashboard to the current app in your default browser.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › open

ℹ View your app in the dashboard
→ https://ampt.dev/~~~italic text-gray-400~{your-dashboard-link}~~~
```

## `quit` / `exit` or *Ctrl/Cmd+C*

Terminates the interactive cloud shell and disconnects from your **sandbox**.

## `clear`

Clears the terminal screen.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › clear
```

## `help`

Displays a simple help screen that shows all the available commands and their options.
