import { data } from "@ampt/data";
import { events } from "@ampt/sdk";
import type { Product } from "./product";

export interface Cart {
  total: number;
  items: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

interface CartRecord {
  [id: string]: number;
}

export async function getCart(userId: string): Promise<Cart> {
  const items = [];

  if (userId) {
    const cart = await data.get<CartRecord>(`cart:${userId}`);

    if (cart) {
      const entries = Object.entries(cart);

      await Promise.all(
        entries.map(async ([id, count]) => {
          const product = (await data.get(`products:${id}`)) as Product;

          if (product) {
            items.push({ id, name: product.name, count });
          }
        })
      );
    }
  }

  const total = items.reduce((sum, item) => sum + item.count, 0);

  items.sort((a, b) => a.name.localeCompare(b.name));

  return { total, items } as Cart;
}

export async function addToCart(userId: string, itemId: string) {
  const result = await data.add<CartRecord>(`cart:${userId}`, itemId, 1);
  const entries = Object.entries(result);
  const total = entries.reduce(
    (sum, [id, count]) => (typeof count === "number" ? sum + count : sum),
    0
  );
  return { total };
}

export async function resetCart(userId: string) {
  await data.remove(`cart:${userId}`);
}

data.on(["created", "updated"], async ({ item }) => {
  if (item.key.startsWith("cart")) {
    console.log("item added to cart, scheduling a follow-up");
    await events.publish("cart.followup", { after: "3 seconds" }, item.key);
  }
});

events.on("cart.followup", async (event: any) => {
  const cart = await data.get(event.body as string);

  if (cart) {
    if (
      Object.values(cart).reduce(
        (memo: number, value) => memo + Number(value),
        0
      ) > 0
    ) {
      console.log("There are still items in the cart");
    }
  }
});
