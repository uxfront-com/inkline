import { strictEqual } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { generateRecipes, RECIPES_FILE } from "./recipes.ts";

// The components type their recipe props from `src/recipes.ts`, so a recipe whose axes change in a
// `*.styleframe.ts` file, or in `@inkline/theme`, must change it too.
await test("src/recipes.ts matches the recipes the *.styleframe.ts files declare", async () => {
  strictEqual(
    readFileSync(RECIPES_FILE, "utf8"),
    await generateRecipes(),
    "src/recipes.ts is stale: run `node scripts/recipes.ts` in ui/components",
  );
});
