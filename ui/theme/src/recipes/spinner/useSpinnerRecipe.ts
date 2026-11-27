import { createUseRecipe } from "@styleframe/theme";

/**
 * Spinner container recipe.
 * Provides color and layout for the loading spinner with optional label text.
 */
export const useSpinnerRecipe = createUseRecipe("spinner", {
	base: {
		display: "inline-flex",
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: "0",
		fontSize: "@font-size.sm",
		lineHeight: "@line-height.normal",
	},
	variants: {
		color: {
			primary: {},
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			auto: {},
			sm: {},
			md: {},
			lg: {},
			inherit: {
				fontSize: "inherit",
				verticalAlign: "-0.125em",
			},
		},
	},
	compoundVariants: [
		{
			match: { color: "primary" as const },
			css: {
				color: "@color.primary",
				"&:dark": {
					color: "@color.primary-400",
				},
			},
		},
		{
			match: { color: "light" as const },
			css: {
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				color: "@color.white",
				"&:dark": {
					color: "@color.white",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.white",
				},
			},
		},
	],
	defaultVariants: {
		color: "primary",
		size: "md",
	},
});
