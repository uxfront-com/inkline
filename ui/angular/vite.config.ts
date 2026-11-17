import { resolve } from "node:path";
import angular from "@analogjs/vite-plugin-angular";
import { defineConfig } from "vite-plus";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    // Type checking makes a component the Angular compiler can't analyse fail the build. With it
    // off, Analog drops that error and ships the class uncompiled, with no inputs.
    angular({ tsconfig: "tsconfig.lib.json", disableTypeChecking: false }) as any,
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  build: {
    target: "es2022",
    lib: {
      entry: {
        index: "src/index.ts",
        headless: "src/headless.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `fesm2022/${entryName}.mjs`,
    },
    rollupOptions: {
      external: [/^@inkline\//, /^@angular\//],
      output: { chunkFileNames: "fesm2022/[name]-[hash].mjs" },
    },
  },
});
