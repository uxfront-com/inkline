import { createMenuLabelRecipe } from "../dropdown/createMenuRecipe";

/**
 * Context menu label recipe for group headings inside a `.context-menu` panel.
 * An uppercase, muted caption with color and size axes, plus an `inset` boolean
 * that aligns the heading with checkbox/radio rows that reserve a leading gutter.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useContextMenuLabelRecipe = createMenuLabelRecipe("context-menu-label", {
	variants: {
		inset: {
			true: {},
			false: {},
		},
	},
	compoundVariants: [
		{
			match: { inset: "true" as const },
			css: {
				paddingLeft: "@2",
			},
		},
	],
	defaultVariants: {
		inset: "false",
	},
});
