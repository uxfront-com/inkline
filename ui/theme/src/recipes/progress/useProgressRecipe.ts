import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const sizeTokenMap: Record<string, string> = {
	xs: "@0.25",
	sm: "@0.375",
	md: "@0.5",
	lg: "@0.75",
	xl: "@1",
};

/**
 * Progress track recipe with non-semantic color variants.
 * Provides the neutral background container for the progress bar fill.
 */
export const useProgressRecipe = createUseRecipe("progress", {
	base: {
		display: "flex",
		overflow: "hidden",
		borderRadius: "@border-radius.md",
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
			xs: {
				height: "@0.25",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				height: "@0.375",
				borderRadius: "@border-radius.sm",
			},
			md: {
				height: "@0.5",
				borderRadius: "@border-radius.md",
			},
			lg: {
				height: "@0.75",
				borderRadius: "@border-radius.md",
			},
			xl: {
				height: "@1",
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		// Light — fixed across themes
		{
			match: { color: "light" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-200",
				},
			},
		},

		// Dark — fixed across themes
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-800",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},

		// Neutral — adaptive (different light/dark values)
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},

		// Vertical size overrides — swap height to width
		...sizes.map((size) => ({
			match: {
				orientation: "vertical" as const,
				size: size as (typeof sizes)[number],
			},
			css: {
				height: "auto",
				width: sizeTokenMap[size],
			},
		})),
	],
	defaultVariants: {
		color: "neutral",
		orientation: "horizontal",
		size: "md",
	},
});

/**
 * Progress bar fill recipe with semantic and non-semantic color variants.
 * Represents the colored fill indicator inside the progress track.
 * Supports orientation, inverted fill direction, and indeterminate animations.
 */
export const useProgressBarRecipe = createUseRecipe(
	"progress-bar",
	{
		base: {
			borderRadius: "@border-radius.md",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "300ms",
		},
		variants: {
			color: {
				primary: {},
				secondary: {},
				success: {},
				info: {},
				warning: {},
				error: {},
				light: {},
				dark: {},
				neutral: {},
			},
			orientation: {
				horizontal: {
					height: "100%",
					transitionProperty: "width",
				},
				vertical: {
					width: "100%",
					transitionProperty: "height",
				},
			},
			inverted: {
				true: {},
				false: {},
			},
			animation: {
				none: {},
				carousel: {
					animationName: "progress-carousel",
					animationDuration: "1.5s",
					animationTimingFunction: "linear",
					animationIterationCount: "infinite",
				},
				"carousel-inverse": {
					animationName: "progress-carousel-inverse",
					animationDuration: "1.5s",
					animationTimingFunction: "linear",
					animationIterationCount: "infinite",
				},
				swing: {
					animationName: "progress-swing",
					animationDuration: "2s",
					animationTimingFunction: "@easing.ease-in-out",
					animationIterationCount: "infinite",
				},
				elastic: {
					animationName: "progress-elastic",
					animationDuration: "2s",
					animationTimingFunction: "@easing.ease-in-out",
					animationIterationCount: "infinite",
				},
			},
			size: {
				xs: {
					borderRadius: "@border-radius.sm",
				},
				sm: {
					borderRadius: "@border-radius.sm",
				},
				md: {
					borderRadius: "@border-radius.md",
				},
				lg: {
					borderRadius: "@border-radius.md",
				},
				xl: {
					borderRadius: "@border-radius.lg",
				},
			},
		},
		compoundVariants: [
			// Semantic colors (dynamic)
			...colors.flatMap((color) => [
				{
					match: { color },
					css: {
						background: `@color.${color}`,
					},
				},
			]),

			// Light — fixed across themes
			{
				match: { color: "light" as const },
				css: {
					background: "@color.gray-400",
					"&:dark": {
						background: "@color.gray-400",
					},
				},
			},

			// Dark — fixed across themes
			{
				match: { color: "dark" as const },
				css: {
					background: "@color.gray-600",
					"&:dark": {
						background: "@color.gray-600",
					},
				},
			},

			// Neutral — adaptive (different light/dark values)
			{
				match: { color: "neutral" as const },
				css: {
					background: "@color.gray-400",
					"&:dark": {
						background: "@color.gray-600",
					},
				},
			},

			// Inverted × orientation
			{
				match: {
					inverted: "true" as const,
					orientation: "horizontal" as const,
				},
				css: {
					marginLeft: "auto",
				},
			},
			{
				match: {
					inverted: "true" as const,
					orientation: "vertical" as const,
				},
				css: {
					marginBottom: "auto",
				},
			},

			// Vertical animation overrides
			{
				match: {
					animation: "carousel" as const,
					orientation: "vertical" as const,
				},
				css: {
					animationName: "progress-carousel-vertical",
				},
			},
			{
				match: {
					animation: "carousel-inverse" as const,
					orientation: "vertical" as const,
				},
				css: {
					animationName: "progress-carousel-inverse-vertical",
				},
			},
			{
				match: {
					animation: "swing" as const,
					orientation: "vertical" as const,
				},
				css: {
					animationName: "progress-swing-vertical",
				},
			},
			{
				match: {
					animation: "elastic" as const,
					orientation: "vertical" as const,
				},
				css: {
					animationName: "progress-elastic-vertical",
				},
			},
		],
		defaultVariants: {
			color: "primary",
			orientation: "horizontal",
			inverted: "false",
			animation: "none",
			size: "md",
		},
	},
	(s) => {
		// Horizontal keyframes
		s.keyframes("progress-carousel", {
			"0%": { transform: "translateX(-100%)" },
			"100%": { transform: "translateX(200%)" },
		});
		s.keyframes("progress-carousel-inverse", {
			"0%": { transform: "translateX(200%)" },
			"100%": { transform: "translateX(-100%)" },
		});
		s.keyframes("progress-swing", {
			"0%": { transform: "translateX(-100%)" },
			"50%": { transform: "translateX(200%)" },
			"100%": { transform: "translateX(-100%)" },
		});
		s.keyframes("progress-elastic", {
			"0%": { transform: "translateX(-100%) scaleX(0.5)" },
			"25%": { transform: "translateX(50%) scaleX(1)" },
			"50%": { transform: "translateX(200%) scaleX(0.5)" },
			"75%": { transform: "translateX(50%) scaleX(1)" },
			"100%": { transform: "translateX(-100%) scaleX(0.5)" },
		});

		// Vertical keyframes
		s.keyframes("progress-carousel-vertical", {
			"0%": { transform: "translateY(200%)" },
			"100%": { transform: "translateY(-100%)" },
		});
		s.keyframes("progress-carousel-inverse-vertical", {
			"0%": { transform: "translateY(-100%)" },
			"100%": { transform: "translateY(200%)" },
		});
		s.keyframes("progress-swing-vertical", {
			"0%": { transform: "translateY(200%)" },
			"50%": { transform: "translateY(-100%)" },
			"100%": { transform: "translateY(200%)" },
		});
		s.keyframes("progress-elastic-vertical", {
			"0%": { transform: "translateY(200%) scaleY(0.5)" },
			"25%": { transform: "translateY(50%) scaleY(1)" },
			"50%": { transform: "translateY(-100%) scaleY(0.5)" },
			"75%": { transform: "translateY(50%) scaleY(1)" },
			"100%": { transform: "translateY(200%) scaleY(0.5)" },
		});
	},
);
