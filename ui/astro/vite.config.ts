import { resolve } from "node:path";

import styleframe from "styleframe/plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		styleframe({
			entry: resolve(__dirname, "../components/styleframe.config.ts"),
			include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
		}),
	],
	// Astro ships through tsdown (`tsdown.config.ts`), which never runs Vite plugins — so the
	// styleframe plugin cannot extract the stylesheet there the way it does for the other frameworks.
	// `vite build` runs first over a CSS-only entry to produce the stylesheet, and tsdown's `copy`
	// lifts it into `dist/index.css`.
	build: {
		outDir: ".styleframe/css",
		lib: {
			entry: { css: "./src/css.ts" },
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.js`,
			cssFileName: "index",
		},
	},
});
