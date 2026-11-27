import { createUseRecipe } from "@styleframe/theme";

/**
 * Callout icon recipe for the leading icon slot.
 */
export const useCalloutIconRecipe = createUseRecipe("callout-icon", {
	base: {
		display: "inline-flex",
		flexShrink: "0",
	},
});
