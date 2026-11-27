import { createUseRecipe } from "@styleframe/theme";

/**
 * Spinner overlay recipe for the backdrop behind the spinner.
 */
export const useSpinnerOverlayRecipe = createUseRecipe("spinner-overlay", {
  base: {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.75)",
    zIndex: "@z-index.overlay",
  },
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});
