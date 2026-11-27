# @inkline/theme

The Styleframe recipes that style Inkline's components: the button, input, checkbox, modal and 37 more families, each a `use…Recipe` composable that registers its classes on your Styleframe instance.

The recipes used to ship in `@styleframe/theme` 3.x. They keep the same names, options and defaults here, so moving to this package only changes the import.

## Install

```bash
pnpm add -D @inkline/theme @styleframe/theme @styleframe/core
```

`@styleframe/theme` and `@styleframe/core` are peer dependencies, so your project keeps one Styleframe instance and one set of tokens, utilities and modifiers for the recipes to build on.

## Use a recipe

Call a recipe on your instance, after the presets that define the tokens it reads:

```ts
import { styleframe } from "styleframe";
import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { useButtonRecipe } from "@inkline/theme";

const s = styleframe();

useDesignTokensPreset(s);
useModifiersPreset(s);
useUtilitiesPreset(s);

export const button = useButtonRecipe(s);
```

Every recipe takes an optional second argument, as it did in `@styleframe/theme`: overrides for its `base`, `variants`, `defaultVariants` and `compoundVariants`, and a `filter` that keeps only some values of an axis, like `useButtonRecipe(s, { filter: { size: ["sm", "md"] } })`.

## Moving from `@styleframe/theme`

Import each recipe from `@inkline/theme` instead, and keep the presets, modifiers and utilities on `@styleframe/theme`:

```diff
-import { useButtonRecipe, useDesignTokensPreset } from "@styleframe/theme";
+import { useDesignTokensPreset } from "@styleframe/theme";
+import { useButtonRecipe } from "@inkline/theme";
```

Writing a recipe of your own stays a Styleframe feature: `recipe()` and `createUseRecipe` come from Styleframe.
