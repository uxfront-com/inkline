import { defineConfig } from "tsdown";

// `@styleframe/theme` and `@styleframe/core` are peers, so they stay out of the bundle and a project
// keeps one Styleframe instance and one set of registries.
export default defineConfig({
  entry: { index: "./src/index.ts" },
  // The manifest names its types only under `publishConfig`, which tsdown doesn't read.
  dts: true,
  deps: { neverBundle: [/^@styleframe\//] },
});
