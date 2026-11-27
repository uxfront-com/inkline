import { createUseRecipe } from "@styleframe/theme";

/**
 * Pagination item recipe for individual page-number buttons.
 * Supports color (light, dark, neutral), variant (solid, outline, soft, subtle, ghost, link),
 * size (sm, md, lg), and active/disabled boolean axes.
 *
 * Items are also used for prev/next/first/last controls — render them as the same item
 * with icon content (e.g., a chevron) instead of a page number.
 */
export const usePaginationItemRecipe = createUseRecipe("pagination-item", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "@font-weight.medium",
    fontSize: "@font-size.sm",
    borderWidth: "@border-width.thin",
    borderStyle: "@border-style.solid",
    borderColor: "transparent",
    borderRadius: "@border-radius.md",
    lineHeight: "@line-height.normal",
    paddingTop: "@0.5",
    paddingBottom: "@0.5",
    paddingLeft: "@0.75",
    paddingRight: "@0.75",
    cursor: "pointer",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "@easing.ease-in-out",
    transitionDuration: "150ms",
    textDecoration: "none",
    "&:hover": { textDecoration: "none" },
    "&:focus": { textDecoration: "none" },
    "&:active": { textDecoration: "none" },
    whiteSpace: "nowrap",
    userSelect: "none",
    outline: "none",
    "&:focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.primary",
      outlineOffset: "2px",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: "0.75",
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
      solid: {},
      outline: {},
      soft: {},
      subtle: {},
      ghost: {
        background: "transparent",
      },
      link: {
        background: "transparent",
        borderColor: "transparent",
        borderWidth: "0",
      },
    },
    size: {
      sm: {
        fontSize: "@font-size.sm",
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.625",
        paddingRight: "@0.625",
        gap: "@0.375",
        borderRadius: "@border-radius.md",
      },
      md: {
        fontSize: "@font-size.sm",
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
        gap: "@0.375",
        borderRadius: "@border-radius.md",
      },
      lg: {
        fontSize: "@font-size.md",
        paddingTop: "@0.625",
        paddingBottom: "@0.625",
        paddingLeft: "@0.875",
        paddingRight: "@0.875",
        gap: "@0.5",
        borderRadius: "@border-radius.md",
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
        opacity: "0.75",
        pointerEvents: "none",
      },
      false: {},
    },
  },
  compoundVariants: [
    // Light color (fixed across themes — light-themed appearance, always)
    {
      match: { color: "light" as const, variant: "solid" as const },
      css: {
        background: "@color.white",
        color: "@color.text",
        borderColor: "@color.gray-200",
        "&:hover": { background: "@color.gray-100" },
        "&:focus": { background: "@color.gray-100" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          background: "@color.white",
          color: "@color.text-inverted",
          borderColor: "@color.gray-200",
        },
      },
    },
    {
      match: { color: "light" as const, variant: "outline" as const },
      css: {
        color: "@color.gray-900",
        borderColor: "@color.gray-300",
        "&:hover": { background: "@color.gray-100" },
        "&:focus": { background: "@color.gray-100" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          color: "@color.gray-900",
          borderColor: "@color.gray-300",
        },
      },
    },
    {
      match: { color: "light" as const, variant: "soft" as const },
      css: {
        background: "@color.gray-100",
        color: "@color.gray-700",
        "&:hover": { background: "@color.gray-150" },
        "&:focus": { background: "@color.gray-150" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          background: "@color.gray-100",
          color: "@color.gray-700",
        },
      },
    },
    {
      match: { color: "light" as const, variant: "subtle" as const },
      css: {
        background: "@color.gray-100",
        color: "@color.gray-700",
        borderColor: "@color.gray-300",
        "&:hover": { background: "@color.gray-150" },
        "&:focus": { background: "@color.gray-150" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-300",
        },
      },
    },
    {
      match: { color: "light" as const, variant: "ghost" as const },
      css: {
        color: "@color.text",
        "&:hover": { background: "@color.gray-100" },
        "&:focus": { background: "@color.gray-100" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          color: "@color.text-inverted",
        },
        "&:dark:hover": { background: "@color.gray-100" },
        "&:dark:focus": { background: "@color.gray-100" },
        "&:dark:active": { background: "@color.gray-200" },
      },
    },
    {
      match: { color: "light" as const, variant: "link" as const },
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
          color: "@color.text-inverted",
        },
        "&:dark:hover": { color: "@color.gray-900" },
        "&:dark:focus": { color: "@color.gray-900" },
        "&:dark:active": { color: "@color.gray-900" },
      },
    },

    // Dark color (fixed across themes — dark-themed appearance, always)
    {
      match: { color: "dark" as const, variant: "solid" as const },
      css: {
        background: "@color.gray-900",
        color: "@color.white",
        borderColor: "@color.gray-800",
        "&:hover": { background: "@color.gray-800", color: "@color.white" },
        "&:focus": { background: "@color.gray-800", color: "@color.white" },
        "&:active": { background: "@color.gray-750", color: "@color.white" },
        "&:dark": {
          background: "@color.gray-900",
          color: "@color.white",
          borderColor: "@color.gray-800",
        },
      },
    },
    {
      match: { color: "dark" as const, variant: "outline" as const },
      css: {
        color: "@color.gray-200",
        borderColor: "@color.gray-600",
        "&:hover": {
          background: "@color.gray-800",
          color: "@color.white",
        },
        "&:focus": {
          background: "@color.gray-800",
          color: "@color.white",
        },
        "&:active": {
          background: "@color.gray-750",
          color: "@color.white",
        },
        "&:dark": {
          color: "@color.gray-200",
          borderColor: "@color.gray-600",
        },
      },
    },
    {
      match: { color: "dark" as const, variant: "soft" as const },
      css: {
        background: "@color.gray-800",
        color: "@color.gray-300",
        "&:hover": { background: "@color.gray-750", color: "@color.gray-300" },
        "&:focus": { background: "@color.gray-750", color: "@color.gray-300" },
        "&:active": { background: "@color.gray-700", color: "@color.gray-300" },
        "&:dark": {
          background: "@color.gray-800",
          color: "@color.gray-300",
        },
      },
    },
    {
      match: { color: "dark" as const, variant: "subtle" as const },
      css: {
        background: "@color.gray-800",
        color: "@color.gray-300",
        borderColor: "@color.gray-600",
        "&:hover": { background: "@color.gray-750", color: "@color.gray-300" },
        "&:focus": { background: "@color.gray-750", color: "@color.gray-300" },
        "&:active": { background: "@color.gray-700", color: "@color.gray-300" },
        "&:dark": {
          background: "@color.gray-800",
          color: "@color.gray-300",
          borderColor: "@color.gray-600",
        },
      },
    },
    {
      match: { color: "dark" as const, variant: "ghost" as const },
      css: {
        color: "@color.gray-200",
        "&:hover": { background: "@color.gray-800", color: "@color.gray-200" },
        "&:focus": { background: "@color.gray-800", color: "@color.gray-200" },
        "&:active": { background: "@color.gray-750", color: "@color.gray-200" },
        "&:dark": {
          color: "@color.gray-200",
        },
        "&:dark:hover": { background: "@color.gray-800" },
        "&:dark:focus": { background: "@color.gray-800" },
        "&:dark:active": { background: "@color.gray-750" },
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
        "&:dark:hover": { color: "@color.white" },
        "&:dark:focus": { color: "@color.white" },
        "&:dark:active": { color: "@color.white" },
      },
    },

    // Neutral color (adaptive: light in light mode, dark in dark mode)
    {
      match: { color: "neutral" as const, variant: "solid" as const },
      css: {
        background: "@color.white",
        color: "@color.text",
        borderColor: "@color.gray-200",
        "&:hover": { background: "@color.gray-100" },
        "&:focus": { background: "@color.gray-100" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          background: "@color.gray-900",
          color: "@color.white",
          borderColor: "@color.gray-800",
        },
        "&:dark:hover": {
          background: "@color.gray-800",
          color: "@color.white",
        },
        "&:dark:focus": {
          background: "@color.gray-800",
          color: "@color.white",
        },
        "&:dark:active": {
          background: "@color.gray-750",
          color: "@color.white",
        },
      },
    },
    {
      match: { color: "neutral" as const, variant: "outline" as const },
      css: {
        color: "@color.gray-900",
        borderColor: "@color.gray-300",
        "&:hover": { background: "@color.gray-100" },
        "&:focus": { background: "@color.gray-100" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          color: "@color.gray-200",
          borderColor: "@color.gray-600",
        },
        "&:dark:hover": {
          background: "@color.gray-800",
          color: "@color.white",
        },
        "&:dark:focus": {
          background: "@color.gray-800",
          color: "@color.white",
        },
        "&:dark:active": {
          background: "@color.gray-750",
          color: "@color.white",
        },
      },
    },
    {
      match: { color: "neutral" as const, variant: "soft" as const },
      css: {
        background: "@color.gray-100",
        color: "@color.gray-700",
        "&:hover": { background: "@color.gray-150" },
        "&:focus": { background: "@color.gray-150" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          background: "@color.gray-800",
          color: "@color.gray-300",
        },
        "&:dark:hover": {
          background: "@color.gray-750",
          color: "@color.gray-300",
        },
        "&:dark:focus": {
          background: "@color.gray-750",
          color: "@color.gray-300",
        },
        "&:dark:active": {
          background: "@color.gray-700",
          color: "@color.gray-300",
        },
      },
    },
    {
      match: { color: "neutral" as const, variant: "subtle" as const },
      css: {
        background: "@color.gray-100",
        color: "@color.gray-700",
        borderColor: "@color.gray-300",
        "&:hover": { background: "@color.gray-150" },
        "&:focus": { background: "@color.gray-150" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          background: "@color.gray-800",
          color: "@color.gray-300",
          borderColor: "@color.gray-600",
        },
        "&:dark:hover": {
          background: "@color.gray-750",
          color: "@color.gray-300",
        },
        "&:dark:focus": {
          background: "@color.gray-750",
          color: "@color.gray-300",
        },
        "&:dark:active": {
          background: "@color.gray-700",
          color: "@color.gray-300",
        },
      },
    },
    {
      match: { color: "neutral" as const, variant: "ghost" as const },
      css: {
        color: "@color.text",
        "&:hover": { background: "@color.gray-100" },
        "&:focus": { background: "@color.gray-100" },
        "&:active": { background: "@color.gray-200" },
        "&:dark": {
          color: "@color.gray-200",
        },
        "&:dark:hover": {
          background: "@color.gray-800",
          color: "@color.gray-200",
        },
        "&:dark:focus": {
          background: "@color.gray-800",
          color: "@color.gray-200",
        },
        "&:dark:active": {
          background: "@color.gray-750",
          color: "@color.gray-200",
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
        "&:dark:hover": { color: "@color.white" },
        "&:dark:focus": { color: "@color.white" },
        "&:dark:active": { color: "@color.white" },
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
