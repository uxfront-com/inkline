import type { SwitchFieldRecipeProps } from "../../recipes.ts";

export interface SwitchControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control, for form submission. */
  name?: string;
  /** Disables the control. */
  disabled?: boolean;
  /**
   * Marks the control read-only: it announces `aria-readonly` and doesn't toggle, while it stays
   * focusable and submittable, unlike `disabled`.
   */
  readonly?: boolean;
}

// `color` and `size` come from the `switch-field` recipe. The shell `switch` recipe shares its
// `size` scale.
export interface SwitchProps
  extends SwitchControlBaseProps, Pick<SwitchFieldRecipeProps, "color" | "size"> {
  /** Label text; the default slot overrides it. */
  label?: string;
}
