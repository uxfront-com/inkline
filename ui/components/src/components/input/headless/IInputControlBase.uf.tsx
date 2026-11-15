import { defineModel } from "@uxfront/unframework";

import type { InputControlBaseProps } from "../types.ts";

// The native `<input>` control. The `<textarea>` variant is a sibling component,
// `IInputTextareaBase`, and the styled Input picks between them by `type`. Each type is its own
// branch, since a two-way binding needs the input's type before it renders.
export default function IInputControlBase({
  id,
  name,
  type = "text",
  placeholder,
  disabled = false,
  readonly = false,
}: InputControlBaseProps) {
  // The value, a model, so a parent can bind it.
  const value = defineModel<string>("value", { default: "" });

  return (
    <>
      {type === "email" ? (
        <input
          class="input-field"
          id={id}
          name={name}
          type="email"
          v-model={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
        />
      ) : type === "password" ? (
        <input
          class="input-field"
          id={id}
          name={name}
          type="password"
          v-model={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
        />
      ) : type === "search" ? (
        <input
          class="input-field"
          id={id}
          name={name}
          type="search"
          v-model={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
        />
      ) : type === "tel" ? (
        <input
          class="input-field"
          id={id}
          name={name}
          type="tel"
          v-model={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
        />
      ) : type === "url" ? (
        <input
          class="input-field"
          id={id}
          name={name}
          type="url"
          v-model={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
        />
      ) : (
        <input
          class="input-field"
          id={id}
          name={name}
          type="text"
          v-model={value.value}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
        />
      )}
    </>
  );
}
