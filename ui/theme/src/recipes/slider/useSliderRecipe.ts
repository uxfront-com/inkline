import { createUseRecipe } from "@styleframe/theme";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const thumbSizeMap: Record<string, string> = {
	xs: "@0.75",
	sm: "@1",
	md: "@1.25",
	lg: "@1.5",
	xl: "@2",
};

/**
 * Slider root recipe.
 * Positioning wrapper that lays out the track and the absolutely positioned
 * thumb. Owns orientation, the cross-axis clearance needed to fit the thumb,
 * and the disabled state (which cascades to every part).
 */
export const useSliderRecipe = createUseRecipe("slider", {
	base: {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		userSelect: "none",
		touchAction: "none",
	},
	variants: {
		orientation: {
			horizontal: {
				flexDirection: "row",
				width: "100%",
			},
			vertical: {
				flexDirection: "column",
				height: "100%",
			},
		},
		size: {
			xs: { minHeight: "@0.75" },
			sm: { minHeight: "@1" },
			md: { minHeight: "@1.25" },
			lg: { minHeight: "@1.5" },
			xl: { minHeight: "@2" },
		},
		disabled: {
			true: {},
			false: {},
		},
	},
	compoundVariants: [
		// Vertical — move the thumb clearance from the block axis to the inline axis.
		...sizes.map((size) => ({
			match: {
				orientation: "vertical" as const,
				size: size as (typeof sizes)[number],
			},
			css: {
				minHeight: "0",
				minWidth: thumbSizeMap[size],
			},
		})),

		// Disabled — dim and block interaction for the whole control.
		{
			match: { disabled: "true" as const },
			css: {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none",
			},
		},
	],
	defaultVariants: {
		orientation: "horizontal",
		size: "md",
		disabled: "false",
	},
});
