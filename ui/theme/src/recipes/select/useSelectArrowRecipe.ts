import { createUseRecipe } from "@styleframe/theme";

/**
 * Select chevron recipe for the trailing indicator inside a `.select` trigger.
 * Unlike the Dropdown arrow (a CSS triangle pointer), this is a rotating chevron
 * that inherits the trigger's `currentColor` and flips when the panel is open.
 * Only a `size` axis is needed; rotation is driven by `data-open="true"` on the
 * arrow or the `.-open` class on the parent trigger (registered in setup).
 */
export const useSelectArrowRecipe = createUseRecipe(
	"select-arrow",
	{
		base: {
			display: "inline-flex",
			flexShrink: "0",
			alignItems: "center",
			justifyContent: "center",
			marginLeft: "auto",
			color: "inherit",
			transitionProperty: "transform",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
		},
		variants: {
			size: {
				sm: {
					width: "@0.75",
					height: "@0.75",
				},
				md: {
					width: "@1",
					height: "@1",
				},
				lg: {
					width: "@1.25",
					height: "@1.25",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		const { selector } = s;

		selector('.select-arrow[data-open="true"]', {
			transform: "rotate(180deg)",
		});

		selector(".select.-open .select-arrow", {
			transform: "rotate(180deg)",
		});
	},
);
