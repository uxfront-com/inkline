import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// Disabled demonstrates the non-interactive state: the box keeps its bound value but a disabled
// checkbox takes no input, so it does not toggle, that is the point of this example.
export default function CheckboxDisabled() {
  const checked = ref(false);
  return (
    <div>
      <ICheckbox label="Accept terms" disabled={true} v-model:checked={checked.value} />
    </div>
  );
}
