import { createUseRecipe } from "@styleframe/theme";

/**
 * Popover body recipe for main content area.
 */
export const usePopoverBodyRecipe = createUseRecipe("popover-body", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "@0.5",
    // The body scrolls when the popover can't grow, so the header stays in view.
    minHeight: "0",
    overflowY: "auto",
    paddingTop: "@0.75",
    paddingBottom: "@0.75",
    paddingLeft: "@1",
    paddingRight: "@1",
  },
  variants: {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    variant: {
      solid: {},
      soft: {},
      subtle: {},
    },
    size: {
      sm: {
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
        gap: "@0.375",
      },
      md: {
        paddingTop: "@0.75",
        paddingBottom: "@0.75",
        paddingLeft: "@1",
        paddingRight: "@1",
        gap: "@0.5",
      },
      lg: {
        paddingTop: "@1",
        paddingBottom: "@1",
        paddingLeft: "@1.25",
        paddingRight: "@1.25",
        gap: "@0.75",
      },
    },
  },
  defaultVariants: {
    color: "neutral",
    variant: "solid",
    size: "md",
  },
});
