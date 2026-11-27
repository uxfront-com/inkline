import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

/**
 * Slider thumb recipe.
 * The draggable handle. Full palette with a contrasting ring, and the
 * interactive focus/hover/active states a keyboard- and pointer-operable
 * control needs. Positioned absolutely by the consumer; this recipe owns the
 * handle's appearance, not its location.
 */
export const useSliderThumbRecipe = createUseRecipe("slider-thumb", {
  base: {
    position: "absolute",
    boxSizing: "border-box",
    borderWidth: "@border-width.medium",
    borderStyle: "@border-style.solid",
    borderColor: "@color.white",
    borderRadius: "@border-radius.full",
    boxShadow: "@box-shadow.sm",
    cursor: "grab",
    outline: "none",
    transitionProperty: "box-shadow, transform",
    transitionTimingFunction: "@easing.ease-in-out",
    transitionDuration: "150ms",
    "&:hover": {
      boxShadow: "@box-shadow.md",
    },
    "&:focus": {
      boxShadow: "@box-shadow.md",
    },
    "&:focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.primary",
      outlineOffset: "2px",
    },
    "&:active": {
      cursor: "grabbing",
    },
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
    size: {
      xs: { width: "@0.75", height: "@0.75" },
      sm: { width: "@1", height: "@1" },
      md: { width: "@1.25", height: "@1.25" },
      lg: { width: "@1.5", height: "@1.5" },
      xl: { width: "@2", height: "@2" },
    },
  },
  compoundVariants: [
    // Semantic colors (dynamic) — coloured handle with the base white ring.
    ...colors.flatMap((color) => [
      {
        match: { color },
        css: {
          background: `@color.${color}`,
        },
      },
    ]),

    // Light — fixed across themes. Gray ring so the white handle stays visible.
    {
      match: { color: "light" as const },
      css: {
        background: "@color.white",
        borderColor: "@color.gray-300",
        "&:dark": {
          background: "@color.white",
          borderColor: "@color.gray-300",
        },
      },
    },

    // Dark — fixed across themes.
    {
      match: { color: "dark" as const },
      css: {
        background: "@color.gray-900",
        borderColor: "@color.gray-700",
        "&:dark": {
          background: "@color.gray-900",
          borderColor: "@color.gray-700",
        },
      },
    },

    // Neutral — adaptive (different light/dark values).
    {
      match: { color: "neutral" as const },
      css: {
        background: "@color.white",
        borderColor: "@color.gray-300",
        "&:dark": {
          background: "@color.gray-700",
          borderColor: "@color.gray-900",
        },
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
