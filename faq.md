---
title: Frequently Asked Questions
description: A list of most popular questions and their answers on Ampt. 
---

## Introduction to Ampt

### What’s Ampt and what problem does it solve?
Ampt allows developers to rapidly build, deploy, and scale JavaScript apps in the cloud without complicated configs or managing infrastructure. Whether you're an experienced cloud expert or just starting out, dealing with infrastructure complexity often means making numerous decisions before focusing on your core business logic. Ampt is designed to remove this undifferentiated heavy lifting associated with cloud application development. This streamlined approach positions Ampt as the fastest way to get done on the cloud. If you're fluent with JavaScript, you are now secure, performant, scalable cloud apps thanks to our unique "Infrastructure FROM Code" methodology familiar and user-friendly.

### What does Infrastructure FROM Code mean?
Unlike Infrastructure as Code (IaC), which is used for defining resources required for an application with machine-readable formats such as YAML, Infrastructure FROM code means that the cloud platform you are working with spins up the most suitable resources to make sure that your application is performant and secure. It further guarantees that the resources allocated will be scaled up automatically as the traffic increases. Just write code for the business logic of application and the required resources will be provisioned, managed and scaled on behalf of you.

### How does Ampt work?
Ampt provides the CLI to integrate with your developer sandbox, an SDK to build applications, and the dashboard to manage your applications. Using Ampt, you can focus on building business logic as Ampt infers the required infrastructure, provisions and manages it to AWS accounts that we manage on behalf of you and optimizes it according to the traffic and cost requirements. While you retain control on specific configurations like timeout for APIs and TTL for data, Ampt decides on the optimal infrastructure for your application and automatically deploys and maintains it.

### What’s the local development experience with Ampt?
The Ampt CLI dynamically monitors changes in your project directory, syncing them to your personal, fully-isolated developer sandbox linked to an actual AWS account pre-provisioned just for you. Furthermore, Ampt retains the rapid-refresh features of leading front-end platforms such as Next.js, Remix, Astro, and SvelteKit. This is achieved by seamlessly integrating the servers of these frameworks into the Ampt CLI. This setup allows for real-time debugging and development of your full-stack application within the developer sandbox. When you're ready to deploy your application to a stable environment tailored for production needs, you can simply use the `deploy` command in the Ampt CLI. Alternatively, if you've linked your repository with your application, a simple code commit prompts Ampt to prepare a new AWS account for your service in mere moments.

### How does Ampt differ from AWS, Azure, and GCP?
Big cloud vendors like AWS, Azure, and GCP are doomed to be complicated as there are hundreds of services and thousands of configurations to choose from. Lots of developers find using them discouraging due to the steep learning curve. With Ampt, you can start building with an Express.js(or any other JavaScript framework for API development), a built-in key-value database, a global CDN, event-driven applications, and a file storage manager. Moreover, you can integrate with your front-end platform of choice to gain the full stack experience. You don’t need to make infrastructure decisions or read thousands of pages of documentation. Just write JavaScript, and you’re done. Ampt is using native AWS services as the deployment target for the cloud applications and can deploy Azure and GCP in the future.

### How does Ampt differ from Netlify and Vercel?
While Netlify and Vercel excel in simplifying frontend app deployment with their robust workflow features, their backend capabilities are largely restricted to functions for data retrieval and third-party API interactions. Even with recent additions such as database, cache, and file storage, these services rely on partner technologies and remain proprietary. In contrast, Ampt operates transparently on AWS accounts that we manage. Furthermore, a distinguishing feature of Ampt is its ability to deploy directly to users' own AWS accounts, offering unparalleled transparency.

### How does Ampt differ from Heroku?
Heroku is great for getting up-and-running fast as it’s less complex than AWS but it still requires developers to manage and maintain the deployment and orchestrations of the services. Besides, it limits users with slow deployments, inflexible development workflows and. Ampt is more than a PaaS with fast code syncs on developer sandboxes, fast deployments, flexible workflows.

## Getting Started with Ampt

### Which programming languages are supported by Ampt?
Ampt currently supports JavaScript and TypeScript with Node version 18.x and higher. We are working on bringing support for Bun and Deno runtimes soon. 

### What interfaces does Ampt provide to develop cloud applications?
Ampt’s SDK provides interfaces called `http`, `task`, `params`, `storage`, `events`, and `websockets`. We also provide separate modules called `@ampt/data` and `@ampt/api`(beta) for database operations and fetch based APIs. Ampt lets you migrate existing JavaScript APIs built by Node based frameworks, or build new ones, store/retrieve K/V and binary data, schedule periodic or one-off tasks, securely store your secrets, and build event-driven applications just by writing code.

### What types of applications can we develop using Ampt?
Ampt allows developers to build different types of applications like full-stack apps integrated with well-known frontend frameworks like React and Vue, or full stack frameworks like Next.js, Remix, or Astro. It’s also possible to build backends for mobile or web applications, third-party integrations, event-driven applications and more.

### Can I assign custom domains to the apps developed with Ampt?
Yes. Ampt supports custom domain names on our paid plans.

### How does Ampt interact with front-end applications with SPAs?
Ampt allows developers to integrate with popular frameworks such as React, SvelteKit, Astro, 11ty.dev, Vue and more. You can add your `build` and `dev` scripts, and any other scripts that enable you to build your frontend application and deploy alongside with Ampt backend. Ampt’s local proxy integrates with the local versions of such frameworks and provides an unmatched full-stack application development experience. 

### How can I integrate Ampt with my custom CI/CD pipeline?
Ampt already provides built-in CI/CD if you connect your repository to Ampt allowing you to create preview environments per pull request and automatic deployments with push commits. However, you can also integrate your favorite CI tool using Ampt CLI’s headless mode. You’ll need to retrieve an access key and use it to authenticate your CI tool for Ampt deployments.

### Can I set the region for my applications?
For now, yes you can deploy your applications to all AWS regions if you’re in Team plan and more. Some of them might not seem available on Ampt Dashboard. Please [contact us](mailto:sales@getampt.com) for the regions that you want to deploy via Discord.

### Can I deploy Ampt applications to my AWS account?
It’s possible to deploy applications to users’ AWS accounts for the Enterprise Plan. Please contact us via sales@getampt.com for making the custom integration to your AWS accounts. 

### Can I deploy Ampt applications to any cloud vendor other than AWS? 
For now, we are only focused on AWS as the deployment target. However, we want to make it possible to deploy to other cloud vendors like GCP and Azure in the future.

### Can I host static applications and websites on Ampt?
Yes. You can just put your static content under the “/static” folder in your Ampt project and Ampt automatically starts to serve those files from a global CDN without causing any invocation for you.

### How can I keep secrets that my application needs on Ampt?
Ampt allows developers to define the secrets that applications need using the Ampt Dashboard. You can programmatically read secrets using the `params` interface. All the secrets are encrypted at rest and transit and only available during runtime.

### How can I migrate existing applications written in different HTTP frameworks?
Ampt allows you to migrate the APIs written in Express.js, Koa, Restana and more using its `http` interface. Check out here for more information.

### How can I monitor my applications on Ampt?
Ampt Dashboard provides rich visualizations to track the important metrics of your application on any stage. You can also see the logs generated by your application and filter them. We are working on building integrations with well-known observability tools like Datadog and New Relic. Contact us via Discord if you need integration with your Datadog accounts.

### How can I collaborate with my colleagues on Ampt applications?
Ampt allows multiple seats in the paid plans. Ampt facilitates streamlined collaboration by integrating your code repository with your Ampt application. By creating a pull request against a chosen branch, a preview environment is established. For deployments, pushes to specified branches initiate the deployment process, simplifying the overall workflow.

### Does Ampt have a built-in relational database?
Not yet. We will provide this functionality by providing native integrations with serverless database vendors like PlanetScale, Neon, and Xata. Stay tuned for the updates.

### Does Ampt have a built-in cache?
Not yet. We will provide this functionality by providing native integrations with serverless cache vendors like Momento.
