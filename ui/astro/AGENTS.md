# @inkline/astro

The Astro package of Inkline's components.

## Don't edit the components here

To change a component, edit its `.uf.tsx` source in [`ui/components/src/components/`](../components/src/components/) and build again, as [`ui/components/AGENTS.md`](../components/AGENTS.md) explains. This package builds from Unframework's Astro output, in three places:

- `ui/components/dist/astro/` is the output `pnpm --filter @inkline/components build` writes: the compiled components, and the `index.ts` and `headless.ts` entries. Never hand-edit it.
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

Peer dependency: `astro` 7.

[`test/api.json`](./test/api.json) records this surface: the names each entry exports and each component's props, models and events. `pnpm --filter @inkline/components run api:check` builds the report of every framework package and fails when one differs from its `api.json`. CI runs it once, in the API Report job, and `pnpm run ready` runs it too. After an intended change, write the reports again with `pnpm --filter @inkline/components run api:update`, and list each changed line in this package's changeset.

## Build

`vp build && vp pack`. `vp pack` never runs Vite plugins, so `vp build` first extracts the stylesheet from a CSS-only entry, `src/css.ts`. `vp pack` then bundles the two entries and copies the `.astro` components, with the type modules their frontmatter imports, into `dist/`. Build `@inkline/components` first.

## Preview

[`wrangler.json`](./wrangler.json) is the `inkline-preview-astro` Worker, which Cloudflare Workers Builds deploys with this directory as its root. It serves the Astro preview that `pnpm --filter @inkline/components preview:build:astro` writes to `ui/components/preview-astro/`: every example and component on the astro target only. [`ui/components/AGENTS.md`](../components/AGENTS.md) lists all eight preview Workers.

## Notable target behaviour

- Astro renders on the server only, so a component's event handlers, watchers and models do nothing in the browser. `unframework test` skips the specs that need interactivity on Astro.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md): where to edit the components.
- [docs/architecture.md](../../docs/architecture.md): how a component becomes seven packages.
