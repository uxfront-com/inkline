import { defineModel, ref, watch } from "@uxfront/unframework";

import type { SwitchControlBaseProps } from "../types.ts";

// The native toggle: an `<input type="checkbox">` styled as a sliding switch through
// `.switch-field`. `role="switch"` and `aria-checked` announce it as a switch. The browser toggles it
// on Space, and the keydown handler clicks it on Enter, to complete the APG switch's keyboard map.
//
// Read-only: a click handler cancels the click while the element carries `aria-readonly`. A pointer
// click, Space and Enter all toggle through a click, so one guard covers them, and a cancelled
// click fires no `change`. Focus and form submission still work, unlike `disabled`. The handler
// reads only the element, so Qwik can run it synchronously. React fires its `change` from the click
// itself, though, before the click is cancelled, so the box binds a local `state`, which writes the
// model only while the control isn't read-only, and goes back to the model's value otherwise.
export default function ISwitchControlBase({
  id,
  name,
  disabled = false,
  readonly = false,
}: SwitchControlBaseProps) {
  const checked = defineModel<boolean>("checked", { default: false });
  const state = ref(checked.value);

  watch(
    () => checked.value,
    (value) => {
      state.value = value;
    },
  );
  watch(
    () => state.value,
    (value) => {
      if (readonly) state.value = checked.value;
      else checked.value = value;
    },
  );

  return (
    <input
      type="checkbox"
      role="switch"
      id={id}
      name={name}
      v-model={state.value}
      aria-checked={state.value ? "true" : "false"}
      aria-readonly={readonly ? "true" : undefined}
      disabled={disabled}
      onClick={(event: MouseEvent) => {
        if ((event.currentTarget as HTMLElement).getAttribute("aria-readonly") === "true") {
          event.preventDefault();
        }
      }}
      onKeydown={(event: KeyboardEvent) => {
        if (event.key === "Enter") (event.currentTarget as HTMLInputElement).click();
      }}
    />
  );
}
