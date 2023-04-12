---
title: CI/CD
description: Use your own CI/CD provider to deploy your Ampt applications.
---

You can use a CI/CD provider to test and deploy your Ampt applications.

First create an API key in the Ampt dashboard by visiting https://ampt.dev/orgs/{your-org-id}/settings/apikeys, and add it as an environment variable named `AMPT_API_KEY` in your CI/CD environment.

You can then use the `ampt deploy` command to deploy to a stage such as `prod`.

## GitHub Actions Example

Below is a simple example of an automated deployment workflow using GitHub actions.

```yaml
# .github/workflows/deploy.yml

name: deploy
on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    env:
      AMPT_API_KEY: ${{ secrets.AMPT_API_KEY }}
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v1
        with:
          node-version: 18
      - run: npm ci
      - run: npx @ampt/cli deploy prod
```
