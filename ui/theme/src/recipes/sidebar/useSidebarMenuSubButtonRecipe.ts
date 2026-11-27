import { createSidebarMenuButtonRecipe } from "./createSidebarRecipe";

/**
 * Sidebar sub-menu button recipe. The nested nav item inside a `.sidebar-menu-sub`. Shares
 * the exact surface of `sidebar-menu-button` (color, variant, size, active, disabled) — the
 * indentation and guide line of the parent `.sidebar-menu-sub` provide the visual nesting.
 */
export const useSidebarMenuSubButtonRecipe =
  createSidebarMenuButtonRecipe("sidebar-menu-sub-button");
