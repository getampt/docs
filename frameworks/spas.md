---
title: React, Vue, and other SPAs
description: Build and deploy single-page applications to Ampt.
---

## Ignoring Build-time Only Files

If you are using a SPA framework or static site generator that requires a _build_ step, you can store your source files in your project directory and configure your output directory to be `/static`. To prevent Ampt from syncing source files to your developer sandbox, you can add an **`.amptignore`** file in the root of your project and add a list of directories and files you do not wish to sync.

For example, if your front-end source files are stored in `/src`, your **`.amptignore`** file should contain the following:

```txt title=.amptignore, copy=false
./src
```

!!! note
Please be sure to restart your shell after changing the `.amptignore` file.
!!!

## Managing SPA dependencies

Any SPA related dependencies you may have defined in your `package.json` are only needed at build time when deploying to a stage environment.

For example, if a large React dependency like `@mui/material` is defined in `dependencies`, Ampt's builder will assume these are _runtime_ dependencies, and include them in your final bundle. This could lead to bundle size limits being hit. Instead, include any SPA dependencies as `devDependencies`:

```json
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.13.0",
    "vite": "^4.0.3"
  },
  "dependencies": {
    "@ampt/sdk": "^1.0.0",
    "express": "^4.18.2"
  },
```

## Returning index.html for all paths

SPAs typically serve a single `index.html` for all paths. See the [HTTP interface documentation](/docs/http/#single-page-applications-spas) for details on how to do this. Using express, you would do the following:

```javascript
import { http } from "@ampt/sdk"
import express from "express"

const app = express()

app.use('/api', ...)

app.use((req, res) => {
  // Return "static/index.html"
  res.status(200).set('Content-Type', 'text/html')
  const stream = await http.node.readStaticFile("index.html")
  return stream.pipe(res)
})
```
