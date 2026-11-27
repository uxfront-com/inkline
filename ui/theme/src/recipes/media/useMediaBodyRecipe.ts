import { createUseRecipe } from "@styleframe/theme";

/**
 * Media body recipe — text content container. `minWidth: 0` is required
 * so long titles or descriptions wrap correctly inside the parent flex
 * container instead of forcing the row to overflow.
 */
export const useMediaBodyRecipe = createUseRecipe("media-body", {
  base: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    minWidth: "0",
    gap: "@0.375",
  },
  variants: {
    size: {
      sm: {
        gap: "@0.25",
      },
      md: {
        gap: "@0.375",
      },
      lg: {
        gap: "@0.5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
