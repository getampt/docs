---
title: React, Vue, and other SPAs
description: Build and deploy single-page applications to Ampt.
---

If you are using a SPA framework or static site generator that requires a _build_ step, you can store your source files in your project directory and configure your output directory to be `/static`. To prevent Ampt from syncing source files to your developer sandbox, you can add a **`.amptignore`** file in the root of your project and add a list of directories and files you do not wish to sync.

For example, if your front-end source files are stored in `/src`, your **`.amptignore`** file should contain the following:

```txt title=.amptignore, copy=false
src
```

!!! note
Please be sure to restart your shell after changing the `.amptignore` file.
!!!
