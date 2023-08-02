---
title: Changelog
description: Changelog for the Ampt platform is updated on a weekly basis to include the latest updates and improvements.
---

## 2023-08-01

**Improvements**:

- We introduced `task` interface that enables users to run one-off or recurring tasks that can take more than the previous limit of 5 minutes. With our new smart compute capability, we dynamically switch customer code between AWS Lambda, AWS Apprunner, and AWS Fargate. Check out the [announcement blog post]() for more information. 
- We improved our logs page drastically for better filtering and navigation. You can now filter the logs according to log level and select logs in any time interval more flexibly. 
- We improved the tips experience on CLI that could be annoying for power users. Note that you can always run `help` to see the available commands that you can use with Ampt CLI. 
- We were allowing only one custom domain per stage and this was restricting some of our users. We bumped this limit to 2. Please don't hesitate to ping us if you need even more. 

**Bug Fixes**:

- `null` values were not shown in the Data Page for any stage. We fixed this issue. 
- We fixed the issue when `deploy` command wasn't producing the deployment logs while the logs were available via Ampt Dashboard. 
- We realized that code sync process seems to be succeeded although the files are not synced to storage of the sandbox environment. We have fixed this issue. 

## 2023-07-11

**Improvements**:

- We introduced support for HTTP response streaming, enabling faster and more efficient responses. Check out the [announcement blog](https://getampt.com/blog/introducing-http-response-streaming/) for more information.
- We have made several improvements to the `@ampt/data` package to enable existence checks, conditional labels, integrity checks with “created date”, and more. Check out the [full blog post](https://getampt.com/blog/introducing-data-defaults-and-existence-checks/) to learn more on these updates.
- The default timeout for events is extended to 60 seconds, providing additional flexibility for handling complex processes.
- We expanded the capability to invoke scheduled tasks from the dashboard to all stages, not just limited to developer sandboxes.

**Bug Fixes**:

- Branch names containing special charachters were causing errors when creating preview environments. This issue is now resolved. 
- We fixed the color codes in the "Deployments" tab for stages, ensuring accurate visual representation.
- We addressed pagination issues with the @ampt/data library's getByLabel method, allowing for correct retrieval of records.
- We synchronized the time for deployment logs with user’s local time, aligning it with runtime logs for improved clarity.
- We resolved the problem where invited users were added as members instead of admins, ensuring proper access privileges.
- We fixed the redundant pagination problem on the Ampt Dashboard’s Data page when the records can fit on a single page.
- We resolved the issue encountered when using the root path for APIs with the @ampt/api library. 
- We fixed the limitation that prevented non-admin users from overriding params for sandboxes. This will grant developers the necessary flexibility they need while working in their sandbox.
- We addressed the synchronization issue between code changes and the local dev server when using the ampt dev command in the CLI for full stack applications.
- We updated the help command in the Ampt CLI, ensuring all commands are properly documented and accessible.

## 2023-05-23

**Improvements**:

- We introduced the `@ampt/cloud` package and a comprehensive migration guide for seamlessly migrating Serverless Cloud apps to Ampt. Check out the [full blog post](https://getampt.com/blog/serverless-cloud-migration/) for detailed information.
- We created the GitHub Integration, enabling smoother collaboration and streamlined workflows. Explore the [full blog post](https://getampt.com/blog/introducing-github-integration/) to learn more.
- We enhanced the functionality of custom scripts in Ampt environments by adding the ability to include params. For more information, refer to the [documentation](https://getampt.com/docs/scripts/#additional-npm-and-script-arguments).
- Custom domain experience is now improved by adding the ability to use wildcards (e.g., "*.example.com") when adding a custom domain.
- We enabled the loading of other projects through symlinks, catering to customers' needs to link multiple projects together.
- We have introduced compatibility with AWS AppRunner for infrastructure deployment. Although users may not notice a difference, this update provides enhanced portability between serverless functions and containers. Stay tuned as we continuously expand our container support with new services like AWS Fargate.

**Bug Fixes**:

- The issue related to cookie settings for Fastify and Express applications is resolved.
- We addressed minor UI errors in the deployment logs page, ensuring a smoother user experience.

## 2023-04-24

**Improvements**:

- We've added Regions support for Ampt apps! Ampt now supports the following AWS regions: us-east-1 (N. Virginia), us-west-2 (Oregon), eu-west-1 (Ireland), eu-west-2 (London), eu-central-1 (Frankfurt), ap-northeast-1 (Tokyo). Check out [our announcement](https://getampt.com/blog/introducing-regions/) for more information.
- During CLI startup, we now check the version of Node to ensure compatibility with Ampt. Note that Ampt requires Node 15+ to work correctly.
- You can now delete environments from the dashboard, giving you more control over your resource management.

**Bug Fixes**:

- We added some checks on the dashboard to prevent the creation of malformed org names which made accounts unreachable from the Ampt dashboard.
- We fixed broken links in the "empty app screen" to make it easier for you to navigate the Ampt dashboard.
- `data.on` change handler was missing the previous state of the record. We have now resolved this issue.
- We fixed an issue where querying items with a key on the dashboard wasn't working correctly.
- `@ampt/api` routes were not showing correctly on the dashboard. This has been fixed.

## 2023-04-06

**Improvements**:

- Introducing WebSockets support! You can now build real-time communication apps using Ampt. Check out our [documentation](/docs/websockets/) and [announcement blog](/blog/introducing-websockets/) for more information. You can also try out our [sample app](https://github.com/getampt/templates/tree/main/templates/websockets) to see it in action.
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
