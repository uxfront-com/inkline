import { createMenuLabelRecipe } from "./createMenuRecipe";

/**
 * Dropdown label recipe for group headings inside a Dropdown panel.
 * Supports color (light, dark, neutral) and size axes — no variant axis.
 *
 * Built on the shared menu-surface builder (see `createMenuRecipe.ts`).
 */
export const useDropdownLabelRecipe = createMenuLabelRecipe("dropdown-label");
