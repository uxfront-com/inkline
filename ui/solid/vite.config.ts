import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
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
});
