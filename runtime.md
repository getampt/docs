---
title: Ampt Universal Runtime
description: Node-backed runtime layer that normalizes requests and execution across serverless, containers, and edge-based AWS compute.
---

The Ampt Universal Runtime is a Node-backed layer that sits in front of your application code to normalize incoming requests and provide a consistent execution environment across AWS compute technologies. It adapts events from different sources (API Gateway, Lambda function URLs, Fargate, Lambda@Edge, and more) into a single, predictable request format, so the same handler code runs on serverless functions, containers, and edge-based technologies without any application changes.

**Features include:**

- Support for Node.js v24.x, v22.x, v20.x, and v18.x
- Automatic TypeScript transpilation with source maps and tsconfig paths support
- Hot-reloading of code in dev mode
- Request adaption from various event sources into a consistent format (e.g. fetch)
- HTTP response streaming support across all supported compute targets
- Consistent error handling, logging, and request metadata regardless of the underlying compute

Depending on your project's needs, you can configure the runtime and build version using the settings below.

## Runtime version

The `runtime` setting controls the version of the Ampt runtime used to run your application code.

```json title=package.json, copy=false
{
  "ampt": {
    "runtime": "nodejs24"
  }
}
```

The available runtime versions are:

- `nodejs24`: Node.js v24.x (default)
- `nodejs22`: Node.js v22.x
- `nodejs20`: Node.js v20.x
- `nodejs18`: Node.js v18.x (deprecated)

!!! caution Deprecation Warning
The `nodejs18` runtime is deprecated and will be removed in a future release. We recommend migrating to `nodejs24` and testing your application in a development environment before deploying to production.
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
    "buildRuntime": "nodejs24"
  }
}
```

The available build runtime versions are:

- `nodejs24`: Node.js v24.x (default)
- `nodejs22`: Node.js v22.x
- `nodejs20`: Node.js v20.x
- `nodejs18`: Node.js v18.x (deprecated)

!!! caution Deprecation Warning
The `nodejs18` build runtime is deprecated and will be removed in a future release. We recommend migrating to `nodejs24` and testing your build scripts in a development environment before deploying to production.
!!!

We recommend updating to the latest build runtime version. Always test your build scripts in a development environment before deploying to production.

[contact-us]: https://getampt.com/contact
