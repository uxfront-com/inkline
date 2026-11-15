// A harness parent: it binds the group's `value` model to its own state, shows that state, and emits
// `change` whenever the model writes it.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IRadioGroup from "../../../src/components/radio/styled/IRadioGroup.uf.tsx";

export default function RadioGroupCase({
  initial = "apple",
  readonly = false,
  disabled = false,
}: {
  initial?: string;
  readonly?: boolean;
  disabled?: boolean;
}) {
  const emit = defineEmits<{ change: [value: string] }>();
  const value = ref(initial);
  watch(
    () => value.value,
    (current) => emit("change", current),
  );

  return (
    <div>
      <IRadioGroup
        id="fruit"
        label="Fruit"
        name="fruit"
        color="dark"
        size="lg"
        orientation="horizontal"
        readonly={readonly}
        disabled={disabled}
        options={[
          { value: "apple", label: "Apple" },
          { value: "pear", label: "Pear" },
          { value: "plum", label: "Plum", disabled: true },
          { value: "fig" },
        ]}
        v-model:value={value.value}
      />
      <output>{value.value}</output>
    </div>
  );
}
