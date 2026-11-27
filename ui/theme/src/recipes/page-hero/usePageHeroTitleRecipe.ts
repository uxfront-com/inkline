import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero title (h1) recipe.
 * Display-scale heading with size axis controlling font-size.
 */
export const usePageHeroTitleRecipe = createUseRecipe("page-hero-title", {
  base: {
    fontWeight: "@font-weight.bold",
    lineHeight: "@line-height.tight",
    marginTop: "0",
    marginBottom: "0",
    color: "inherit",
  },
  variants: {
    size: {
      sm: {
        fontSize: "@font-size.2xl",
      },
      md: {
        fontSize: "@font-size.3xl",
      },
      lg: {
        fontSize: "@font-size.4xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
