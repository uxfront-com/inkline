import { createUseRecipe } from "@styleframe/theme";

/**
 * Skeleton loading placeholder recipe.
 * Displays a pulsing gray block used during loading states.
 */
export const useSkeletonRecipe = createUseRecipe(
	"skeleton",
	{
		base: {
			display: "block",
			background: "@color.gray-200",
			borderRadius: "@border-radius.md",
			animationName: "skeleton-pulse",
			animationDuration: "2s",
			animationTimingFunction: "@easing.ease-in-out",
			animationIterationCount: "infinite",
			"&:dark": {
				background: "@color.gray-800",
			},
		},
		variants: {
			size: {
				xs: { height: "@0.5" },
				sm: { height: "@0.75" },
				md: { height: "@1" },
				lg: { height: "@1.5" },
				xl: { height: "@2" },
			},
			rounded: {
				true: { borderRadius: "@border-radius.full" },
				false: {},
			},
		},
		defaultVariants: {
			size: "md",
			rounded: "false",
		},
	},
	(s) => {
		s.keyframes("skeleton-pulse", {
			"0%, 100%": { opacity: "1" },
			"50%": { opacity: "0.5" },
		});
	},
);
