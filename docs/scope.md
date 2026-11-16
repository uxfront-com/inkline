# Scope

What Inkline ships today, and what it leaves to the projects it builds on. It lists boundaries, not a backlog: roadmap discussion happens in GitHub issues.

## What ships today

Inkline is a UI library. It ships eight component families in seven frameworks, styled with Styleframe:

| Package                                                | What it holds                                                                                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `@inkline/{react,vue,svelte,solid,angular,qwik,astro}` | One package per framework, each with a styled entry (`.`) and a headless entry (`./headless`), and a `./css` entry on all but Angular and Qwik |
| `@inkline/components` (private)                        | The `.uf.tsx` sources, their Styleframe recipes, tests and examples                                                                            |
| `website` ([`apps/docs`](../apps/docs/AGENTS.md))      | The documentation site                                                                                                                         |

The families are badge, button, checkbox, field group, hamburger menu, input, radio and switch, under [`ui/components/src/components/`](../ui/components/src/components/). Each framework package depends only on its framework and `@styleframe/runtime` at runtime. [architecture.md](./architecture.md) explains how a component becomes the seven packages.

## Left to other projects

Some requests belong to the projects Inkline builds on, so we route them there:

- **The compiler.** [Unframework](https://unframework.dev) compiles every component, so a missing primitive, a new target or a wrong output for one framework is an Unframework change. Inkline's own compiler was removed when the components moved to Unframework, and [ADR-012](./adrs/012-components-compile-with-unframework.md) records why.
- **The styling engine.** Tokens, recipes and themes come from [Styleframe](https://github.com/styleframe-dev/styleframe). Inkline defines its recipes with it, but a new kind of token or utility is a Styleframe change.
- **A runtime layer.** No Inkline runtime ships in the output. Each component is plain code for its framework, so a request for shared runtime behaviour across frameworks needs a design first.

## See also

- [architecture.md](./architecture.md): how a `.uf.tsx` component becomes seven framework packages.
- [authoring-components.md](./authoring-components.md): adding or changing a component.
