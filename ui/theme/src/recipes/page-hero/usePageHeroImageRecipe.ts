import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero image/media slot wrapper.
 * Provides border-radius, overflow clipping, and box-shadow that scale with size.
 */
export const usePageHeroImageRecipe = createUseRecipe("page-hero-image", {
  base: {
    display: "block",
    overflow: "hidden",
    flex: "1",
    minWidth: "0",
    maxWidth: "100%",
    alignSelf: "stretch",
    borderRadius: "@border-radius.lg",
  },
  variants: {
    size: {
      sm: {
        borderRadius: "@border-radius.md",
      },
      md: {
        borderRadius: "@border-radius.lg",
      },
      lg: {
        borderRadius: "@border-radius.xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
