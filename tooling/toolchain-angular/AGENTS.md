# @inkline/toolchain-angular

A private package that holds Angular's compiler stack on TypeScript 6, apart from the rest of the workspace, which runs TypeScript 7. It has no source and is never published.

## Why it exists

`unframework test`, `visual` and `preview` compile the components' Angular output with Angular's compiler and `@analogjs/vite-plugin-angular`, whose emitter needs TypeScript 6's classic API. [`ui/components/unframework.config.ts`](../../ui/components/unframework.config.ts) points Unframework at this directory (`package.resolveFrom.angular`), so the tools resolve the Angular stack, and TypeScript 6, from here. Unframework's own `tests/toolchains/angular` works the same way.

## What it holds

The `devDependencies` in [`package.json`](./package.json): the Angular packages, the Analog plugin, `rxjs`, `tslib`, TypeScript through `catalog:ts6`, and Vite through `catalog:unframework`. Every version comes from the catalog in [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml), so a version moves there, not here.

A run of Unframework's Angular toolchain once left scratch files here, in `.uf-tmp/`. The directory is gitignored: never commit it.

## When to change it

- **Inkline moves to a newer Unframework.** Check the Angular versions Unframework's `TARGET_TEST_PACKAGES` lists for that release, and move the catalog to match.
- **The Angular stack runs on TypeScript 7.** Move `typescript` to `catalog:`, then remove this package and the `resolveFrom` entry, if nothing else keeps it.
