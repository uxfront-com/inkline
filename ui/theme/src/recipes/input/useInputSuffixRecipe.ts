import { createFieldAddonRecipe } from "./createFieldRecipe";

/**
 * Input suffix recipe — trailing inline addon rendered INSIDE the input
 * wrapper, sharing the same visual field as the typed text. Use for icons,
 * unit labels, clear/reveal buttons, or small affordances that sit to the
 * right of the caret. Distinct from `input-append`, which renders an OUTSIDE
 * joined block alongside the input.
 */
export const useInputSuffixRecipe = createFieldAddonRecipe("input-suffix", "paddingInlineStart");
