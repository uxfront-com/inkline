import type { ButtonRecipeProps } from "../../recipes.ts";

// `color`, `variant` and `size` take the recipe's values. The headless button shows them as
// `data-color`, `data-variant` and `data-size`, and renders nothing for one that's unset.
export interface ButtonBaseProps extends Pick<ButtonRecipeProps, "color" | "variant" | "size"> {
	/** Label text; the default slot overrides it. */
	label?: string;
	/** The native button type. A link has none. */
	type?: "button" | "submit" | "reset";
	/** Renders a link (`<a href>`) that looks like the button, for navigation. */
	href?: string;
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
	/**
	 * Whether a toggle button is pressed, exposed as `aria-pressed`. Unset, the button is no toggle.
	 * A link is never a toggle, so it renders none.
	 */
	ariaPressed?: boolean;
	/** Whether the popup the button controls is open, exposed as `aria-expanded`. */
	ariaExpanded?: boolean;
	/** The kind of popup the button opens, exposed as `aria-haspopup`. */
	ariaHaspopup?: "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
	/** Id of the element the button controls, exposed as `aria-controls`. */
	ariaControls?: string;
}

export interface ButtonProps extends ButtonBaseProps {
	/** Stretches the button to the full width of its container. */
	block?: boolean;
}
