import { createSidebarMenuButtonRecipe } from "./createSidebarRecipe";

/**
 * Sidebar menu button recipe. The primary interactive nav item inside a `.sidebar-menu`
 * (`<button>` or `<a>`), spanning the full width of the menu. Carries color, variant
 * (ghost/subtle), size, an `active` selected highlight, and a `disabled` state. The text
 * label should be wrapped in `<span class="sidebar-menu-button-label">` so the collapsed
 * icon-rail can hide it.
 */
export const useSidebarMenuButtonRecipe = createSidebarMenuButtonRecipe("sidebar-menu-button");
