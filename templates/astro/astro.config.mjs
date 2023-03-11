import { defineConfig } from "astro/config";
import ampt from "@ampt/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [ampt(), svelte()],
});
