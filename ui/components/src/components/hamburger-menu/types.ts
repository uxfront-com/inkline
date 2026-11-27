import type { HamburgerMenuRecipeProps } from "../../recipes.ts";

export interface HamburgerMenuBaseProps {
	/** Accessible name for the icon-only toggle; sets `aria-label`. */
	ariaLabel?: string;
	/** Id of the region the toggle shows and hides; sets `aria-controls`. */
	ariaControls?: string;
	/** Disables the toggle. */
	disabled?: boolean;
}

// The recipe's `active` axis is left out: it follows the `open` model, never the consumer.
export interface HamburgerMenuProps
	extends HamburgerMenuBaseProps, Pick<HamburgerMenuRecipeProps, "color" | "size" | "animation"> {}
