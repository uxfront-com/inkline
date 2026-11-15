import { defineModel } from "@uxfront/unframework";

import type { RadioFieldBaseProps } from "../types.ts";

// The native `<input type="radio">` control. A native radio gives `role="radio"`, arrow-key
// selection and single selection among the radios that share a `name`. Each radio of a group binds
// the same `selected` model, which holds the value of the radio that's checked, as a native radio
// group's `v-model` does.
//
// A radio ignores the HTML `readonly` attribute, so a read-only radio carries `data-readonly`, and its
// click handler cancels the click while the element carries it. A click, Space and the arrow keys all
// select through a click, so a cancelled one selects nothing. The handler reads only the element, so
// Qwik can run it synchronously. The read-only `radiogroup` around the radios announces the state,
// since `aria-readonly` isn't allowed on a radio. React fires its `change` from the click itself,
// before the click is cancelled, so the model a read-only radio binds must put back what it's
// written, as the styled `IRadioGroup` does.
export default function IRadioFieldBase({
  id,
  name,
  value = "",
  disabled = false,
  required = false,
  readonly = false,
}: RadioFieldBaseProps) {
  const selected = defineModel<string>("selected", { default: "" });

  return (
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      v-model={selected.value}
      disabled={disabled}
      required={required}
      data-readonly={readonly ? "true" : undefined}
      onClick={(event: MouseEvent) => {
        if ((event.currentTarget as HTMLElement).getAttribute("data-readonly") === "true") {
          event.preventDefault();
        }
      }}
    />
  );
}
