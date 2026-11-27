import type { InputRecipeProps } from "../../recipes.ts";

export interface InputBaseProps {
	/** Id of the field shell element. */
	id?: string;
}

/**
 * An `autocomplete` value: a single autofill token, from the set every target's types accept for
 * a form control.
 */
export type InputAutocomplete =
	| "on"
	| "off"
	| "name"
	| "honorific-prefix"
	| "given-name"
	| "additional-name"
	| "family-name"
	| "honorific-suffix"
	| "username"
	| "new-password"
	| "current-password"
	| "one-time-code"
	| "organization"
	| "street-address"
	| "address-line1"
	| "address-line2"
	| "address-line3"
	| "address-level4"
	| "address-level3"
	| "address-level2"
	| "address-level1"
	| "country"
	| "country-name"
	| "postal-code"
	| "cc-name"
	| "cc-given-name"
	| "cc-family-name"
	| "cc-number"
	| "cc-exp"
	| "cc-exp-month"
	| "cc-exp-year"
	| "cc-csc"
	| "cc-type"
	| "transaction-currency"
	| "transaction-amount"
	| "bday-day"
	| "bday-month"
	| "bday-year"
	| "tel"
	| "tel-country-code"
	| "tel-national"
	| "tel-area-code"
	| "tel-local"
	| "tel-local-prefix"
	| "tel-local-suffix"
	| "tel-extension"
	| "email";

/** The `type` of a text-like `<input>`, whose value is its text. */
export type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

export interface InputControlBaseProps {
	/** Id of the native control. */
	id?: string;
	/** Name of the native control. */
	name?: string;
	/** Input type, like `"text"` or `"email"`. Use `IInputTextareaBase` for a `<textarea>`. */
	type?: InputType;
	/** Placeholder text. */
	placeholder?: string;
	/** Disables the control. */
	disabled?: boolean;
	/** Marks the control as read-only. */
	readonly?: boolean;
	/** Marks the control as required. */
	required?: boolean;
	/** The browser's autofill hint, like `"email"` or `"current-password"`. */
	autocomplete?: InputAutocomplete;
	/** Accessible name, exposed as `aria-label`, for a control with no visible label. */
	ariaLabel?: string;
	/** Id of the element that describes the control, exposed as `aria-describedby`. */
	ariaDescribedby?: string;
}

export interface InputTextareaBaseProps {
	/** Id of the native control. */
	id?: string;
	/** Name of the native control. */
	name?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Disables the control. */
	disabled?: boolean;
	/** Marks the control as read-only. */
	readonly?: boolean;
	/** Marks the control as required. */
	required?: boolean;
	/** The browser's autofill hint, like `"email"` or `"current-password"`. */
	autocomplete?: InputAutocomplete;
	/** Accessible name, exposed as `aria-label`, for a control with no visible label. */
	ariaLabel?: string;
	/** Id of the element that describes the control, exposed as `aria-describedby`. */
	ariaDescribedby?: string;
}

// `disabled` and `readonly` come from the control: the recipe's `"true" | "false" | boolean` takes
// its `boolean`.
export interface InputProps
	extends
		Omit<InputControlBaseProps, "type">,
		Pick<InputRecipeProps, "color" | "variant" | "size" | "invalid"> {
	/** Input type, like `"text"` or `"email"`, or `"textarea"` for a `<textarea>`. */
	type?: InputType | "textarea";
}
