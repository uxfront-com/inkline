import { createUseRecipe } from "@styleframe/theme";

/**
 * Chip wrapper recipe that establishes the positioning context for the chip indicator.
 */
export const useChipRecipe = createUseRecipe("chip", {
	base: {
		position: "relative",
		display: "inline-flex",
	},
	variants: {},
	compoundVariants: [],
	defaultVariants: {},
});
