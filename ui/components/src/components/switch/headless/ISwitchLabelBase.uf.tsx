import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

// The switch's text, after the control inside the shell `<label>`. The styled component always
// renders it, and a `.switch-label:empty` rule collapses it when there's no label, so an unlabelled
// switch leaves no trailing gap.
export default function ISwitchLabelBase() {
  const slots = defineSlots<{ default?(): Element }>();

  return <span class="switch-label">{slots.default?.()}</span>;
}
