import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// The canonical single checkbox, live via `v-model:checked`, click it and it flips and stays flipped.
/** @category Components/Forms/Checkbox */
export default function CheckboxDefault() {
  const checked = ref(false);
  return (
    <div>
      <ICheckbox label="Accept terms" name="terms" v-model:checked={checked.value} />
    </div>
  );
}
