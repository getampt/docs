# ⚡Ampt ❤️ Astro 🚀🧑‍🚀✨

This is the [Astro SSR example](https://github.com/withastro/astro/tree/main/examples/ssr) adapted to take advantage of Ampt!

## Getting Started

- Clone this repository
- Run `npm i`
- Run `npx ampt` to launch the Ampt Shell and connect to a personal sandbox.

Next, from within that shell, run:

- `build` - this will run the astro build command, syncing the output to your sandbox instantly.
- `import` - this will seed your sandbox database with the products in data.json
- `dev` - this will launch the local Astro dev server with superpowers - running locally on your machine.

Open http://localhost:3000 and poke around - it's a starter app, right? Have a look at `src/models/cart.ts` - it uses `@ampt/sdk` to store the users cart. This is the Ampt SDK.
