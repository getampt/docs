---
title: Serve Static Assets
description: Easily serve static files through a global content delivery network (CDN).
---

Ampt allows you to serve files from your application URL. This is useful for serving static assets such as images, CSS, and JavaScript, allowing you to host front-end apps and websites. By default, Ampt serves files from the `static` directory in your project root. However, if you need to specify additional directories, you can do so by adding a `static` key to the `ampt` section of your `package.json` file.

```json
{
  "ampt": {
    "static": ["assets"]
  }
}
```

In this example, Ampt will serve files from the `static` and `assets` directories.

!!! note
When using the sandbox environment, your entire workspace is synced and files are served via invocation of your application. In stage environments, files are served from a content delivery network (CDN), without invoking your application.
!!!

You can have sub-directories in the static directory, but `public` is reserved for public files created using the [`storage`](/docs/storage/) interface, which are available from the `/public/*` path.

## Static HTML pages

Ampt supports serving static HTML pages with the following rules:

- requests for `/` will return `static/index.html` if it exists
- requests for `/<page>` will return `static/page.html` if it exists

This also applies to sub-directories in the `static` directory. For example, a request for `/admin` will return `/static/admin/index.html` if it exists, and a request for `/admin/page` will return `/admin/page.html`.

!!! note
Avoid having static pages that have corresponding API routes. For example, if you have a `/users` route, and also a `/static/users.html` page, Ampt will return the static page, and the API route will be unreachable.
!!!
