# Architecture

Inkline is a UI library in seven frameworks. Each component is written once as a `.uf.tsx` file in [`ui/components`](../ui/components/), and [Unframework](https://unframework.dev) compiles it to idiomatic React, Vue 3, Svelte 5, Solid, Angular, Qwik and Astro components, styled with [Styleframe](https://github.com/styleframe-dev/styleframe). No Inkline runtime ships in the output.

This page explains how a component goes from its source to the seven packages, and how it's tested. For practical authoring guidance, see [authoring-components.md](./authoring-components.md). [ADR-012](./adrs/012-components-compile-with-unframework.md) records the decision.

## High-level flow

```
ui/components/src/**/*.uf.tsx
        │  unframework build, then scripts/barrels.ts
        ▼
ui/components/dist/<target>/   (index.ts: styled, headless.ts: headless)
        │  each package's vp build (vp build && vp pack on Astro)
        ▼
ui/<framework>/dist/           (the published entries: ., ./headless, ./css)
```

1. **Compile.** `pnpm --filter @inkline/components build` runs `unframework build`, which compiles every `.uf.tsx` under `src/` to each target's tree in `dist/<target>`, copies the plain `.ts` modules the sources import, like each family's `types.ts` and the generated `src/recipes.ts`, and writes a barrel, `index.ts`.
2. **Split.** [`scripts/barrels.ts`](../ui/components/scripts/barrels.ts) splits each barrel into the two entries the packages ship: `index.ts` exports the components under a `styled/` directory, and `headless.ts` those under `headless/`. It fails on any other line.
3. **Package.** Each `ui/<framework>` package keeps its Vite library build, with Styleframe's plugin, which serves `virtual:styleframe`, the recipes the components import. Its entries re-export the two files in `ui/components/dist/<framework>`, and its `./css` entry, where it has one, is the stylesheet Vite extracts from `virtual:styleframe.css`.

The components' outputs import `virtual:styleframe` as written. Unframework passes it through for the recipe functions a `class` calls, so a recipe's props are typed from `src/recipes.ts`, which [`scripts/recipes.ts`](../ui/components/scripts/recipes.ts) generates from the `*.styleframe.ts` files.

## Packages

| Package                                                | Role                                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `@inkline/components` (private)                        | The `.uf.tsx` sources, their recipes, tests and examples                           |
| `@inkline/{react,vue,svelte,solid,angular,qwik,astro}` | The published packages, built from Unframework's output                            |
| `@inkline/toolchain-angular` (private)                 | Angular's compiler stack on TypeScript 6, where the test and preview tools load it |
| `website` (`apps/docs`)                                | The documentation site                                                             |

The compiler packages under `core/` and `tooling/` (`@inkline/compiler`, `core`, `plugin`, `config-loader`, `cli` and `test-utils`) are retiring. Nothing in `ui/` or `apps/` depends on them, and they'll be removed.

## Testing

Four checks cover the components:

- **`pnpm --filter @inkline/components test:targets`** runs `unframework test`: every case under [`ui/components/test/`](../ui/components/test/) on every target, in Chromium and in a server render. A case's spec mounts a component, or a harness parent that fills its slots or binds its models, acts through `view.user` and checks the ARIA tree, axe-core and the component's own states. Each `expectParity` compares the target's DOM, ARIA tree, steps, geometry and pixels with what Vue, the reference, wrote under the case's `__expected__/`.
- **`pnpm --filter @inkline/components visual`** runs `unframework visual`: every `*.example.uf.tsx` on every target, with its geometry and pixels compared with Vue's in the same run.
- **`pnpm --filter @inkline/components test:recipes`** checks that `src/recipes.ts` is current and that the barrel split works.
- **`pnpm --filter @inkline/<framework> test`** rebuilds that package's API report from its build, the names each entry exports and each component's props, models and events, with its selector on Angular, and compares it with the committed [`test/api.json`](../ui/react/test/api.json). On Angular, it also loads the built `dist/` and checks that every exported component is compiled with all its inputs, and server-renders a styled and a headless button from it, since a component Analog's plugin skips still builds ([`ui/angular/AGENTS.md`](../ui/angular/AGENTS.md)).

`pnpm --filter @inkline/components dev` runs `unframework preview`, which shows every example and component on every target side by side.

## See also

- [authoring-components.md](./authoring-components.md): adding or changing a component.
- [`ui/components/AGENTS.md`](../ui/components/AGENTS.md): the package's layout and commands.
- [Unframework's documentation](https://unframework.dev/docs): the language, its targets and its tools.
