---
title: Ampt Universal Runtime
description: Node-backed, web standards runtime layer that provides a consistent execution environment across serverless, containers, and edge-based technologies.
---

The Ampt Universal Runtime is a layer applied to Node.js that adds support for web standards (like the FetchAPI) and adapts requests for consistent handling across AWS compute technologies. This lightweight runtime layer allows workloads to run on serverless functions (Lambda), containers (Fargate), and edge-based technologies (Lambda@Edge) without any application code changes.

**Features include:**

- Support for Node.js v18.x and v20.x
- Automatic TypeScript transpilation with source maps and tsconfig paths support
- Hot-reloading of code in dev mode
- WebAPI standardized fetch, streams, and webcrypto APIs
- HTTP response streaming support
- Request adaption from various event sources into a consistent format (e.g. fetch)

Depending on your project's needs, you can configure the runtime and build version using the settings below.

## Runtime version

The `runtime` setting controls the version of the Ampt runtime used to run your application code.

```json title=package.json, copy=false
{
  "ampt": {
    "runtime": "nodejs20"
  }
}
```

The available runtime versions are:

- `nodejs18`: Node.js v18.x, with standard Fetch API polyfill
- `nodejs20`: Node.js v20.x
- `nodejs22` (default): Node.js v22.x

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

- `nodejs18`: Node.js v18.x
- `nodejs20`: Node.js v20.x
- `nodejs22` (default): Node.js v22.x

We recommend updating to the latest build runtime version. Always test your build scripts in a development environment before deploying to production.

[contact-us]: https://getampt.com/contact
