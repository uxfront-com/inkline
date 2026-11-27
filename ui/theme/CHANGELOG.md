# @inkline/theme

## 0.1.0

### Minor Changes

- 04affe2: feat(theme): add `@inkline/theme` with the component recipes

  The package holds the component recipes that used to ship in `@styleframe/theme` 3.x, like `useButtonRecipe` and `useInputRecipe`, with the same names, options and defaults. It peers on `@styleframe/theme` and `@styleframe/core`, so a project keeps one Styleframe instance. To move, import each recipe from `@inkline/theme` and keep the presets, modifiers and utilities on `@styleframe/theme`.
