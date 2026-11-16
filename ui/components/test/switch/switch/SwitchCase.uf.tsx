// A harness parent: it binds the control's `checked` model to its own state, shows that state, and
// emits `change` whenever the model writes it, so a spec can tell a write from no write. With `attributes`, it renders an unlabelled control
// named and described by the declared props.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import ISwitch from "../../../src/components/switch/styled/ISwitch.uf.tsx";

export default function SwitchCase({
  initial = false,
  disabled = false,
  readonly = false,
  attributes = false,
}: {
  initial?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  attributes?: boolean;
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
          <ISwitch ariaLabel="Wi-Fi" ariaDescribedby="wifi-hint" v-model:checked={checked.value} />
          <p id="wifi-hint">Joins known networks.</p>
        </div>
      ) : (
        <div>
          <ISwitch
            label="Accept"
            name="wifi"
            color="dark"
            size="lg"
            disabled={disabled}
            readonly={readonly}
            v-model:checked={checked.value}
          />
          <ISwitch label="Overridden">From the slot</ISwitch>
          <output>{checked.value ? "on" : "off"}</output>
        </div>
      )}
    </>
  );
}
