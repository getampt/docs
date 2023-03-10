// @ampt/api is still experimental and a work-in-progress.
// We strongly recommend not using this for production use cases.
// Please report any bugs to Discord!

import { api } from "@ampt/api";

async function auth(event: any) {
  const { headers } = event.request;

  if (!headers.get("Authorization")) {
    return event.status(401);
  }

  event.context.userId = "123";
}

const privateApi = api("protected").router("/admin", undefined, auth);
const publicApi = api("public").router("/api");

privateApi.get("/hello", async (event) => {
  return event.status(200).body({ message: "Hello from the private api!" });
});

publicApi.get("/hello", async (event) => {
  return event.status(200).body({ message: "Hello from the public api!" });
});

publicApi.get("/greet", async (event) => {
  const { query } = event.request;
  const name = query.get("name");

  if (!name) {
    return event
      .status(400)
      .body({ message: "Missing query param for `name`!" });
  }

  return event.status(200).body({ message: `Hello ${name}!` });
});

publicApi.post("/submit", async (event) => {
  const body = await event.request.body();

  return event.status(200).body({
    body,
    message: "You just posted data",
  });
});
