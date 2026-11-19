# Conventions

Repo-wide conventions for code, tests, files, and commits. This document is a pointer to canonical sources wherever possible — when in doubt, check the config file referenced here rather than this page.

## Tooling

| Concern                   | Tool                   | Configured in                                                                                          |
| ------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| Package manager           | pnpm 11.x              | [`package.json`](../package.json) `packageManager` field                                               |
| Node runtime              | Node ≥24               | [`package.json`](../package.json) `engines.node`                                                       |
| Workspace layout          | pnpm workspaces        | [`pnpm-workspace.yaml`](../pnpm-workspace.yaml)                                                        |
| Build / dev / test driver | Vite+ (`vp` CLI)       | per-package [`vite.config.ts`](../vite.config.ts) + root [`vite.config.ts`](../vite.config.ts)         |
| Linter                    | OXLint (via `vp lint`) | root [`vite.config.ts`](../vite.config.ts) `lint` section                                              |
| Formatter                 | Oxfmt (via `vp fmt`)   | root [`vite.config.ts`](../vite.config.ts) `fmt` section                                               |
| Type checker              | `pnpm run typecheck`   | root [`tsconfig.json`](../tsconfig.json) + per-package extensions — never bare `tsc` from the root     |
| Test runner               | Vitest                 | per-package `vite.config.ts` `test` section                                                            |
| Versioning / publishing   | Changesets             | [`.changeset/config.json`](../.changeset/config.json) — see [release-process.md](./release-process.md) |
| Component previews        | `unframework preview`  | [`ui/components/unframework.config.ts`](../ui/components/unframework.config.ts)                        |

ESLint and Prettier are **not** used. Their config schemas appear in the catalog because some framework plugins (Vue, Svelte, Angular, Astro, Solid, Qwik) ship ESLint configs as transitive deps — we do not invoke them.

## Workspace layout

```
tooling/   docs link check, Angular's toolchain for Unframework's tools
ui/        single-source components + 7 generated framework packages
apps/      docs website
```

See [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) for the authoritative glob list and [AGENTS.md](../AGENTS.md) for orientation. A `tools/*` slot exists in the workspace globs but has no packages today.

## File naming

| Pattern          | Where                                 | Meaning                                                                                                                                                                                                                |
| ---------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*.uf.tsx`       | `ui/components/src/components/**`     | Authored Inkline component. Unframework compiles it to all seven framework targets.                                                                                                                                    |
| `*.test.ts`      | colocated next to source              | Vitest test for the adjacent module. Tests never live in a separate `tests/` directory, except the component cases in `ui/components/test/` and the tests of each framework package's build in `ui/<framework>/test/`. |
| `*.test.ts`      | `ui/components/test/<family>/<case>/` | A component case's spec, through `@unframework.dev/testing`. `test:targets` runs it on every target.                                                                                                                   |
| `__snapshots__/` | colocated                             | Vitest snapshot files.                                                                                                                                                                                                 |
| `dist/`          | `ui/<framework>/dist/`                | **Auto-generated**: the package's library build of Unframework's output in `ui/components/dist/<framework>/`. Never hand-edit.                                                                                         |
| `.styleframe/`   | `ui/<framework>/.styleframe/`         | **Auto-generated** style artifacts. Never hand-edit.                                                                                                                                                                   |
| `dist/`          | per-package                           | Build output. Never hand-edit.                                                                                                                                                                                         |

## Test layout

Tests live next to their source as `<file>.test.ts`. Examples:

- [`ui/components/scripts/recipes.test.ts`](../ui/components/scripts/recipes.test.ts) is colocated with `recipes.ts`.
- [`ui/components/scripts/barrels.test.ts`](../ui/components/scripts/barrels.test.ts) is colocated with `barrels.ts`.

Run all tests with `vp run -r test` from the repo root; run a single package's tests with `vp test` inside that package. Coverage uses `@vitest/coverage-v8`.

**Exception: the component tests.** `ui/components` runs its tests with Unframework, which runs Vitest in Chromium on every target. Each component's case is a directory under [`ui/components/test/`](../ui/components/test/), with its spec, a harness parent and its expectations, and `test:targets` runs them, not `test`. See [`ui/components/AGENTS.md`](../ui/components/AGENTS.md).

**Exception: the framework packages.** Each framework package keeps its API report (`test/api.json`) and the tests of its build in [`ui/<framework>/test/`](../ui/react/test/), since they test the package's build, not one module. `pnpm --filter @inkline/components api:check` checks the reports. See [`ui/react/AGENTS.md`](../ui/react/AGENTS.md).

## Code style

- TypeScript everywhere. No JavaScript source.
- `vp fmt` is authoritative — do not configure editor formatters that disagree. The `staged` hook ([`vite.config.ts`](../vite.config.ts)) runs `vp check --fix` on staged files.
- The lint config in [`vite.config.ts:lint`](../vite.config.ts) enables `typeAware: true, typeCheck: true`. Lint failures are CI-blocking.
- No `console.log` in shipped code (lint will catch it).
- Public APIs are explicitly typed at the boundary (no inferred return types on exported functions).

## Commit messages

Conventional commits with package-scoped names. Format:

```
<type>(<scope>): <subject>
```

| Type       | Use                                               |
| ---------- | ------------------------------------------------- |
| `feat`     | New user-facing capability or public API addition |
| `fix`      | Bug fix                                           |
| `refactor` | Internal restructure with no behavior change      |
| `docs`     | Documentation only                                |
| `test`     | Test additions / changes only                     |
| `chore`    | Tooling, configs, dependencies                    |
| `ci`       | CI workflow changes                               |

Common scopes: `components`, `react`, `vue`, `svelte`, `solid`, `angular`, `qwik`, `astro`, `ci`.

Recent examples to follow:

- `fix(components): write styleframe's type declarations in the build`
- `feat(ci): expand CI workflow with granular jobs and app builds`
- `fix(ci): ignore auto-generated .styleframe files`

## Changesets

Any change that affects a published package's behavior, API, or types **requires a changeset**. Add one with `pnpm changeset` before opening a PR. See [release-process.md](./release-process.md) for the full flow and for which packages are excluded from publishing.

## Archived code

`.old/` contains the v0 codebase, kept for reference only. Do not link into it from docs, do not import from it, do not edit it.

## See also

- [contributing.md](./contributing.md) — dev workflow.
- [maintenance.md](./maintenance.md) — how we keep these conventions documented and current.
