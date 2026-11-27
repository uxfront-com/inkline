import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar sub-menu recipe. The nested `<ul>` of `sidebar-menu-sub-button` items, indented
 * with a vertical guide line on the leading edge. Hidden when the sidebar is collapsed. The
 * `size` axis scales the gap between items.
 */
export const useSidebarMenuSubRecipe = createUseRecipe("sidebar-menu-sub", {
  base: {
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    listStyle: "none",
    marginTop: "@0.125",
    marginBottom: "0",
    marginLeft: "@0.625",
    paddingLeft: "@0.75",
    borderLeftWidth: "@border-width.thin",
    borderLeftStyle: "@border-style.solid",
    borderLeftColor: "@color.gray-200",
    "&:dark": {
      borderLeftColor: "@color.gray-700",
    },
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
