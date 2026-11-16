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
// since `aria-readonly` isn't allowed on a radio.
//
// The browser checks a radio before it dispatches the click, and React reads that as a change, and
// writes the model, even when the click is cancelled. So a read-only radio unchecks itself in the
// click's capture phase, before React reads it, and the browser checks the previous radio again when
// the click is cancelled. The radio that holds the selection carries `data-selected` and keeps its
// state: Qwik may run the capture listener after the click, once the browser has checked it again.
export default function IRadioFieldBase({
  id,
  name,
  value = "",
  disabled = false,
  required = false,
  readonly = false,
}: RadioFieldBaseProps) {
  const selected = defineModel<string>("selected");

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
      data-selected={readonly && selected.value === value ? "true" : undefined}
      onClickCapture={(event: MouseEvent) => {
        const control = event.currentTarget as HTMLInputElement;
        if (
          control.getAttribute("data-readonly") === "true" &&
          control.getAttribute("data-selected") !== "true"
        ) {
          control.checked = false;
        }
      }}
      onClick={(event: MouseEvent) => {
        if ((event.currentTarget as HTMLElement).getAttribute("data-readonly") === "true") {
          event.preventDefault();
        }
      }}
    />
  );
}
