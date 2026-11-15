import { defineModel } from "@uxfront/unframework";

import type { InputTextareaBaseProps } from "../types.ts";

// The native `<textarea>` control. The styled Input renders it instead of `IInputControlBase` when
// `type` is `"textarea"`.
export default function IInputTextareaBase({
  id,
  name,
  placeholder,
  disabled = false,
  readonly = false,
}: InputTextareaBaseProps) {
  // The value, a model, so a parent can bind it.
  const value = defineModel<string>("value", { default: "" });

  return (
    <textarea
      class="input-field"
      id={id}
      name={name}
      v-model={value.value}
      placeholder={placeholder}
      disabled={disabled}
      readonly={readonly}
    />
  );
}
