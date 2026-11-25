import { defineConfig } from "@uxfront/site-checks";

// The search and AI search checks `check:seo` runs on the generated site: the 20 core rules
// with their defaults (the @uxfront/site-checks README lists them).
export default defineConfig({
  site: "https://inkline.io",
  rules: {
    // Cloudflare's static assets serve a page at both `/a` and `/a/`.
    "sitemap-pages": { paths: "lookup" },
    // Off for now: each docs page is served once per framework with one description.
    "description-unique": false,
  },
});
