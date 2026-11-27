import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { RadioBaseProps } from "../types.ts";

// A single radio row: a `<label>` that wraps its native control and text, which labels the control
// implicitly, with no `for` and `id` to wire.
export default function IRadioBase({ id }: RadioBaseProps) {
	const slots = defineSlots<{ default?(): Element }>();

	return <label id={id}>{slots.default?.()}</label>;
}
