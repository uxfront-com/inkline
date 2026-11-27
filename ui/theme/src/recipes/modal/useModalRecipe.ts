import { createUseRecipe } from "@styleframe/theme";

import { overlaySurfaceCompoundVariants } from "./createOverlayRecipes";

/**
 * Modal container recipe.
 * Supports color (light, dark, neutral), variant, and size axes.
 *
 * The panel is never wider or taller than its container, less a 1rem margin on
 * each side, and each size caps its width in `rem`, so it grows with its text.
 * Its border stays visible in forced colors mode and is drawn in the text color
 * when more contrast is asked for. While a modal overlay is on the page, the
 * page behind it doesn't scroll, and keeps its scrollbar's space.
 */
export const useModalRecipe = createUseRecipe(
	"modal",
	{
		base: {
			display: "flex",
			flexDirection: "column",
			flexBasis: "100%",
			maxHeight: "calc(100% - 2rem)",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			overflow: "auto",
			overflowWrap: "anywhere",
			lineHeight: "@line-height.normal",
			boxShadow: "@box-shadow.sm",
			"&:forced-colors": {
				borderColor: "CanvasText",
			},
		},
		variants: {
			color: {
				light: {},
				dark: {},
				neutral: {},
			},
			variant: {
				solid: {},
				soft: {},
				subtle: {},
			},
			size: {
				sm: {
					maxWidth: "min(24rem, 100% - 2rem)",
					borderRadius: "@border-radius.sm",
				},
				md: {
					maxWidth: "min(32rem, 100% - 2rem)",
					borderRadius: "@border-radius.md",
				},
				lg: {
					maxWidth: "min(48rem, 100% - 2rem)",
					borderRadius: "@border-radius.lg",
				},
			},
			fullscreen: {
				true: {
					width: "100%",
					height: "100%",
					maxWidth: "none",
					maxHeight: "none",
					borderRadius: "0",
				},
				false: {},
			},
		},
		compoundVariants: [...overlaySurfaceCompoundVariants],
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			size: "md",
			fullscreen: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// With more contrast, the border is drawn in the text color at full
		// strength. A media query adds no specificity, so the declaration is
		// important: otherwise the color compounds' border classes win by
		// source order, in the light and dark themes alike.
		selector(".modal", {
			"@media (prefers-contrast: more)": {
				borderColor: "currentColor !important",
			},
		});

		// While a modal overlay is on the page, the page behind it doesn't
		// scroll, and keeps its scrollbar's space so it doesn't shift.
		selector(":root:has(.modal-overlay)", {
			overflow: "hidden",
			scrollbarGutter: "stable",
		});
	},
);
