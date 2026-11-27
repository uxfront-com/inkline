import { resolve } from "node:path";

import { defineConfig } from "@uxfront/unframework/config";
import styleframe from "styleframe/plugin/vite";
import type { Plugin } from "vite";

/**
 * Styleframe's global preset styles `body` with the theme's colour and background, and so does the
 * page `unframework test` and `visual` capture on, to black on white. The two rules are equally
 * specific, so the one that loads last wins: the harness's on six targets, and Styleframe's on
 * Astro, whose server render brings its styles in after. This rule wins on every target, so each
 * capture shows the body a page with Inkline's stylesheet has.
 */
function themeBody(): Plugin {
	return {
		name: "inkline:theme-body",
		enforce: "pre",
		transform(code, id) {
			if (!id.includes("virtual:styleframe.css")) {
				return null;
			}
			return `${code}\nhtml body { color: var(--body--color); background: var(--body--background); }\n`;
		},
	};
}

/**
 * The page `unframework test` and `visual` capture on freezes every animation with a reset on
 * `*`, marked `!important`. Under `prefers-reduced-motion: reduce`, the theme's spinner pulses
 * forever through utilities that are `!important` too, and a class beats `*`, so the pulse
 * outlives the reset and the capture never settles. This rule repeats the reset's animation part
 * one class stronger, so it wins again.
 */
const FREEZE_ANIMATIONS =
	"html:root *, html:root *::before, html:root *::after { animation-duration: 0s !important; animation-delay: 0s !important; animation-iteration-count: 1 !important; }";

/**
 * Adds `FREEZE_ANIMATIONS` to the stylesheet Styleframe's plugin serves. It goes in through the
 * plugin's `load`, since Astro's render server reads a sheet with `load` alone and runs no
 * `transform`. Only the harness's servers get it, never the preview, where the spinner keeps its
 * pulse.
 */
function freezeAnimations(plugins: Plugin | Array<Plugin>): Array<Plugin> {
	return [plugins].flat().map((plugin) => {
		if (typeof plugin.load !== "function") {
			return plugin;
		}
		const load = plugin.load;
		return {
			...plugin,
			async load(id, ...rest) {
				const loaded = await load.call(this, id, ...rest);
				if (loaded === null || loaded === undefined || !id.includes("virtual:styleframe.css")) {
					return loaded;
				}
				return typeof loaded === "string"
					? `${loaded}\n${FREEZE_ANIMATIONS}\n`
					: { ...loaded, code: `${loaded.code}\n${FREEZE_ANIMATIONS}\n` };
			},
		} satisfies Plugin;
	});
}

export default defineConfig({
	targets: ["react", "vue", "svelte", "solid", "angular", "qwik", "astro"],
	srcDir: "src",
	outDir: "dist",
	package: {
		// Angular's compiler stack runs on TypeScript 6, which its toolchain package keeps apart.
		resolveFrom: { angular: "../../tooling/toolchain-angular" },
	},
	// The components import their recipes from `virtual:styleframe`, and the examples the stylesheet
	// from `virtual:styleframe.css`, which Styleframe's plugin serves to every test, visual and preview
	// server. `@styleframe/runtime`, which the recipes import, is bundled before a run starts.
	vite: ({ target, mode }) => {
		const plugin = styleframe({
			entry: resolve(import.meta.dirname, "styleframe.config.ts"),
			include: [resolve(import.meta.dirname, "src/**/*.styleframe.ts")],
		});
		return {
			plugins: [mode === "preview" ? plugin : freezeAnimations(plugin), themeBody()],
			optimizeDeps: { include: ["@styleframe/runtime"] },
			// `tsconfig.json` sets Unframework's JSX import source for the sources, and Vite's transform
			// would apply it to React's output too.
			...(target === "react" && { oxc: { jsx: { importSource: "react" } } }),
		};
	},
	// Inkline's typeface is the system font stack, so the family Chromium draws with depends on the
	// platform: San Francisco on macOS, and DejaVu Sans or Liberation Sans on Linux, CI included.
	// Arabic text, like the Button's languages example, falls back to SF Arabic on macOS, and DejaVu
	// Sans has Arabic letters on Linux.
	liveFonts: [".SF NS", ".SF Arabic", "DejaVu Sans", "Liberation Sans"],
});
