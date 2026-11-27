import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    // The package's tests read its build in Node, and need no Solid compiler. Under Vitest,
    // vite-plugin-solid adds jest-dom as a setup file that doesn't resolve from this package.
    ...(process.env.VITEST ? [] : [solid() as any]),
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        headless: "../components/dist/solid/headless.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "index",
    },
    rollupOptions: {
      external: [/^@inkline\//, "solid-js", /^solid-js\//],
    },
  },
  // `test/model-echo.test.ts` renders the build in jsdom, which needs Solid's browser build, not the
  // server build Node resolves by default.
  resolve: process.env.VITEST ? { conditions: ["browser", "development"] } : undefined,
  test: { server: { deps: { inline: [/solid-js/] } } },
});
