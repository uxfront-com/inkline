import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar group recipe. A section inside the content region that groups a label with a menu.
 * A relatively-positioned flex column (so a `sidebar-group-action` can anchor to it); the
 * `size` axis scales its block padding and gap.
 */
export const useSidebarGroupRecipe = createUseRecipe("sidebar-group", {
	base: {
		display: "flex",
		flexDirection: "column",
		position: "relative",
		width: "100%",
		minWidth: "0",
	},
	variants: {
		size: {
			sm: {
				gap: "@0.125",
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
			},
			md: {
				gap: "@0.25",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
			},
			lg: {
				gap: "@0.375",
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
