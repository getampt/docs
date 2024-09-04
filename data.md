---
title: Data
description: Highly scalable NoSQL database interface with single-digit millisecond response times.
---

Ampt provides a fast, flexible, and scalable NoSQL datastore that's integrated into every Ampt Environment. Backed by [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), the `@ampt/data` interface lets developers manage massive collections of complex objects that can be queried on multiple dimensions, sorted, and paginated. With single-digit millisecond response times, it provides enough power to cover your most common needs and use cases.

**Your data is just there** as part of your application's runtime. You don't need to think about connection strings, credentials, capacity planning, or database maintenance. You can `get`, `set`, and `remove` data whenever you need access to state.

Plus, Ampt provides isolated databases to each **AMPT ENVIRONMENT**, enabling developers to have independent copies of application data in each sandbox, preview, and stage of every app.

## Getting started

To access data from your application, you must install the `@ampt/data` [npm package](https://www.npmjs.com/package/@ampt/data). You can install this using the npm command line tool:

```terminal title=Terminal, class="no-margin"
> npm install @ampt/data
```

Or via the Ampt shell:

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

⚡ › install @ampt/data ▊
```

The `data` interface makes API calls in order to interact with the underlying database, so any handlers or functions that use `data` must use `async/await`.

```javascript
import { data } from "@ampt/data";
import { api } from "@ampt/api";

api("my-api")
  .router("/test-data")
  .get("/", async (event) => {
    // Set and get data
    await data.set("foo", "bar");
    const results = await data.get("foo");
  });
```

## Understanding data structures

The `data` interface provides a simple, but extremely powerful abstraction over a NoSQL database that is automatically provisioned, configured, and managed for you. All you need to do is `set` and `get` data using a `key`. Items can be stored as a single value (`string`, `boolean`, `number`, `array`, etc.) or as a complex object with nested values.

### Storing single values

For simple key-value use cases, items can store a single attribute value:

```javascript
await data.set("foo", "bar"); // string
await data.set("foo", 123); // number
await data.set("foo", true); // boolean
await data.set("foo", ["arr1", "arr2"]); // array
```

When updating a single value, the entire "value" is overwritten.

### Storing objects

For more complex data structures, items can store JavaScript objects:

```javascript
await data.set("foo", {
  var1: "some string value",
  var2: 123,
  var3: false,
  var4: ["arr1", "arr2"],
  var5: { var6: "nested object" },
});
```

Object root keys can be added, updated, and removed independently of one another, allowing for partial updates:

```javascript
await data.set("foo", {
  var1: "this value will be updated",
  var3: null, // or 'undefined' will be removed
  var7: "this value will be added",
});
```

The operation above will update the item to this:

```json header=false
{
  "var1": "this value will be updated",
  "var2": 123,
  "var4": ["arr1", "arr2"],
  "var5": { "var6": "nested object" },
  "var7": "this value will be added"
}
```

### Meta data

In addition to the `key` and `value` attributes, _meta data_ is used to provide additional information about an item.

Every item has a `created` and `modified` date (both returned as ISO 8601 format in UTC). When setting items, the `created` date will be added if the item doesn't exist. The `modified` date will be updated every time the item is set. If overwriting an item, you can maintain the `created` date using a [Created timestamp integrity check](#created-timestamp-integrity-check).

User-defined meta data includes a `ttl` (see [Setting items](#setting-items)) and [Labels](#labels).

### Collections

Collections let you group items together and then retrieve them using more advanced query options. You can think of collections like **folders in a file system** that keep items organized. Collections are defined by adding a "namespace" and a colon (`:`) before the item's `key`. For example, if you wanted to save a user record for `jane@doe.com` in the "users" collection, you would set the `key` to `users:jane@doe.com` like this:

```javascript
await data.set("users:jane@doe.com", {
  name: "Jane Doe",
  email: "jane@doe.com",
  title: "Senior Developer",
});
```

To retrieve this single item, you would provide the entire `key` (including the collection namespace) like this:

```javascript
await data.get("users:jane@doe.com");
```

Storing items in collections opens up a number of powerful use cases. You can [query with conditionals](#querying-with-conditionals), allowing you to retrieve select items from a collection, and you can sort on `keys` in lexicographical order, which is great for dates or [KSUIDs](https://www.npmjs.com/package/ksuid).

!!! note
There is no limit to the number of items that can be stored in a collection. However, because items in a collection are colocated in the same partition, we recommend isolating frequently accessed items (i.e. several thousand reads per second). For example, if you are storing a popular product's information, you may want to use a more distinct key (such as `productId-12345`) instead of storing the item in a `products` collection (e.g. `products:12345`). If you need to return a list of products, you could add a [label](#labels). See [Understanding DynamoDB adaptive capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html#bp-partition-key-partitions-adaptive) for more information about "hot" partitions.
!!!

### Labels

Key-value stores typically work by using a single `key` to reference stored items. This is fine when you know the item's key (such as an email address or userId) and only need to access it using that value. However, our applications often need to use multiple access patterns in order to retrieve data. This is where **Labels** help you add additional context and retrieval capabilities.

Labels use the same format as item `key`s and support collections as well. For example, if we stored a product using a simple key like `productId-12345`, we could add a label like this:

```javascript
await data.set(
  "productId-12345",
  {
    // my product data here
  },
  { label1: `product-released:2023-07-01` }
);
```

Now we can either retrieve the item by its `key` using:

```javascript
await data.get("productId-12345");
```

Or by its label:

```javascript
await data.getByLabel("label1", "product-released:2023-07-01");
```

Unlike `keys`, labels **DO NOT NEED TO BE UNIQUE**. This means that multiple items can share the same exact label value, giving you the ability to return a group of items (as in the example above) that have the same "released" date. Like `keys`, labels can be [queried with conditionals](#querying-with-conditionals) if using a collection.

!!! note
You can have up to **five labels** per item.
!!!

Labels also support **default** values. This allows you to only overwrite a label's value if it isn't already set on an item. To set a default value for a label, wrap the value in a single item array:

```javascript
await data.set("myKey", "myValue", {
  label1: "someLabel", // overwrite label1
  label2: ["defaultLabel"], // overwrite if label2 doesn't exist
});
```

If you wish to remove a label, you can set its value to `null` or `undefined`:

```javascript
await data.set("myKey", "myValue", {
  label1: undefined, // remove this label
});
```

## Setting items

Setting a data item can be accomplished using the `set` method. You provide a **key** as the first argument and a **value** (either a string, boolean, number, array, or object) as the second parameter. Keys are case sensitive, can be a `string` of up to 256 bytes each, and can contain any valid utf-8 character including spaces. By default, the `set` command will return the updated item.

```javascript
await data.set("foo", "bar");
await data.set("fooNum", 123456);
await data.set("foo-Bool", true);
await data.set("foo_Array", ["val1", "val2", "val3"]);
await data.set("foo Obj", { key1: "some val", key2: "some other val" });
```

!!! note
Leading and trailing spaces are automatically removed from key names, so both `'keyName'` and `' keyName '` would be equivalent.
!!!

An options object can be passed as third argument. The following options are supported:

| Option Name                            | Type                     | Description                                                                                                                                                                                                                         |
| -------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meta                                   | boolean                  | Returns a JSON object that contains the item meta data. The value of the item is returned in a value field.                                                                                                                         |
| overwrite                              | boolean                  | Overwrites the current key including its meta data.                                                                                                                                                                                 |
| ttl                                    | integer or ISO 8601 date | Sets a Time-to-Live on the item. If an integer is provided that is greater than the current epoch in seconds, that is used. Any other integer will be added to the current epoch. A full or partial ISO 8601 date can also be used. |
| exists                                 | boolean                  | Forces an existence check when setting an item. See [Existence checks](#existence-checks).                                                                                                                                          |
| default                                | _any_                    | Sets a default value for an item. See [Setting default values](#setting-default-values).                                                                                                                                            |
| label1, label2, label3, label4, label5 | string                   | Additional keys that can be used to reference the item. Five labels are available and, like item keys, can use collection namespaces.                                                                                               |
| created                                | integer                  | Integrity check that works in combination with `overwrite: true`. See [Created timestamp integrity check](#created-timestamp-integrity-check).                                                                                      |
| removeNulls                            | boolean                  | Prevents null values from being stored in item attributes. Defaults to `true`. See [Storing `null` values](#storing-null-values).                                                                                                   |

Setting data with an _options_ object:

```javascript
await data.set("foo", "bar", {
  meta: true,
  overwrite: true,
  ttl: 3600,
  label1: "baz",
  label2: "baz:bat",
});
```

### Setting multiple items

To set multiple items at the same time, you can specify an `array` of objects that each contain a `key` and `value` as well as any additional meta data (e.g. labels and a `ttl` value) and `default` values as the first argument of the `set` method. You can specify up to 25 items in each request. The second parameter must be an options object with the `overwrite` flag set to `true`. This is for future compatibility to support batch updates. You can also add a `meta: true` flag to return the metadata of your items.

```javascript
const results = await data.set(
  [
    { key: "key1", value: "string value" },
    { key: "someOtherKey", value: 123, ttl: 1000, label1: "foo:baz" },
    {
      key: "namespacedKey:keyX",
      value: { foo: "bar" },
      default: { bat: "baz" },
    },
  ],
  { overwrite: true }
);
```

!!! info
At this time, batch set operations default to `{ overwrite: true }`. We are working to add support for batch updates in a future release. You should explicitly include this parameter to ensure future compatability.
!!!

### Existence checks

Using the `exists` flag, you can enable a conditional check before adding or updating an item. If no `exists` flag is provided, `set` operations on single items (without the `overwrite: true` flag) will default to UPSERTS, creating the item if it doesn't exist, or updating it if it does.

To add an item _ONLY_ if it **DOES NOT EXIST**, set the `exists` flag to `false`. Single item `set` operations (with or without the `overwrite:true`) will fail with an `Item already exists` error.

To update an item _ONLY_ if it **DOES EXIST**, set the `exists` flag to `true`. Single item `set` operations (with or without the `overwrite:true`) will fail with an `Item does not exist` error.

```javascript
// This will fail if "myKey" already exists
await data.set("myKey", "someValue", { exists: false });

// This will fail if "myKey" doesn't exists
await data.set("myKey", { foo: "bar" }, { exists: true });
```

### Setting default values

Defaults let you conditionally update an item's value if one doesn't already exist. You can provide a default for an item that stores a single value, but they are most useful when working with objects.

For example, the `set` operation below would overwrite `key1` with "myValue" whether it existed or not, but `key2` would only be written if the attribute didn't exist.

```javascript
await data.set(
  "myKey",
  { key1: "myValue" },
  {
    default: { key2: "defaultVal2" },
  }
);
```

When using objects, defaults are merged (using a deep merge) with the provided value. This allows you to provide default values for fields without worrying about the input data. For example:

```javascript
const input = req.body;

await data.set("myKey", input, {
  default: { key1: "defaultVal1", key2: "defaultVal2", key3: "defaultVal3" },
});
```

If `input` specified a value for `key2`, then that value would be saved instead of the default value.

!!! note
Arrays will not be deeply merged if a matching object key is found. This is to prevent unwanted behavior of default values being combined with explicitly set values.
!!!

A default value can be used with single value items by setting the value of the item to `undefined` or `null`.

```javascript
await data.set("myKey", undefined, { default: "defaultValue" });
```

This is useful if you only want to set a value if it doesn't already exist. If the value already exists, the operation will succeed and the item's `modified` date will be updated. If you want to prevent the item from being updated at all, you can use [existence checks](#existence-checks).

## Using atomic counters

Atomic counters allow numeric items or numeric item object values to be atomically updated. Atomic updates ensure that addition and subtraction operations are processed in order, giving users the ability to maintain the integrity of counters even if there are multiple simultaneous requests.

### Updating a single value atomically

If you only need to update a single value, Ampt provides the `add` method to help you do that. If the item is a simple numeric value (e.g. `{ key: "myCounter", value: 10 }`, you provide the full key name (including collection namespace) as the first parameter and the numeric value you want to "add" to the existing value as the second parameter. Numbers can be positive or negative and atomic counters support both integers and float values.

```javascript
const results = await data.add("myCounter", 1);
const results = await data.add("myNegativeCounter", -1);
```

The `add` method will return the updated value by default. You can specify an optional third parameter of `true` to return the item's metadata, or pass in an options object like `{ meta: true }`.

If the value you want to atomically update is nested within an object, you specify the full key name as the first parameter, the name of the nested object key you want to update as the second parameter, and a numeric value as the third parameter.

```javascript
const results = await data.add("myObjectKey", "nestedCounter", 5);
```

The `add` method will return the updated object by default. You can specify an optional fourth parameter of `true` to return the item's metadata, or pass in an options object like `{ meta: true }`.

### Updating multiple values atomically

You may want to atomically update several fields with a single item and potentially update other values as well. You can achieve this using the standard `set` method along with a special `$add` keyword. You `set` an item like you normally would, but for any numeric value that you'd like to atomically update, you specify a value of `{ $add: 1 }`, where `1` is whatever value you wish to add. For example:

```javascript
const results = await data.set("myObject", {
  nestedCounter: { $add: 1 },
  anotherCounter: { $add: 5 },
  someOtherValue: "foo",
});
```

In the example above, `nestedCounter` will be atomically increased by `1` on every call and `anotherCounter` will be atomically increased by `5`.

!!! note
Regular values like `someOtherValue` above **will not** be updated atomically and the last write wins.
!!!

## Getting items

Items can be retrieved using the `get` method. This method takes the **key** as the first argument, and an optional **options** object as the second argument. By default, the `get` method will return the value stored in the item.

```javascript
const result = await data.get("foo");
```

In addition to retrieving a single key, you can also retrieve items by providing the collection namespace followed by a colon and a `*` as a wildcard.

```javascript
const result = await data.get("my-namespace:*");
```

This will return an `items` array with all keys in the namespaced collection. By default, the items will be limited to 100 and the keys will be sorted in ascending lexicographical order. These defaults can be changed by providing an options object as the second argument.

The following options are supported:

| Option Name | Type                     | Description                                                                                                 |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| meta        | boolean                  | Returns a JSON object that contains the item meta data. The value of the item is returned in a value field. |
| limit       | integer                  | Limits the number of items returned. Defaults to 100.                                                       |
| reverse     | boolean                  | Reverses the sort order of keys returned. Defaults to false.                                                |
| start       | string                   | A key (including namespace) to start retrieving items from. Used for pagination.                            |
| label       | enum (label1, ...label5) | Access items by their label instead of their key. Items requests via a label always return an items array.  |

```javascript
const users = await data.get("users:*", { limit: 10, reverse: true });
```

If the only option you need to pass is `{ meta: true }`, you can simply pass `true` as the second argument to the `get` method.

```javascript
const results = await data.get("foo", true);
const results = await data.get("users:*", true);
```

Ampt either returns a single item or an array of multiple items. Any `get` request that specifies an exact key match will return a single item. Any request that could return more than one item will return an object with an `items` array that contains `key`s and `value`s:

```javascript header=false
{
  items: [
    { key: "foo:bar", value: "item1" },
    { key: "foo:bat", value: { some: "value" } },
    { key: "foo:baz", value: 1234 },
  ];
}
```

!!! note
Get queries can return a maximum of 1000 records or 1MB of data. We strongly advise to use pagination to retrieve the data in batches.
!!!

## Pagination

The total number of items returned by a single `get()` call is limited to the value specified by the `limit` parameter (default 100). If additional items are available, a `lastKey` will be returned. This value can be passed into a subsequent call to `get()` as the `start` parameter. A `.next()` convenience function will also be returned which can be called directly instead of constructing the additional call.

```javascript
const result = await data.get("foo:*", { limit: 3 });
```

```javascript header=false
{
	items: [
		{ key: "foo:bar", value: "item1" },
		{ key: "foo:bat", value: true" },
		{ key: "foo:baz", value: 1234 },
	],
	lastKey: "foo:baz",
	next: [Function: next]
}
```

```javascript
const nextResult = await data.get("foo:*", { limit: 3, start: "foo:baz" });
```

To paginate through all items using `next()`:

```javascript
const result = await data.get("foo:*", { limit: 3 });

while (result) {
  // do something with result.items
  result = result.next ? await result.next() : null;
}
```

## Querying with conditionals

### Partial matches

You've already seen the `*` wildcard used to retrieve *all* items, but you can also use the wildcard to retrieve items with partially matching keys as well.

!!! note
Wildcards are only supported at the end of a key expression.
!!!

```javascript
// Retrieve all keys from the `user123` collection
const results = await data.get("user123:*");

// Retrieve all keys from the `user123` collection that start with 'orders'
const results = await data.get("user123:orders*", true);
```

### Greater than and less than

Keys in collections are sorted in lexicographical order, so you can retrieve all items from a collection that are greater than, greater than or equal to, less than, or less than or equal to a supplied key. Use the standard symbols (`>`, `>=`, `<`, `<=`) after the collection name and colon to filter the return items.

```javascript
// Retrieve all keys from the `user123` collection greater than 2021-05-18
const results = await data.get("user123:>2021-05-18");

// Retrieve all keys from the `user123` collection greater than or equal to 2021-05-18
const results = await data.get("user123:>=2021-05-18");

// Retrieve all keys from the `user123` collection less than 2021-05-18
const results = await data.get("user123:<2021-05-18");

// Retrieve all keys from the `user123` collection less than or equal to 2021-05-18
const results = await data.get("user123:<=2021-05-18");
```

### Retrieving items between two keys

If you want to retrieve items that are lexicographically between two keys, specify the two partial keys between a `|`.

```javascript
// Retrieve all keys between 2021-05-01 and 2021-05-31
const results = await data.get("user123:2021-05-01|2021-05-31");
```

### Getting items by their labels

You can get items by their labels using the `get` method with the `{ label: 'labeln' }` option, or you can use the `getByLabel` convenience method. The `getByLabel` method takes the label index as the first parameter (e.g. `label3`), the `label key` (or label search expression) as the second parameter, and then an optional third parameter that accepts all the same options as the `get` method.

Labels support collections as well as simple keys. Since they behave the same way, you can also use collection querying methods like `*` and `>=` on labels as well.

Labels are incredibly powerful, allowing you to pivot and access your data in multiple "views". For example, if you store orders in a "user" collection (e.g. `user-1234`), then you can store their order date and number as the key (e.g. `user-1234:ORDER_2021-05-18_9321`). This would let you list all (or some) of their orders and sort them by date. But if you wanted to access this same information by the unique order number (`9321`), a simple key-value store wouldn't let you. You can set `label1` to something like `ORDER-9321`. Now you can either get the orders *BY USER* or *BY ORDER ID*:

```javascript
// Set the order
const newOrder = await data.set(
 'user-1234:ORDER_2021-05-18_9321', // the key
 { ...the-order-data-here... }, // the details of the order
 { label1: 'ORDER-9321' } // our order id label
)

// Get all orders for user-1234
const user_orders = await data.get('user-1234:ORDER_*');

// Get ORDER 9321
const order = await data.getByLabel('label1','ORDER-9321');
```

!!! note
You can have maximum of **5 labels**.
!!!

### Getting multiple items by their key

If you'd like to retrieve multiple items that aren't part of the same collection, you can specify an `array` of keys as the first argument in the `get` method. Keys must be the complete `key` as wildcards and other conditionals are not supported in batch operations. You can specify up to 25 keys in each request.

```javascript
const results = await data.get(["key1", "someOtherKey", "namespacedKey:keyX"]);
```

## Removing items

You can remove items by providing an item's key or an `array` of keys to the `remove()` method. Keys must be the complete `key` as wildcards and other conditionals are not supported in the `remove` operation. You can specify up to 25 keys in each request.

```javascript
const results = await data.remove("foo");
const results = await data.remove("foo:bar");
const results = await data.remove([
  "key1",
  "someOtherKey",
  "namespacedKey:keyX",
]);
```

## Reacting to changes in data

Ampt runtime emits an event every time a record is created, updated, or deleted, which you can react to by writing an event handler. This lets you decouple your application and process changes to your data asynchronously. For example, your API could set data and then immediately send a response, while your event handler can do some data aggregation or send a request to an outside app.

### Defining event handlers

You define an event handler using the `data.on()` method.

```javascript
data.on("created", async (event) => {
  // an item has been created
});
```

The first argument is the event name: `created`, `updated`, or `deleted`. The second argument is your handler function, which receives a single "event" argument.

You can also react to more than one event using an array of event names, or `*` to react to any event:

```javascript
data.on(["created", "updated"], async (event) => {
  // an item has been created or updated
});

data.on("*", async (event) => {
  // an item has been created, updated, or deleted
});
```

It's possible for more than one handler to be called for a given change to a data item, in which case the handlers are called in the order they were defined. In the example above, the first handler will always be called before the second handler when an item is created or updated, and only the second handler will be called when an item is deleted.

### Event format

The event passed to your handler has the following properties:

- `name`: the event name (either `created`, `updated`, or `deleted`)
- `item`: the item, including metadata and the value of the item in the `value` property
- `previous`: the previous state of the item when the event is `updated`

### Filtering by key

You can define a handler that is only called when specific keys are affected by adding namespace and key filters to the event name.

To add a filter you can use one of these formats:

- `<event-name>:<key-filter>`
- `<event-name>:<namespace-filter>:<key-filter>`

Each filter can either be an exact string or a prefix by adding `*` to the end of the filter.

For example, to filter using a specific simple key:

```javascript
data.on("*:global-item", (event) => {
  // called when the item with key `global-item` is created, updated or deleted
});
```

To filter using a simple key prefix:

```javascript
data.on("created:order_*", (event) => {
  // called when an item with a simple key starting with `order_` is created
});
```

To filter using both a namespace and key prefix:

```javascript
data.on("created:order_*:item_*", (event) => {
  // called when an item is created that has a namespace starting with `order_`
  // and a key starting with `item_`
});
```

### Event ordering

Data events are processed in the order that the changes were applied to your data items, within an item namespace. It's possible for multiple handlers to be invoked in parallel, but for different namespaces.

### Handling errors

If a handler throws an error, it will be retried with exponential backoff for up to 24 hours until it succeeds. After 24 hours the event will be dropped.

!!! caution
It's important to handle errors in your handler, since a failing handler will prevent new events from being processed.
!!!

Handlers should only throw an exception for "retryable" errors such as downstream request failures. If the error is a permanent error, the handler should use a try-catch block to capture the error and let the handler succeed.

### Avoiding event loops

It's possible to create an "event loop" where your event handler triggers itself and results in an infinite loop that exhausts resources. If you are calling `set()` or `remove()` within a handler, make sure it will not result in the same handler being invoked again with a new event.

## Advanced options

The primary goal of the `data` interface is to make interacting with your data extremely easy. However, sometimes special use cases require advanced options. Below are the current advanced capabilities available to users.

### Created timestamp integrity check

When overwriting items with the `overwrite: true` flag, the entire item and its _meta data_ are replaced (including the original `created` timestamp). This is useful because you don't need to query the item first to replace it. However, sometimes you may want to overwrite the item, but preserve the original `created` timestamp. The `data` interface allows you to do this by setting the `created` value in the `set` method's "options" object.

The `created` option's value must be set to the epoch time (in seconds) of the `created` timestamp in the item you're overwriting. For example, if the original stored item is:

```javascript header=false
{
  key: "myKey",
  value: "some value",
  created: "2023-06-30T03:51:48.000Z",
  modified: "2023-06-30T14:15:40.000Z"
}
```

You would pass `{ overwrite: true, created: 1688097108 }` to the `set` method's options object.

!!! note
If the `created` timestamps **DO NOT MATCH**, then the `set` operation will fail.
!!!

### Storing `null` values

By default, the `data` interface removes all `null` (and `undefined`) attribute values from any object or single value being stored. This is considered a best practice since storing extraneous data in NoSQL can increase storage and data transfer costs as well as potentially add latency to index replication. However, if you'd like to store `null` values, you can override the default behavior by adding a `removeNulls:false` flag to the `set` operation's "options" object.

If you would like to set this as a global option, you can set `data.removeNulls = false` after your `@ampt/data` import statement.

```javascript
import { data } from "@ampt/data";
data.removeNulls = false;
```
