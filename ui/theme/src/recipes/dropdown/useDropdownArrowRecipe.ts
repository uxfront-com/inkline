import { createUseRecipe } from "@styleframe/theme";

/**
 * Dropdown arrow recipe using CSS border-triangle technique.
 * Points upward by default so the arrow sits above the panel, mirroring
 * the common dropdown layout where the menu opens below its trigger.
 * Arrow border and background match the dropdown container.
 */
export const useDropdownArrowRecipe = createUseRecipe(
  "dropdown-arrow",
  {
    base: {
      width: "0",
      height: "0",
      borderLeftWidth: "calc(@dropdown.arrow.size + 1px)",
      borderLeftStyle: "@border-style.solid",
      borderLeftColor: "transparent",
      borderRightWidth: "calc(@dropdown.arrow.size + 1px)",
      borderRightStyle: "@border-style.solid",
      borderRightColor: "transparent",
      borderBottomWidth: "calc(@dropdown.arrow.size + 1px)",
      borderBottomStyle: "@border-style.solid",
      borderBottomColor: "transparent",
      position: "absolute",
      zIndex: "@z-index.dropdown",
      "&:after": {
        borderLeftWidth: "@dropdown.arrow.size",
        borderLeftStyle: "@border-style.solid",
        borderLeftColor: "transparent",
        borderRightWidth: "@dropdown.arrow.size",
        borderRightStyle: "@border-style.solid",
        borderRightColor: "transparent",
        borderBottomWidth: "@dropdown.arrow.size",
        borderBottomStyle: "@border-style.solid",
        borderBottomColor: "transparent",
        position: "absolute",
        left: "calc(@dropdown.arrow.size * -1)",
        top: "1px",
        zIndex: "0",
      },
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
    },
    compoundVariants: [
      // Light color (fixed across themes)
      {
        match: { color: "light" as const, variant: "solid" as const },
        css: {
          borderBottomColor: "@color.gray-200",
          "&:after": {
            borderBottomColor: "@color.white",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-200",
          },
          "&:dark:after": {
            borderBottomColor: "@color.white",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "soft" as const },
        css: {
          borderBottomColor: "@color.gray-100",
          "&:after": {
            borderBottomColor: "@color.gray-100",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-100",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-100",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "subtle" as const },
        css: {
          borderBottomColor: "@color.gray-200",
          "&:after": {
            borderBottomColor: "@color.gray-100",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-200",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-100",
          },
        },
      },

      // Dark color (fixed across themes)
      {
        match: { color: "dark" as const, variant: "solid" as const },
        css: {
          borderBottomColor: "@color.gray-700",
          "&:after": {
            borderBottomColor: "@color.gray-900",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-700",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-900",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "soft" as const },
        css: {
          borderBottomColor: "@color.gray-800",
          "&:after": {
            borderBottomColor: "@color.gray-800",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-800",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-800",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "subtle" as const },
        css: {
          borderBottomColor: "@color.gray-700",
          "&:after": {
            borderBottomColor: "@color.gray-800",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-700",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-800",
          },
        },
      },

      // Neutral color (adaptive: light in light mode, dark in dark mode)
      {
        match: { color: "neutral" as const, variant: "solid" as const },
        css: {
          borderBottomColor: "@color.gray-200",
          "&:after": {
            borderBottomColor: "@color.white",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-700",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-900",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "soft" as const },
        css: {
          borderBottomColor: "@color.gray-100",
          "&:after": {
            borderBottomColor: "@color.gray-100",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-800",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-800",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "subtle" as const },
        css: {
          borderBottomColor: "@color.gray-200",
          "&:after": {
            borderBottomColor: "@color.gray-100",
          },
          "&:dark": {
            borderBottomColor: "@color.gray-700",
          },
          "&:dark:after": {
            borderBottomColor: "@color.gray-800",
          },
        },
      },
    ],
    defaultVariants: {
      color: "neutral",
      variant: "solid",
    },
  },
  (s) => {
    s.variable("dropdown.arrow.size", "6px", { default: true });
  },
);
