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
	/** Accessible name, exposed as `aria-label`, for a control with no visible label. */
	ariaLabel?: string;
	/** Id of the element that describes the control, exposed as `aria-describedby`. */
	ariaDescribedby?: string;
}

// `color` and `size` come from the `switch-field` recipe. The shell `switch` recipe shares its
// `size` scale.
export interface SwitchProps
	extends SwitchControlBaseProps, Pick<SwitchFieldRecipeProps, "color" | "size"> {
	/** Label text; the default slot overrides it. */
	label?: string;
}
