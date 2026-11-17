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
      if (!id.includes("virtual:styleframe.css")) return null;
      return `${code}\nhtml body { color: var(--body--color); background: var(--body--background); }\n`;
    },
  };
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
  vite: ({ target }) => ({
    plugins: [
      styleframe({
        entry: resolve(import.meta.dirname, "styleframe.config.ts"),
        include: [resolve(import.meta.dirname, "src/**/*.styleframe.ts")],
      }),
      themeBody(),
    ],
    optimizeDeps: { include: ["@styleframe/runtime"] },
    // `tsconfig.json` sets Unframework's JSX import source for the sources, and Vite's transform
    // would apply it to React's output too.
    ...(target === "react" && { oxc: { jsx: { importSource: "react" } } }),
  }),
  // Inkline's typeface is the system font stack, so the family Chromium draws with depends on the
  // platform: San Francisco on macOS, and DejaVu Sans or Liberation Sans on Linux, CI included.
  liveFonts: [".SF NS", "DejaVu Sans", "Liberation Sans"],
});
