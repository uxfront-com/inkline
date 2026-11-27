import { createMenuSeparatorRecipe } from "./createMenuRecipe";

/**
 * Dropdown separator recipe for visual dividers between item groups.
 * Supports color (light, dark, neutral) — no variant or size axis.
 *
 * Built on the shared menu-surface builder (see `createMenuRecipe.ts`).
 */
export const useDropdownSeparatorRecipe = createMenuSeparatorRecipe("dropdown-separator");
