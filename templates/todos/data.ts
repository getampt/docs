import { data } from "@ampt/data";
import { nanoid } from "nanoid";

export enum QueryStatus {
  All = "all",
  Complete = "complete",
  Incomplete = "incomplete",
}

enum Status {
  Complete = "complete",
  Incomplete = "incomplete",
}

type TodoItem = {
  id: string;
  name: string;
  status: Status;
  duedate?: string;
};

interface CreateOptions {
  name: string;
  status?: Status;
  duedate?: Date;
}

interface Updates {
  name?: string;
  status?: Status;
  duedate?: Date;
}

interface QueryOptions {
  status?: QueryStatus;
  start?: string | null;
  limit?: number | null;
}

export async function queryItems(options: QueryOptions) {
  let result;
  const limit = options.limit || 100;
  const start = options.start;
  const meta = true;

  if (options.status === "all") {
    result = await data.get<TodoItem>("todo:*", { limit, start, meta });
  } else if (options.status === "complete") {
    result = await data.getByLabel<TodoItem>("label1", "complete:*", {
      limit,
      start,
      meta,
    });
  } else {
    result = await data.getByLabel<TodoItem>("label1", "incomplete:*", {
      limit,
      start,
      meta,
    });
  }

  if (!result || !("items" in result)) {
    return { items: [], nextToken: null };
  }

  const items = result.items.map((item: any) => item.value);

  return { items, lastKey: result.lastKey };
}

export function getItem(id: string) {
  return data.get(`todo:${id}`);
}

export async function createItem(options: CreateOptions) {
  const id = nanoid();

  const item: TodoItem = {
    id,
    name: options.name,
    status: options.status || Status.Incomplete,
    duedate: options.duedate ? options.duedate.toISOString() : undefined,
  };

  const label1 =
    item.status === "complete"
      ? `complete:${new Date().toISOString()}`
      : `incomplete:${item.duedate ? item.duedate : "9999"}`;

  await data.set(`todo:${item.id}`, item, { label1 });

  return item;
}

export async function deleteItem(id: string) {
  await data.remove(`todo:${id}`);
}

export async function updateItem(id: string, updates: Updates) {
  let item = {
    ...(updates.name && { name: updates.name }),
    ...(updates.status && { status: updates.status }),
    ...(updates.duedate && { duedate: updates.duedate?.toISOString() }),
  };

  let label1;

  if (updates.status || updates.duedate) {
    label1 =
      item.status === "complete"
        ? `complete:${new Date().toISOString()}`
        : `incomplete:${item.duedate ? item.duedate : "9999"}`;
  }

  return data.set(`todo:${id}`, item, { label1 });
}
