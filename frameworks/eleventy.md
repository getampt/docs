---
title: Eleventy
description: Deploy web sites to Ampt using a simpler static site generator.
---

[Eleventy](https://www.11ty.dev/) is a simpler static site generator.

Install Eleventy within an Ampt project folder and add an `ampt:dev` and `ampt:build` script to your `package.json` as follows:

```json title=package.json, copy=false
{
  "name": "my-11ty-site",
  "scripts": {
    "ampt:dev": "eleventy --serve --quiet",
    "ampt:build": "eleventy",
    ...
  }
  ...
}
```

Configure your `.eleventy.js` file to use `./static` as your `output` folder:

```javascript title=.eleventy.js, copy=false
module.exports = function (config) {
  return {
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "./static",
    },
  };
};
```
