import type { ButtonRecipeProps } from "../../recipes.ts";

export interface ButtonBaseProps {
  /** Label text; the default slot overrides it. */
  label?: string;
  /** The native button type. */
  type?: "button" | "submit" | "reset";
  /** Disables the button and takes it out of the tab order. */
  disabled?: boolean;
  /**
   * Keeps a disabled button in the tab order, with `aria-disabled`, so people can find it and learn
   * why it's disabled.
   */
  focusableWhenDisabled?: boolean;
  /**
   * Shows a spinner and blocks activation. The button keeps its focus and its name, and announces
   * `loadingLabel`.
   */
  loading?: boolean;
  /** Announced to screen readers when loading starts. */
  loadingLabel?: string;
  /** Shows only the leading icon. The label is visually hidden, but it still names the button. */
  iconOnly?: boolean;
  /** Id of the native button. */
  id?: string;
  /** Accessible name, exposed as `aria-label`. Prefer a label, which an icon-only button hides. */
  ariaLabel?: string;
  /** Id of the element that describes the button, exposed as `aria-describedby`. */
  ariaDescribedby?: string;
  /** Whether a toggle button is pressed, exposed as `aria-pressed`. Unset, the button is no toggle. */
  ariaPressed?: boolean;
  /** Whether the popup the button controls is open, exposed as `aria-expanded`. */
  ariaExpanded?: boolean;
  /** The kind of popup the button opens, exposed as `aria-haspopup`. */
  ariaHaspopup?: "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
  /** Id of the element the button controls, exposed as `aria-controls`. */
  ariaControls?: string;
  /** The variant in effect, exposed as `data-variant`. The styled Button sets it. */
  variant?: string;
  /** The colour in effect, exposed as `data-color`. The styled Button sets it. */
  color?: string;
  /** The size in effect, exposed as `data-size`. The styled Button sets it. */
  size?: string;
}

export interface ButtonProps
  extends
    Omit<ButtonBaseProps, "variant" | "color" | "size">,
    Pick<ButtonRecipeProps, "color" | "variant" | "size"> {
  /** Stretches the button to the full width of its container. */
  block?: boolean;
}
