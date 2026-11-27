import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

// The switch shell: a `<label>` that wraps the control and its text, so a click anywhere on the
// label toggles the field, and the label's text names it.
export default function ISwitchBase() {
	const slots = defineSlots<{ default?(): Element }>();

	return <label>{slots.default?.()}</label>;
}
