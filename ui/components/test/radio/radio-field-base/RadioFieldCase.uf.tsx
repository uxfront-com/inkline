// A harness parent: it binds two radio fields to its own selection, as a group does, shows the
// selection, and emits `select` whenever a radio writes it.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IRadioFieldBase from "../../../src/components/radio/headless/IRadioFieldBase.uf.tsx";

export default function RadioFieldCase({
  initial = "apple",
  disabled = false,
}: {
  initial?: string;
  disabled?: boolean;
}) {
  const emit = defineEmits<{ select: [value: string] }>();
  const selected = ref(initial);
  watch(
    () => selected.value,
    (value) => emit("select", value),
  );

  return (
    <div>
      <label>
        <IRadioFieldBase
          name="fruit"
          value="apple"
          required={true}
          disabled={disabled}
          v-model:selected={selected.value}
        />
        Apple
      </label>
      <label>
        <IRadioFieldBase
          name="fruit"
          value="pear"
          disabled={disabled}
          v-model:selected={selected.value}
        />
        Pear
      </label>
      <output>{selected.value}</output>
    </div>
  );
}
