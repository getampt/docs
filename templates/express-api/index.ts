import { http } from "@ampt/sdk";

import express from "express";

const app = express();

app.use("/express", (req, res) => {
  res.send("Hello from Express!");
});

http.useNodeHandler(app);
