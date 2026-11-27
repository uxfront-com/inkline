import { createUseRecipe } from "@styleframe/theme";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const railSizeMap: Record<string, string> = {
	xs: "@0.25",
	sm: "@0.375",
	md: "@0.5",
	lg: "@0.75",
	xl: "@1",
};

/**
 * Slider track recipe.
 * The neutral rail that contains the colored range. Non-semantic colors only —
 * the track is a backdrop, never a brand surface.
 */
export const useSliderTrackRecipe = createUseRecipe("slider-track", {
	base: {
		display: "flex",
		overflow: "hidden",
		borderRadius: "@border-radius.full",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		orientation: {
			horizontal: {
				width: "100%",
			},
			vertical: {
				flexDirection: "column-reverse",
				height: "100%",
			},
		},
		size: {
			xs: { height: "@0.25" },
			sm: { height: "@0.375" },
			md: { height: "@0.5" },
			lg: { height: "@0.75" },
			xl: { height: "@1" },
		},
	},
	compoundVariants: [
		// Light — fixed across themes.
		{
			match: { color: "light" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-200",
				},
			},
		},

		// Dark — fixed across themes.
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-800",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},

		// Neutral — adaptive (different light/dark values).
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},

		// Vertical size overrides — swap rail thickness from height to width.
		// The rail must fill the root's length (height: 100%) so the range's
		// percentage height resolves; only its thickness moves to the width axis.
		...sizes.map((size) => ({
			match: {
				orientation: "vertical" as const,
				size: size as (typeof sizes)[number],
			},
			css: {
				height: "100%",
				width: railSizeMap[size],
			},
		})),
	],
	defaultVariants: {
		color: "neutral",
		orientation: "horizontal",
		size: "md",
	},
});
