import { defineModel } from "@uxfront/unframework";
import { radioFieldRecipe, radioGroupRecipe, radioRecipe } from "virtual:styleframe";

import IRadioBase from "../headless/IRadioBase.uf.tsx";
import IRadioFieldBase from "../headless/IRadioFieldBase.uf.tsx";
import IRadioGroupBase from "../headless/IRadioGroupBase.uf.tsx";
import type { RadioGroupProps } from "../types.ts";

/**
 * The styled RadioGroup: a single-select control. It renders one radio for each entry of `options`,
 * and binds each to its `value` model, which holds the value of the radio that's checked, so one
 * option is selected at a time, which the shared native `name` reinforces. `color`, `size` and `orientation` map to the
 * recipes' axes.
 */
export default function IRadioGroup({
  id,
  label,
  readonly = false,
  options = [],
  name,
  color,
  size,
  orientation,
  disabled = false,
  ariaDescribedby,
}: RadioGroupProps) {
  const value = defineModel<string>("value", { default: "" });

  return (
    <IRadioGroupBase
      id={id}
      label={label}
      readonly={readonly}
      ariaDescribedby={ariaDescribedby}
      class={radioGroupRecipe({ orientation, size })}
    >
      {options.map((option) => (
        <IRadioBase key={option.value} class={radioRecipe({ size })}>
          <IRadioFieldBase
            class={radioFieldRecipe({ color, size })}
            name={name}
            value={option.value}
            disabled={disabled || option.disabled}
            readonly={readonly}
            v-model:selected={value.value}
          />
          <span class="radio-label">{option.label ?? option.value}</span>
        </IRadioBase>
      ))}
    </IRadioGroupBase>
  );
}
