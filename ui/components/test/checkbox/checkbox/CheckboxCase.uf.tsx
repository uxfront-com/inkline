// A harness parent: it binds the control's `checked` model to its own state, shows that state, and
// emits `change` whenever the model writes it, so a spec can tell a write from no write.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import ICheckbox from "../../../src/components/checkbox/styled/ICheckbox.uf.tsx";

export default function CheckboxCase({
  initial = false,
  disabled = false,
  readonly = false,
  required = false,
  indeterminate = false,
}: {
  initial?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  indeterminate?: boolean;
}) {
  const emit = defineEmits<{ change: [checked: boolean] }>();
  const checked = ref(initial);
  watch(
    () => checked.value,
    (value) => emit("change", value),
  );

  return (
    <div>
      <ICheckbox
        label="Accept"
        name="terms"
        color="dark"
        size="lg"
        disabled={disabled}
        readonly={readonly}
        required={required}
        indeterminate={indeterminate}
        v-model:checked={checked.value}
      />
      <ICheckbox label="Overridden">From the slot</ICheckbox>
      <output>{checked.value ? "on" : "off"}</output>
    </div>
  );
}
