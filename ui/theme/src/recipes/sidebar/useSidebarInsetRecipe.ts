import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar inset recipe. The main content area rendered beside the sidebar. A growing flex
 * column on the page background that fills the remaining width; the `size` axis scales its
 * padding and the gap between sections.
 */
export const useSidebarInsetRecipe = createUseRecipe("sidebar-inset", {
	base: {
		display: "flex",
		flexDirection: "column",
		flexGrow: "1",
		flexShrink: "1",
		minWidth: "0",
		minHeight: "100%",
		position: "relative",
		background: "@color.background",
	},
	variants: {
		size: {
			sm: {
				gap: "@0.75",
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
			md: {
				gap: "@1",
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1",
				paddingRight: "@1",
			},
			lg: {
				gap: "@1.5",
				paddingTop: "@1.5",
				paddingBottom: "@1.5",
				paddingLeft: "@1.5",
				paddingRight: "@1.5",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
