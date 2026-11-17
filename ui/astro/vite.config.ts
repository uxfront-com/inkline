import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  // Astro ships through `vp pack`, which never runs Vite plugins — so the styleframe
  // plugin cannot extract the stylesheet there the way it does for the other four
  // frameworks. `vp build` runs first over a CSS-only entry to produce the stylesheet,
  // and `pack.copy` below lifts it into `dist/index.css`.
  build: {
    outDir: ".styleframe/css",
    lib: {
      entry: { css: "./src/css.ts" },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "index",
    },
  },
  pack: {
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
  },
});
