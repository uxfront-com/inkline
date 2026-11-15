import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { RadioGroupBaseProps } from "../types.ts";

// The radiogroup container. It holds no state: the selected value lives on the styled
// `IRadioGroup`, and mutual exclusivity comes from the radios sharing a native `name`. `readonly` is
// surfaced as `aria-readonly`, the state the `radiogroup` role supports, and each radio field guards
// its own interaction.
export default function IRadioGroupBase({ id, label, readonly = false }: RadioGroupBaseProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <div role="radiogroup" id={id} aria-label={label} aria-readonly={readonly ? "true" : undefined}>
      {slots.default?.()}
    </div>
  );
}
