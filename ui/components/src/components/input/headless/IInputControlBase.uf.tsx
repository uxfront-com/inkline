import { defineEmits, defineModel } from "@uxfront/unframework";

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
  required = false,
  autocomplete,
  ariaLabel,
  ariaDescribedby,
}: InputControlBaseProps) {
  // `focus` and `blur` fire as the native control gains and loses focus. Unframework passes no
  // listener through to a component's root, so the component declares them.
  const emit = defineEmits<{ focus: []; blur: [] }>();
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
          required={required}
          autocomplete={autocomplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
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
          required={required}
          autocomplete={autocomplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
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
          required={required}
          autocomplete={autocomplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
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
          required={required}
          autocomplete={autocomplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
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
          required={required}
          autocomplete={autocomplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
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
          required={required}
          autocomplete={autocomplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onFocus={() => emit("focus")}
          onBlur={() => emit("blur")}
        />
      )}
    </>
  );
}
