import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// `readonly` freezes the selection ("banana") while keeping the controls focusable, unlike disabled.
// The ref backs `value` so the default selection renders; clicks can't change it, by design.
export default function RadioReadonly() {
  const value = ref("banana");
  return (
    <div>
      <IRadioGroup
        readonly={true}
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
