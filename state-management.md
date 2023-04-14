---
title: State Management
description: Connect to your favorite database providers to store data and manage application state.
---

Ampt runs your application code using distributed serverless technologies such as AWS Lambda, AWS Fargate, and AWS App Runner. This allows your applications to be highly available and massively scalable, but they're also **stateless**. This means that they don't maintain any application state between requests. To manage state in your application, you must store it in an external service or database.

Depending on the nature of your application and its state requirements, you'll need to select an appropriate datastore. Some popular options include:

- **Key-value stores**
- **Relational databases**
- **In-memory datastores**

Ampt offers multiple ways to enable state in your applications:

- Using the built-in Ampt Data module
- Connecting to a third party datastore provider
- Using an existing datastore

## Using the Ampt Data module

The [Ampt Data module](/docs/data) is a built-in data service that automatically provisions and manages a highly performant and scalable key-value stores for you. The Ampt Data module uses [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) behind the scenes to provide users with the same reliability, security, and redundancy of AWS's managed NoSQL database offering.

The Ampt Data module requires zero configuration or setup. Install the `@ampt/data` package from your Ampt shell or terminal, import the package into your code, and you're ready to go.

```javascript copy=false
import { data } from "@ampt/data";

// Set data
await data.set("foo", "bar");

// Get data
let results = await data.get("foo");
```

For more information about Ampt Data and how to use it, please visit the [Ampt Data documentation](/docs/data).

## Connecting to a third party datastore provider

Ampt makes it easy to connect to third party database providers. Credentials can be **securely stored** using Ampt's [parameter store](/docs/parameters). Your Ampt application can then use the appropriate Node.js SDK to interact with the provider.

Below are some popular third party services that work really well with Ampt. Click on a logo to visit the provider's web site.

<div class="grid gap-4 grid-cols-2 md:grid-cols-3 pb-12">
	<a href="https://www.gomomento.com/" class="transition ease-in-out hover:scale-105 bg-[url('/images/logos/momento.svg')] bg-center bg-[length:80%_30%] bg-no-repeat h-32 bg-[#c4f136] border border-gray-500 drop-shadow-md rounded-md"></a>
	<a href="https://www.mongodb.com/" target="_blank" class="transition ease-in-out hover:scale-105 bg-[url('/images/logos/mongodb.svg')] bg-center bg-[length:80%_30%] bg-no-repeat h-32 bg-black border border-gray-500 drop-shadow-md rounded-md"></a>
	<a href="https://planetscale.com/" target="_blank" class="transition ease-in-out hover:scale-105 bg-[url('/images/logos/planetscale.svg')] bg-center bg-[length:80%_30%] bg-no-repeat h-32 bg-white border border-gray-500 drop-shadow-md rounded-md"></a>
	<a href="https://fauna.com/" target="_blank" class="transition ease-in-out hover:scale-105 bg-[url('/images/logos/fauna-white.svg')] bg-center bg-[length:60%_30%] bg-no-repeat h-32 bg-[#391ab6] border border-gray-500 drop-shadow-md rounded-md"></a>
	<a href="https://www.cockroachlabs.com/" target="_blank" class="transition ease-in-out hover:scale-105 bg-[url('/images/logos/cockroachdb.svg')] bg-center bg-[length:80%_30%] bg-no-repeat h-32 bg-white border border-gray-500 drop-shadow-md rounded-md"></a>
	<a href="https://www.tigrisdata.com/" target="_blank" class="transition ease-in-out hover:scale-105 bg-[url('/images/logos/tigris.svg')] bg-[center_top_60%] bg-[length:60%_30%] bg-no-repeat h-32 bg-[#4ed9b2] border border-gray-500 drop-shadow-md rounded-md"></a>
</div>

## Using an existing datastore

If you have an existing datastore that you'd like to connect to from your Ampt apps, you can **securely store** credentials using Ampt's [parameter store](/docs/parameters). Your datastore must be publicly accessible via the Internet. If you would like to connect using a VPC, please [contact us](support@getampt.com).
