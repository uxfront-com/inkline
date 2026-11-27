import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero description (p) recipe.
 * Lede paragraph with size axis and clamped max-width for readable measure.
 */
export const usePageHeroDescriptionRecipe = createUseRecipe("page-hero-description", {
  base: {
    color: "@color.text-weak",
    lineHeight: "@line-height.relaxed",
    maxWidth: "60ch",
    marginTop: "0",
    marginBottom: "0",
  },
  variants: {
    size: {
      sm: {
        fontSize: "@font-size.sm",
      },
      md: {
        fontSize: "@font-size.md",
      },
      lg: {
        fontSize: "@font-size.lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
