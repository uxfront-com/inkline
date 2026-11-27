import { createUseRecipe } from "@styleframe/theme";

/**
 * Callout title recipe — the headline line of the callout. Semibold and snug so
 * it reads as the dominant element above the description. Colour is inherited
 * (`currentColor`), so the title takes the callout's variant foreground rather
 * than a tint of its own — the hierarchy against the description is carried by
 * both size and weight, so it holds across every colour and variant.
 *
 * Font size follows the `size` axis on the literal token — sm → sm, md → md,
 * lg → lg — mirroring `useToastTitleRecipe` exactly so the two siblings can't
 * drift. The description carries the same axis one token below at every step,
 * keeping the title dominant by size and weight together. Defaults to `md` to
 * match the callout.
 */
export const useCalloutTitleRecipe = createUseRecipe("callout-title", {
  base: {
    display: "block",
    fontWeight: "@font-weight.semibold",
    lineHeight: "@line-height.snug",
  },
  variants: {
    size: {
      sm: { fontSize: "@font-size.sm" },
      md: { fontSize: "@font-size.md" },
      lg: { fontSize: "@font-size.lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
