import type { CheckboxFieldRecipeProps } from "../../recipes.ts";

export interface CheckboxControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as required (must be checked to submit). */
  required?: boolean;
  /** Marks the control as read-only: it stays focusable but the value cannot be toggled. */
  readonly?: boolean;
  /** Renders the partially-checked ("mixed") state. */
  indeterminate?: boolean;
  /** Accessible name, exposed as \`aria-label\`, for a control with no visible label. */
  ariaLabel?: string;
  /** Id of the element that describes the control, exposed as \`aria-describedby\`. */
  ariaDescribedby?: string;
}

// `size` feeds both the wrapper (`checkbox`) and the box (`checkbox-field`) recipes, which share the
// same `sm | md | lg` set. `color` applies to the box only.
export interface CheckboxProps
  extends CheckboxControlBaseProps, Pick<CheckboxFieldRecipeProps, "color" | "size"> {
  /** Label text; the default slot overrides it. */
  label?: string;
}
