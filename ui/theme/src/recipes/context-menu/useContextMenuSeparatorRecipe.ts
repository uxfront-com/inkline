import { createMenuSeparatorRecipe } from "../dropdown/createMenuRecipe";

/**
 * Context menu separator recipe for dividers between item groups inside a
 * `.context-menu` panel. A 1px rule with a color axis only (light, dark, neutral).
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useContextMenuSeparatorRecipe = createMenuSeparatorRecipe("context-menu-separator");
