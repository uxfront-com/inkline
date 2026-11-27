import { createUseRecipe } from "@styleframe/theme";

/**
 * Toggle group recipe — a flex container that lays out multiple `.toggle` buttons
 * with spacing between them. Supports orientation (horizontal / vertical) and a
 * size axis that controls the gap between items. Mirrors `checkbox-group` /
 * `radio-group`, but defaults to `horizontal` since toggle groups read as
 * horizontal segmented controls.
 *
 * For the connected segmented look (toggles joined at the seams with no gap), wrap
 * the toggles in the `field-group` recipe instead — it already merges adjacent
 * border radii and inner borders on any bordered child.
 */
export const useToggleGroupRecipe = createUseRecipe("toggle-group", {
	base: {
		display: "flex",
	},
	variants: {
		orientation: {
			horizontal: {
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
			},
			vertical: {
				flexDirection: "column",
			},
		},
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
	},
	defaultVariants: {
		orientation: "horizontal",
		size: "md",
	},
});
