import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar content recipe. The scrollable region between the header and footer that holds the
 * groups and menus. Grows to fill the panel and scrolls vertically; the `size` axis scales
 * its padding and the gap between groups.
 */
export const useSidebarContentRecipe = createUseRecipe("sidebar-content", {
	base: {
		display: "flex",
		flexDirection: "column",
		flexGrow: "1",
		flexShrink: "1",
		minHeight: "0",
		overflowY: "auto",
		overflowX: "hidden",
	},
	variants: {
		size: {
			sm: {
				gap: "@0.25",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
			},
			md: {
				gap: "@0.5",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
			},
			lg: {
				gap: "@0.75",
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
