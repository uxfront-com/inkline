import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar header recipe. The fixed region at the top of the panel, for branding or a
 * workspace switcher. A non-shrinking flex row; the `size` axis scales its padding and gap.
 */
export const useSidebarHeaderRecipe = createUseRecipe("sidebar-header", {
  base: {
    display: "flex",
    alignItems: "center",
    flexShrink: "0",
  },
  variants: {
    size: {
      sm: {
        gap: "@0.375",
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.5",
        paddingRight: "@0.5",
      },
      md: {
        gap: "@0.5",
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
      },
      lg: {
        gap: "@0.625",
        paddingTop: "@0.75",
        paddingBottom: "@0.75",
        paddingLeft: "@1",
        paddingRight: "@1",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
