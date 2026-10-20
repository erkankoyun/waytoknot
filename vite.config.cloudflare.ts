// Standalone Cloudflare Workers build. Does not import ChatGPT Sites hosting config.
// Run with: pnpm exec vite build --config vite.config.cloudflare.ts
import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      configPath: "./wrangler.jsonc",
    }),
  ],
});
