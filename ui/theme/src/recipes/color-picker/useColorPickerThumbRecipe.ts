import { createUseRecipe } from "@styleframe/theme";

/**
 * Color picker thumb recipe — the draggable handle shared by both the
 * saturation/value selector and the hue track.
 *
 * A fixed-size circle with a white contrast ring that reads against any
 * background color. Size is constant across picker sizes (matches Nuxt UI).
 * Positioning (`top`/`left`/`transform`) is the consumer's responsibility since
 * it is runtime data.
 */
export const useColorPickerThumbRecipe = createUseRecipe(
	"color-picker-thumb",
	{
		base: {
			position: "absolute",
			width: "@1",
			height: "@1",
			borderRadius: "@border-radius.full",
			cursor: "pointer",
		},
	},
	(s) => {
		s.selector(".color-picker-thumb", {
			boxShadow: "0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.3)",
		});
		s.selector(".color-picker-thumb[data-disabled]", {
			cursor: "not-allowed",
		});
	},
);
