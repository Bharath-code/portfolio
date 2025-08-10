import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
  site: "https://sidharthmohanty.com",
  output: "server",
  adapter: vercel({
    functionPerRoute: false,
    isr: false,
  }),
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: true,
    },
  },
})
