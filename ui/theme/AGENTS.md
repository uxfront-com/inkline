# @inkline/theme

The component recipes, moved from `@styleframe/theme` 3.x with the same names, options and defaults. The `*.styleframe.ts` files in [`ui/components`](../components/AGENTS.md) import their recipes from here.

## Layout

- `src/recipes/<family>/` holds each family's recipes and their tests, and `src/recipes/index.ts` exports them in alphabetical order. A folder's `index.ts` leaves its internal helpers out, like `createMenuItemRecipe`, as `@styleframe/theme` did.
- `src/__tests__/expectKeyframesRegistered.ts` is the test helper that checks a recipe registers the keyframes it names.
- `src/validate.test.ts` runs every `use…Recipe` export on one instance with the three presets and expects Styleframe's `validate()` to report nothing.
- `src/shims.d.ts` types `culori`, which the contrast tests use and which ships no types.

## Rules

- Everything outside `src/recipes/` comes from `@styleframe/theme`'s public entry, like `createUseRecipe`, the modifiers and the presets. Never deep-import from it (`@styleframe/theme/…`), since only its root entry is public.
- `@styleframe/theme` and `@styleframe/core` are peer dependencies, and [`tsdown.config.ts`](./tsdown.config.ts) keeps them out of the bundle. A bundled copy would give a project two Styleframe instances with two registries.
- A change to a recipe's names, options or defaults changes the CSS of every framework package. Run `node scripts/recipes.ts` in `ui/components` after it, and add a changeset for `@inkline/theme` and for each affected `@inkline/<framework>`.

## Two `exports` maps

In the workspace, `exports` points at `./src/index.ts`, so the CI jobs that build nothing, `Component Tests` and `Visual`, load the recipes from source through Styleframe's loader. `publishConfig.exports` points at `dist/`, and pnpm swaps it in when it packs or publishes, so the package on npm ships only the build. Publish with pnpm (`changeset publish`), never with a bare `npm publish`, which would ship the `src/` map.

## Commands

```bash
pnpm --filter @inkline/theme build   # tsdown: dist/index.mjs and dist/index.d.mts
pnpm --filter @inkline/theme test    # vitest run, with Vitest's globals on, as in Styleframe
```
