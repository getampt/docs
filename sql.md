---
title: SQL
description: Store and query relational data using Neon Serverless Postgres.
beta: true
---

!!! warning
`@ampt/sql` is now deprecated and will be removed in the future. Stay tuned for a new SQL interface on Ampt.
!!!

Ampt has built-in support for [Postgres SQL][postgres-docs] that is powered by [Neon Postgres][neon-website]. Using `@ampt/sql` you can store and query relational data using pure SQL commands or using the [Kysely query builder][kysely-docs].

!!! note
`@ampt/sql` is currently in Beta. Do NOT use it for the production use cases.
!!!

## Getting started

To get started with `@ampt/sql` you will need to install the package:

```terminal title=Terminal, class="no-margin"
> npm install @ampt/sql
```

Or via the Ampt shell:

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

⚡ › install @ampt/sql ▊
```

Then you can import the package into your Ampt project:

```typescript title=src/index.ts
import { sql } from "@ampt/sql";
```

!!! caution
Your SQL database is tied to your Ampt environment. If you delete the environment, the database is deleted and all data in it is lost. Backup and restore features are coming soon.
!!!

## Using the `sql` interface

The `sql` interface provides a simple way to execute SQL commands against your database. You can use the `sql` interface to create tables, insert data, and query data.

To insert data into a table:

```typescript title=src/index.ts
const post =
  await sql`INSERT INTO posts(content) VALUES(${content}) RETURNING *`;
```

To query data from a table:

```typescript title=src/index.ts
const posts = await sql`SELECT * FROM posts`;
```

To learn more about Postgres SQL commands, see the [Postgres documentation][postgres-docs].

## Using the `Kysely` query builder

`@ampt/sql` also provides the [Kysely query builder][kysely-docs] to build SQL queries. Kysely is a lightweight query builder for JavaScript and TypeScript, which may be preferable to writing raw SQL queries.

First install the `kysely` package:

```terminal title=Terminal, class="no-margin"
> npm install kysely
```

Or via the Ampt shell:

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

⚡ › install kysely ▊
```

Then you can import the `Kysely` class from `@ampt/sql` into your project, define TypeScript interfaces for your database and tables, and create a db instance:

```typescript title=src/index.ts
import { Kysely } from "@ampt/sql";
import { GeneratedAlways } from "kysely";

interface Database {
  posts: PostsTable;
}

interface PostsTable {
  id: GeneratedAlways<number>;
  content: string;
}

const db = new Kysely<Database>();

// Insert a post
const post = await db
  .insertInto("posts")
  .values({ content })
  .returningAll()
  .executeTakeFirstOrThrow();

// Get all posts
const posts = await db.selectFrom("posts").selectAll().execute();
```

## Migrations

`@ampt/sql` includes a migration system that allows you to define migrations using [Kysely query builder][kysely-docs].

Migration scripts are individual JavaScript files that you must place in a folder called `migrations` in the root of your project. The migration scripts must export an `up()` and `down()` function that accepts a `Kysely` instance as an argument.

!!! note
Only JavaScript migration scripts are supported at this time. TypeScript support is coming soon.
!!!

For example:

```javascript title=migrations/0001_create-posts-table.js
export async function up(db) {
  await db.schema
    .createTable("posts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("content", "text", (col) => col.notNull())
    .execute();
}

export async function down(db) {
  await db.schema.dropTable("posts").execute();
}
```

Add the following scripts to your package.json:

```json title=package.json
{
  "scripts": {
    "ampt:migrate": "ampt-sql migrate",
    "ampt:migrate-up": "ampt-sql migrate --up",
    "ampt:migrate-down": "ampt-sql migrate --down"
  }
}
```

Then you can run the `migrate` command using the Ampt shell:

```terminal title=Terminal, class="no-margin", copy=false
ampt ⚡

⚡ › run migrate ▊
```

The `run migrate` command will run migration scripts in alphabetical order, after determining which scripts have already been run. During a deployment to a stage, Ampt will automatically run the `ampt:migrate` script command after `ampt:build` succeeds, and before updating your application code.

`run migrate-down` is useful during development if you need to rollback a migration, update the migration file, and then use `run migrate` or `run migrate-up` to apply the changes.

The `run migrate-down` is not recommended to be used in a production environment. Instead, you should create a new migration script that migrates the database forward to the desired state.

**Additional References:**

- [Postgres documentation][postgres-docs]
- [Kyseley documentation][kysely-docs]
- [Neon website][neon-website]
- [Neon documentation][neon-docs]

[postgres-docs]: https://www.postgresql.org/docs/
[kysely-docs]: https://kysely.dev/docs/intro
[neon-website]: https://neon.tech/
[neon-docs]: https://neon.tech/docs/introduction/about
[contact-us]: https://getampt.com/contact
