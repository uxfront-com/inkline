import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar group label recipe. The muted heading at the top of a `sidebar-group`. Supports
 * color (light, dark, neutral) and size — no variant axis. Hidden when the sidebar is
 * collapsed.
 */
export const useSidebarGroupLabelRecipe = createUseRecipe("sidebar-group-label", {
	base: {
		display: "flex",
		alignItems: "center",
		flexShrink: "0",
		fontWeight: "@font-weight.medium",
		lineHeight: "@line-height.tight",
		whiteSpace: "nowrap",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.2xs",
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
			},
			md: {
				fontSize: "@font-size.xs",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
			},
			lg: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
		},
	},
	compoundVariants: [
		{
			match: { color: "light" as const },
			css: {
				color: "@color.gray-600",
				"&:dark": {
					color: "@color.gray-600",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				color: "@color.gray-400",
				"&:dark": {
					color: "@color.gray-400",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				color: "@color.gray-600",
				"&:dark": {
					color: "@color.gray-400",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});
