---
title: Installation
description: Ampt lets developers write apps with their favorite tools and JavaScript frameworks, then automatically provisions, manages, and optimizes cloud resources for them.
altTitle: Get started with Ampt!
altDescription: Ampt lets developers write apps using their favorite tools, JavaScript frameworks, and npm packages, then automatically provisions, manages, and optimizes cloud resource by inferring requirements from the code.
---

<div class="font-medium text-xl pb-6 pt-4">Installation</div>

<div>
<!-- Step 1 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">1</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Install & start the Ampt CLI</div>
		<div class="text-base pt-1 pb-6 xl:pb-16">Navigate to an empty directory in your terminal and make sure you have <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">Node.js v16+ and npm installed</a>. Then run the following command to install and start Ampt.</div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">

```terminal title=Terminal, class="no-margin"
> npm i -g @ampt/cli
> ampt
```

</div></div>

<!-- Step 2 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">2</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Login to Ampt</div>
		<div class="text-base pt-1 pb-6 xl:pb-16"><p>The CLI will attempt to open a browser window to the Ampt dashboard. If your browser window doesn't open automatically, copy and paste the link provided in the CLI.</p><p>In the browser window, sign in or create a new Ampt account.</p></div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

ℹ You must login to proceeed.
ℹ Your browser should open automatically.
ℹ If not, open the following login url:
→ https://ampt.dev/activate?user_code=XXXX-XXXX
ℹ Your confirmation code is: ~~~text-ampt-pink font-bold~XXXX-XXXX~~~
⚠ This code will expire in 15 minutes.
```

</div></div>

<!-- Step 3 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">3</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Confirm your device</div>
		<div class="text-base pt-1  pb-6 xl:pb-16">Once signed in, you'll be asked to confirm that the code in the CLI matches the code in the browser.</div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">
		<div class="w-full border border-gray-300 drop-shadow bg-gray-50 dark:bg-gray-700 dark:border-gray-500 rounded-md text-center py-5 px-10 text-black dark:text-gray-100">
			<div class="text-2xl">Device Confirmation</div>
			<div class="text-base py-3">Please confirm this is the code displayed on your Ampt CLI:</div>
			<div class="bg-gray-100 border border-gray-300 rounded px-8 py-2 mx-auto dark:text-black">XXXX-XXXX</div>
			<div class="text-base py-3">If you did not initiate this action or you do not recognize this device select cancel.</div>
			<div class="flex px-10 gap-x-5">
				<div class="flex-1 rounded border border-gray-300 py-2">Cancel</div>
				<div class="flex-1 bg-ampt-blue text-white rounded py-2">Confirm</div>
			</div>
		</div>
	</div>
</div>

<!-- Step 4 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">4</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Go through the tutorial</div>
		<div class="text-base pt-1 pb-2 xl:pb-16">Ampt provides an out-of-the-box interactive tutorial to help new users get accustomed to Ampt workflows. <strong>This is optional, but highly recommended.</strong></div>
		<div class="text-base pt-1 xl:pb-16">If you started Ampt in an empty directory, you'll have a chance to use our preconfigured <a href="https://github.com/ampt-templates/tutorial" target="_blank">tutorial template</a>. If you started Ampt in an existing project directory, or want to use a template, you can still access the tutorial from the CLI using the <strong><em>tutorial</em></strong> command.</div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡
? Would you like to start the tutorial?
ℹ You've selected ~~~font-bold~yes~~~.
ℹ Enter a name for your app
⚡ › my-ampt-tutorial▊
```

</div></div>

<!-- Step 5 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">5</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Create a new app</div>
		<div class="text-base pt-1 pb-2 xl:pb-16">When started in an empty directory, Ampt will ask if you want to create a new app. Select "Yes" from the menu.</div>
		<div class="text-base pt-1 xl:pb-16">If you want to migrate an existing <strong>Node.js</strong> project to Ampt, just start the CLI in the project's directory.</div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">
	
```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

~~~whitespace-normal pl-5 -indent-5 inline-block~~~~text-ampt-pink~?~~~ Would you like to create a new app?~~~

› Yes
  ~~~text-gray-500~No~~~
```

</div></div>

<!-- Step 6 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">6</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Select a starter template</div>
		<div class="text-base pt-1 pb-6 xl:pb-16">Ampt provides a set of preconfigured templates to quickly bootstrap your project.</div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡
? Would you like to create a new app?
ℹ You've selected ~~~font-bold~yes~~~.
~~~whitespace-normal pl-5 -indent-5 inline-block~ℹ Choose a template to generate.~~~

› JavaScript API (Express)
  ~~~text-gray-500~TypeScript API (Express)~~~
  ~~~text-gray-500~React starter app~~~
  ~~~text-gray-500~Astro Web Store~~~
  ~~~text-gray-500~NextJS Starter Template (v12)~~~
  ~~~text-gray-500~WebSockets starter template~~~
  ~~~text-ampt-pink~...~~~
```

</div></div>

<!-- Step 7 -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">7</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Name your app</div>
		<div class="text-base pt-1 pb-6 xl:pb-16">The app name will default to your directory name. You can rename it here.</div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

ℹ You've selected ~~~font-bold~JavaScript API (Express)~~~.
ℹ Enter a name for your app
⚡ › my-cool-api ▊
```

</div></div>

<!-- Step 8  -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1 line-bg">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center">8</span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Start coding!</div>
		<div class="text-base pt-1 pb- pb-6 xl:pb-16"><p>Ampt generates the template code in your local directory, then spins up and connects to your isolated <span class="font-medium text-ampt-purple">developer sandbox</span> in the cloud.</p>
		<p>Open your project directory in your favorite IDE and just start coding! Every time you save your work, your changes will be synced and deployed to your developer sandbox in <span class="font-medium text-ampt-purple">less than a second</span>.</p>
		<p>Checkout the <a href="/docs/cli-interactive-shell/">CLI documentation</a> for more cool things you can do from the terminal. 🚀</p></div>
	</div>
	<div class="w-full xl:w-[55%] pb-16">

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

ℹ You've entered ~~~font-bold~my-cool-api~~~.
~~~whitespace-normal pl-5 -indent-5 inline-block~✔ Successfully generated app ~~~font-bold~my-cool-api~~~ in this directory.~~~

~~~whitespace-normal pl-5 -indent-5 inline-block~✔ Connected to ~~~text-ampt-pink~@org\/\text-ampt-purple~app\/\text-ampt-blue~username~~~~~~~
→ https://~~~italic text-gray-500~{your-unique-url}~~~.ampt.app
⚡ › ▊
```

</div></div>

<!-- Final -->
<div class="flex flex-wrap xl:flex-nowrap items-start gap-x-3 mb-1">
	<div class="flex-none"><span class="block bg-ampt-purple text-white text-sm rounded-full w-6 h-6 font-medium flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" /></svg></span></div>
	<div class="pr-6 flex-1">
		<div class="text-base font-medium">Congratulations, now you're Ampt! 😉</div>
		<div class="text-lg pt-1 pb-2"><p>Logs will be streamed directly into the interactive shell running in your terminal to give you immediate feedback. Plus, you can manage your parameters, view metrics, browse and update data, access blob storage, and much more using the <a href="https://ampt.dev" target="_blank">Ampt Dashboard</a>.</p></div>
	</div>
	</div>
</div>
