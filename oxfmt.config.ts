import { defineConfig } from "oxfmt";

export default defineConfig({
  // Generated files their checks compare byte for byte: `ui/*/test/api.json`, which
  // `ui/components/scripts/api-report.ts` writes one name to a line and `api:check` compares;
  // `ui/components/src/recipes.ts`, from `ui/components/scripts/recipes.ts`; and the expectations
  // `unframework test --update` writes.
  ignorePatterns: [
    ".context/**",
    ".old/**",
    "ui/**/.styleframe/**",
    "ui/*/test/api.json",
    "ui/components/src/recipes.ts",
    "ui/components/test/**/__expected__/**",
  ],
});
