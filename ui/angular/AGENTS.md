# @inkline/angular

The Angular package of Inkline's components.

## Don't edit the components here

To change a component, edit its `.uf.tsx` source in [`ui/components/src/components/`](../components/src/components/) and build again, as [`ui/components/AGENTS.md`](../components/AGENTS.md) explains. This package builds from Unframework's Angular output, in three places:

- `ui/components/dist/angular/` is the output `pnpm --filter @inkline/components build` writes: the compiled components, and the `index.ts` and `headless.ts` entries. Never hand-edit it.
- `src/` holds this package's build entries, which re-export those two files. `src/index.ts` also imports `virtual:styleframe.css`, where the package ships a stylesheet, so Vite extracts it to `dist/index.css`.
- `.styleframe/` holds generated Styleframe artefacts. Never hand-edit them.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                 |
| ---------------- | ------------------------ |
| `.`              | The 8 styled components. |
| `./headless`     | The 17 headless parts.   |
| `./package.json` | The manifest.            |

Peer dependency: `@angular/core` 22.

[`test/api.json`](./test/api.json) records this surface: the names each entry exports and each component's props, models and events, and its selector. `pnpm --filter @inkline/angular test` rebuilds the report from `dist/` and fails when it differs. After an intended change, write it again with `node ui/components/scripts/api-report.ts angular ui/components/dist/angular --write` from the repository's root, and list each changed line in this package's changeset.

## Build

`vp build`, with Analog's Angular plugin compiling the components in partial mode ([`tsconfig.lib.json`](./tsconfig.lib.json) sets `compilationMode: "partial"`), as Angular libraries ship. The consuming app's Angular compiler links the declarations. The bundles go to `dist/fesm2022/`, because Analog's optimiser links only paths that match `/fesm20/`. Build `@inkline/components` first.

## Notable target behaviour

- Each component is a standalone component whose selector is its name in kebab case with Unframework's `uf-` prefix: `uf-i-button`, `uf-i-button-base`. Its host is `display: contents`, and a `class` or `style` on the host lands on its root element.
- The package ships no `./css` entry. Each component imports the stylesheet it needs.
- The `types` conditions in `package.json` point at `dist/.inkline/`, which no build writes, as they did before the port. Shipping the Angular declarations is a known gap.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md): where to edit the components.
- [docs/architecture.md](../../docs/architecture.md): how a component becomes seven packages.
