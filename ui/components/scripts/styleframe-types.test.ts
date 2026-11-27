import { deepStrictEqual, ok } from "node:assert";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { ROOT } from "./recipes.ts";
import { writeStyleframeTypes } from "./styleframe-types.ts";

/** Every name the sources import from `virtual:styleframe`, like `buttonRecipe` and `styleframe`. */
function importedNames(dir = join(ROOT, "src")): Array<string> {
  const names = new Set<string>();
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !/\.(ts|tsx)$/.test(entry.name)) {
      continue;
    }
    const source = readFileSync(join(entry.parentPath, entry.name), "utf8");
    for (const [, list = ""] of source.matchAll(
      /import\s*\{([^}]*)\}\s*from\s*"virtual:styleframe"/g,
    )) {
      for (const name of list.split(",")) {
        const imported = name
          .replace(/^\s*type\s+/, "")
          .split(/\s+as\s+/)[0]
          ?.trim();
        if (imported) {
          names.add(imported);
        }
      }
    }
  }
  return [...names].sort();
}

// `tsconfig.json` types `virtual:styleframe` only through `.styleframe/`, so the build must write a
// module declaration for it that covers every name the sources import.
await test("writes a declaration of virtual:styleframe for every name the sources import", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "inkline-styleframe-types-"));
  try {
    const written = await writeStyleframeTypes(outDir);
    deepStrictEqual(readdirSync(outDir).sort(), [...written].sort());

    const declarations = written
      .map((name) => readFileSync(join(outDir, name), "utf8"))
      .map((content) => content.match(/declare module "virtual:styleframe" \{([\s\S]*?)\n\}/)?.[1])
      .filter((body): body is string => body !== undefined);
    deepStrictEqual(declarations.length, 1, "expected one declaration of virtual:styleframe");
    const [declaration] = declarations;
    ok(declaration !== undefined, "expected one declaration of virtual:styleframe");

    const names = importedNames();
    ok(names.includes("buttonRecipe"), "the styled button imports buttonRecipe");
    const missing = names.filter(
      (name) =>
        !new RegExp(`export (?:declare )?(?:const|function|type) ${name}\\b`).test(declaration),
    );
    deepStrictEqual(missing, [], "virtual:styleframe doesn't declare every imported name");
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});
