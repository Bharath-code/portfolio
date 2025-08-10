import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://sidharthmohanty.com',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: ['e3f27b84c375.ngrok-free.app']
    }
  }
});