import { createUseRecipe } from "@styleframe/theme";

/**
 * Media figure recipe — visual content holder (image, avatar, icon).
 * `flexShrink: 0` keeps the figure from collapsing on narrow viewports;
 * `overflow: hidden` clips contained images to the rounded radius.
 */
export const useMediaFigureRecipe = createUseRecipe("media-figure", {
  base: {
    display: "flex",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  variants: {
    size: {
      sm: {
        borderRadius: "@border-radius.sm",
      },
      md: {
        borderRadius: "@border-radius.md",
      },
      lg: {
        borderRadius: "@border-radius.lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
