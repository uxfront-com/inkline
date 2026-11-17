// A harness parent: it binds the control's `checked` model to its own state, shows that state, and
// emits `change` whenever that state changes, so a spec can tell a write from no write. With
// `attributes`, it renders an unlabelled control named and described by the declared props. With
// `parent`, it renders a "Select all" button, the parent's own change of the state.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import ISwitchControlBase from "../../../src/components/switch/headless/ISwitchControlBase.uf.tsx";

export default function SwitchControlCase({
  initial = false,
  disabled = false,
  readonly = false,
  attributes = false,
  parent = false,
}: {
  initial?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  attributes?: boolean;
  parent?: boolean;
}) {
  const emit = defineEmits<{ change: [checked: boolean] }>();
  const checked = ref(initial);
  watch(
    () => checked.value,
    (value) => emit("change", value),
  );

  return (
    <>
      {attributes ? (
        <div>
          <ISwitchControlBase
            ariaLabel="Wi-Fi"
            ariaDescribedby="wifi-hint"
            v-model:checked={checked.value}
          />
          <p id="wifi-hint">Joins known networks.</p>
        </div>
      ) : (
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
          {parent && (
            <button type="button" onClick={() => (checked.value = !checked.value)}>
              Select all
            </button>
          )}
        </div>
      )}
    </>
  );
}
