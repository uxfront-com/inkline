import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar footer recipe. The fixed region at the bottom of the panel, for a user menu or
 * settings. A non-shrinking flex column pinned to the bottom (`margin-top: auto`); the `size`
 * axis scales its padding and gap.
 */
export const useSidebarFooterRecipe = createUseRecipe("sidebar-footer", {
  base: {
    display: "flex",
    flexDirection: "column",
    flexShrink: "0",
    marginTop: "auto",
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
