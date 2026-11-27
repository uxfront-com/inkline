import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero headline wrapper around eyebrow, title, and description.
 * Controls vertical stacking, gap, and text alignment of the text block.
 */
export const usePageHeroHeadlineRecipe = createUseRecipe("page-hero-headline", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "@1",
  },
  variants: {
    size: {
      sm: {
        gap: "@0.75",
      },
      md: {
        gap: "@1",
      },
      lg: {
        gap: "@1.25",
      },
    },
    alignment: {
      start: {
        alignItems: "flex-start",
        textAlign: "left",
      },
      center: {
        alignItems: "center",
        textAlign: "center",
      },
      end: {
        alignItems: "flex-end",
        textAlign: "right",
      },
    },
    orientation: {
      vertical: {},
      horizontal: {},
    },
  },
  compoundVariants: [
    {
      match: { orientation: "horizontal" as const },
      css: {
        alignItems: "flex-start",
        textAlign: "left",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    alignment: "center",
  },
});
