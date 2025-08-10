import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
  //site: "https://sidharthmohanty.com",
  output: "server",
  adapter: vercel(),
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: true,
    },
  },
})
