import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    // Generated files their tests compare byte for byte: `ui/*/test/api.json`, from
    // `ui/components/scripts/api-report.ts`, one name to a line; `ui/components/src/recipes.ts`, from
    // `ui/components/scripts/recipes.ts`; and the expectations `unframework test --update` writes.
    ignorePatterns: [
      ".context/**",
      ".old/**",
      "ui/**/.styleframe/**",
      "ui/*/test/api.json",
      "ui/components/src/recipes.ts",
      "ui/components/test/**/__expected__/**",
    ],
  },
  lint: {
    // This list is what CI's Type Check job honours: `vp check --no-fmt --no-lint` skips lint
    // rules but still type-checks, and it reads `lint.ignorePatterns` to choose the file set.
    // Anything ignored here is invisible to the gate, so keep the entries file-scoped.
    ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
