import { createFieldAddonRecipe } from "../input/createFieldRecipe";

/**
 * Textarea suffix recipe — trailing inline addon rendered INSIDE the textarea
 * wrapper, sharing the same visual field as the typed text. The wrapper is
 * top-aligned, so the suffix sits at the top-right of the field — use it for
 * icons, unit labels, or small affordances. Distinct from `textarea-append`,
 * which renders an OUTSIDE joined block alongside the textarea.
 */
export const useTextareaSuffixRecipe = createFieldAddonRecipe(
	"textarea-suffix",
	"paddingInlineStart",
);
