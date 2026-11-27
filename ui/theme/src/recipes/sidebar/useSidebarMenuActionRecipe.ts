import { createSidebarActionRecipe } from "./createSidebarRecipe";

/**
 * Sidebar menu action recipe. A square, muted icon button anchored to the trailing edge of a
 * menu item (e.g. a "more" or "add" affordance). Hidden when the sidebar is collapsed.
 */
export const useSidebarMenuActionRecipe = createSidebarActionRecipe("sidebar-menu-action");
