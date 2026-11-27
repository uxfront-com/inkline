import { createUseRecipe } from "@styleframe/theme";

/**
 * Pagination ellipsis recipe for non-interactive "…" elements
 * placed between page-number ranges to indicate skipped pages.
 */
export const usePaginationEllipsisRecipe = createUseRecipe("pagination-ellipsis", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "@color.text-weak",
    lineHeight: "@line-height.normal",
    userSelect: "none",
  },
  variants: {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    size: {
      sm: {
        fontSize: "@font-size.sm",
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.625",
        paddingRight: "@0.625",
      },
      md: {
        fontSize: "@font-size.sm",
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
      },
      lg: {
        fontSize: "@font-size.md",
        paddingTop: "@0.625",
        paddingBottom: "@0.625",
        paddingLeft: "@0.875",
        paddingRight: "@0.875",
      },
    },
  },
  compoundVariants: [
    {
      match: { color: "light" as const },
      css: {
        color: "@color.gray-600",
        "&:dark": { color: "@color.gray-600" },
      },
    },
    {
      match: { color: "dark" as const },
      css: {
        color: "@color.gray-400",
        "&:dark": { color: "@color.gray-400" },
      },
    },
    {
      match: { color: "neutral" as const },
      css: {
        color: "@color.gray-600",
        "&:dark": { color: "@color.gray-400" },
      },
    },
  ],
  defaultVariants: {
    color: "neutral",
    size: "md",
  },
});
