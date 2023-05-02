---
title: Migrate from Serverless Cloud
description: Use this guide to easily migrate your Serverless Cloud apps along with their data, storage and parameters to the Ampt platform.
full: true
---

!!! note Important Note
Ampt is currently in **PRIVATE BETA**. If you're a Serverless Cloud user with an existing app and you don't have an Ampt account, please sign up for the [waitlist](https://ampt.dev) and email support@getampt.com.
!!!

<div class="font-medium text-xl pb-6 pt-4">Migrate your Serverless Cloud app</div>

<!-- Step 1-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">1</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Install the Ampt CLI</div>
                <div class="text-base pt-1 pb-6 xl:pb-16">In your terminal, make sure you have <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">Node.js v15+ and npm installed</a>. Then run the following command to install the Ampt CLI.</div>
        </div>
<div class="w-full xl:w-[55%] pb-16">

```terminal class="no-margin", title="Terminal"
> npm i -g @ampt/cli
```

</div></div>
<!-- Step 2-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">2</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Start the Ampt CLI</div>
                <div class="text-base pt-1 pb-6 xl:pb-16">Navigate to your Serverless Cloud project folder and run <code>ampt</code> to create the app and spin up a new developer sandbox. This will prompt you to install the <code>@ampt/cloud</code> package.</div>
        </div>
<div class="w-full xl:w-[55%] pb-16">

```terminal class="no-margin", title="Terminal", copy="false"
> ampt

ampt ⚡ (beta)

⚠ This looks like a @serverless/cloud project.

Install @ampt/cloud to allow it to run on Ampt,
or migrate your project to use the Ampt SDK.
```

</div></div>
<!-- Step 3-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">3</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Install <code>@ampt/cloud</code></div>
                <div class="text-base pt-1 pb-6 xl:pb-16"><p class="no-margin">Using the Ampt CLI prompt, install the <code>@ampt/cloud</code> package.</p><p>In most cases, this will be the only step needed for migration. However, if you're migrating a <a href="/docs/frameworks/next/">Next.js</a>, <a href="docs/frameworks/remix/">Remix</a>, or <a href="/docs/frameworks/astro/">Astro</a> app, you'll need to make minor adjustments to your config files. Consult the documentation for the necessary changes.</p></div>
        </div>
<div class="w-full xl:w-[55%] pb-16">

```terminal class="no-margin", title="Terminal", copy="false"
ampt ⚡ (beta)

> install @ampt/cloud
```

</div></div>
<!-- Step 4-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">4</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Migrate data, storage, and params</div>
                <div class="text-base pt-1 pb-6 xl:pb-16">Type <code>open</code> in to the Ampt CLI to open your Ampt Dashboard (<a href="https://ampt.dev" target="_blank">ampt.dev</a>). Click on your developer sandbox environment, then click "Migrations" in the top navigation bar.</div>
        </div>
<div class="w-full xl:w-[55%] pb-16">

```terminal class="no-margin", title="Terminal", copy="true"
ampt ⚡ (beta)

> open
```

</div></div>
<!-- Step 5-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">5</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Connect your Serverless account</div>
                <div class="text-base pt-1 pb-6 xl:pb-16"><p class="no-margin">On the Migrations page of the dashboard, click the "<strong>Connect a Serverless account</strong>" link. Login to your Serverless account using the email/password or Social Login associated with your Serverless Cloud account.</p><p>Once logged in, you'll be redirected back to the Migrations page.</p></div>
        </div>
<div class="w-full xl:w-[55%] pb-16"><div class="w-full border border-gray-300 drop-shadow bg-black dark:bg-gray-800 dark:border-gray-500 rounded-md text-center py-12 px-10 text-black dark:text-gray-100"><div class="mx-auto text-ampt-purple px-2 py-2 text-base rounded-md hover:bg-ampt-purple/20 cursor-default max-w-xs">Connect a Serverless account</div></div></div></div>
<!-- Step 6-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">6</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Start a migration</div>
                <div class="text-base pt-1 pb-6 xl:pb-16"><p class="no-margin">Click the "<strong>Start a new migration</strong>" button and then select the options for your migration.</p><p>Select the <strong>Serverless Cloud instance</strong> you wish to migrate from the drop down menu.</p><p><strong>Clear data before import</strong> will delete any data in the target environment's data table. This is useful for reimporting data after testing.</p><p><strong>Copy parameters</strong> will copy over the source instance's Org parameters as well as the app and instance level overrides. <strong class="text-ampt-purple">NOTE:</strong> Org parameters and App overrides <strong>will not</strong> overwrite values that already exist. If you want to reimport a value, delete the parameter from the Ampt dashboard.</p><p><strong>Copy storage</strong> will copy any Serverless Storage objects to Ampt Storage. <strong class="text-ampt-purple">NOTE:</strong> This will overwrite objects with the same name.</p><p><strong>Copy data</strong> will copy Serverless Data items to Ampt. <strong class="text-ampt-purple">NOTE:</strong> This will overwrite existing items with the same keys.</p><p>Click "<strong>Start migration</strong>" to start the process. <strong class="text-ampt-purple">NOTE:</strong> Depending on the amount of information being migrated, this could take several minutes.</p></div>
        </div>
<div class="w-full xl:w-[55%] pb-16"><div class="w-full border border-gray-300 drop-shadow bg-black dark:border-gray-500 rounded-md p-4 text-black dark:text-gray-100"><div class="mx-auto max-w-md xl:max-w-full"><img src="/images/docs/sc-migration.png" class="rounded-md no-margin" /></div></div></div></div>
<!-- Step 7-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">7</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Test and deploy your app</div>
                <div class="text-base pt-1 pb-6 xl:pb-16"><p class="no-margin">Test the application in your developer sandbox to ensure everything is running correctly.</p><p>Once you've verified your app is working, deploy it to a permanent stage such as <code>prod</code></p></div>
        </div>
<div class="w-full xl:w-[55%] pb-16">

```terminal class="no-margin", title="Terminal", copy="false"
ampt ⚡ (beta)

> deploy prod
```

</div></div>
<!-- Step 8-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">8</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Migrate production data, storage, and parameters</div>
                <div class="text-base pt-1 pb-6 xl:pb-16">Once your app has deployed, go back to the Ampt Dashboard (type <code>open</code> in the Ampt CLI), navigate to the permanent instance you just created, and start a new migration.</div>
        </div>
<div class="w-full xl:w-[55%] pb-16"><div class="w-full border border-gray-300 drop-shadow bg-black dark:bg-gray-800 dark:border-gray-500 rounded-md text-center py-12 px-10 text-black dark:text-gray-100"><div class="mx-auto bg-ampt-purple px-2 py-2 text-base text-white rounded-md font-normal hover:bg-ampt-purple/80 cursor-default">Start a new migration</div></div></div></div>

<!-- Step 9-->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">9</span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Transfer your custom domain</div>
                <div class="text-base pt-1 pb-6 xl:pb-16"><p class="no-margin">Be sure to run any final tests against your permanent stage in Ampt before transferring your domain name.</p><p>When you're ready to send traffic to your app on Ampt, you can detach the custom domain (if any) from your Serverless Cloud app and <a href="/docs/custom-domains/">assign it to your permanent stage</a> on Ampt.</p><p><strong class="text-ampt-purple">NOTE:</strong> You may want to re-migrate your data and/or storage once the domain is transferred in case any production data may have changed.</p></div>
        </div>
<div class="w-full xl:w-[55%] pb-16"><div class="w-full border border-gray-300 drop-shadow bg-black dark:border-gray-500 rounded-md p-4 text-black dark:text-gray-100"><div class="mx-auto max-w-md xl:max-w-full"><img src="/images/docs/custom-domain.png" class="rounded-md no-margin" /></div></div></div></div>
<!-- Final -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1">
        <div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" /></svg></span></div>
        <div class="pr-6 flex-1">
                <div class="text-base font-medium">Congratulations, your Serverless Cloud app is running on Ampt! 🚀</div>
                <div class="text-lg pt-1 pb-2"><p>You can now manage your apps through the Ampt dashboard and develop using the Ampt CLI. If you have any existing Github integrations or <a href="/docs/cicd/">CI/CD pipelines</a>, please be sure to update them accordingly to use Ampt.</p><p>If you have any issues, please visit our <a href="/discord">Discord</a> or email us at <a href="mailto:support@getampt.com">support@getampt.com</a>.</p></div>
        </div>
</div>
