---
title: Ampt Universal Runtime
description: Node-based, WebAPI standardized runtime that provides a consistent execution environment across serverless, containers, and edge-based technologies.
---

We'll be providing more information about the Ampt Universal Runtime soon.

**Current features include:**

- Node v18.x
- Automatically transpiles TypeScript with source maps and supports tsconfig paths
- Reloads code in dev mode
- WebAPI polyfilled
- HTTP response streaming support
- Adapts requests from various event sources into a consistent format (e.g. fetch)

Depending on your project's needs, you can configure the runtime and build version using the settings below.

## Runtime version

The `runtime` setting controls the version of the Ampt runtime used to run your application code.

```json title=package.json, copy=false
{
  "ampt": {
    "runtime": "nodejs18"
  }
}
```

The available runtime versions are:

- `nodejs18-beta` (default): Node.js v18.x, with non-standard Fetch API polyfill
- `nodejs18`: Node.js v18.x, with standard Fetch API polyfill

!!! note
Support for `nodejs20` is coming soon.
!!!

We recommend updating to the latest runtime version, and testing your application in a development environment before deploying to production.

## Build version

The `buildRuntime` setting controls the version of the Ampt runtime used to build your application.

!!! caution
Any build scripts that generate server-side code must target your selected runtime version.
!!!

```json title=package.json, copy=false
{
  "ampt": {
    "buildRuntime": "nodejs20"
  }
}
```

The available build runtime versions are:

- `nodejs16` (default): Node.js v16.x
- `nodejs20`: (recommended) Node.js v20.x

!!! note
There are no plans to offer a `nodejs18` build runtime version, since Node.js v20.x is now LTS. If you have a need for Node.js v18.x for your build scripts, please [contact us][contact-us].
!!!

We recommend updating to the latest build runtime version. Always test your build scripts in a development environment before deploying to production.

[contact-us]: https://getampt.com/contact
