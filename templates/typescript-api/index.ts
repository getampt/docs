import { v, api } from "@ampt/api";

// TODO: figure out how to add type for the event arg
async function auth(event: any) {
  const { headers } = event.request;

  if (!headers.get("Authorization")) {
    return event.status(401);
  }

  event.context.userId = "123";
}

const privateApi = api("protected").router("/admin", auth);
const publicApi = api("public").route("/public");

privateApi.get("/hello", async (event) => {
  return event.status(200).json({ message: "Hello from the private api!" });
});

publicApi.get("/hello", async (event) => {
  return event.status(200).json({ message: "Hello from the public api!" });
});

publicApi.get("/hello/:name", async (event) => {
  return event.status(200).json({ message: `Hello ${event.params.name}!` });
});

publicApi.get("/greet", async (event) => {
  const { query } = event.request;
  const name = query.get("name");

  if (!name) {
    return event
      .status(400)
      .json({ message: "Missing query param for `name`!" });
  }

  return event.status(200).json({ message: `Hello ${name}!` });
});

publicApi.post("/submit", async (event) => {
  const body = await event.request.body();

  return event.status(200).json({
    body,
    message: "You just posted data",
  });
});
