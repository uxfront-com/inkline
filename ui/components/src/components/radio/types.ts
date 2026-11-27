import type { RadioFieldRecipeProps, RadioGroupRecipeProps } from "../../recipes.ts";

export interface RadioBaseProps {
	/** Id of the label element. */
	id?: string;
}

export interface RadioFieldBaseProps {
	/** Id of the native control. */
	id?: string;
	/** Shared control name: radios with the same name are mutually exclusive. */
	name?: string;
	/** The value submitted when this radio is selected, and that `selected` holds while it is. */
	value?: string;
	/** Disables the control. */
	disabled?: boolean;
	/** Marks the control as required. */
	required?: boolean;
	/**
	 * Keeps the selection from changing while it stays shown and focusable. Native radios ignore the
	 * HTML `readonly` attribute, so the control cancels the click that would select it.
	 */
	readonly?: boolean;
}

export interface RadioGroupBaseProps {
	/** Id of the group element. */
	id?: string;
	/** Accessible name for the group, exposed as `aria-label`. */
	label?: string;
	/** Marks the whole group read-only, exposed as `aria-readonly` on the radiogroup. */
	readonly?: boolean;
	/** Id of the element that describes the group, exposed as `aria-describedby`. */
	ariaDescribedby?: string;
}

/** A single choice in a radio group. */
export interface RadioOption {
	/** The value submitted when this option is selected. */
	value: string;
	/** Visible label; falls back to the value. */
	label?: string;
	/** Disables just this option. */
	disabled?: boolean;
}

// `size` is shared by all three recipes, `color` is the radio field's axis and `orientation` the
// radio group's.
export interface RadioGroupProps
	extends
		RadioGroupBaseProps,
		Pick<RadioFieldRecipeProps, "color">,
		Pick<RadioGroupRecipeProps, "size" | "orientation"> {
	/** The options rendered as radios. */
	options?: RadioOption[];
	/** Shared control name, for native mutual exclusivity within the group. */
	name?: string;
	/** Disables every option in the group. */
	disabled?: boolean;
}
