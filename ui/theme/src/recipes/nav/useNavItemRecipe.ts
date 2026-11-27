import { createUseRecipe } from "@styleframe/theme";

/**
 * Nav item recipe for individual navigation links.
 * Supports color (light, dark, neutral), variant (ghost, link), and size axes.
 */
export const useNavItemRecipe = createUseRecipe("nav-item", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    background: "transparent",
    fontWeight: "@font-weight.normal",
    lineHeight: "@line-height.normal",
    textDecoration: "none",
    transitionProperty: "color, background-color",
    transitionTimingFunction: "@easing.ease-in-out",
    transitionDuration: "150ms",
    outline: "none",
    "&:hover": {
      textDecoration: "none",
    },
    "&:focus": {
      textDecoration: "none",
    },
    "&:focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.primary",
      outlineOffset: "2px",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: "0.5",
      pointerEvents: "none",
    },
  },
  variants: {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    variant: {
      ghost: {
        borderRadius: "@border-radius.md",
      },
      link: {
        background: "transparent",
      },
    },
    size: {
      sm: {
        fontSize: "@font-size.xs",
        paddingTop: "@0.25",
        paddingBottom: "@0.25",
        paddingLeft: "@0.5",
        paddingRight: "@0.5",
      },
      md: {
        fontSize: "@font-size.sm",
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
      },
      lg: {
        fontSize: "@font-size.md",
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@1",
        paddingRight: "@1",
      },
    },
    active: {
      true: {
        fontWeight: "@font-weight.semibold",
      },
      false: {},
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: "0.5",
        pointerEvents: "none",
      },
      false: {},
    },
  },
  compoundVariants: [
    // Light color (fixed across themes — always dark text for light backgrounds)
    {
      match: { color: "light" as const, variant: "ghost" as const },
      css: {
        color: "@color.gray-900",
        "&:hover": {
          color: "@color.gray-900",
          background: "@color.gray-100",
        },
        "&:focus": {
          color: "@color.gray-900",
          background: "@color.gray-100",
        },
        "&:active": {
          background: "@color.gray-200",
        },
        "&:dark": {
          color: "@color.gray-900",
        },
        "&:dark:hover": {
          color: "@color.gray-900",
          background: "@color.gray-100",
        },
        "&:dark:focus": {
          color: "@color.gray-900",
          background: "@color.gray-100",
        },
        "&:dark:active": {
          background: "@color.gray-200",
        },
      },
    },
    {
      match: { color: "light" as const, variant: "link" as const },
      css: {
        color: "@color.gray-900",
        "&:hover": {
          color: "@color.gray-900",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:focus": {
          color: "@color.gray-900",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:active": {
          color: "@color.gray-900",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:dark": {
          color: "@color.gray-900",
        },
        "&:dark:hover": {
          color: "@color.gray-900",
        },
        "&:dark:focus": {
          color: "@color.gray-900",
        },
        "&:dark:active": {
          color: "@color.gray-900",
        },
      },
    },

    // Dark color (fixed across themes — matches neutral's dark mode appearance)
    {
      match: { color: "dark" as const, variant: "ghost" as const },
      css: {
        color: "@color.gray-200",
        "&:hover": {
          color: "@color.gray-200",
          background: "@color.gray-800",
        },
        "&:focus": {
          color: "@color.gray-200",
          background: "@color.gray-800",
        },
        "&:active": {
          background: "@color.gray-750",
        },
        "&:dark": {
          color: "@color.gray-200",
        },
        "&:dark:hover": {
          color: "@color.gray-200",
          background: "@color.gray-800",
        },
        "&:dark:focus": {
          color: "@color.gray-200",
          background: "@color.gray-800",
        },
        "&:dark:active": {
          background: "@color.gray-750",
        },
      },
    },
    {
      match: { color: "dark" as const, variant: "link" as const },
      css: {
        color: "@color.gray-200",
        "&:hover": {
          color: "@color.white",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:focus": {
          color: "@color.white",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:active": {
          color: "@color.white",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:dark": {
          color: "@color.gray-200",
        },
        "&:dark:hover": {
          color: "@color.white",
        },
        "&:dark:focus": {
          color: "@color.white",
        },
        "&:dark:active": {
          color: "@color.white",
        },
      },
    },

    // Neutral color (adaptive: light in light mode, dark in dark mode)
    {
      match: { color: "neutral" as const, variant: "ghost" as const },
      css: {
        color: "@color.text",
        "&:hover": {
          color: "@color.text",
          background: "@color.gray-100",
        },
        "&:focus": {
          color: "@color.text",
          background: "@color.gray-100",
        },
        "&:active": {
          background: "@color.gray-200",
        },
        "&:dark": {
          color: "@color.gray-200",
        },
        "&:dark:hover": {
          color: "@color.gray-200",
          background: "@color.gray-800",
        },
        "&:dark:focus": {
          color: "@color.gray-200",
          background: "@color.gray-800",
        },
        "&:dark:active": {
          background: "@color.gray-750",
        },
      },
    },
    {
      match: { color: "neutral" as const, variant: "link" as const },
      css: {
        color: "@color.text",
        "&:hover": {
          color: "@color.gray-900",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:focus": {
          color: "@color.gray-900",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:active": {
          color: "@color.gray-900",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
        "&:dark": {
          color: "@color.gray-200",
        },
        "&:dark:hover": {
          color: "@color.white",
        },
        "&:dark:focus": {
          color: "@color.white",
        },
        "&:dark:active": {
          color: "@color.white",
        },
      },
    },
  ],
  defaultVariants: {
    color: "neutral",
    variant: "ghost",
    size: "md",
    active: "false",
    disabled: "false",
  },
});
