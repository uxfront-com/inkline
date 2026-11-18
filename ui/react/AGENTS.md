# @inkline/react

The React package of Inkline's components.

## Don't edit the components here

To change a component, edit its `.uf.tsx` source in [`ui/components/src/components/`](../components/src/components/) and build again, as [`ui/components/AGENTS.md`](../components/AGENTS.md) explains. This package builds from Unframework's React output, in three places:

- `ui/components/dist/react/` is the output `pnpm --filter @inkline/components build` writes: the compiled components, and the `index.ts` and `headless.ts` entries. Never hand-edit it.
- `src/` holds this package's build entries, which re-export those two files. `src/index.ts` also imports `virtual:styleframe.css`, where the package ships a stylesheet, so Vite extracts it to `dist/index.css`.
- `.styleframe/` holds generated Styleframe artefacts. Never hand-edit them.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                 |
| ---------------- | ------------------------ |
| `.`              | The 8 styled components. |
| `./headless`     | The 17 headless parts.   |
| `./css`          | The compiled stylesheet. |
| `./package.json` | The manifest.            |

Peer dependency: `react` 18 or newer.

[`test/api.json`](./test/api.json) records this surface: the names each entry exports and each component's props, models and events. `pnpm --filter @inkline/react test` rebuilds the report from `dist/` and fails when it differs. After an intended change, write it again with `node ui/components/scripts/api-report.ts react ui/components/dist/react --write` from the repository's root, and list each changed line in this package's changeset.

## Build

`vp build`. Output goes to `dist/`: `index.js`, `headless.js` and `index.css`. Build `@inkline/components` first.

## Preview

[`wrangler.json`](./wrangler.json) is the `inkline-preview-react` Worker, which Cloudflare Workers Builds deploys with this directory as its root. It serves the React preview that `pnpm --filter @inkline/components preview:build:react` writes to `ui/components/preview-react/`: every example and component on the react target only. [`ui/components/AGENTS.md`](../components/AGENTS.md) lists all eight preview Workers.

## Notable target behaviour

- `vite.config.ts` sets React's JSX import source itself, since the outputs sit under `ui/components`, whose `tsconfig.json` sets Unframework's for the `.uf.tsx` sources.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md): where to edit the components.
- [docs/architecture.md](../../docs/architecture.md): how a component becomes seven packages.
