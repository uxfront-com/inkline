import { defineConfig } from "oxlint";

export default defineConfig({
  // This list is also what `check-types` (CI's Type Check job) honours: `oxlint -A all` turns every
  // lint rule off but still type-checks, and it reads `ignorePatterns` to choose the file set.
  // Anything ignored here is invisible to the gate, so keep the entries file-scoped.
  ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"],
  options: { typeAware: true, typeCheck: true },
});
