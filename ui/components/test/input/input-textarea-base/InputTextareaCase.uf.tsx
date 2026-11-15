// A harness parent: it binds the control's `value` model to its own state, shows that state, and
// emits `input` whenever the model writes it.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IInputTextareaBase from "../../../src/components/input/headless/IInputTextareaBase.uf.tsx";

export default function InputTextareaCase({
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
        <IInputTextareaBase
          id="name"
          name="name"
          placeholder="Your name"
          disabled={disabled}
          readonly={readonly}
          v-model:value={value.value}
        />
      </label>
      <output>{value.value}</output>
    </div>
  );
}
