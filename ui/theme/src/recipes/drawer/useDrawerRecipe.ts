import { createUseRecipe } from "@styleframe/theme";
import type { RecipeConfig } from "@styleframe/theme";
import { overlaySurfaceCompoundVariants } from "../modal/createOverlayRecipes";

/** Panel width per size for the horizontal (left/right) drawers. */
const sideWidths = { sm: "16rem", md: "20rem", lg: "28rem" } as const;

/**
 * `side × size` compound variants set the width of the horizontal (left/right)
 * drawers. Top/bottom drawers are sized by their content (height: auto, capped
 * at the viewport), so they get no fixed dimension here. Generated to keep the
 * entries DRY.
 */
const sideSizeCompoundVariants: NonNullable<RecipeConfig["compoundVariants"]> = (
  ["left", "right"] as const
).flatMap((side) =>
  Object.entries(sideWidths).map(([size, value]) => ({
    match: { side, size },
    css: { width: value },
  })),
);

/**
 * Drawer container recipe — an edge-anchored, slide-out overlay panel
 * (a Modal anchored to a screen edge). Supports color (light, dark, neutral),
 * variant, size, and `side` (top, right, bottom, left) axes.
 *
 * Positioning: the panel is `position: fixed` and anchors to one edge. Each
 * `side` pins the panel to that edge, caps its cross-axis at the viewport, and
 * raises the single border edge that faces the content; the shared surface
 * compounds then paint that edge.
 *
 * Sizing: left/right drawers span the full viewport height and take their width
 * from `size`; top/bottom drawers span the full width and take their height
 * from their content (capped at `100vh`). In every case the body fills the
 * space between the header and footer and scrolls when its content overflows,
 * while the header and footer keep their natural height (see the setup callback).
 *
 * The recipe is static: the consumer owns the open/close slide transition,
 * focus trap, and `Esc` handling — exactly like the Modal recipe.
 */
export const useDrawerRecipe = createUseRecipe(
  "drawer",
  {
    base: {
      position: "fixed",
      zIndex: "1000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "@box-shadow.lg",
      lineHeight: "@line-height.normal",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderWidth: "0",
    },
    variants: {
      color: {
        light: {},
        dark: {},
        neutral: {},
      },
      variant: {
        solid: {},
        soft: {},
        subtle: {},
      },
      size: {
        sm: {},
        md: {},
        lg: {},
      },
      side: {
        left: {
          top: "0",
          bottom: "0",
          left: "0",
          maxWidth: "100vw",
          borderRightWidth: "@border-width.thin",
        },
        right: {
          top: "0",
          bottom: "0",
          right: "0",
          maxWidth: "100vw",
          borderLeftWidth: "@border-width.thin",
        },
        top: {
          top: "0",
          left: "0",
          right: "0",
          maxHeight: "100vh",
          borderBottomWidth: "@border-width.thin",
        },
        bottom: {
          bottom: "0",
          left: "0",
          right: "0",
          maxHeight: "100vh",
          borderTopWidth: "@border-width.thin",
        },
      },
    },
    compoundVariants: [...overlaySurfaceCompoundVariants, ...sideSizeCompoundVariants],
    defaultVariants: {
      color: "neutral",
      variant: "solid",
      size: "md",
      side: "right",
    },
  },
  (s) => {
    // The body fills the space between the header and footer and scrolls on
    // overflow; the header and footer keep their natural height.
    s.selector(".drawer-body", {
      flexGrow: "1",
      minHeight: "0",
      overflowY: "auto",
    });
    s.selector(".drawer-header", { flexShrink: "0" });
    s.selector(".drawer-footer", { flexShrink: "0" });
  },
);
