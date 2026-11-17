// A harness parent: it binds the control's `checked` model to its own state, shows that state, and
// emits `change` whenever that state changes, so a spec can tell a write from no write. With
// `attributes`, it renders an unlabelled control named and described by the declared props. With
// `parent`, it renders a "Select all" button, the parent's own change of the state.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import ICheckbox from "../../../src/components/checkbox/styled/ICheckbox.uf.tsx";

export default function CheckboxCase({
  initial = false,
  disabled = false,
  readonly = false,
  required = false,
  indeterminate = false,
  attributes = false,
  parent = false,
}: {
  initial?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  indeterminate?: boolean;
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
          <ICheckbox
            ariaLabel="Accept the terms"
            ariaDescribedby="terms-hint"
            v-model:checked={checked.value}
          />
          <p id="terms-hint">You can withdraw at any time.</p>
        </div>
      ) : (
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
