import { createUseRecipe } from "@styleframe/theme";

/**
 * Tabs content recipe — the panel (`role="tabpanel"`) revealed by the active
 * trigger. Deliberately minimal: the adaptive text color, a focus ring for
 * keyboard users who tab into the panel, and size-based padding. Separation
 * from the bar is handled by the root's gap, so no directional margin is set.
 */
export const useTabsContentRecipe = createUseRecipe("tabs-content", {
	base: {
		color: "@color.text",
		lineHeight: "@line-height.normal",
		outline: "none",
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
	},
	variants: {
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1",
				paddingRight: "@1",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
