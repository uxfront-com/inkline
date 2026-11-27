import { createFieldAddonRecipe } from "../input/createFieldRecipe";

/**
 * Textarea prefix recipe — leading inline addon rendered INSIDE the textarea
 * wrapper, sharing the same visual field as the typed text. The wrapper is
 * top-aligned, so the prefix sits at the top-left of the field — use it for
 * icons or small affordances. Distinct from `textarea-prepend`, which renders
 * an OUTSIDE joined block alongside the textarea.
 */
export const useTextareaPrefixRecipe = createFieldAddonRecipe(
	"textarea-prefix",
	"paddingInlineEnd",
);
