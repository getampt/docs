---
title: Content Delivery Network (CDN)
description: Easily serve static files through a global content delivery network (CDN).
---

Ampt allows you to serve files from your application URL. This is useful for serving static assets such as images, CSS, and frontend JavaScript, allowing you to host front-end apps and websites. By convention, static assets must be stored in the `static` directory at the root of your application.

You can have sub-directories in the static directory, but `public` is reserved for public files created using the [`storage`](/docs/storage/) interface, which are available from the `/public/*` path.

## Static HTML pages

Ampt supports serving static HTML pages with the following rules:

- requests for `/` will return `static/index.html` if it exists
- requests for `/<page>` will return `static/page.html` if it exists

This also applies to sub-directories in the `static` directory. For example, a request for `/admin` will return `/static/admin/index.html` if it exists, and a request for `/admin/page` will return `/admin/page.html`.

!!! note
Avoid having static pages that have corresponding API routes. For example, if you have a `/users` route, and also a `/static/users.html` page, Ampt will return the static page, and the API route will be unreachable.
!!!

## Static asset caching

Static assets are automatically cached in Cloud's Content Delivery Network (CDN) in edge locations around the world so download speeds will be very fast.

Caching works differently in "stage" and "personal" instances.

In stage instances, static assets are cached in the CDN for up to 24 hours. Responses will include a `Cache-Control` header that tells the CDN to cache the asset for 24 hours, and tells the browser to cache the asset and "revalidate" it before using it. When you deploy a new version of your application, Cloud will automatically clear the CDN cache so your users will get the latest version when they refresh the browser.

Caching is disabled in developer sandboxes so you can update your assets and immediately see the latest version when you reload your browser. Responses for static assets in your developer sandbox will include a `Cache-Control` header that disables caching in the CDN, and an additional `X-Cache-Control` header that shows you the value of the header that will be used in stage instances.

!!! note
You should always use a stage instance for your "production" instance, to take advantage of the CDN and ensure the best performance for your users.
!!!
