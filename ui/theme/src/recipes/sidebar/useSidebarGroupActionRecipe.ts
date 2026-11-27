import { createSidebarActionRecipe } from "./createSidebarRecipe";

/**
 * Sidebar group action recipe. A square, muted icon button anchored to the trailing edge of a
 * `.sidebar-group-label` header (e.g. an "add project" affordance). Shares the surface of
 * `sidebar-menu-action`. Hidden when the sidebar is collapsed.
 */
export const useSidebarGroupActionRecipe = createSidebarActionRecipe("sidebar-group-action");
