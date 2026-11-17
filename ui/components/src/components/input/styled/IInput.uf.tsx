import { defineEmits, defineModel, defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { inputPrefixRecipe, inputRecipe, inputSuffixRecipe } from "virtual:styleframe";

import IInputBase from "../headless/IInputBase.uf.tsx";
import IInputControlBase from "../headless/IInputControlBase.uf.tsx";
import IInputPrefixBase from "../headless/IInputPrefixBase.uf.tsx";
import IInputSuffixBase from "../headless/IInputSuffixBase.uf.tsx";
import IInputTextareaBase from "../headless/IInputTextareaBase.uf.tsx";
import type { InputProps } from "../types.ts";

/**
 * The styled Input: a complete field that composes the shell, the native control and the optional
 * inline `prefix` and `suffix` addons, styled together. Each addon's wrapper renders only when its
 * slot is filled. `value` binds through to the control. To attach controls outside the field, wrap
 * them in `IFieldGroup`.
 */
export default function IInput({
  id,
  name,
  type,
  placeholder,
  disabled,
  readonly,
  color,
  variant,
  size,
  invalid,
  required,
  autocomplete,
  ariaLabel,
  ariaDescribedby,
}: InputProps) {
  const emit = defineEmits<{ focus: []; blur: [] }>();
  const value = defineModel<string>("value", { default: "" });
  const slots = defineSlots<{ prefix?(): Element; suffix?(): Element }>();

  return (
    <IInputBase class={inputRecipe({ color, variant, size, invalid, disabled, readonly })}>
      {slots.prefix ? (
        <IInputPrefixBase class={inputPrefixRecipe({ size })}>{slots.prefix?.()}</IInputPrefixBase>
      ) : null}
      {type === "textarea" ? (
        <IInputTextareaBase
          id={id}
          name={name}
          v-model:value={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
          required={required}
          autocomplete={autocomplete}
          ariaLabel={ariaLabel}
          ariaDescribedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
        />
      ) : (
        <IInputControlBase
          id={id}
          name={name}
          type={type}
          v-model:value={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
          required={required}
          autocomplete={autocomplete}
          ariaLabel={ariaLabel}
          ariaDescribedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
        />
      )}
      {slots.suffix ? (
        <IInputSuffixBase class={inputSuffixRecipe({ size })}>{slots.suffix?.()}</IInputSuffixBase>
      ) : null}
    </IInputBase>
  );
}
