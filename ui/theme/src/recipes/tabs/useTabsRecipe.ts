import { createUseRecipe } from "@styleframe/theme";

/**
 * Tabs root recipe — the wrapper that lays out the tab bar and the active
 * panel. Owns only the `orientation` (which flips the flex direction) and the
 * `size` (the gap between the bar and the panel). The color/variant styling
 * lives on the `tabs-list`, `tabs-trigger`, and `tabs-content` parts.
 */
export const useTabsRecipe = createUseRecipe("tabs", {
	base: {
		display: "flex",
	},
	variants: {
		orientation: {
			horizontal: {
				flexDirection: "column",
			},
			vertical: {
				flexDirection: "row",
			},
		},
		size: {
			sm: { gap: "@0.5" },
			md: { gap: "@0.75" },
			lg: { gap: "@1" },
		},
	},
	defaultVariants: {
		orientation: "horizontal",
		size: "md",
	},
});
