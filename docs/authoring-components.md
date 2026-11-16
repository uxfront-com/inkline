# Authoring components

How to add or change an Inkline component. Every component is a `.uf.tsx` file in [`ui/components/`](../ui/components/), which [Unframework](https://unframework.dev) compiles to all seven frameworks.

This page covers where the files live, how a component is put together and how to test it. For the language itself, its props, state, models, slots and events, read [Unframework's documentation](https://unframework.dev/docs). For how the packages are built, read [architecture.md](./architecture.md).

## Where components live

```
ui/components/
├── src/components/<name>/
│   ├── types.ts                           ← the family's props types
│   ├── headless/I<Name>Base.uf.tsx        ← behaviour, with no styling
│   ├── styled/I<Name>.uf.tsx              ← composes the headless parts, with the recipes
│   ├── styled/I<Name>.styleframe.ts       ← registers the family's Styleframe recipes
│   └── examples/<Example>.example.uf.tsx  ← one per variant, rendered on every target
└── test/<name>/<case>/                    ← one case per component
```

[`ui/components/src/components/badge/`](../ui/components/src/components/badge/) is the pattern to copy.

The split between `headless/` and `styled/` is deliberate:

- **Headless** components define structure, slots, props, models and events, with no design tokens and no recipe classes. They're the behaviour and accessibility a consumer can style their own way.
- **Styled** components compose the headless ones and give each the class its recipe returns.

Consumers of `@inkline/{react,vue,…}` import the styled components from the package's root, and the headless ones from `/headless`.

## A minimal component

A headless badge renders its default slot, or its `label` when the slot is empty:

```tsx [badge/headless/IBadgeBase.uf.tsx]
import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { BadgeBaseProps } from "../types.ts";

export default function IBadgeBase({ label }: BadgeBaseProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return <div>{slots.default?.() ?? label}</div>;
}
```

The styled badge passes its recipe's class to the headless root, where it falls through:

```tsx [badge/styled/IBadge.uf.tsx]
import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { badgeRecipe } from "virtual:styleframe";

import IBadgeBase from "../headless/IBadgeBase.uf.tsx";
import type { BadgeProps } from "../types.ts";

export default function IBadge({ label, color, variant, size }: BadgeProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <IBadgeBase class={badgeRecipe({ color, variant, size })}>
      {slots.default?.() ?? label}
    </IBadgeBase>
  );
}
```

A headless root carries no class of its own when a styled component passes it a recipe, since the recipe's class already includes the component's name.

## Props types

Each family declares its props in its `types.ts`, a plain module every output copies. Vue's compiler can't read a props type from another component's file, so don't export a props type from a `.uf.tsx` file.

A recipe's props come from [`ui/components/src/recipes.ts`](../ui/components/src/recipes.ts), with `Pick`:

```ts [badge/types.ts]
import type { BadgeRecipeProps } from "../../recipes.ts";

export interface BadgeProps
  extends BadgeBaseProps, Pick<BadgeRecipeProps, "color" | "variant" | "size"> {}
```

`src/recipes.ts` is generated. When you change a `*.styleframe.ts` file, write it again with `node scripts/recipes.ts` from `ui/components`, or `pnpm test:recipes` fails.

## Adding a component

1. Create `ui/components/src/components/<name>/` with its `types.ts`, `headless/`, `styled/` and `examples/`. The build ships a component only from a `styled/` or `headless/` directory.
2. Author the headless parts, then the styled component that composes them, and register its recipes in a `*.styleframe.ts` file. Run `node scripts/recipes.ts`.
3. Add an example for each variant (below), and a test case for each component (below).
4. Run `pnpm build`, `pnpm test:targets` and `pnpm visual` in `ui/components`, and `unframework check` to see every diagnostic.
5. Add the new exports to each framework package's `test/api.json`, with the command in that package's `AGENTS.md`.
6. Add a changeset for each framework package before you open a PR. See [release-process.md](./release-process.md).

## Examples

An example is a `*.example.uf.tsx` file whose default export takes no props. It renders the component the way a page would, with the props, slots and models it shows written into it, and imports `virtual:styleframe.css`. `pnpm visual` renders every example on every target and compares each with Vue's, and `pnpm dev` shows them all side by side.

```tsx [badge/examples/BadgeSizes.example.uf.tsx]
import "virtual:styleframe.css";
import IBadge from "../styled/IBadge.uf.tsx";

export default function BadgeSizes() {
  return (
    <div>
      <IBadge size="sm">Small</IBadge>
      <IBadge size="lg">Large</IBadge>
    </div>
  );
}
```

## Testing

Each component has a case under `ui/components/test/<name>/<case>/`, which `pnpm test:targets` runs on every target with `@unframework.dev/testing`. A case holds:

- One spec, `<case>.test.ts`.
- A harness parent, `<Case>.uf.tsx`, where the component needs a slot filled or a model bound. Never give it a component's file name.
- `case.json`, with the scenarios a server render renders too.
- `__expected__/`, what Vue rendered, which every target must match. `pnpm test:targets --update` writes it, and you review it as code.

A spec checks the component's ARIA tree with `toHaveAriaTree`, axe-core with `toHaveNoAxeViolations`, each documented prop and state, its models and its keyboard paths. Act through `view.user`, and follow every action with `view.expectParity(name)`. Give a test that clicks or types `{ requires: ["interactivity"] }`, since Astro runs no client code. [Unframework's testing page](https://unframework.dev/docs/tooling/testing) covers the API.

## Common gotchas

- **Only `class` and `style` fall through.** Every other attribute a parent passes must be a prop the component declares.
- **Form state is a model, not an attribute.** Bind a control's `value` or `checked` with `v-model`, never as an attribute.
- **React fires a checkbox's or a radio's `change` from the click itself,** before a click handler can cancel it. A read-only control that cancels its click must also put back any value the change writes, as `ICheckboxControlBase` and `IRadioGroup` do.
- **Default-slot presence doesn't work on Angular and Qwik.** Render a default slot, or give it a fallback, but don't test whether it's filled. A named slot works everywhere.

`pnpm exec unframework explain <code>` explains a diagnostic.

## See also

- [architecture.md](./architecture.md): how a component becomes seven packages.
- [Unframework's documentation](https://unframework.dev/docs): the language reference.
- [conventions.md](./conventions.md): file naming, tests and commits.
