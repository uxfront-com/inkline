# @inkline/angular

The Angular package of Inkline's components.

## Don't edit the components here

To change a component, edit its `.uf.tsx` source in [`ui/components/src/components/`](../components/src/components/) and build again, as [`ui/components/AGENTS.md`](../components/AGENTS.md) explains. This package builds from Unframework's Angular output, in three places:

- `ui/components/dist/angular/` is the output `pnpm --filter @inkline/components build` writes: the compiled components, and the `index.ts` and `headless.ts` entries. Never hand-edit it.
- `src/` holds this package's build entries, `index.ts` and `headless.ts`, which only re-export those two files.
- `.styleframe/` holds generated Styleframe artefacts. Never hand-edit them.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                 |
| ---------------- | ------------------------ |
| `.`              | The 8 styled components. |
| `./headless`     | The 17 headless parts.   |
| `./package.json` | The manifest.            |

Peer dependency: `@angular/core` 22.

[`test/api.json`](./test/api.json) records this surface: the names each entry exports and each component's props, models and events, and its selector. `pnpm --filter @inkline/components run api:check` builds the report of every framework package and fails when one differs from its `api.json`. CI runs it once, in the API Report job, and `pnpm run ready` runs it too. After an intended change, write the reports again with `pnpm --filter @inkline/components run api:update`, and list each changed line in this package's changeset.

`pnpm --filter @inkline/angular test` runs two tests. Build the package first, since both read `dist/`:

- `test/dist.test.ts` loads `dist/` with Angular's JIT compiler and checks that each component `api.json` lists carries its selector, an input for every prop and model, and an output for every event and model. A component the compiler skipped still gets a definition in JIT, but with no inputs, so the input check is the one that catches it.
- `test/render.test.ts` server-renders the built `IButton` and `IButtonBase` with `label="Save"` and `[id]="'save'"`, and checks that each `<button>` has both.

## Build

`vite build`, with Analog's Angular plugin compiling the components in partial mode ([`tsconfig.lib.json`](./tsconfig.lib.json) sets `compilationMode: "partial"`), as Angular libraries ship. The consuming app's Angular compiler links the declarations. The bundles go to `dist/fesm2022/`, because Analog's optimiser links only paths that match `/fesm20/`. Build `@inkline/components` first.

Two settings keep every component compiled:

- `tsconfig.lib.json` resolves modules the way Vite does (`moduleResolution: "bundler"`). Unframework's output imports its siblings without a file extension, like `../headless/i-button-base`. Under the root's `nodenext`, Analog resolves those as ECMAScript imports and fails, so the Angular compiler skips each styled component and Vite ships it as a plain decorator call with no inputs.
- `vite.config.ts` turns Analog's type checking on (`disableTypeChecking: false`), so an error like that fails the build. With it off, Analog drops the Angular compiler's errors from a build.

## Preview

[`wrangler.json`](./wrangler.json) is the `inkline-preview-angular` Worker, which Cloudflare Workers Builds deploys with this directory as its root. It serves the Angular preview that `pnpm --filter @inkline/components preview:build:angular` writes to `ui/components/preview-angular/`: every example and component on the angular target only. [`ui/components/AGENTS.md`](../components/AGENTS.md) lists all eight preview Workers.

## Notable target behaviour

- Each component is a standalone component whose selector is its name in kebab case with Unframework's `uf-` prefix: `uf-i-button`, `uf-i-button-base`. Its host is `display: contents`, and a `class` or `style` on the host lands on its root element.
- The package ships no `./css` entry. Each component imports the stylesheet it needs.
- The `types` conditions in `package.json` point at `dist/.inkline/`, which no build writes, as they did before the port. Shipping the Angular declarations is a known gap.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md): where to edit the components.
- [docs/architecture.md](../../docs/architecture.md): how a component becomes seven packages.
