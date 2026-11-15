// A harness parent: it binds the control's `value` model to its own state, shows that state, and
// emits `input` whenever the model writes it.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IInput from "../../../src/components/input/styled/IInput.uf.tsx";

export default function InputCase({
  initial = "",
  disabled = false,
  readonly = false,
}: {
  initial?: string;
  disabled?: boolean;
  readonly?: boolean;
}) {
  const emit = defineEmits<{ input: [value: string] }>();
  const value = ref(initial);
  watch(
    () => value.value,
    (current) => emit("input", current),
  );

  return (
    <div>
      <label>
        Name
        <IInput
          id="name"
          name="name"
          color="dark"
          size="lg"
          invalid={false}
          disabled={disabled}
          readonly={readonly}
          v-model:value={value.value}
        >
          {{
            prefix: () => <>@</>,
            suffix: () => <>.dev</>,
          }}
        </IInput>
      </label>
      <IInput type="textarea" placeholder="Bio" />
      <output>{value.value}</output>
    </div>
  );
}
