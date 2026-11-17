# @inkline/qwik

The Qwik package of Inkline's components.

## Don't edit the components here

To change a component, edit its `.uf.tsx` source in [`ui/components/src/components/`](../components/src/components/) and build again, as [`ui/components/AGENTS.md`](../components/AGENTS.md) explains. This package builds from Unframework's Qwik output, in three places:

- `ui/components/dist/qwik/` is the output `pnpm --filter @inkline/components build` writes: the compiled components, and the `index.ts` and `headless.ts` entries. Never hand-edit it.
- `src/` holds this package's build entries, which re-export those two files. `src/index.ts` also imports `virtual:styleframe.css`, where the package ships a stylesheet, so Vite extracts it to `dist/index.css`.
- `.styleframe/` holds generated Styleframe artefacts. Never hand-edit them.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                 |
| ---------------- | ------------------------ |
| `.`              | The 8 styled components. |
| `./headless`     | The 17 headless parts.   |
| `./package.json` | The manifest.            |

Peer dependency: `@qwik.dev/core` 2.0.0-beta.47 exactly, the version Unframework generates the components for. Move it with the catalog when Inkline moves to a newer Unframework.

[`test/api.json`](./test/api.json) records this surface: the names each entry exports and each component's props, models and events. `pnpm --filter @inkline/qwik test` rebuilds the report from `dist/` and fails when it differs. After an intended change, write it again with `node ui/components/scripts/api-report.ts qwik ui/components/dist/qwik --write` from the repository's root, and list each changed line in this package's changeset.

## Build

`vp build --mode lib`. Output goes to `dist/`: `index.qwik.mjs` and `headless.qwik.mjs`. Without `--mode lib`, Qwik's Vite plugin runs an app build, which writes neither entry. Build `@inkline/components` first.

## Notable target behaviour

- [`package.json`](./package.json) also declares a top-level `"qwik": "./dist/index.qwik.mjs"` field, which Qwik's tooling reads.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md): where to edit the components.
- [docs/architecture.md](../../docs/architecture.md): how a component becomes seven packages.
