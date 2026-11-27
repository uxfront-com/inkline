import { defineConfig } from "vitest/config";

// The recipe tests come from `@styleframe/theme`, where `describe`, `it` and `expect` are globals.
export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});
