# ADR-013: The API reports are checked once, by a script

Date: 2026-11-19 · Status: Accepted
Deciders: Project owner
Supersedes: [ADR-012](./012-components-compile-with-unframework.md) **in part**: the check in its Decision 5, only · Superseded by: none

> **Note (2026-11-27).** The commands this record names are given as the tools they ran, because
> Inkline has since moved to running Oxfmt, OXLint, Vite and Vitest directly, through Turbo (see
> [`docs/conventions.md`](../conventions.md)). Nothing else in the record has changed.

## Context

[ADR-012](./012-components-compile-with-unframework.md) Decision 5 says:

> **Each framework package records its API.** `ui/<framework>/test/api.json` lists the exports, the Angular selectors and each component's props, models and events. Its test rebuilds the report from the build, so an API change shows up as a diff.

So each of the seven `ui/<framework>` packages had a `test/api.test.ts` that rebuilt its report, in a child process, and compared it with `api.json`. Those tests ran inside CI's Unit Tests job, which splits the suite into two shards and turns on coverage. Two things went wrong with that:

- **CI's flags never reached the tests.** CI ran `pnpm run test -- --coverage --shard=<n>/2 …`, and each `ui/<framework>` package's script ran Vitest with `--passWithNoTests`. Vitest ignores what follows a `--` that isn't its first argument, so these packages got no coverage, and every one of their test files ran in both shards.
- **The check was shaped around the shards.** A report is one comparison of the whole package's build, not a unit of it, so splitting it across shards had nothing to gain. The tests ran it in a child process to keep it out of V8 coverage, which CI never collected for these packages, and gave it a 30 s timeout because it shared a runner with other packages' tests.

Libraries usually check an API report once per CI run, in a step of its own that fails when the committed report differs from the build and names the command that updates it, like `api-extractor run` and `api-extractor run --local`.

## Decision

1. **The reports are checked by one script.** `pnpm --filter @inkline/components run api:check` builds the report of each of the seven packages and compares it with its `test/api.json`. When one differs, it prints the lines that differ and the update command, and exits with 1 once it has checked all seven. `pnpm --filter @inkline/components run api:update` writes the reports again. Both run `ui/components/scripts/api-report.ts`.
2. **CI runs it once.** The API Report job runs `api:check` after Build Packages, on its artefacts, outside the Unit Tests shard matrix. `pnpm run ready` runs it locally.
3. **The packages' `api.test.ts` files go.** With them go the child process and the timeout. React, Solid and Angular keep `test` scripts for their other tests, and Vue, Svelte, Qwik and Astro, which had no other test, have none.
4. **The reports stay as they are.** `api.json` keeps its place and its format, so ADR-012's Decision 5 still holds for what each package records.

## Consequences

### Good

- A stale report shows up by name in the checks list, as API Report, with the lines that differ.
- The check runs once per CI run instead of once per shard, and all seven reports build in about 1.5 s in one process on a developer machine.
- CI's test flags reach every package's tests, so React, Solid and Angular report coverage and each of their test files runs in one shard.

### Bad

- `pnpm run test` alone no longer checks the API. You need `api:check`, or `pnpm run ready`, which runs it.
- `api:check` needs a build of the framework packages and of `ui/components`. Run against a stale `dist/`, it compares the old API.
- CI has one more job, so one more runner per run. It needs only Build Packages, so it ends before the longer jobs do.

## Revisit when

- The report moves to a standard tool, like `@microsoft/api-extractor`, whose own command replaces `api:check`.
- Unframework emits an API report of its own for each target.
