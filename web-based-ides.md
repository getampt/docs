---
title: Using Web-based IDEs
description: Use Ampt with web-based IDEs like GitPod & GitHub Codespaces
---

You can develop and deploy Ampt applications using web-based IDEs like GitPod and GitHub Codespaces. These platforms provide a fully integrated development environment in your web browser, allowing you to code, build, and deploy your applications without installing any software on your local machine.

## Using GitPod (Recommended)

You'll first need to [sign up for GitPod](https://gitpod.io). From there, you can start a workspace from any public GitHub repository. If you authorized via GitHub, you can also use any private repositories you have access to.

While GitPod should works fine with Ampt by installing the CLI, if you plan to regularly use GitPod, you should set a `.gitpod.yml` file in your repository to automatically install the Ampt CLI and start the CLI whenever the workspace is opened.

Make a new `.gitpod.yml` file in the root of your repository with the following content:

```yml
tasks:
  - init: |
      if [ ! -d "node_modules" ] || [ ! -d "node_modules/@ampt/cli" ]; then
        npm i @ampt/cli@latest --save-dev
      fi
    command: npm run gitpod:ampt
```

Since GitPod purges anything globally installed when the workspace is restarted, this installs the Ampt CLI to your `devDependencies`. This is automatically ignored by Ampt's builder and sync processes.

In your `package.json`, add a new script to start the Ampt CLI:

```json
{
  "scripts": {
    "gitpod:ampt": "./node_modules/.bin/ampt"
  }
}
```

This is completely optional, but since the CLI is not being installed globally, the regular `ampt` binary is not available in the workspace.

Now, if you don't have one already, make an `.amptignore` file in the root of your project. This file contains a list of files and directories that Ampt's sync process always ignores.

```txt
.gitpod.yml
.amptrc
```

This will ensure that the `.gitpod.yml` file and the `.amptrc` file are not synced to your Ampt app. When using GitPod, Ampt caches session information in your project directory, instead of the home directory. This will avoid needing to login to Ampt every time the workspace is restarted.

If you need any examples, all of Ampt's [starter templates](https://github.com/ampt-templates) come pre-configured for GitPod.

## Using GitHub Codespaces

You can also use GitHub Codespaces to develop and deploy Ampt applications. Codespaces is a web-based development environment that allows you to run code in a containerized environment in your browser. If you have a GitHub account, you have access to Codespaces for any public or private repository.

Similarly to GitPod, Ampt works by simply installing the CLI in the Codespaces environment. However, you can also create a `.devcontainer/devcontainer.json` file in your repository to automatically configure the environment when the Codespace is created. This is useful if using Codespaces to work on an Ampt project with a team.

Create a directory named `.devcontainer` in the root of your repository, and then create a new file named `devcontainer.json` with the following content:

```json
{
  "name": "Ampt + Node.js",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "features": {
    "ghcr.io/devcontainers/features/common-utils:2": {
      "installZsh": "true",
      "username": "node",
      "upgradePackages": "true"
    },
    "ghcr.io/devcontainers/features/git:1": {
      "version": "latest",
      "ppa": "false"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": ["dbaeumer.vscode-eslint"]
    }
  },
  "remoteUser": "node"
}
```

While `zsh` and `vscode-eslint` are optional, they are recommended, as a new GitHub workspace contains a fresh environment.

Next, create a `Dockerfile` within the same `.devcontainer` directory with the following content:

```Dockerfile
FROM node:20

ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global

ENV PATH=${NPM_GLOBAL}/bin:${PATH}

RUN \
    if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
    && su ${USERNAME} -c "umask 0002 && npm install -g eslint" \
    && npm cache clean --force > /dev/null 2>&1

RUN apt update && apt install -y xdg-utils

RUN su node -c "npm install -g @ampt/cli"
```

This configures Node and NPM for your workspace's container, and installs both `xdg-utils` and `eslint` globally. It also installs the Ampt CLI globally, which is automatically ignored by Ampt's builder and sync processes.

Finally, if you don't have one already, make an `.amptignore` file in the root of your project. This file contains a list of files and directories that Ampt's sync process always ignores.

```txt
.devcontainer/
```

Once committed to your repository, you can start a new Codespace by clicking the "Code" button, and then clicking the "Codespaces" tab. Then click "Create codespace on $branch". Once it has completed setup, simply run `ampt` as normal to start the Ampt CLI.

And lastly, you can always reference Ampt's [starter templates](https://github.com/ampt-templates) for examples of how to configure Codespaces.
