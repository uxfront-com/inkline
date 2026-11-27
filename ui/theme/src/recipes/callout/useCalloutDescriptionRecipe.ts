import { createUseRecipe } from "@styleframe/theme";

/**
 * Callout description recipe — the supporting line below the title. A step down
 * in both size and weight from the title, with a small top margin to separate
 * the two lines. Colour is inherited (`currentColor`) — the callout's variant
 * foreground, never a tint of its own — so the lower-contrast reading relative
 * to the title is colour-agnostic and driftless.
 *
 * Font size follows the `size` axis one token below `useCalloutTitleRecipe` at
 * every step — the title is sm → sm, md → md, lg → lg, so the description is
 * sm → xs, md → sm, lg → md — keeping the description one step under the title
 * at each size. Mirrors `useToastDescriptionRecipe` exactly so the two siblings
 * can't drift. Defaults to `md` to match the callout.
 */
export const useCalloutDescriptionRecipe = createUseRecipe("callout-description", {
	base: {
		display: "block",
		marginTop: "@0.25",
		fontWeight: "@font-weight.normal",
		lineHeight: "@line-height.normal",
	},
	variants: {
		size: {
			sm: { fontSize: "@font-size.xs" },
			md: { fontSize: "@font-size.sm" },
			lg: { fontSize: "@font-size.md" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});
