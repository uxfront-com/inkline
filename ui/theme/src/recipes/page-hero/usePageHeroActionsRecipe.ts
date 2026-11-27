import { createUseRecipe } from "@styleframe/theme";

/**
 * Page hero actions container for primary + secondary CTAs.
 * Flex row with wrap; gap and justify-content scale with size + alignment.
 */
export const usePageHeroActionsRecipe = createUseRecipe("page-hero-actions", {
	base: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: "@0.75",
	},
	variants: {
		size: {
			sm: {
				gap: "@0.5",
			},
			md: {
				gap: "@0.75",
			},
			lg: {
				gap: "@1",
			},
		},
		alignment: {
			start: {
				justifyContent: "flex-start",
			},
			center: {
				justifyContent: "center",
			},
			end: {
				justifyContent: "flex-end",
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
			css: { justifyContent: "flex-start" },
		},
	],
	defaultVariants: {
		size: "md",
		alignment: "center",
	},
});
