# Inkline

A UI library in seven frameworks. Each component is written once as a `.uf.tsx` file in `ui/components`, and [Unframework](https://unframework.dev) compiles it to idiomatic React, Vue 3, Svelte 5, Solid, Angular, Qwik and Astro, styled with Styleframe.

This file is the entry point for any LLM agent or new contributor working in the repo. Read it first, then descend to the nearest `AGENTS.md` for the area you're editing.

## Quick start

```bash
pnpm install            # install the workspace
pnpm run ready          # build + check + test (mirrors the CI gate)
pnpm run typecheck      # types only — build + type-check. Never `tsc` from the root.
pnpm run dev            # start the docs website (`turbo run dev --filter=website`)
pnpm --filter @inkline/components dev   # unframework preview: every example on all 7 targets
pnpm --filter @inkline/components preview:build   # the same preview as a static site, which Cloudflare deploys
pnpm --filter @inkline/components preview:build:react   # one framework's preview (vue, svelte, solid, angular, qwik, astro alike)
```

Turbo runs `build`, `dev` and `test` in every package ([`turbo.json`](./turbo.json)). The root [`package.json`](./package.json) `scripts` hold the full command list.

## Repository map

```
tooling/     @inkline/agents-check (docs link-integrity test),
             @inkline/toolchain-angular (Angular's stack for Unframework's tools)
ui/          @inkline/components (single source of truth) + 7 framework output packages
apps/        docs (the docs site)
docs/        architecture, conventions, contributing, release-process, authoring, maintenance
docs/adrs/   architecture decision records — why the codebase is the way it is
.changeset/  pending changesets — one markdown file per upcoming change
.github/     CI + changesets workflows, issue/PR templates, community health files
.old/        archived v0 codebase — read-only reference, do not edit or link into
```

Workspace globs live in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml). How the packages fit together, and how a component is built and tested, is in [docs/architecture.md](./docs/architecture.md).

## Where to look next

Per package — descend to the `AGENTS.md` nearest the file you're editing (LLM tools resolve nearest-wins):

| Package                                                                        | When to look                                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| [`tooling/toolchain-angular/AGENTS.md`](./tooling/toolchain-angular/AGENTS.md) | Angular's compiler stack, on TypeScript 6, for `unframework test`, `visual` and `preview` |
| [`ui/components/AGENTS.md`](./ui/components/AGENTS.md)                         | **Where you author components** — the single source for all 7 frameworks                  |
| [`ui/react/AGENTS.md`](./ui/react/AGENTS.md) and the six siblings              | Per-framework packages, built from Unframework's output                                   |
| [`apps/docs/AGENTS.md`](./apps/docs/AGENTS.md)                                 | The docs site                                                                             |

Per topic — read the relevant `docs/`:

| Doc                                                            | When to read                                           |
| -------------------------------------------------------------- | ------------------------------------------------------ |
| [docs/architecture.md](./docs/architecture.md)                 | How a `.uf.tsx` component becomes 7 framework packages |
| [docs/authoring-components.md](./docs/authoring-components.md) | How to add or modify a component                       |
| [docs/conventions.md](./docs/conventions.md)                   | Code, file, test, commit conventions                   |
| [docs/contributing.md](./docs/contributing.md)                 | Dev workflow, before-PR checklist, CI gate             |
| [docs/release-process.md](./docs/release-process.md)           | Changesets + npm publish flow                          |
| [docs/maintenance.md](./docs/maintenance.md)                   | How we keep docs from drifting                         |
| [docs/adrs/README.md](./docs/adrs/README.md)                   | Why the codebase is the way it is — decision records   |

## Cross-cutting conventions

These apply everywhere. Package-level `AGENTS.md` files repeat them only when consequential.

- **Tooling**: pnpm 11, Node ≥24, Turbo for the tasks, Vite and Vitest in each package, tsdown for Astro. OXLint via `pnpm run lint`, Oxfmt via `pnpm run format`. **Not ESLint, not Prettier.**
- **Tests**: colocated as `<file>.test.ts`. Vitest. Never in a separate `tests/` folder, with two exceptions: the component cases in `ui/components/test/`, since Unframework compiles every `.uf.tsx` under `src/`, and each framework package's API report in `ui/<framework>/test/`.
- **Commits**: conventional commits with package scope — `feat(components): …`, `fix(ci): …`. See [docs/conventions.md](./docs/conventions.md) → "Commit messages".
- **Changesets**: every change to a published package needs one (`pnpm changeset`). See [docs/release-process.md](./docs/release-process.md).
- **Generated directories — never hand-edit**: `ui/components/dist/` (Unframework's output), `ui/components/src/recipes.ts`, `ui/components/.styleframe/`, `ui/<framework>/.styleframe/`, every other `dist/` and `coverage/`.
- **Archived directory — never touch**: `.old/` is the v0 codebase, kept for reference only.
- **Doc freshness**: if your change touches public API, build flow, conventions, or the directory shape, update the relevant `AGENTS.md` / `docs/*.md`. See [docs/maintenance.md](./docs/maintenance.md).
