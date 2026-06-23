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

## `reset [--yes]`

Resets your developer sandbox by wiping the data table, removing uploaded files from storage, clearing the code archive and any cached `node_modules`, and performing a full code re-sync from your local directory. Your sandbox URL stays the same.

This is useful when accumulated state from testing, running scripts, or iterating with AI coding agents causes your sandbox to drift from what a clean deploy would look like.

Running this command will ask for confirmation, or you can pass `--yes` to skip the prompt.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › reset
```

## `share [NAME] [--reset] [--container]`

Deploys the code AND data from your sandbox to a preview environment named NAME. If no NAME is provided, a randomly generated name will be created for you.

A preview environment is an ephemeral environment that you can use to easily share your work with others. Previews allow you to create a stable snapshots of your sandbox so that you can get feedback while continuing to make changes to your own version.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

Use `--reset` to wipe the preview environment's data and storage, clear the code archive and cached `node_modules`, then redeploy a fresh copy from your sandbox. The preview URL stays the same.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › share my-preview-env
```

Share with a clean reset:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › share my-preview-env --reset
```

!!! note
Ampt supports the [Lambda Container Packaging format](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html) when building and deploying applications. This allows bundled application code to exceed the standard 250MB limit imposed by Lambda functions, supporting bundled application sizes up to 2GB.

To share your application using the container packaging format, simply add `--container` to the `share` command. This only needs to be done the first time you deploy a new preview environment and may take a few minutes to complete. If you share to an existing preview environment that was created using the `--container` flag, you do not need to use the flag again.
!!!

## `deploy [NAME] [--container]`

Deploys the code from your sandbox to a permanent environment named NAME. If no NAME is provided, Interactive Shell prompts you to enter a name.

A permanent environment is a long-lived environment to host your app. Common names for permanent environments are `prod`, `staging`, `qa`, and `dev`.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › deploy prod
```

!!! note
Ampt supports the [Lambda Container Packaging format](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html) when building and deploying applications. This allows bundled application code to exceed the standard 250MB limit imposed by Lambda functions, supporting bundled application sizes up to 2GB.

To deploy your application using the container packaging format, simply add `--container` to the `deploy` command when you are deploying a new environment. This only needs to be done the first time you deploy an environment and may take a few minutes to complete.
!!!

## `install [PACKAGENAME]`

Installs the specified npm package into your application, and syncs your sandbox once it's done. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

Install an npm dependency:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › install @ampt/data
```

Install a dev dependency with `--dev`:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › install @11ty/eleventy --dev
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

## `params get [PARAM_NAME]`

Lists all parameters or shows details for a specific parameter. When called without a name, displays a table of all parameters. When called with a name, shows the parameter's value, description, and source (org-level, app-level, or environment override).

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › params get
```

Get details for a specific parameter:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › params get MY_SECRET
```

## `params set PARAM_NAME VALUE [--description "DESCRIPTION"]`

Sets an app-level parameter. Use `--description` to add a description.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › params set API_KEY sk-abc123 --description "OpenAI key"
```

## `params delete PARAM_NAME [--yes]`

Deletes an app-level parameter. Running this command will ask for confirmation, or you can pass `--yes` to skip the prompt.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › params delete OLD_PARAM --yes
```

## `whoami`

Displays the currently logged-in user, account details, and every organization you have access to along with your permission level in each.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › whoami
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

Opens the dashboard to the current app in your default browser. `dashboard` is an alias for this command.

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

## `logs [--env NAME] [--follow] [--level LEVEL] [--type TYPE] [--search TEXT] [--json]`

Fetches historical logs from your sandbox, or streams live logs when `--follow` is passed. In the interactive shell, defaults to your active sandbox when no `--env` is given.

Fetch logs from your sandbox:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › logs
```

Stream logs in real-time:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › logs --follow
```

Tail a specific environment and filter by text:

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › logs --env prod --follow --search "payment"
```

Available flags:

| Flag | Description |
|---|---|
| `--env <name>` | Environment to fetch logs from (defaults to active sandbox) |
| `--follow`, `-f` | Stream logs in real-time |
| `--level <level>` | Filter by log level |
| `--type <type>` | Filter by log type |
| `--search <text>` | Only show logs containing this text |
| `--json` | Output logs as raw JSON |

## `stages`

Lists all permanent stage environments for the current app in a table showing name, URL, region, last updated, and deployment status.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › stages
```

## `delete [NAME] [--yes]`

Deletes a preview or sandbox environment by name. If no name is provided, the interactive shell will prompt for one. Running this command will ask for confirmation, or you can pass `--yes` to skip the prompt.

```terminal title=Terminal, copy=false
ampt ⚡

⚡ › delete my-preview-env
```

!!! note
Only preview and personal (sandbox) environment types can be deleted via the CLI. Permanent environments such as `prod` and `staging` must be deleted through the [Ampt dashboard](https://ampt.dev).
!!!
