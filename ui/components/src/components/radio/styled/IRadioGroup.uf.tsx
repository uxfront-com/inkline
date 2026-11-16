import { defineModel, ref, watch } from "@uxfront/unframework";
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
  // Every radio binds this one ref, which writes the model only while the group isn't read-only and
  // goes back to the model's value otherwise. React fires a radio's `change` from the click itself,
  // before a read-only radio cancels it, so the radios can't bind the model directly.
  const current = ref(value.value);

  watch(
    () => value.value,
    (next) => {
      current.value = next;
    },
  );
  watch(
    () => current.value,
    (next) => {
      if (readonly) current.value = value.value;
      else value.value = next;
    },
  );

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
            v-model:selected={current.value}
          />
          <span class="radio-label">{option.label ?? option.value}</span>
        </IRadioBase>
      ))}
    </IRadioGroupBase>
  );
}
