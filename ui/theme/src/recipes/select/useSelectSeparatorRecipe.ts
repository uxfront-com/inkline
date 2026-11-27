import { createMenuSeparatorRecipe } from "../dropdown/createMenuRecipe";

/**
 * Select separator recipe for visual dividers between option groups inside a
 * `.select-panel`. Mirrors the Dropdown separator — a 1px rule — and supports
 * color (light, dark, neutral) only, with no variant or size axis.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useSelectSeparatorRecipe = createMenuSeparatorRecipe("select-separator");
