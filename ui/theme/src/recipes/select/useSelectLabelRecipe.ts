import { createMenuLabelRecipe } from "../dropdown/createMenuRecipe";

/**
 * Select label recipe for group headings inside a `.select-panel`.
 * Mirrors the Dropdown label — an uppercase, muted caption — and supports color
 * (light, dark, neutral) and size, with no variant axis.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useSelectLabelRecipe = createMenuLabelRecipe("select-label");
