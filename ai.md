---
title: AI
description: Harness the power of AI in your applications.
---

Ampt makes it easy to incorporate AI into your applications. Using `@ampt/ai` you can interact with powerful AI models provided by Amazon Bedrock with just a few lines of code.

!!! note
`@ampt/ai` requires AI quota to use. You can purchase additional quota in the [Ampt Console](https://ampt.dev) in your Organization settings.
!!!

## Required runtime

`@ampt/ai` requires the `nodejs18`, `nodejs20`, 'nodejs22' Ampt runtime. You can set the runtime in your `package.json` file:

```json
{
  "ampt": {
    "app": "my-app",
    "org": "my-org",
    "runtime": "nodejs20"
  }
}
```

## Chat

The `chat` interface provides a uniform way to interact with chat models such as [Anthropic Claude](https://docs.anthropic.com/claude/docs).

A chat interaction is initiated by calling the `chat` function with a list of one or more input messages representing the past history of the chat. The function will return the model's response as a plain text stream. The model's response can then be included in the next call to `chat` to continue the conversation.

Here is an example of an API that uses the `chat` interface to generate a response from a list of input messages:

```javascript
import { api } from "@ampt/api";
import { chat } from "@ampt/ai";

api()
  .router("/chat")
  .post("/generate", async (event) => {
    const { messages } = await event.request.json();
    const response = await chat(messages);
    return event.respond(response);
  });
```

`chat(messages, options)` accepts the following arguments:

- `messages` is an array of objects with the following properties:

  - `role`: The role of the speaker. This can be `human` or `assistant`.
  - `content`: The plain text content of the message.

- `options` is an optional object with the following properties:

  - `modelId`: the string identifier of the model. The following models are currently supported:

    - anthropic.claude-instant-v1'
    - anthropic.claude-v2'
    - anthropic.claude-3-sonnet-20240229-v1:0'
    - anthropic.claude-3-haiku-20240307-v1:0'
    - anthropic.claude-3-opus-20240229-v1:0'
    - ai21.j2-mid-v1'
    - ai21.j2-ultra-v1'
    - cohere.command-text-v14'
    - cohere.command-light-text-v14'
    - meta.llama2-13b-chat-v1'
    - meta.llama2-70b-chat-v1'
    - meta.llama3-8b-instruct-v1:0'
    - meta.llama3-70b-instruct-v1:0'
    - mistral.mistral-7b-instruct-v0:2'
    - mistral.mixtral-8x7b-instruct-v0:1'
    - mistral.mistral-large-2402-v1:0'

    If no `modelId` is specified, the default model `anthropic.claude-instant-v1` will be used.

The result of the `chat` function is a [`Response`][1] with a [`ReadableStream`][2] body with the plain text response from the model. You can read the stream and include it with the role of `assistant` in the next call to `chat` to continue the conversation.

You can read the response body as a string using `.text()` if you want to store or manipulate the response:

```javascript
const messages = [{ role: "human", content: "Hello, how are you?" }];
const response = await chat(messages);
const text = await response.text();
```

## Render

The `render` interface is used to create an image from a text prompt.

Here is an example of an API that uses the `render` interface to return an image generated from a text prompt in the query string:

```javascript
import { api } from "@ampt/api";
import { render } from "@ampt/ai";

api()
  .router("/render")
  .get("/image", async (event) => {
    const prompt = event.request.query.get("prompt");
    if (!prompt) {
      return event.status(400).body("Missing prompt", "text/plain");
    }

    const response = await render(prompt);
    return event.respond(response);
  });
```

`render(prompt, options)` accepts the following arguments:

- `prompt` is a string containing the text prompt to send to the model.

- `options` is an optional object with the following properties:

  - `width`: The width of the image in pixels. Defaults to `512`.
  - `height`: The height of the image in pixels. Defaults to `512`.
  - `modelId`: the string identifier of the model. Currently only the `stability.stable-diffusion-xl-v1` model is supported.
  - `steps`: The number of steps to run the model. Defaults to `50`.
  - `seed`: The seed to use for the model. Defaults to `20`.
  - `scale`: The scale of the image. Defaults to `10`.

The result of the `render` function is a [`Response`][1] with a [`ReadableStream`][2] body with the resulting image in PNG format.

You can read the response as an [`ArrayBuffer`][3] if you want to store or manipulate the image:

```javascript
import { storage } from "@ampt/sdk";

const images = storage("images");
const response = await render(prompt);
const buffer = await response.arrayBuffer();

// Save in the images bucket
await images.write("image.png", buffer);
```

## Summarize

The `summarize` interface is used to summarize text.

Here is an example of an API that uses the `summarize` interface to generate a response from a list of input messages:

```javascript
import { api } from "@ampt/api";
import { summarize } from "@ampt/ai";

api()
  .router("/summarize")
  .post("/generate", async (event) => {
    const { input } = await event.request.json();
    const response = await summarize(input);
    return event.respond(response);
  });
```

`summarize(input, options)` accepts the following arguments:

- `input`: text to summarize
- `options` is an optional object with the following properties:

  - `modelId`: the string identifier of the model. The following models are currently supported:

    - anthropic.claude-instant-v1
    - anthropic.claude-v1
    - anthropic.claude-v2
    - anthropic.claude-3-sonnet-20240229-v1:0
    - mistral.mistral-7b-instruct-v0:2
    - mistral.mixtral-8x7b-instruct-v0:1

    If no `modelId` is specified, the default model `anthropic.claude-instant-v1` will be used.

The result of the `summarize` function is a [`Response`][1] with a [`ReadableStream`][2] body with the plain text response from the model.

You can read the response body as a string using `.text()` if you want to store or manipulate the response:

```javascript
const response = await summarize(input);
const text = await response.text();
```

## Translate

The `translate` interface is used to translate text from one language to another. This interface uses [Amazon Translate][11] under the hood. Translate will also use [Amazon Comprehend][12] to automatically detect the source language if `auto` is specified as the source language.

Here is an example of an API that uses the `translate` interface to translate text:

```javascript
import { api } from "@ampt/api";
import { translate } from "@ampt/ai";

const helpText = `Example: curl -d 'The fastest way to get things done in the cloud' -H "Accept-Language: fr" -H "Content-Language: en" ${process.env.AMPT_URL}`;

const router = api().router();

router.get("/", async (event) => {
  return event.body(helpText);
});

router.post("/", async (event) => {
  const input = await event.request.text();

  if (!input) {
    return event.status(400).body("Missing input text", "text/plain");
  }

  const response = await translate(input, {
    sourceLanguage: event.request.headers.get("Content-Language") ?? "auto",
    targetLanguage: event.request.headers.get("Accept-Language") ?? "en",
  });

  return event.respond(response);
});
```

`translate(input, options)` accepts the following arguments:

- `input`: text to translate
- `options` is a required object with the following properties:

  - `sourceLanguage`: the language code of the input text, or `auto` to automatically detect the source language.
  - `targetLanguage`: the language code of the output text.

See [Amazon Translate documentation][9] for a list of supported languages.

The result of the `translate` function is a [`Response`][1] with a [`ReadableStream`][2] body with the plain text translated input. The response will include the following headers:

- `Content-Language`: the language code of the output text.
- `Detected-Language`: the language code of the input text.

You can read the response body as a string using `.text()` if you want to store or manipulate the response:

```javascript
const response = await translate(input, options);
const text = await response.text();
```

## Embed

The `embed` method is used to create embeddings from text inputs.

Here is an example of an API that uses the `embed` interface to create embeddings and stores them in `@ampt/data`:

```javascript
import { api } from "@ampt/api";
import { embed } from "@ampt/ai";
import { data } from "@ampt/data";

api()
  .router("/api")
  .post("/embed", async (event) => {
    const { id, input } = await event.request.json();
    if (!input || !id) {
      return event.status(400).body("input and id are required", "text/plain");
    }

    const { embedding } = await embed(input);

    await data.set(`documents/${id}:embedding`, embedding);

    return event.status(204);
  });
```

`embed(input, options)` accepts the following arguments:

- `input` is a string containing the input text to send to the model.
- `options` is an optional object with the following properties:
  - `modelId`: the string identifier of the model. The following models are currently supported:
    - amazon.titan-embed-text-v1
    - amazon.titan-embed-text-v2:0
    - cohere.embed-english-v3
    - cohere.embed-multilingual-v3

The result of the `embed` function is an array of numbers representing the embedding of the input text.

## Invoke

The `invoke` interface is used to send a raw request to an underlying AI model, and receive a [`Response`][1]. You typically will not use this in your applications, and instead use one of the wrappers such as `chat`, `summarize`, or `translate`. However you may want to use it to create your own custom AI applications.

`invoke(params)` accepts a single object with the following properties:

- `body`: The request body to send to the model. The format of the body is model specific.
- `contentType`: The content type of the body. Defaults to `application/json`.
- `accept`: The accepted content types for the response. Defaults to `application/json`.
- `modelId`: the string identifier of the model.

`invoke()` resolves to a [`Response`][1] object with a [`ReadableStream`][2] body containing the model response. The format of the response is model specific.

## Supported models

The `models()` function returns a list of the models that are currently supported by the `@ampt/ai` package.

```javascript
import { models } from "@ampt/ai";

console.log(await models());
```

!!! note
The list of supported models is subject to change, and can vary by AWS region. Make sure you test your application in the targeted region.
!!!

Ampt currently supports the following modelIds:

- amazon.titan-text-express-v1
- amazon.titan-text-lite-v1
- amazon.titan-text-premier-v1:0
- amazon.titan-embed-text-v1
- amazon.titan-embed-text-v2:0
- anthropic.claude-v2
- anthropic.claude-v2:1
- anthropic.claude-3-sonnet-20240229-v1:0
- anthropic.claude-3-haiku-20240307-v1:0
- anthropic.claude-3-opus-20240229-v1:0
- anthropic.claude-instant-v1
- ai21.j2-mid-v1
- ai21.j2-ultra-v1
- cohere.command-text-v14
- cohere.command-light-text-v14
- cohere.embed-english-v3
- cohere.embed-multilingual-v3
- meta.llama2-13b-chat-v1
- meta.llama2-70b-chat-v1
- meta.llama3-8b-instruct-v1:0
- meta.llama3-70b-instruct-v1:0
- mistral.mistral-7b-instruct-v0:2
- mistral.mixtral-8x7b-instruct-v0:1
- mistral.mistral-large-2402-v1:0
- stability.stable-diffusion-xl-v1

**Additional References:**

- [Amazon Bedrock documentation][10]
- [AI21 API documentation][6]
- [Anthropic Claude API documentation][4]
- [Cohere API documentation][7]
- [Mixtral API documentation][13]
- [Meta Llama 2 documentation][8]
- [Stability API documentation][5]
- [Amazon Translate documentation][11]

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[2]: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[4]: https://docs.anthropic.com/claude/reference/getting-started-with-the-api
[5]: https://platform.stability.ai/docs/api-reference#tag/v1generation/operation/textToImage
[6]: https://docs.ai21.com/reference/j2-complete-api-ref
[7]: https://docs.cohere.com/reference/about
[8]: https://ai.meta.com/llama/
[9]: https://docs.aws.amazon.com/translate/latest/dg/what-is-languages.html
[10]: https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
[11]: https://docs.aws.amazon.com/translate/latest/dg/what-is.html
[12]: https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html
[13]: https://docs.mistral.ai/
