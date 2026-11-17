import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// `readonly` freezes the value while keeping the box focusable and announcing `aria-readonly`, unlike
// disabled. The ref backs `checked` so the seeded state renders; clicks can't change it, by design.
export default function CheckboxReadOnly() {
  const checked = ref(true);
  const unchecked = ref(false);
  return (
    <div>
      <ICheckbox readonly={true} label="Read-only checked" v-model:checked={checked.value} />
      <ICheckbox readonly={true} label="Read-only unchecked" v-model:checked={unchecked.value} />
    </div>
  );
}
