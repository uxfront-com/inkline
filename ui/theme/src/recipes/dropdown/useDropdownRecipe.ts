import { createMenuPanelRecipe } from "./createMenuRecipe";

/**
 * Dropdown container recipe for menu-style floating panels.
 * Supports color (light, dark, neutral), variant (solid, soft, subtle), and size axes.
 *
 * Built on the shared menu-surface builder (see `createMenuRecipe.ts`), which the
 * Select and Context Menu families also use.
 */
export const useDropdownRecipe = createMenuPanelRecipe("dropdown");
