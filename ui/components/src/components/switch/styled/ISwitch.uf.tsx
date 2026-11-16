import { defineModel, defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { switchFieldRecipe, switchRecipe } from "virtual:styleframe";

import ISwitchBase from "../headless/ISwitchBase.uf.tsx";
import ISwitchControlBase from "../headless/ISwitchControlBase.uf.tsx";
import ISwitchLabelBase from "../headless/ISwitchLabelBase.uf.tsx";
import type { SwitchProps } from "../types.ts";

/**
 * The styled Switch: an on/off toggle that composes the shell `<label>`, the native
 * `<input type="checkbox" role="switch">` and its text, styled with the `switch` and `switch-field`
 * recipes. `checked` binds through to the control, and the label's text, from the default slot or
 * `label`, names it.
 */
export default function ISwitch({
  id,
  name,
  disabled,
  readonly,
  color,
  size,
  label,
  ariaLabel,
  ariaDescribedby,
}: SwitchProps) {
  const checked = defineModel<boolean>("checked", { default: false });
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <ISwitchBase class={switchRecipe({ size })}>
      <ISwitchControlBase
        class={switchFieldRecipe({ color, size })}
        id={id}
        name={name}
        v-model:checked={checked.value}
        disabled={disabled}
        readonly={readonly}
        ariaLabel={ariaLabel}
        ariaDescribedby={ariaDescribedby}
      />
      <ISwitchLabelBase>{slots.default?.() ?? label}</ISwitchLabelBase>
    </ISwitchBase>
  );
}
