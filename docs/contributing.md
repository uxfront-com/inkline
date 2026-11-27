# Contributing

How to develop, validate, and submit changes to Inkline.

## Prerequisites

- Node ≥ 24 (enforced via [`package.json`](../package.json) `engines.node`)
- pnpm 11.x (`packageManager` in [`package.json`](../package.json))
- A POSIX-ish shell

## Setup

```bash
git clone <repo>
cd inkline
pnpm install
```

pnpm switches itself to the version `packageManager` names in the root [`package.json`](../package.json). If anything looks wrong with the toolchain (Node version, lockfile, package manager), include the output of `node --version` and `pnpm --version` when asking for help.

### Build once before you trust your editor

Run a build immediately after installing, before you open anything:

```bash
pnpm run build
```

Skip it and the editor will be solid red on a freshly cloned tree — several hundred errors, led by:

```
error TS2307: Cannot find module 'virtual:styleframe' or its corresponding type declarations.
```

followed by a long cascade of `TS2339` and `TS7026` on the props of every styled component.

This is expected, and it is not a broken install. Much of Inkline's type surface is generated rather
than checked in: workspace packages resolve each other through their built `dist/*.d.ts`, and the
styleframe Vite plugin writes each package's `.styleframe/` declarations (including the
`virtual:styleframe` module that every styled component imports its recipe props from). Neither
exists until a build has produced it, and both are gitignored. One `pnpm run build` clears all of it.

The same applies after `pnpm run clean`, and after switching to a branch that adds a package or a
recipe.

## Dev loops

| Goal                                        | Command                                           | Notes                                                                                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run the docs website                        | `pnpm run dev` (`turbo run dev --filter=website`) | Live-reloading website at the default Vite port.                                                                                                                                                              |
| Develop components against all 7 frameworks | `pnpm --filter @inkline/components dev`           | `unframework preview`: every example and component on every target, side by side. See [ui/components/AGENTS.md](../ui/components/AGENTS.md).                                                                  |
| Test components on all 7 frameworks         | `pnpm --filter @inkline/components test:targets`  | `unframework test`, in Chromium and in a server render. Install Chromium once with `pnpm --filter @inkline/components exec playwright install chromium`.                                                      |
| Visually compare all 7 frameworks           | `pnpm --filter @inkline/components visual`        | `unframework visual`: every example on every target, compared with the reference.                                                                                                                             |
| Build the component preview                 | `pnpm --filter @inkline/components preview:build` | `unframework preview build`: the preview as a static site in `ui/components/preview/`, which Cloudflare deploys. `preview:build:<framework>` builds one framework's, in `ui/components/preview-<framework>/`. |
| Work inside one package                     | `pnpm --filter <pkg> run <script>`                | Most packages expose `build` (`vite build`) and `test` (`vitest run`).                                                                                                                                        |

The full command surface for the root is in [`package.json`](../package.json) `scripts`. Turbo runs each package's `build`, `dev` and `test` in dependency order and caches them, as [`turbo.json`](../turbo.json) sets.

## Before opening a PR

Run the standard gate from the repo root:

```bash
pnpm run ready
```

This runs `pnpm run build && pnpm run check && pnpm run test`, then the components' `test:recipes`, `test:targets` (every case on every target, in Chromium and in a server render) and `api:check` (each framework package's API, compared with its `test/api.json`) — the same shape as CI. `pnpm run check` covers format (Oxfmt) + lint (OXLint, which also type-checks through `oxlint-tsgolint`). `test:targets` needs Playwright's Chromium: install it once with `pnpm --filter @inkline/components exec playwright install chromium`.

If you only need part of the gate while iterating, use `pnpm run check`, `pnpm run lint`, `pnpm run format:check`, `pnpm run check-types` or `pnpm run test` independently. CI runs the same commands with stricter flags — see below.

### Type-checking on its own

```bash
pnpm run typecheck
```

That is the whole supported surface, and it is exactly what CI's `typecheck` job runs. Two rules behind it:

- **The build is not optional.** Package types resolve through each package's `exports` into `dist/`, so checking without building type-checks the code as it was _before_ your change and reports **success**. That is not hypothetical — it is the reason this script exists. `pnpm run typecheck` builds first; the build is cached, so it is cheap when nothing changed.
- **`tsc` from the repo root is not the gate, and is not even TypeScript.** There is no root TypeScript install, so `npx tsc` reaches past the repo and resolves an unrelated `tsc` package from npm. It exits non-zero, so it cannot be read as a pass, but its message is about npx rather than your code — ignore it and run the script above.

To run the real compiler against a single package, do it from inside that package — `cd <pkg> && node_modules/.bin/tsc --noEmit -p tsconfig.json` — where the package's own TypeScript and tsconfig are what resolve.

## Continuous integration

Three workflows live under [`.github/workflows/`](../.github/workflows/):

- [`ci.yml`](../.github/workflows/ci.yml) — runs on every push to `main` and every PR. Granular parallel jobs: `build`, `build-website`, `lint`, `api-report` (the components' `api:check`, once per run), `typecheck`, `test`, `component-tests` (the components' `test:recipes` and `test:targets`, every case on every target) `visual` (`unframework visual`: every example on every target, compared with the reference target's capture) and `build-preview` (the components' build, then `preview:build` and each `preview:build:<framework>`, as Cloudflare Workers Builds deploys them to the `inkline-preview` and `inkline-preview-<framework>` Workers, with the sites kept as an artefact). `build-website`, `lint`, `api-report` and `test` depend on `build` and reuse its artifacts. `typecheck` builds for itself, so that the job is the same command a contributor runs and cannot check against a stale `dist/`, and `component-tests`, `visual` and `build-preview` compile the components themselves, from source. A final `ci-success` job aggregates the status of every job and fails when any of them fails or is cancelled. PR runs are cancelled when a new push arrives on the same ref; main runs are not. So a PR commit that a newer push supersedes shows a red `CI Success`, which is expected: branch protection reads only the head commit.
- [`changesets.yml`](../.github/workflows/changesets.yml) — runs on push to `main`. Uses `changesets/action` to maintain a "chore: update versions" PR. See [release-process.md](./release-process.md).
- [`lighthouse.yml`](../.github/workflows/lighthouse.yml) runs Lighthouse CI on the docs site each night, through the shared workflow in `uxfront-com/.github`, and only when `main` has moved since the last audit. A PR that changes it runs it once. Run it by hand from the Actions tab at any time. See [`apps/docs/AGENTS.md`](../apps/docs/AGENTS.md).

CI uses Node 24. If you see local-only test passes / CI failures, first compare your local Node version against the workflow's `NODE_VERSION`.

## Changesets

Any change to a published package's behavior, public API, types, or generated output **must** include a changeset:

```bash
pnpm changeset
```

Pick the affected packages, bump level (`patch` / `minor` / `major`), and write a one-sentence change description. The CLI writes a markdown file under [`.changeset/`](../.changeset/). Commit it with your code change.

Packages excluded from publishing are listed in [`.changeset/config.json`](../.changeset/config.json) `ignore`: today, `website` and `@inkline/components`. Internal-only packages, like `@inkline/components` and `@inkline/agents-check`, are also marked `private` in their `package.json`.

Full release flow: [release-process.md](./release-process.md).

## Pull requests

Opening a PR fills in the [pull request template](../.github/pull_request_template.md); [`CODEOWNERS`](../.github/CODEOWNERS) auto-requests review. Keep PRs scoped, include a changeset when applicable, check that `pnpm run ready` passes locally, and write a commit message following [conventions.md](./conventions.md) → "Commit messages".

If your change touches public API, build flow, repo conventions, or directory structure, **also update the relevant `AGENTS.md` and/or `docs/*.md`**. See [maintenance.md](./maintenance.md) for what counts as a "doc-touching" change.

## Bug reports and issues

Open an issue from the [issue chooser](https://github.com/inkline/inkline/issues/new/choose) — the **Bug report** and **Feature request** forms prompt for everything we need:

- A minimal reproduction: the component, its props and the steps that trigger the bug.
- Inkline version (`pnpm list "@inkline/*"`).
- `node --version` and `pnpm --version` if the issue looks tooling-related.
- Expected vs actual behavior.

For "how do I…" questions and open-ended ideas, use [GitHub Discussions](https://github.com/inkline/inkline/discussions) instead.

## See also

- [conventions.md](./conventions.md) — code, file, commit conventions.
- [release-process.md](./release-process.md) — versioning and publishing.
- [maintenance.md](./maintenance.md) — keeping docs current.
