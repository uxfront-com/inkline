import { defineConfig } from "tsdown";

// Runs after `vite build`, which writes the stylesheet this copies (see `vite.config.ts`).
export default defineConfig({
	entry: {
		index: "../components/dist/astro/index.ts",
		headless: "../components/dist/astro/headless.ts",
	},
	deps: { neverBundle: [/\.astro$/, /^@inkline\//] },
	copy: [
		// The `.astro` components, with the type modules their frontmatter imports.
		{ from: "../components/dist/astro/components", to: "dist" },
		{ from: "../components/dist/astro/recipes.ts", to: "dist" },
		{ from: "./.styleframe/css/index.css", to: "dist/" },
	],
});
