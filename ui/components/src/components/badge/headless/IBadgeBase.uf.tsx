import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { BadgeBaseProps } from "../types.ts";

export default function IBadgeBase({ label }: BadgeBaseProps) {
	const slots = defineSlots<{ default?(): Element }>();

	return <div>{slots.default?.() ?? label}</div>;
}
