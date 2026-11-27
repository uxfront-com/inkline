import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

// The label wrapper: a single `<label>` root, so the styled layer's `class` falls through, that nests
// the control and its text. Nesting the control inside the `<label>` labels it implicitly: clicking
// the text toggles the box, with no `for` and `id` to wire.
export default function ICheckboxBase() {
	const slots = defineSlots<{ default?(): Element }>();

	return <label>{slots.default?.()}</label>;
}
