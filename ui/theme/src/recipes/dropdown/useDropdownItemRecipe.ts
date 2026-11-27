import { createMenuItemRecipe } from "./createMenuRecipe";

/**
 * Dropdown item recipe for clickable menu options inside a Dropdown panel.
 * Supports color (light, dark, neutral), variant (solid, soft, subtle), and size axes.
 * Color and variant should match the parent Dropdown so hover/focus states
 * render coherently against the panel's surface.
 *
 * Built on the shared menu-surface builder (see `createMenuRecipe.ts`).
 */
export const useDropdownItemRecipe = createMenuItemRecipe("dropdown-item");
