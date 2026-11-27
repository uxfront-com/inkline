import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

/**
 * Slider range recipe.
 * The colored fill between the start of the track and the thumb. Full palette,
 * mirroring the thumb so the active value reads as a single coloured unit. The
 * fill length is data-driven, so it is set by the consumer, not by this recipe.
 */
export const useSliderRangeRecipe = createUseRecipe("slider-range", {
  base: {
    borderRadius: "@border-radius.full",
  },
  variants: {
    color: {
      primary: {},
      secondary: {},
      success: {},
      info: {},
      warning: {},
      error: {},
      light: {},
      dark: {},
      neutral: {},
    },
    orientation: {
      horizontal: {
        height: "100%",
      },
      vertical: {
        width: "100%",
      },
    },
  },
  compoundVariants: [
    // Semantic colors (dynamic).
    ...colors.flatMap((color) => [
      {
        match: { color },
        css: {
          background: `@color.${color}`,
        },
      },
    ]),

    // Light — fixed across themes.
    {
      match: { color: "light" as const },
      css: {
        background: "@color.gray-400",
        "&:dark": {
          background: "@color.gray-400",
        },
      },
    },

    // Dark — fixed across themes.
    {
      match: { color: "dark" as const },
      css: {
        background: "@color.gray-600",
        "&:dark": {
          background: "@color.gray-600",
        },
      },
    },

    // Neutral — adaptive (different light/dark values).
    {
      match: { color: "neutral" as const },
      css: {
        background: "@color.gray-400",
        "&:dark": {
          background: "@color.gray-600",
        },
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    orientation: "horizontal",
  },
});
