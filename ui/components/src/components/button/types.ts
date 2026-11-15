import type { ButtonRecipeProps } from "../../recipes.ts";

export interface ButtonBaseProps {
  /** Label text; the default slot overrides it. */
  label?: string;
  /** The native button type. */
  type?: "button" | "submit" | "reset";
  /** Disables the button. */
  disabled?: boolean;
  /** Shows a spinner, marks the button busy and disables it. */
  loading?: boolean;
}

export interface ButtonProps
  extends ButtonBaseProps, Pick<ButtonRecipeProps, "color" | "variant" | "size"> {
  /** Stretches the button to the full width of its container. */
  block?: boolean;
}
