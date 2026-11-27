import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero body wrapper that groups headline, actions, and links into one flex column.
 * In horizontal orientation this becomes one of the two side-by-side columns (opposite the image).
 */
export const usePageHeroBodyRecipe = createUseRecipe("page-hero-body", {
	base: {
		display: "flex",
		flexDirection: "column",
		flex: "1",
		minWidth: "0",
		gap: "@1.5",
	},
	variants: {
		size: {
			sm: { gap: "@1" },
			md: { gap: "@1.5" },
			lg: { gap: "@2" },
		},
		alignment: {
			start: {
				alignItems: "flex-start",
				textAlign: "left",
			},
			center: {
				alignItems: "center",
				textAlign: "center",
			},
			end: {
				alignItems: "flex-end",
				textAlign: "right",
			},
		},
		orientation: {
			vertical: {},
			horizontal: {},
		},
	},
	compoundVariants: [
		{
			match: { orientation: "horizontal" as const },
			css: {
				alignItems: "flex-start",
				textAlign: "left",
			},
		},
	],
	defaultVariants: {
		size: "md",
		alignment: "center",
	},
});
