import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'static'
  },
  server: {
    open: true,
    port: process.env.PORT || 3000
  }
})
