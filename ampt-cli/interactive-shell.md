---
title: Interactive Shell
description: Interactive Shell to interact with developer sandbox and to manage the environments on Ampt. 
---

The interactive shell allows developers to connect to their **sandbox** from their local IDE, auto sync code changes, stream logs, and manage the lifecycle of your application.

<aside>
⚠️ NOTE: Sandbox is a temporary environment that is active when the interactive shell is activated. The URL for your sandbox will present a dummy page when the interactive shell is not activated.
</aside>


To enter the interactive shell, run the `ampt` command from your terminal. If you do not have the `@ampt/cli` NPM package installed globally, you can also run `npm i -g @ampt/cli`.

Additional flags can be passed to the `ampt` command to configure the behavior of the interactive shell.

- `-seed`: Seed data from your `data.json` file on initialization.
- `-reseed`: Enable automatic data reseeding when the `data.json` file is updated.
- `-org`: Overwrites the organization of the project in your current directory.
- `-app`: Overwrites the app of the project in your current directory.

To exit the interactive shell, type `exit` or `quit`. The below commands are available in the interactive shell. 

## `dev`

Starts the local development server in a child process, if a script named `ampt:dev` is defined in `package.json`.

## `import [FILENAME] [--overwrite]`

Seeds data from the `FILENAME` in your local directory to your **sandbox**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `-o` or `--overwrite` flag, all data will be cleared and reseeded.

## `export [FILENAME] [--overwrite]`

Exports data from your **sandbox** to a JSON file named `FILENAME` in your current working directory. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `-o` or `--overwrite` flag to overwrite the existing file.

## `install [PACKAGENAME]`

Installs the specified npm package into your application, and syncs your sandbox once it's done. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

## `uninstall [PACKAGENAME]`

Uninstalls the specified npm package from your application, and syncs your sandbox once it's done.

## `version`

Displays the current running version of the CLI.

## `url`

Displays the current URL of your **sandbox**.

## `open`

Opens the dashboard to the current app in your default browser.

## `quit` / `exit` or *Ctrl/Cmd+C*

Terminates the interactive cloud shell and disconnects from your **sandbox**.

## `clear`

Clears the terminal screen.

## `help`

Displays a simple help screen that shows all the available commands and their options.
