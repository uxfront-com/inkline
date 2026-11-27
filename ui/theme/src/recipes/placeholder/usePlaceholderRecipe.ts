import { createUseRecipe } from "@styleframe/theme";

/**
 * Placeholder recipe for visual placeholder containers.
 * A simple utility/display component with dashed border and crosshatch pattern.
 */
export const usePlaceholderRecipe = createUseRecipe("placeholder", {
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.dashed",
		borderColor: "@color.gray-300",
		borderRadius: "@border-radius.md",
		overflow: "hidden",
		opacity: "0.75",
		padding: "@1",
		backgroundImage:
			"repeating-linear-gradient(-45deg, transparent, transparent 7px, rgba(0, 0, 0, 0.04) 7px, rgba(0, 0, 0, 0.04) 8px)",
		"&:dark": {
			borderColor: "@color.gray-600",
			backgroundImage:
				"repeating-linear-gradient(-45deg, transparent, transparent 7px, rgba(255, 255, 255, 0.04) 7px, rgba(255, 255, 255, 0.04) 8px)",
		},
	},
});
