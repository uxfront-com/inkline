# Documentation maintenance

How we keep `AGENTS.md` and `docs/*.md` from drifting away from the code they describe.

## Core principle: pointers, not duplicates

Most drift comes from documentation that _restates_ config or code that lives elsewhere. We design against it at the source: docs **point at** canonical locations (`oxlint.config.ts`, `package.json:scripts`, `ui/components/scripts/...`) rather than re-state their contents. If a reader needs the exact rule, they read the config. If they need the _intent_, they read the doc.

Here's the difference:

- ✅ "Lint config lives in [`oxlint.config.ts`](../oxlint.config.ts). OXLint with `typeAware: true`."
- ❌ "Lint ignores `.context/**`, `.old/**`, `ui/**/.styleframe/**`, …" — this re-states config and will drift.

When writing or reviewing docs, ask: _if I removed this paragraph and replaced it with a link to the source, would the reader lose anything important?_ If no, replace it with the link.

## Five defenses in depth

| #   | Defense                                   | Where it lives                                                                             |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | Pointers, not duplicates                  | This principle, in every doc                                                               |
| 2   | Automated link/path integrity check       | [`tooling/agents-check`](../tooling/agents-check/) — Vitest, runs in the standard test job |
| 3   | PR template with "docs touched?" reminder | [`.github/pull_request_template.md`](../.github/pull_request_template.md)                  |
| 4   | Selective generation for stable lists     | Deferred; revisit when a specific drift bites                                              |
| 5   | Quarterly audit                           | Calendar event; see "Audit checklist" below                                                |

## Cross-references: if you change X, update Y

Use this table when reviewing your own PR. If the left column changed, check the right column.

| If you change…                                                                                                    | …consider updating                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm-workspace.yaml` or top-level directory shape                                                                | [AGENTS.md](../AGENTS.md), [conventions.md](./conventions.md) → "Workspace layout"                                                  |
| Root `package.json` scripts                                                                                       | [contributing.md](./contributing.md), [AGENTS.md](../AGENTS.md) → quick start                                                       |
| [`oxlint.config.ts`](../oxlint.config.ts), [`oxfmt.config.ts`](../oxfmt.config.ts), [`turbo.json`](../turbo.json) | [conventions.md](./conventions.md) (only if the _kind_ of tooling changes — not for ignore-list edits)                              |
| `.changeset/config.json`                                                                                          | [release-process.md](./release-process.md)                                                                                          |
| `ui/components`' build, test or preview commands, or `unframework.config.ts`                                      | [contributing.md](./contributing.md), [`ui/components/AGENTS.md`](../ui/components/AGENTS.md), the per-framework UI AGENTS.md files |
| Adding/removing a workspace package                                                                               | [AGENTS.md](../AGENTS.md), [architecture.md](./architecture.md) "Packages", create a new `AGENTS.md` for the package                |
| Making a decision that is hard to reverse, was genuinely contested, or that others will build on                  | File an ADR in [`docs/adrs/`](./adrs/) and add it to the [index](./adrs/README.md)                                                  |

This list itself is a duplication risk — keep it short, prefer adding `[[link]]`s in docs over expanding the table.

## Automated link integrity check

Implemented as [`tooling/agents-check/src/link-integrity.test.ts`](../tooling/agents-check/src/link-integrity.test.ts): a single Vitest test that walks every `AGENTS.md` (repo-wide) plus `docs/*.md` and `.github/*.md`, extracts relative markdown links (code fences stripped, fragments dropped), and asserts each target exists on disk. The test fails the standard CI test job on any miss. Catches the dominant failure mode (renames and deletes) automatically.

This check does **not** verify semantic accuracy. A doc that says "the lint config uses `typeAware`" still passes if `typeAware` is gone from the source — the _link_ still resolves. Semantic drift is the audit's job (below).

## PR template

[`.github/pull_request_template.md`](../.github/pull_request_template.md) carries a small checklist. The key item asks whether the PR changes public API, build flow, conventions, or repo structure, and if so, whether the relevant `AGENTS.md` / `docs/` files were updated. Soft enforcement; the goal is to raise the question on every PR.

## Audit checklist (quarterly)

Once per quarter, walk this list against current source:

1. **[AGENTS.md](../AGENTS.md)** — does the workspace map match `pnpm-workspace.yaml`? Are the listed `pnpm run` commands still the right surface?
2. **[architecture.md](./architecture.md)** — do the linked build scripts still exist with the documented responsibilities? Does the "Packages" table match `pnpm-workspace.yaml`?
3. **[conventions.md](./conventions.md)** — does the "Tooling" table match what's actually wired in `turbo.json`, `oxlint.config.ts`, `oxfmt.config.ts`, each package's `vite.config.ts` and `package.json`?
4. **[contributing.md](./contributing.md)** — do the dev-loop commands still produce a working environment? Walk the new-contributor flow end-to-end.
5. **[release-process.md](./release-process.md)** — does the changeset workflow still match `.github/workflows/changesets.yml`?
6. **[authoring-components.md](./authoring-components.md)** — does the canonical example (badge) still exist? Are the listed primitives still exported from `@uxfront/unframework`?
7. **Per-package `AGENTS.md`** — for each, does the package still exist? Do the entry-point claims match `package.json` `main`/`module`/`exports`?

Record findings in a tracking issue; clean up in a single docs PR.

## When to defer

If a section is starting to feel like a duplicate-prone list (e.g. a registry, a code-mapped table), do not try to maintain it by hand. Either:

- Replace it with a one-line pointer to the source file, or
- File a follow-up to generate it from source as part of a package's build (see "Selective generation for stable lists" above).

## See also

- [conventions.md](./conventions.md) — what conventions these docs enforce.
- [contributing.md](./contributing.md) → "Pull requests" — the soft expectation that docs travel with code.
- [AGENTS.md](../AGENTS.md) — the entry point this maintenance protects.
- [adrs/README.md](./adrs/README.md) — decision records. Unlike the docs above, ADRs are immutable: they are never updated to match new reality, only superseded.
