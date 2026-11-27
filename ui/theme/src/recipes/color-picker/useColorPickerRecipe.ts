import { createUseRecipe } from "@styleframe/theme";

/**
 * Color picker root recipe — the flex container that lays out the
 * saturation/value selector next to the vertical hue track.
 *
 * Styling shell only: dragging, color math, and format conversion live in the
 * consuming app's JS. The selected color is driven by the `--color-picker--hue`
 * CSS variable (see `useColorPickerSelectorRecipe`) plus consumer-set thumb
 * positions.
 */
export const useColorPickerRecipe = createUseRecipe(
	"color-picker",
	{
		base: {
			display: "flex",
			alignItems: "flex-start",
			position: "relative",
		},
		variants: {
			size: {
				xs: { gap: "@0.5" },
				sm: { gap: "@0.75" },
				md: { gap: "@1" },
				lg: { gap: "@1" },
				xl: { gap: "@1.25" },
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		// Disabled is signalled by `data-disabled` on the root (reka-ui convention):
		// dim the whole picker and mark every thumb as not-allowed.
		s.selector(".color-picker[data-disabled]", {
			opacity: "0.75",
		});
		s.selector(".color-picker[data-disabled] .color-picker-thumb", {
			cursor: "not-allowed",
		});
	},
);
