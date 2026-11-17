// A harness parent: `mount` takes props but no slots, so this fills one badge's slot.
import IBadge from "../../../src/components/badge/styled/IBadge.uf.tsx";
import type { BadgeProps } from "../../../src/components/badge/types.ts";

export default function BadgeCase({ color, variant, size }: Omit<BadgeProps, "label">) {
  return (
    <div>
      <IBadge label="From the prop" color={color} variant={variant} size={size} />
      <IBadge label="Overridden">From the slot</IBadge>
    </div>
  );
}
