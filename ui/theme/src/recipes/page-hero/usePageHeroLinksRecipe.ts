import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero secondary links group (nav).
 * Flex row of inline text links; gap, font-size, and justify-content scale with size + alignment.
 */
export const usePageHeroLinksRecipe = createUseRecipe("page-hero-links", {
  base: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "@1",
    fontSize: "@font-size.sm",
  },
  variants: {
    size: {
      sm: {
        gap: "@0.75",
        fontSize: "@font-size.xs",
      },
      md: {
        gap: "@1",
        fontSize: "@font-size.sm",
      },
      lg: {
        gap: "@1.25",
        fontSize: "@font-size.md",
      },
    },
    alignment: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
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
      css: { justifyContent: "flex-start" },
    },
  ],
  defaultVariants: {
    size: "md",
    alignment: "center",
  },
});
