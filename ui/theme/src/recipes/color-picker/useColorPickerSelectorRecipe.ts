import { createUseRecipe } from "@styleframe/theme";

/**
 * Color picker selector recipe — the square saturation/value (HSV) area.
 *
 * The background is a stacked gradient: white→full-saturation hue horizontally
 * and transparent→black vertically. The hue is read from the
 * `--color-picker--hue` CSS variable (0–360), which the consumer updates as the
 * user drags the hue track. Drop a `.color-picker-thumb` inside and position it
 * via inline styles to mark the current saturation/value.
 *
 * The gradient colors are color-model constants (not themeable tokens), so they
 * are intentionally literal.
 */
export const useColorPickerSelectorRecipe = createUseRecipe(
  "color-picker-selector",
  {
    base: {
      position: "relative",
      borderRadius: "@border-radius.md",
    },
    variants: {
      size: {
        xs: { width: "@9.5", height: "@9.5" },
        sm: { width: "@10", height: "@10" },
        md: { width: "@10.5", height: "@10.5" },
        lg: { width: "@11", height: "@11" },
        xl: { width: "@11.5", height: "@11.5" },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
  (s) => {
    // Public input: the current hue (0–360), updated by the consumer.
    s.variable("color-picker.hue", "0", { default: true });

    s.selector(".color-picker-selector", {
      touchAction: "none",
      background:
        "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(var(--color-picker--hue, 0) 100% 50%))",
    });
  },
);
