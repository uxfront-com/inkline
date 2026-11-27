import { createUseRecipe } from "@styleframe/theme";

/**
 * Media title recipe — heading typography for the media body. Element-agnostic:
 * apply to any heading tag (`<h3>`, `<h4>`, `<strong>`) chosen for document outline.
 */
export const useMediaTitleRecipe = createUseRecipe("media-title", {
	base: {
		fontWeight: "@font-weight.semibold",
		lineHeight: "@line-height.snug",
		margin: "0",
	},
	variants: {
		size: {
			sm: {
				fontSize: "@font-size.sm",
			},
			md: {
				fontSize: "@font-size.md",
			},
			lg: {
				fontSize: "@font-size.lg",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
