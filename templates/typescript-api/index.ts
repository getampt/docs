import { http } from "@ampt/sdk";
import express, { Router } from "express";

const app = express();

const auth = (req, res, next) => {
  const { headers } = req;

  if (!headers["authorization"]) {
    return res.status(401).send("Unauthorized");
  }

  req.context = {
    userId: "123",
  };

  next();
};

const privateApi = Router();
privateApi.use(auth);

const publicApi = Router();

publicApi.get("/hello", (req, res) => {
  return res.status(200).send({ message: "Hello from the public api!" });
});

privateApi.get("/hello", (req, res) => {
  return res.status(200).send({ message: "Hello from the private api!" });
});

publicApi.get("/greet/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({ message: "Missing route param for `name`!" });
  }

  return res.status(200).send({ message: `Hello ${name}!` });
});

publicApi.post("/submit", async (req, res) => {
  return res.status(200).send({
    body: req.body,
    message: "You just posted data",
  });
});

app.use("/api", publicApi);
app.use("/admin", privateApi);

http.useNodeHandler(app);
