---
title: Apps & Environments
description: Ampt allows you to organize workloads into apps with isolated environments.
---

Ampt's isolation model lets developers rapidly iterate on applications without needing to share services or worry about resource contention. Whether your a solo developer or a team collaborating with colleagues, Ampt reduces the development feedback loop and accelerates the path to production without sacrificing standard CI/CD and testing processes.

## Apps

Ampt allows you to build **apps** within your **organization**. **Apps** are extremely flexible. They can be entire full-stack applications, independent microservices, isolated backends, or a frontend website backed by a global CDN. You decide how to structure your project using as many apps as you want.

## Environments

The actual code and resources for an **app** run in isolated **environmemts**. Each **environment** contains its own set of independent resources including separate copies of data and storage. The resources within each **environment** are identical, so you can ensure that your application will run the same way across all phases of development.

Ampt's isolation model and rapid provisioning technology uses **environment "types"** to enable incredibly powerful workflows.

### Developer Sandboxes

Every developer on your team gets their own **developer sandbox** for every **app** they work on. Each **developer sandbox** is your own "personal development workspace" that automatically syncs and deploys changes from your local environment as you code (in under a second). To enable interactive development mode, type `ampt` into the CLI within your project directory. This will spin up and connect you to your own environment with isolated resources. Your **developer sandbox** gets its own public URL that you can use to test and interact with your application. The logs from your sandbox will stream instantly into your terminal, giving you immediate feedback on any changes you make.

### Permanent Stages

When you're ready to show your work to the world, you can **deploy** your code to a **stage**. These are permanent, long-running instances like `prod`, `qa-test` and `dev`. If you want to publish your code to one of these instances, simply type `deploy my-stage-name` into your Ampt CLI and your **app** will be published to `my-stage-name`.

### Preview Environments

If you want to get feedback on your application but aren't ready to publish it to one of the permanent stages above, you can created a **preview environment** instead. Type `share` into the Ampt CLI, and Ampt will create a **preview** that contains your **code AND data**. **Preview environments** are just like **stages**, except that previews will automatically expire when they are no longer being used.
