# @inkline/components

The **single source of truth** for every Inkline component. Each component is written once as a `.uf.tsx` file here, and [Unframework](https://unframework.dev) compiles it to the seven framework packages (`@inkline/react`, `@inkline/vue`, …). This package is private (`"private": true` in [`package.json`](./package.json)) and is never published.

If you're reading this because you wanted to change a React (or Vue, or …) component: stop. Edit its `.uf.tsx` file under `src/components/` here, then build again.

For the walkthrough, see [docs/authoring-components.md](../../docs/authoring-components.md). For the language, see [Unframework's documentation](https://unframework.dev/docs).

## Layout

```
ui/components/
├── unframework.config.ts  # Targets, the Angular toolchain, the test and preview servers' Vite config
├── vitest.config.ts       # `unframework test`'s cases: everything under test/
├── styleframe.config.ts   # Styleframe (design tokens) config
├── tsconfig.json          # Type-checks the sources with Unframework's JSX types
├── wrangler.json          # The inkline-preview Worker, which serves preview/ as static assets
├── scripts/
│   ├── recipes.ts         # Writes src/recipes.ts from the *.styleframe.ts files
│   ├── styleframe-types.ts # Writes .styleframe/, the types of virtual:styleframe
│   ├── barrels.ts         # Splits each target's barrel into index.ts and headless.ts
│   └── api-report.ts      # Checks and writes each framework package's API report (ui/<framework>/test/api.json)
├── src/
│   ├── recipes.ts         # Generated: each recipe's props type
│   └── components/<name>/
│       ├── types.ts                          # The family's props types
│       ├── headless/I<Name>Base.uf.tsx       # Behaviour, no styling
│       ├── styled/I<Name>.uf.tsx             # Composes the headless parts, with the recipes
│       ├── styled/I<Name>.styleframe.ts      # The family's recipes
│       └── examples/<Example>.example.uf.tsx # What `unframework visual` and `preview` render
├── test/<name>/<case>/    # One case per component: its spec, a harness parent, case.json, __expected__/
├── .styleframe/           # Generated: Styleframe's declarations, which type virtual:styleframe
├── dist/<target>/         # Generated: Unframework's output for each target
├── preview/               # Generated: the static preview that `pnpm preview:build` writes
└── preview-<framework>/   # Generated: one framework's static preview, from `pnpm preview:build:<framework>`
```

`pnpm build` writes each target's tree to `dist/<target>`, and each `ui/<framework>` package builds from it. Never hand-edit `dist/`.

## Commands

```bash
pnpm build          # scripts/styleframe-types.ts, then unframework build and scripts/barrels.ts
pnpm dev            # unframework preview: every example and component on every target
pnpm preview:build  # unframework preview build: the same preview as a static site in preview/
pnpm preview:build:<framework>  # the same, for one target only, in preview-<framework>/
pnpm test:recipes   # node --test: src/recipes.ts is current, .styleframe/ declares virtual:styleframe, and the barrel split and the API report diff work
pnpm test:targets   # unframework test: every case on every target, in Chromium and on the server
pnpm visual         # unframework visual: every example on every target, compared with the reference
pnpm api:check      # each framework package's API, from its build, compared with its test/api.json
pnpm api:update     # writes each framework package's test/api.json from its build
```

`test:targets` and `visual` drive Playwright's Chromium: install it once with `pnpm exec playwright install chromium`. When a component's output changes on purpose, run `pnpm test:targets --update`, then review every file it writes under `test/*/*/__expected__/`. Those files are what every target is held to.

## Examples and the preview

Each `examples/<Example>.example.uf.tsx` takes no props, and its default export carries a doc comment with the family's category, like `/** @category Components/Actions/Button */`. The preview groups the examples by it, and takes each title from the file name without the family's name, so `ButtonColors` is `Colors`. The comment's text, if any, is the description the preview shows, and `@title` and `@order` override the title and the place in the list. Unframework's [preview page](https://unframework.dev/docs/tooling/preview) has the rules.

`pnpm preview:build` writes the preview as a static site to `preview/`, and `pnpm preview:build:<framework>` writes one framework's preview, built with `--target <framework>`, to `preview-<framework>/`. Git ignores both. Cloudflare Workers Builds deploys each to a Worker of its own, from the Git repository, and gives each pull request a preview URL on every Worker:

| Worker                        | Serves                    | Wrangler config                                                        | Build                            |
| ----------------------------- | ------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| `inkline-preview`             | Every target side by side | [`wrangler.json`](./wrangler.json)                                     | `pnpm preview:build`             |
| `inkline-preview-<framework>` | One target                | `ui/<framework>/wrangler.json`, like [React's](../react/wrangler.json) | `pnpm preview:build:<framework>` |

The seven framework Workers are `inkline-preview-react`, `inkline-preview-vue`, `inkline-preview-svelte`, `inkline-preview-solid`, `inkline-preview-angular`, `inkline-preview-qwik` and `inkline-preview-astro`. Each Worker serves `main` at `https://<worker>.<subdomain>.workers.dev`, on the Cloudflare account's `workers.dev` subdomain, so React's preview is at `https://inkline-preview-react.<subdomain>.workers.dev`. Each config lives in its framework's package so that its Workers Builds project needs no `--config`: its root directory is `ui/<framework>`, and its `assets.directory` points back to `ui/components/preview-<framework>`. CI's `Build Preview` job builds all eight sites the same way on every pull request.

This package has no `test` script, so the repository's `pnpm run test` doesn't run the browser tests. `pnpm run ready` runs `test:recipes`, `test:targets` and `api:check` after it.

## Headless and styled

Every family ships in two layers:

- **`headless/I<Name>Base.uf.tsx`**: structure, slots, props, models and events, with no design tokens and no recipe classes. This is what a consumer swaps in to ship their own styling.
- **`styled/I<Name>.uf.tsx`**: composes the family's headless parts and gives each the class its recipe returns, imported from `virtual:styleframe`. A parent's `class` falls through to a component's root element.

One styled component composes all of a family's parts: [`src/components/input/`](./src/components/input/) is the model, where [`styled/IInput.uf.tsx`](./src/components/input/styled/IInput.uf.tsx) composes the shell, the control, the textarea and the prefix and suffix addons.

Props types live in each family's `types.ts`, a plain module every output copies, since Vue's compiler can't read a props type from another component's file. A recipe's props are typed from [`src/recipes.ts`](./src/recipes.ts) with `Pick`, like `Pick<ButtonRecipeProps, "color" | "variant" | "size">`: Unframework passes `virtual:styleframe` through only for the recipe functions a `class` calls.

## When you change a component

1. Edit `src/components/<name>/**/*.uf.tsx`. If you changed a `*.styleframe.ts` file, run `node scripts/recipes.ts`.
2. Run `pnpm build`, `pnpm test:recipes`, `pnpm test:targets` and `pnpm visual`.
3. Build the framework packages with `pnpm run build` from the repository's root, then run `pnpm api:check`, which compares each one's API with its `test/api.json`. After an intended API change, run `pnpm api:update` and read the diff.
4. Add a changeset for **each affected framework package**. The change ships through them, not through this private package.

## When you add a component

1. Create `src/components/<name>/` with its `types.ts`, `headless/`, `styled/` and `examples/`. The barrel split ships a component only from a `styled/` or `headless/` directory.
2. Add a case under `test/<name>/` for each component, with a harness parent where a slot or a model needs one. A harness parent never takes a component's file name.
3. Add the component to each framework package's `test/api.json` with `pnpm api:update`, after a build, and add a changeset for the seven packages.

## Pitfalls

- **Don't edit `dist/`, `src/recipes.ts` or `.styleframe/`.** They're generated. `pnpm build` writes `.styleframe/` first, because `tsconfig.json` types `virtual:styleframe` only through it, so the sources type-check only after a build.
- **A target difference is a failing test, not a flake.** Unframework compares every target with the reference, Vue. Fix the source, or record the difference in Unframework.
- **`virtual:styleframe` needs Styleframe's plugin in the consumer's Vite config.** The framework packages and `unframework.config.ts` set it up.

## See also

- [docs/authoring-components.md](../../docs/authoring-components.md): the contributor walkthrough.
- [docs/architecture.md](../../docs/architecture.md): how a component becomes seven packages.
- The seven `ui/<framework>/AGENTS.md` files: what each package ships.
