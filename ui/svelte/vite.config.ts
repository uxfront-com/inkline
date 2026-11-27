import { resolve } from "node:path";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import styleframe from "styleframe/plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		svelte(),
		styleframe({
			entry: resolve(__dirname, "../components/styleframe.config.ts"),
			include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
		}),
	],
	build: {
		lib: {
			entry: {
				index: "./src/index.ts",
				headless: "../components/dist/svelte/headless.ts",
			},
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.js`,
			cssFileName: "index",
		},
		rollupOptions: {
			external: [/^@inkline\//, "svelte", /^svelte\//],
		},
	},
});
