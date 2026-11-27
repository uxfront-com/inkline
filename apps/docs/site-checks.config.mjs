import { defineConfig } from "@uxfront/site-checks";

// The search and AI search checks `check:seo` runs on the generated site: the 20 core rules
// with their defaults (the @uxfront/site-checks README lists them).
export default defineConfig({
	site: "https://inkline.io",
	rules: {
		// Cloudflare's static assets serve a page at both `/a` and `/a/`.
		"sitemap-pages": { paths: "lookup" },
	},
});
