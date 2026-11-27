import { createUseRecipe } from "@styleframe/theme";

/**
 * Color picker track recipe — the vertical hue slider.
 *
 * A pill-shaped rail styled like the Slider track, filled edge-to-edge with the
 * full 0→360° hue rainbow (a fixed color-model gradient, so the stops are
 * intentionally literal). The rail thickness (width) scales per size like the
 * Slider's rail, while the height tracks the selector so the two parts align.
 * Drop a `.color-picker-thumb` inside and position it vertically to mark the hue.
 */
export const useColorPickerTrackRecipe = createUseRecipe(
	"color-picker-track",
	{
		base: {
			position: "relative",
			borderRadius: "@border-radius.full",
		},
		variants: {
			size: {
				xs: { width: "@0.25", height: "@9.5" },
				sm: { width: "@0.375", height: "@10" },
				md: { width: "@0.5", height: "@10.5" },
				lg: { width: "@0.75", height: "@11" },
				xl: { width: "@1", height: "@11.5" },
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		s.selector(".color-picker-track", {
			touchAction: "none",
			background:
				"linear-gradient(to bottom, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))",
		});
	},
);
