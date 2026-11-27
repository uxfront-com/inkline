import { createUseRecipe } from "@styleframe/theme";
import { fieldSurfaceCompoundVariants } from "../input/createFieldRecipe";

/**
 * OTP / pin-input cell recipe. The `.otp-cell` class sits directly on each
 * native single-character `<input>` (like `checkbox-field`, and unlike the
 * `input` wrapper which nests a transparent control). The input *is* the styled
 * cell: a fixed square with centered text and a `:focus-visible` ring.
 *
 * Shares the exact color/variant/state surface as the `input` recipe via
 * `fieldSurfaceCompoundVariants` — colors `light` / `dark` / `neutral`, variants
 * `default` / `soft` / `ghost`, and the `invalid` / `disabled` states. Because
 * the cell is the focusable element itself, the surface is consumed with a
 * `:focus-visible` ring (not `:focus-within`) and no read-only state.
 *
 * Focus advancing, paste handling, and masking are behavior owned by the
 * consumer; this recipe only supplies the visual styling for each cell.
 */
export const useOtpCellRecipe = createUseRecipe("otp-cell", {
  base: {
    boxSizing: "border-box",
    textAlign: "center",
    padding: "0",
    fontFamily: "inherit",
    fontWeight: "@font-weight.medium",
    lineHeight: "@line-height.normal",
    borderWidth: "@border-width.thin",
    borderStyle: "@border-style.solid",
    borderColor: "transparent",
    background: "transparent",
    color: "@color.text",
    outline: "none",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "@easing.ease-in-out",
    transitionDuration: "150ms",
    "&:focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.primary",
      outlineOffset: "2px",
    },
  },
  variants: {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    variant: {
      default: {},
      soft: {},
      ghost: {},
    },
    size: {
      sm: {
        width: "40px",
        height: "40px",
        fontSize: "@font-size.sm",
        borderRadius: "@border-radius.sm",
      },
      md: {
        width: "48px",
        height: "48px",
        fontSize: "@font-size.md",
        borderRadius: "@border-radius.md",
      },
      lg: {
        width: "56px",
        height: "56px",
        fontSize: "@font-size.lg",
        borderRadius: "@border-radius.md",
      },
    },
    invalid: {
      true: {},
      false: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: fieldSurfaceCompoundVariants({ includeReadonly: false }),
  defaultVariants: {
    color: "neutral",
    variant: "default",
    size: "md",
    invalid: "false",
    disabled: "false",
  },
});
