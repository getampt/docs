---
title: Standard Mode
description: CLI to run commands from your terminal to manage the lifecycle of your Ampt application.
---

Standard mode allows developers to run commands from your terminal without having to open an interactive session. Login is still required.

## `ampt login`

Logs the user in via the browser. You will need to verify the code you see in the browser.

## `ampt logout`

Logs the user out of the current session

## `ampt share [NAME]`

Deploys the code AND data from your sandbox to a preview stage named NAME. If no NAME is provided, a randomly generated name will be created for you.

A preview environment is an ephermeral environment that you can use to easily share your work with others. Previews allow you to create a stable snapshots of your sandbox so that you can get feedback while continuing to make changes to your own version.

## `ampt deploy [NAME]`

Deploys the code from your local directory to the provided permanent environment. If no NAME is provided, it will prompt you for an environment name.

A permanent environment is a long-lived stage/environment to host your app. Common names for permanent environments are `prod`, `staging`, qa, and dev.

If a script named `ampt:build` is defined in package.json, it will be run before deploying.

## `ampt install [PACKAGENAME]`

Installs the specified npm package into your application. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

## `ampt uninstall [PACKAGENAME]`

Uninstalls the specified npm package from your application.

## `ampt run [script][-- npm-arguments [-- script-arguments]]`

Runs the npm script `ampt:<script>` locally on your sandbox. The script will have access to the selected stage's params, data, and storage.

You may pass additional arguments to npm by adding a double dash followed by the arguments, and another double dash to pass arguments to the script. For example `cloud run migrate --if-present -- script-argument --script-option` will result in running `npm run cloud:migrate --if-present -- script-argument --script-option` using the sandbox environment.

## `ampt import [FILENAME] [--overwrite]`

Seeds data from the `FILENAME` in your local directory to your **sandbox**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and reseeded.

## `ampt export [FILENAME] [--overwrite]`

Exports data from your **developer sandbox** to a JSON file named `FILENAME` in your current working directoy. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `--overwrite` flag to overwrite the existing file.

## `ampt version`

Displays the running version of the CLI. `-v` flag is the short form for version.

## `ampt url`

Displays the current URL of your **sandbox**.

## `ampt help`

Displays a help screen that shows all the available commands and their options.
