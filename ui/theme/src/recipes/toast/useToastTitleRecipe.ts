import { createUseRecipe } from "@styleframe/theme";

/**
 * Toast title recipe — the headline line of the toast. Semibold and snug so it
 * reads as the dominant element above the description. Colour is inherited
 * (`currentColor`), which on the neutral toast body is the neutral foreground
 * token — the title is never tinted by the toast's `color` (that accent lives
 * on the icon and progress bar). The hierarchy against the description is
 * carried by weight, not colour, so it holds across every surface.
 *
 * Font size follows the `size` axis on the literal token — sm → sm, md → md,
 * lg → lg — rather than inheriting the toast root. The description carries the
 * same axis one token below (sm → xs, md → sm, lg → md), so it sits a step
 * under the title at every size; the title stays dominant through weight
 * (semibold vs normal) reinforced by that size step. Defaults to `md` to match
 * the toast.
 */
export const useToastTitleRecipe = createUseRecipe("toast-title", {
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
