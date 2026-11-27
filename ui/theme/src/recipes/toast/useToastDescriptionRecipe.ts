import { createUseRecipe } from "@styleframe/theme";

/**
 * Toast description recipe — the supporting line below the title. A step down in
 * both size and weight from the title, with a small top margin to separate the
 * two lines. Colour is inherited (`currentColor`) — the neutral foreground of
 * the toast body, never the `color` accent. The lower-contrast reading relative
 * to the title is colour-agnostic and driftless.
 *
 * Font size follows the `size` axis one token below `useToastTitleRecipe` at
 * every step — the title is sm → sm, md → md, lg → lg, so the description is
 * sm → xs, md → sm, lg → md — keeping the description one step under the title
 * at each size. Defaults to `md` to match the toast.
 */
export const useToastDescriptionRecipe = createUseRecipe("toast-description", {
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
