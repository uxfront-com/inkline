import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// A horizontally-laid-out group with a ref for `value`, two-way bound via `v-model:value`,
// defaulting to "apple" so one option is selected on load and clicks move the selection.
export default function RadioHorizontal() {
  const value = ref<string | undefined>("apple");
  return (
    <div>
      <IRadioGroup
        orientation="horizontal"
        name="fruit"
        v-model:value={value.value}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
}
