import { createUseRecipe } from "@styleframe/theme";

/**
 * Media object recipe — flex layout primitive that places visual content
 * (image/avatar/icon) alongside text content. Layout-only: no color or
 * surface styling, so it composes cleanly inside other containers.
 */
export const useMediaRecipe = createUseRecipe("media", {
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: "@0.75",
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
    },
    size: {
      sm: {
        gap: "@0.5",
      },
      md: {
        gap: "@0.75",
      },
      lg: {
        gap: "@1",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    align: "start",
    size: "md",
  },
});
