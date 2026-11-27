import { createMenuPanelRecipe } from "../dropdown/createMenuRecipe";

/**
 * Select panel recipe for the floating listbox opened by a `.select` trigger.
 * Mirrors the Dropdown container but adds a scroll boundary (`maxHeight` +
 * `overflowY`) so long option lists scroll instead of overflowing the viewport.
 * Supports color (light, dark, neutral), variant (solid, soft, subtle), and size.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useSelectPanelRecipe = createMenuPanelRecipe("select-panel", {
	base: {
		maxHeight: "@12",
		overflowY: "auto",
	},
});
