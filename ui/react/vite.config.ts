import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    react() as any,
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  // The components' outputs sit under `ui/components`, whose `tsconfig.json` sets Unframework's JSX
  // import source for the `.uf.tsx` sources. Vite would apply it to React's output too.
  oxc: { jsx: { runtime: "automatic", importSource: "react" } },
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        headless: "../components/dist/react/headless.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "index",
    },
    rollupOptions: {
      external: [/^@inkline\//, "react", "react-dom", /^react\//, /^react-dom\//],
    },
  },
});
