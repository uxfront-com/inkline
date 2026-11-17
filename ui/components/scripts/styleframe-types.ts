/**
 * Writes Styleframe's type declarations to `.styleframe/`, as Styleframe's Vite plugin does when it
 * starts. `tsconfig.json` types `virtual:styleframe` only through them, so the styled components and
 * the `*.styleframe.ts` files type-check only once they exist. `unframework build` never runs the
 * plugin, so `pnpm --filter @inkline/components build` runs this first.
 *
 * It loads the configuration as `scripts/recipes.ts` does, and fails when Styleframe's transpiler
 * returns no files. Run it with `node scripts/styleframe-types.ts` from `ui/components`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ROOT, transpileTypes } from "./recipes.ts";

export const TYPES_DIR = join(ROOT, ".styleframe");

/** Writes the declarations to `outDir`, and returns the names of the files it wrote. */
export async function writeStyleframeTypes(outDir = TYPES_DIR): Promise<string[]> {
  const files = await transpileTypes();
  if (files.length === 0) throw new Error("Styleframe's transpiler wrote no type declarations");
  mkdirSync(outDir, { recursive: true });
  for (const file of files) writeFileSync(join(outDir, file.name), file.content);
  return files.map((file) => file.name);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const names = await writeStyleframeTypes();
  const dir = relative(process.cwd(), TYPES_DIR);
  console.log(`Wrote ${names.map((name) => join(dir, name)).join(", ")}`);
}
