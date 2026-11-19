# ADR-012: Components compile with Unframework

Date: 2026-11-15 · Status: Accepted
Deciders: Project owner
Supersedes: [ADR-001](./001-compiler-dx-invests-in-diagnostics.md), [ADR-002](./002-compiler-export-surface-tiers.md), [ADR-003](./003-typed-jsx-intrinsic-elements-from-a-vendored-upstream.md), [ADR-004](./004-inkline-check-does-not-type-check.md), [ADR-006](./006-inferred-component-authoring-types.md), [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md), [ADR-009](./009-emitted-output-is-typechecked-by-a-subprocess-tsc.md), [ADR-010](./010-defineprops-joins-the-macro-family.md), [ADR-011](./011-the-defineslot-binding-is-optional.md) · Superseded by: [ADR-013](./013-api-reports-are-checked-once.md) **in part**: the check in Decision 5, only

## Context

Inkline's components were written once as `.ink.tsx` files and compiled to the seven framework packages by Inkline's own compiler, `inkline compile`. Their tests compared each target's compiled output with snapshots, and each framework had a Storybook that `testing/e2e` compared pixel by pixel.

Unframework is the compiler that supersedes Inkline's. It compiles one `.uf.tsx` component to React, Vue, Svelte, Solid, Angular, Qwik and Astro, and it ships the tools a design system needs around that: `unframework test`, which runs one spec on every target and compares their DOM, ARIA tree, steps, geometry and pixels, `unframework visual`, which renders each example on every target, and `unframework preview`. Inkline is becoming a UI library only, so keeping a compiler of its own meant keeping two compilers in step.

## Decision

1. **The components are `.uf.tsx` sources.** `ui/components/src/components/` holds the 25 components, and `unframework build` compiles them to `ui/components/dist/<target>`. Each `ui/<framework>` package keeps its Vite library build, fed from that output, with its `.` and `./headless` entries.
2. **The tests run on every target through `@unframework.dev/testing`.** Each component has one case under `ui/components/test/`, with a harness parent where a slot or a model needs one. `pnpm --filter @inkline/components test:targets` runs them.
3. **Examples replace the Storybooks.** Each story variant became a `*.example.uf.tsx` file, which `unframework visual` renders on every target and `unframework preview` shows side by side. `apps/storybook`, the per-framework Storybooks and `testing/e2e` are gone.
4. **Recipe props are typed from a generated module.** Unframework passes `virtual:styleframe` through only for the recipe functions a `class` calls, so `scripts/recipes.ts` writes the `…RecipeProps` types to `src/recipes.ts`, and a test fails when the file is stale.
5. **Each framework package records its API.** `ui/<framework>/test/api.json` lists the exports, the Angular selectors and each component's props, models and events. Its test rebuilds the report from the build, so an API change shows up as a diff.

## Consequences

### Good

- One compiler, maintained where the compiler work happens.
- Every component is tested on every target, and every example is compared on every target, in one run on one machine.
- The examples and the preview need no deployment, so the docs no longer depend on Storybooks that weren't live.

### Bad

- The framework packages' API changed. Angular selectors are `uf-i-*` instead of `ink-*`, React, Solid and Qwik call a model's update callback `on<Model>Change`, components take `class` and `style` rather than every attribute, and the headless roots no longer carry the recipe's class name. Each package's changeset lists every change.
- Inkline depends on Unframework releases. A fix the components need in the compiler waits for one.
- A few target differences need workarounds in Inkline until Unframework handles them: React's JSX import source is set by hand, a read-only control keeps a local copy of its model, and the test and visual servers give the page's `body` the theme's colours.

## Revisit when

- Unframework's Angular target takes a selector prefix, so Inkline can restore `ink-*` selectors.
- Unframework reads a recipe's props type from `virtual:styleframe`, so `src/recipes.ts` can go.
