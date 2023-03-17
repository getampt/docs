<!--
title: Static Assets
menuText: Static Assets 
description: Ampt provides an integrated way of serving static files through a global CDN. 
menuOrder: 8
parent: Building Blocks
-->

# Static Assets

Ampt allows you to serve files from your application URL. This is useful for serving static assets such as images, CSS, and JavaScript, allowing you to host front-end apps and websites. By convention, static assets must be stored in the `static` directory at the root of your application.

You can have sub-directories in the static directory, but `public` is reserved for public files created using the "storage" interface, which are available from the path `/public/*`.

# **Static HTML pages**

Ampt supports serving static HTML pages with the following rules:

- requests for `/` will return `static/index.html` if it exists
- requests for `/<page>` will return `static/page.html` if it exists

This also applies for sub-directories in the `static` directory. For example, a request for `/admin` will return `/static/admin/index.html` if it exists, and a request for `/admin/page` will return `/admin/page.html`.

**NOTE:** Avoid having static pages that have corresponding API routes. For example, if you have a `/users` route, and also a `/static/users.html` page, Ampt will return the static page, and the API route will be unreachable.
