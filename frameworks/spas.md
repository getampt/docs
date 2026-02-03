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

## Configuring Client-Side Routing

Single-page applications (SPAs) use client-side routing to navigate between pages without full page reloads. When a user navigates to a route like `/about` or `/products/123`, the SPA's JavaScript router handles the navigation and updates the page content dynamically.

**However, there's a critical problem**: If a user refreshes the page or shares a deep link (like `https://yourapp.ampt.app/products/123`), the browser will request that exact path from your server. Without proper configuration, your server will return a **404 error** because it doesn't have a route handler for that path—only your client-side JavaScript router knows about it.

### The Solution: SPA Fallback Pattern

To make client-side routing work correctly, you need to configure your server to return `index.html` for **all paths** that aren't API routes or static assets. This allows your SPA's JavaScript to load and take over routing.

!!! caution
**This configuration is required for SPAs with client-side routing.** Without it, users will see 404 errors when refreshing pages or accessing deep links directly.
!!!

Here's how to implement the SPA fallback pattern using Express:

```javascript
import { http } from "@ampt/sdk"
import express from "express"

const app = express()

// IMPORTANT: Define API routes FIRST, before the fallback
app.use('/api', ...)

// SPA fallback: Return index.html for all other paths
app.use(async (req, res) => {
  res.status(200).set('Content-Type', 'text/html')
  const stream = await http.node.readStaticFile("index.html")
  return stream.pipe(res)
})

http.node.use(app)
```

!!! note
**Order matters!** The SPA fallback must come **after** all your API routes. Otherwise, API requests will receive `index.html` instead of your API responses.
!!!

This pattern ensures:
- Your SPA loads correctly for any route (e.g., `/`, `/about`, `/products/123`)
- Users can refresh the page without getting 404 errors
- Deep links work properly when shared
- Your client-side router takes over once the page loads

For more details, see the [HTTP interface documentation](/docs/http/#single-page-applications-spas).
