---
title: Storage
description: Built-in storage interface to read, write, and serve files programmatically.
---

Ampt provides an easy-to-use file storage service that can be used to serve any type of binary or text file. When shared publicly, files will be automatically served all around the world via our global CDN.

Interact with the storage service using the `storage` interface of the `@ampt/sdk`.

## Defining Buckets

Buckets are the separate folders to store the files belonging to same domain. For example, you can have a bucket named `students` to store any files related to students and you can have another bucket named `books` for the "book" entity.

The root bucket is available by calling `storage()` without any parameters.

```javascript
import { storage } from "@ampt/sdk";

// define a new bucket
const students = storage("students");
// get the root bucket
const rootBucket = storage();
```

## Storing Files

Files can be stored by passing the binary string to the `write` function. This could either be files uploaded via an HTTP request, or modifying any existing files and saving the changes. Note that if a file exists at the provided path, it will be replaced with the new file.

You can optionally omit a path for the file, which will save it at the "root" directory.

Metadata, custom mimetypes (`type`), and cache control (for [serving public objects](#serving-public-objects)) can also be passed as options to the file.

```javascript
const students = storage('students');
// write file to /students/your/path/binaryData.ext
await students.write("/your/path/binaryData.ext", binaryData);
await students.write('/your/path/binaryData.ext', binaryData, { metadata: { isThisAFile: true } })
await students.write('/your/path/binaryData.ext', binaryData, { type: ‘application/octet-stream’ })
// this goes to root of /students
await students.write('/', binaryData)
```

!!! caution
There's a 6MB payload limit for API endpoints. If you want to store larger files from a user input via an API endpoint, you need to create an upload URL and upload it directly with an HTTP put command. Check out the docs [here](https://www.getampt.com/docs/storage/#upload-and-download-urls).
!!!

## Reading Files

Files can be read into memory as either a `ReadableStream` or a `Buffer`. If no options are passed, a `ReadableStream` is returned by default. Also included is `readBuffer` for ease of use, if you want to only use buffers without any extra arguments. To read the file, the absolute directory must be passed. If the file does not exist, `undefined` is returned.

```javascript
const students = storage("students");
const stream = await students.read("binaryData.ext");

const buffer = await students.read("binaryData.ext", { buffer: true });
const buffer = await students.readBuffer("/your/path/binaryData.ext");
```

## Copying and Moving Files

Files can be moved or copied to any directory. If a destination directory does not exist, it will be created.

```javascript
const students = storage("students");
await students.move("binaryData.ext", "bin");
// binaryData is now located at bin/binaryData.ext

await students.copy("/bin/binaryData.ext", "bin-copy");
// binaryData is now located at both bin/binaryData.ext and bin-copy/binaryData.ext
```

## Checking File Existence

To avoid a read operation, you may want to just check if a file exists before going forward.

```javascript
const students = storage("students");

const exists = await students.exists("/bin/binaryData.ext");
const doesNotExist = await students.exists("/not-real/binaryData.ext");
```

## File Information and Metadata

You can retrieve when a file was last modified, size, content type, and any saved metadata using `stat`.

```javascript
const students = storage.bucket("students");
const { lastModified, size, metadata, type } = await students.stat(
  "/your/path/binaryData.ext"
);
```

## Listing Files

Files in a bucket can be listed either as a whole or per folder. To list all subfolders recursively, you can pass a `recursive` option to list everything in all subfolders under the initial path.

!!! note
To control page size, you can pass in a `pageSize` value to control how many files are returned per page, the default size is `100`.
!!!

`list` returns an async generator, allowing for controlled iteration through your files.

```javascript
const students = storage("students");
const list = await students.list("bin", { pageSize: 1 });
const page1 = await list.next();
// ['binaryData.ext']

const pages = await students.list("/", { recursive: true, pageSize: 10 });
const allFiles = [];
for await (const page of pages) {
  allFiles.push(...page);
}
// ['bin/binaryData.ext', 'bin-copy/binaryData.ext']
```

## Removing Files

Files can be removed using the `remove` function.

```javascript
await storage("students").remove("/bin/binaryData.ext");
```

## Upload and Download URLs

URLs for both uploading and downloading files from a bucket can be generated using `getDownloadUrl` and `getUploadUrl`. A second parameter can be passed to set the expiration period for a URL, as a number in seconds. The default is 1 hour (3600s).

```javascript
const downloadUrl = await storage("students").getDownloadUrl(
  "bin-copy/binaryData.ext"
);

const longDownloadUrl = await storage("students").getDownloadUrl(
  "bin-copy/binaryData.ext",
  7200
);

const uploadUrl = await storage("students").getUploadUrl(
  "bin-copy/doesNotExistYet.ext"
);
```

If the file you're uploading is expected to be larger than 6MB, you should create an upload URL and use the PUT method to upload the file directly to Ampt Storage.

## Serving Public Objects

By default, all objects in your storage buckets are **PRIVATE** and only available programmatically through the `storage` interface or via generated [Upload and Download URLS](#upload-and-download-urls). Every environment contains a special `public` storage bucket that serves objects via your app's URL on the `/public` route.

```javascript
const myPublicBucket = storage("public");
await myPublicBucket.write("/my-logo.svg", ...binaryData...);
// Publically available at https://[my-ampt-url].ampt.app/public/my-logo.svg
```

!!! note
Public objects are served via CloudFront and **DO NOT** automatically contain a `Cache-Control` header. By default, objects will be fetched from the origin on every request.

To cache objects in the CDN, you must set the `maxAge` option (in seconds) when writing files:

```javascript
await myPublicBucket.write('/my-logo.svg', ...binaryData..., { maxAge: 3600 })
```
!!!

## Listeners

You can listen for certain events with `storage.on`. As of now, you can fire dispatch only for `write` and `remove` events. The listener accepts any glob file patterns, and will react to all events with an asterisk `*`.

Storage events contain both the path of the file, and the event name (`write` or `remove`).

```javascript
storage().on("write:user-uploads/*", async (event) => {
  // event = { path: user-uploads/picture.jpeg, name: 'write' }
});

storage().on("*", async (event) => {
  // reacts to all write/remove events
});

storage().on("write:*.txt", async (event) => {
  // reacts to all .txt file writes
});

storage("students").on("write", async (event) => {
  // only reacts to changes in the "students" bucket
});
```
