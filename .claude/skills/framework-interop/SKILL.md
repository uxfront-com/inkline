---
name: framework-interop
description: The seven framework output packages and the boundaries Inkline lives on — exports contracts, peer-dep/version matrix, per-target capability gaps, idiom fidelity, and the styleframe upstream relationship. Use for ui/<framework> work, framework upgrades, and boundary coordination.
---

# Framework interop

> Inkline's components now compile with Unframework. For how a component is written, built and tested, read [docs/authoring-components.md](../../../docs/authoring-components.md) and [docs/architecture.md](../../../docs/architecture.md); where this guide differs from them, they win.

Inkline sits on two borders. **Downstream**: one compiled component must feel native in seven framework ecosystems. **Upstream**: every styled component consumes styleframe recipes. Both borders are trust surfaces — nothing crosses them silently degraded.

## The seven crossings (`ui/<framework>/`)

| Package            | Runtime peers                | Notes                                             |
| ------------------ | ---------------------------- | ------------------------------------------------- |
| `@inkline/react`   | react ≥19.2                  | the output calls `useEffectEvent`                 |
| `@inkline/vue`     | vue ≥3                       | Vue is the reference every target is compared to  |
| `@inkline/svelte`  | svelte ≥5                    | runes (`$state`/`$derived`/`$bindable`)           |
| `@inkline/solid`   | solid-js ≥1                  |                                                   |
| `@inkline/angular` | @angular/core ^22            | `uf-i-*` selectors, `class` and `style` inputs    |
| `@inkline/qwik`    | @qwik.dev/core 2.0.0-beta.47 | pinned to the beta Unframework's release supports |
| `@inkline/astro`   | astro ^7                     | server render only: models and events are inert   |

Anatomy is identical everywhere: each package's Vite library build re-exports Unframework's output in `ui/components/dist/<framework>` ([docs/architecture.md](../../../docs/architecture.md)). `dist/` and `.styleframe/` are machine output: **nobody edits them**. The hand-maintained surface is `package.json`, `vite.config.ts`, `tsconfig.json` and `test/api.json`. Exports map: `.` (styled), `./headless`, `./css` where the package has one, and `./package.json`. This map is the public contract, and `test/api.json` records it: changing it is semver-major territory.

Framework versions are pinned in the `pnpm-workspace.yaml` catalog (React 19.2, Vue 3.5, Svelte 5.5x, Solid 1.9, Angular 22.2, Astro 7 at snapshot). **Framework upgrades are deliberate migrations**: bump catalog → rebuild → conformance + visual parity → note behavior changes; when a new framework version changes the idiomatic output shape, that's a codegen change (coordinate with @atlas).

## Idiom fidelity (the downstream promise)

Emitted code must read like a native wrote it. Enforcement: per-target **conformance specs** (typecheck + framework-native lint of emitted files — the framework ESLint configs exist in the repo _only_ for this; the repo itself lints with oxlint) and the scenario layer's DOM equivalence. Known baseline: the Astro conformance-lint has ~74 pre-existing parse failures — not regressions.

**Per-target capability gaps are documented, diagnosed, never silent** — the pattern to preserve:

- Astro is static: two-way binding degrades to one-way (INK0045), custom events are inert.
- Qwik/Angular lack runtime slot presence: `hasSlot` compiles to `true` (INK0068) + the `:empty` CSS collapse convention.
- Angular: kebab `ink-*` selectors, `klass` class-merge, host-collapse variants; native attrs (e.g. `hidden`) must be explicit base props — fallthrough breaks on wrapper variants.
- Solid: `undefined` renders as `"undefined"` on native string props — sources coalesce with `?? ""`.

A new gap must land as: compiler diagnostic (INKxxxx) + per-target note in docs + (where possible) a CSS/authoring convention that neutralizes it. Losing a capability quietly destroys consumer trust permanently.

## The styleframe border (the upstream relationship)

Inkline is **customer zero** of styleframe — the relationship runs both ways:

- **Inbound**: recipe/token breaking changes (axis renames, default changes) arrive with migration notes from the styleframe guild. Same-day triage: assess blast radius across `.styleframe.ts` files + recipe-prop types (`XRecipeProps` flows into component props!), land the migration, changeset the framework packages if emitted CSS changes.
- **Outbound**: recipe gaps blocking the catalog (toast, combobox, date-picker, data-table…) are filed upstream with the component spec attached — Inkline's component API research is styleframe's best requirements document. Never fork a local one-off for a family upstream is about to ship.
- Version bumps ride the catalog in `pnpm-workspace.yaml`; the styleframe first-party packages are deliberately excluded from pnpm's `minimumReleaseAge` guard (intentionally fresh, trusted).

## Cases and examples are an interop contract too

Every case under `ui/components/test/` and every `*.example.uf.tsx` runs on all seven targets, compared with Vue's output ([docs/authoring-components.md](../../../docs/authoring-components.md)). Renaming a case's scenario or an example changes its expectations on every target: treat it like an API rename.
