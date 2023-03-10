---
title: Storage
menuText: Storage 
description: Ampt provides a built-in binary storage that allows dynamically reading and writing files programmatically. 
menuOrder: 6
has_children: false
has_toc: false
---
# Storage

Ampt provides easy to use file storage service that can be used to serve for any sort of binary type and can be read programmatically. When shared publicly over Ampt dashboard, files will be automatically served all around the world via our global CDN. 

Interacting with the storage service is dead simple using the `storage` interface of `@ampt/sdk`. 

## Defining Buckets

Buckets are the separate folders to store the files belonging into same domain.  For example; you can have a bucket named `students` to store any files related with students under different folders and you can have another bucket named `books` for the “book” entity. 

Root bucket is reachable by calling `storage()` without any parameters. 

```jsx
import { storage } from "@ampt/sdk";

// define a new bucket
const students = storage('students');
// get the root bucket
const rootBucket = storage();
```

## Storing Files

Files can be stored just by passing the binary string to the `write` function. This could either be files uploaded via an HTTP request, or modifying any existing files and saving the changes. Note that if a file exists at the provided path, it will be replaced with the new file.

You can optionally not pass a path for the file, which will save it at the "root" directory.

Metadata and custom mimetypes can also be passed to be saved alongside your file.

```jsx
const students = storage('students');
// write file to /students/your/path/binaryData.ext
await students.write("/your/path/binaryData.ext", binaryData);
await students.write('/your/path/binaryData.ext', binaryData, { metadata: { isThisAFile: true } })
await students.write('/your/path/binaryData.ext', binaryData, { type: ‘application/octet-stream’ })
// this goes to root of /students 
await students.write('/', binaryData)
```

## Reading Files

Files can be read into memory as either a ReadableStream or a Buffer. If no options are passed, a ReadableStream is returned by default. Also included is `readBuffer` for ease of use, if you want to only use buffers without any extra arguments. To read the file, the absolute directory must be passed. If the file does not exist, `undefined` is returned.

```jsx
const students = storage('students');
const stream = await students.read("binaryData.ext");

const buffer = await students.read("binaryData.ext", { buffer: true });
const buffer = await students.readBuffer("/your/path/binaryData.ext");
```

## Copying and Moving Files

Files can be moved or copied to any directory. If a destination directory does not exist, it will be created.

```jsx
const students = storage('students');
await students.move("binaryData.ext", "bin");
// binaryData is now located at bin/binaryData.ext

await students.copy("/bin/binaryData.ext", "bin-copy");
// binaryData is now located at both bin/binaryData.ext and bin-copy/binaryData.ext
```

## Checking File Existence

To avoid a read operation, you may want to just check if a file exists before going forward.

```jsx
const students = storage('students');

const exists = await students.exists("/bin/binaryData.ext");

const doesNotExist = await students.exists("/not-real/binaryData.ext");
```

## File Information and Metadata

You can retrieve when a file was last modified, size, content type, and any saved metadata using `stat`.

```jsx
const students = storage.bucket('students');
const { lastModified, size, metadata, type } = await students.stat(
  "/your/path/binaryData.ext"
);
```

## Listing Files

Files in a bucket can be listed either as a whole or per folder. To list all subfolders recursively, you can pass a `recursive` option to list everything in all subfolders under the initial path. 

<aside>
💡 To control page size, you can pass in a `pageSize` value to control how many files are returned per page, the default size is 100.

</aside>

`list` returns an async generator, allowing for controlled iteration through your files.

```jsx
const students = storage('students');
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

```jsx
await storage('students').remove("/bin/binaryData.ext");
```

## Upload and Download URLs

URLs for both uploading and downloading files from a bucket can be generated using `getDownloadUrl` and `getUploadUrl`. A second parameter can be passed to set the expiration period for a URL, as a number in seconds. The default is 1 hour (3600s).

```jsx
const downloadUrl = await storage('students').getDownloadUrl("bin-copy/binaryData.ext");

const longDownloadUrl = await storage('students').getDownloadUrl(
  "bin-copy/binaryData.ext",
  7200
);

const uploadUrl = await storage('students').getUploadUrl("bin-copy/doesNotExistYet.ext");
```

## Listeners

You can listen for certain events with `storage.on`. As of now, you can fire dispatch only for `write` and `remove` events. The listener accepts any glob file patterns, and will react to all events with an asterisk `*`.

Storage events contain both the path of the file, and the event name (`write` or `remove`).

```jsx
storage().on("write:user-uploads/*", async (event) => {
  // event = { path: user-uploads/picture.jpeg, name: 'write' }
});

storage().on("*", async (event) => {
  // reacts to all write/remove events
});

storage().on("write:*.txt", async (event) => {
  // reacts to all .txt file writes
});

storage('students').on('write', async (event) => {
 // only reacts to changes in the "students" bucket
});
```
