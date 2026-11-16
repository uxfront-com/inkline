import { defineModel, defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { checkboxFieldRecipe, checkboxRecipe } from "virtual:styleframe";

import ICheckboxBase from "../headless/ICheckboxBase.uf.tsx";
import ICheckboxControlBase from "../headless/ICheckboxControlBase.uf.tsx";
import type { CheckboxProps } from "../types.ts";

/**
 * The styled Checkbox: a labelled boolean control that composes the `<label>` wrapper and the native
 * `<input type="checkbox">`, styled together. The wrapper recipe's class falls through to the
 * `<label>` and the field recipe's to the `<input>`. `checked` binds through to the control, and
 * `indeterminate` and `readonly` pass on as props.
 */
export default function ICheckbox({
  id,
  name,
  disabled,
  required,
  readonly,
  indeterminate,
  color,
  size,
  label,
  ariaLabel,
  ariaDescribedby,
}: CheckboxProps) {
  const checked = defineModel<boolean>("checked", { default: false });
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <ICheckboxBase class={checkboxRecipe({ size })}>
      <ICheckboxControlBase
        class={checkboxFieldRecipe({ color, size })}
        id={id}
        name={name}
        disabled={disabled}
        required={required}
        readonly={readonly}
        indeterminate={indeterminate}
        ariaLabel={ariaLabel}
        ariaDescribedby={ariaDescribedby}
        v-model:checked={checked.value}
      />
      {slots.default?.() ?? label}
    </ICheckboxBase>
  );
}
