// A harness parent: it binds two radio fields to its own selection, as a group does, shows the
// selection, and emits `select` whenever a radio writes it. With `unvalued`, it adds a radio with no
// `value` and no binding, which starts unchecked.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IRadioFieldBase from "../../../src/components/radio/headless/IRadioFieldBase.uf.tsx";

export default function RadioFieldCase({
  initial = "apple",
  disabled = false,
  unvalued = false,
}: {
  initial?: string;
  disabled?: boolean;
  unvalued?: boolean;
}) {
  const emit = defineEmits<{ select: [value: string | undefined] }>();
  const selected = ref<string | undefined>(initial);
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
      {unvalued && (
        <label>
          <IRadioFieldBase name="other" />
          Other
        </label>
      )}
      <output>{selected.value}</output>
    </div>
  );
}
