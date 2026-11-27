import { createUseRecipe } from "@styleframe/theme";
import { toastAccentColorVariants } from "./toastAccentColors";

/**
 * Toast icon recipe for the leading icon slot. This is one of the two parts
 * that carry the toast's `color` — the body stays neutral, so the icon (and the
 * progress bar) are where the semantic accent lands. The `color` axis sets the
 * icon's foreground from the shared accent map; SVG/icon-font glyphs that paint
 * with `currentColor` pick it up automatically.
 */
export const useToastIconRecipe = createUseRecipe("toast-icon", {
  base: {
    display: "inline-flex",
    flexShrink: "0",
  },
  variants: {
    color: toastAccentColorVariants,
  },
  defaultVariants: {
    color: "neutral",
  },
});
