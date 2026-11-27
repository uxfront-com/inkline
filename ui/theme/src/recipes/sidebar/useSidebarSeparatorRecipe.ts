import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar separator recipe for visual dividers between sections of the panel. Supports color
 * (light, dark, neutral) — no variant or size axis.
 */
export const useSidebarSeparatorRecipe = createUseRecipe("sidebar-separator", {
	base: {
		display: "block",
		width: "100%",
		height: "1px",
		borderWidth: "0",
		flexShrink: "0",
		marginTop: "@0.25",
		marginBottom: "@0.25",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
	},
	compoundVariants: [
		{
			match: { color: "light" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-700",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
	},
});
