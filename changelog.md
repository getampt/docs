---
title: Changelog
description: Changelog for the Ampt platform is updated on a weekly basis to include the latest updates and improvements.
---

## 2023-04-06

**Improvements**:

- Introducing WebSockets support! You can now build real-time communication apps using Ampt. Check out our [documentation](/docs/building-blocks/websockets) and [announcement blog](/blog/introducing-websockets/) for more information. You can also try out our [sample app](https://github.com/getampt/templates/tree/main/templates/websockets) to see it in action.
- We're excited to introduce the `deploy` command! With this, you can deploy your apps to permanent environments. These environments are available 24/7 to serve your production traffic.
- We've added the capability to detect outdated versions of `@ampt` packages. The CLI will prompt you to update outdated dependencies before starting the sandbox environment.

**Bug Fixes**:

- We've fixed some broken links to the documentation on the Ampt Dashboard to make it easier for you to access the information you need.
- We've made several improvements to the CLI experience to provide a smoother and more efficient experience for you.

## 2023-03-31

**Improvements**:

- Introducing Next.js support! Now you can build full-stack applications with Next.js 12 and Ampt together. See the docs here: https://www.getampt.com/docs/frameworks/next. We've added a sample app to the quickstart menu, and you can check out the source code for the same app at https://github.com/getampt/templates/tree/main/templates/nextjs.
- We've added search capabilities to our documentation! Our documentation is an essential knowledge base for building native cloud applications, and now you can easily find content, titles, and code examples with our search feature.

**Bug Fixes**:

- During the Ampt Private beta, we had a limit of 10 environments per account, but the error message we threw when the limit was reached was not easily understandable for end-users. We've fixed this issue, ensuring that you can easily manage your environments on our platform. If you hit the environment limit, simply go back to the Ampt Dashboard and delete unnecessary apps.
- We've resolved some conflicts between Next.js and our http interface that supports adding Node-based web frameworks such as Express and Koa. This means you can now use Next.js seamlessly with Ampt, giving you more flexibility when building your applications.


## 2023-03-24

**Improvements**:

- We’ve published our documentation at https://www.getampt.com/docs, so you can easily reference it for all your development needs.
- To make accessing our documentation even easier, we’ve added a link to the dashboard.
- Introducing the share command! This new feature lets you create previews of your work on a sandbox environment, allowing you to share your progress with the world while you continue to build.
- We’ve added the ability to define tasks using schedule.task and run them using schedule.at from API handlers at a specific date.
- You can now test your schedulers easily with our new feature that allows you to run schedulers from the dashboard for sandbox environments.
- We’ve adjusted the font size for the log details page on the dashboard to make it more readable.

**Bug Fixes**:

- We’ve resolved an issue where schedules defined using the cron() method weren’t showing up on the dashboard. This has now been fixed, so you can stay on top of your schedule with ease
