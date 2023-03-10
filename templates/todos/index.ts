import { http, storage, schedules } from "@ampt/sdk";
import express, { Router, Request, Response, NextFunction } from "express";

import {
  createItem,
  deleteItem,
  getItem,
  queryItems,
  QueryStatus,
  updateItem,
} from "./data";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req;

  if (!headers["authorization"]) {
    return res.status(401).send("Unauthorized");
  }

  res.locals = {
    userId: "123",
  };

  next();
};

const app = express();
app.use("*", auth);

const todos = Router({ mergeParams: true });
const files = Router({ mergeParams: true });

app.use("/todos", todos);
app.use("/files", files);

schedules("incomplete check").every("1 hour", async () => {
  const { items } = await queryItems({
    status: QueryStatus.Incomplete,
    limit: 100,
  });

  console.log(`Found ${items.length} incomplete todos!`);
});

todos.get("/", async (req: Request, res: Response) => {
  const { start, status, limit } = req.query;

  if (
    status !== QueryStatus.All &&
    status !== QueryStatus.Complete &&
    status !== QueryStatus.Incomplete
  ) {
    return res.status(400).json({
      message: `Invalid status: ${status}. Must be one of: ${QueryStatus.All}, ${QueryStatus.Complete}, ${QueryStatus.Incomplete}`,
    });
  }

  const { items, lastKey } = await queryItems({
    status,
    start: start ? String(start) : undefined,
    limit: parseInt(String(limit) || "100"),
  });

  return res.json({ items, lastKey });
});

todos.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await getItem(id);

  if (!item) {
    return res.sendStatus(404);
  }

  return res.json({ item });
});

todos.post("/", async (req: Request, res: Response) => {
  const props = req.body;

  if (!props) {
    return res.sendStatus(400);
  }

  const item = await createItem({
    name: props.name,
  });

  return res.redirect(`/todos/${item.id}`);
});

todos.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteItem(id);

  return res.sendStatus(204);
});

todos.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updates = req.body;

  let item = await getItem(id);
  if (!item) {
    return res.sendStatus(404);
  }

  item = await updateItem(id, updates);

  return res.json({ item });
});

const uploadsBucket = storage("uploads");

files.post("/:path*", async (req: Request, res: Response) => {
  if (res.locals.userId) {
    const uploadPath = `${res.locals.userId}/${req.params.path}`;
    return res.json({
      url: await uploadsBucket.getUploadUrl(uploadPath),
    });
  }
  return res.sendStatus(401);
});

files.get("/:path*", async (req: Request, res: Response) => {
  if (res.locals.userId) {
    const downloadPath = `${res.locals.userId}/${req.params.path}`;
    const url = await uploadsBucket.getDownloadUrl(downloadPath);
    if (url) {
      return res.redirect(url);
    }
    return res.sendStatus(404);
  }
  return res.sendStatus(401);
});

http.useNodeHandler(app);
