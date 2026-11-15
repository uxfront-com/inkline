/**
 * Splits the barrel `unframework build` writes for each target, `dist/<target>/index.ts`, into the
 * two entries each framework package ships: `index.ts`, the styled components (the lines that export
 * from a `/styled/` directory), and `headless.ts`, the headless ones (from `/headless/`). It fails on
 * a line that is in neither, so a component in another directory can't ship by accident.
 *
 * `pnpm --filter @inkline/components build` runs it after `unframework build`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import config from "../unframework.config.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** The two entries of one target's barrel. Throws on a line that is in neither. */
export function splitBarrel(
  barrel: string,
  file = "index.ts",
): { index: string; headless: string } {
  const index: string[] = [];
  const headless: string[] = [];
  for (const line of barrel.split("\n")) {
    if (line.trim() === "") continue;
    if (line.includes("/styled/")) index.push(line);
    else if (line.includes("/headless/")) headless.push(line);
    else
      throw new Error(
        `${file}: \`${line}\` exports from neither a styled nor a headless directory`,
      );
  }
  if (index.length === 0 || headless.length === 0) {
    throw new Error(`${file}: a barrel with no styled or no headless component`);
  }
  return { index: `${index.join("\n")}\n`, headless: `${headless.join("\n")}\n` };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  for (const target of config.targets ?? []) {
    const dir = join(ROOT, config.outDir ?? "dist", target);
    const file = join(dir, "index.ts");
    if (!existsSync(file))
      throw new Error(`${file} doesn't exist: run \`unframework build\` first`);
    // Already split: `unframework build` cleans the tree, so a `headless.ts` means this ran.
    if (existsSync(join(dir, "headless.ts"))) continue;
    const { index, headless } = splitBarrel(readFileSync(file, "utf8"), file);
    writeFileSync(file, index);
    writeFileSync(join(dir, "headless.ts"), headless);
  }
}
