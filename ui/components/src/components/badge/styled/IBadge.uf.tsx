import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { badgeRecipe } from "virtual:styleframe";

import IBadgeBase from "../headless/IBadgeBase.uf.tsx";
import type { BadgeProps } from "../types.ts";

export default function IBadge({ label, color, variant, size }: BadgeProps) {
	const slots = defineSlots<{ default?(): Element }>();

	return (
		<IBadgeBase class={badgeRecipe({ color, variant, size })}>
			{slots.default?.() ?? label}
		</IBadgeBase>
	);
}
