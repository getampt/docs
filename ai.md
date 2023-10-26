---
title: AI (beta)
description: Harness the power of AI in your applications.
---

Ampt makes it easy to incorporate AI into your applications. Using `@ampt/ai` you can interact with powerful AI models provided by Amazon Bedrock with just a few lines of code.

!!! caution
`@ampt/ai` is experimental and subject to change. **DO NOT** use this for production apps.
!!!

!!! note
`@ampt/ai` is currently only available on Team plans. We will be extending this to additional account levels soon.
!!!

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
    const result = await chat(messages);
    return event.body(result, "text/plain");
  });
```

`chat(messages, options)` accepts the following arguments:

- `messages` is an array of objects with the following properties:

  - `role`: The role of the speaker. This can be `human` or `assistant`.
  - `content`: The plain text content of the message.

- `options` is an optional object with the following properties:

  - `modelId`: the string identifier of the model. The following models are currently supported:

    - anthropic.claude-instant-v1
    - anthropic.claude-v1
    - anthropic.claude-v2

    If no `modelId` is specified, the default model `anthropic.claude-instant-v1` will be used.

The result of the `chat` function is a `ReadableStream` with the plain text response from the model. You can read the stream and include it with the role of `assistant` in the next call to `chat` to continue the conversation.

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

    const image = await render(prompt);
    return event.body(image, "image/png");
  });
```

`render(prompt, options)` accepts the following arguments:

- `prompt` is a string containing the text prompt to send to the model.

- `options` is an optional object with the following properties:

  - `width`: The width of the image in pixels. Defaults to `512`.
  - `height`: The height of the image in pixels. Defaults to `512`.
  - `modelId`: the string identifier of the model. Currently only the `stability.stable-diffusion-xl-v0` model is supported.
  - `steps`: The number of steps to run the model. Defaults to `50`.
  - `seed`: The seed to use for the model. Defaults to `20`.
  - `scale`: The scale of the image. Defaults to `10`.

## Summarize (coming soon)

The `summarize` interface is used to summarize text.

## Translate (coming soon)

The `translate` interface is used to translate text from one language to another.

## Embed (coming soon)

The `embed` method is used to create embeddings from text inputs.

## Invoke

The `invoke` interface is used to send a raw prompt to an underlying AI model, and receive a response. You typically will not use this in your applications, and instead use one of the wrappers such as `chat`, `summarize`, or `translate`. However you may want to use it to create your own custom AI applications.

`invoke(params)` accepts a single object with the following properties:

- `body`: The request body to send to the model. The format of the body is model specific.
- `contentType`: The content type of the body. Defaults to `application/json`.
- `accept`: The accepted content types for the response. Defaults to `application/json`.
- `modelId`: the string identifier of the model.
- `streaming`: If `true`, the response will be a `ReadableStream` of the model's response. If `false`, the response will be a string containing the model's response. Defaults to `true`. Not all models support streaming responses.

`invoke()` returns a promise that resolves to either a `ReadableStream` or a string, depending on whether streaming is enabled. The format of the response is model specific.

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

- anthropic.claude-instant-v1
- anthropic.claude-v1
- anthropic.claude-v2
- stability.stable-diffusion-xl-v0

Anthropic Claude API documentation: https://docs.anthropic.com/claude/reference/getting-started-with-the-api

Stability API documentation: https://platform.stability.ai/docs/api-reference#tag/v1generation/operation/textToImage
