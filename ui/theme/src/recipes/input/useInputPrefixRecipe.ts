import { createFieldAddonRecipe } from "./createFieldRecipe";

/**
 * Input prefix recipe — leading inline addon rendered INSIDE the input
 * wrapper, sharing the same visual field as the typed text. Use for icons,
 * currency symbols, units, or small affordances that sit to the left of the
 * caret. Distinct from `input-prepend`, which renders an OUTSIDE joined block
 * alongside the input.
 */
export const useInputPrefixRecipe = createFieldAddonRecipe("input-prefix", "paddingInlineEnd");
