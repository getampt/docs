---
title: Ampt Ignores
description: Control what gets synced and deployed to Ampt environments
---

## Ampt Ignore

To ignore files or directories _entirely_, you can specify them in an `.amptignore` file. `.amptignore` adheres to the same format as a `.gitignore` file:

```txt
.github
.git
```

All entries within an `.amptignore` are never synced, or deployed, to any environments. This can be useful for ignoring artifacts that aren't used or referenced in your Ampt application, like a `.git` folder, for example.

## Deploy Ignore

To specify files or directories that don't need to be included in a deploy's bundle, you can specify them in the same way within a `.deployignore` file. This can be useful for leaving out things like dev `.json` files, or SPA frontend source code:

```txt
src // React app
test-data.json // @ampt/data seed file
```

Keep in mind, these files will _still_ be synced, and accessible in an application's _build_ step. Only during the package phase, they are ignored. This can help trim down an app's total bundle size, by leaving out code that is only needed during the build step.
