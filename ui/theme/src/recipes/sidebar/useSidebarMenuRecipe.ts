import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar menu recipe. The `<ul>` that lists a group's menu items as a reset, gapped flex
 * column. The `size` axis scales the gap between items.
 */
export const useSidebarMenuRecipe = createUseRecipe("sidebar-menu", {
  base: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "0",
    listStyle: "none",
    marginTop: "0",
    marginBottom: "0",
    paddingLeft: "0",
  },
  variants: {
    size: {
      sm: {
        gap: "@0.125",
      },
      md: {
        gap: "@0.25",
      },
      lg: {
        gap: "@0.375",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
