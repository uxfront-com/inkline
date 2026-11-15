// A harness parent: it binds the control's `checked` model to its own state, shows that state, and
// emits `change` whenever the model writes it, so a spec can tell a write from no write.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import ISwitchControlBase from "../../../src/components/switch/headless/ISwitchControlBase.uf.tsx";

export default function SwitchControlCase({
  initial = false,
  disabled = false,
  readonly = false,
}: {
  initial?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}) {
  const emit = defineEmits<{ change: [checked: boolean] }>();
  const checked = ref(initial);
  watch(
    () => checked.value,
    (value) => emit("change", value),
  );

  return (
    <div>
      <label>
        <ISwitchControlBase
          id="wifi"
          name="wifi"
          disabled={disabled}
          readonly={readonly}
          v-model:checked={checked.value}
        />
        Accept
      </label>
      <output>{checked.value ? "on" : "off"}</output>
    </div>
  );
}
