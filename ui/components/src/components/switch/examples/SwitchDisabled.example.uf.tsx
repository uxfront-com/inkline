import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// Disabled demonstrates the non-interactive state: the control keeps its bound value but a disabled
// switch takes no input, so it does not toggle, that is the point of this example.
/** @category Components/Forms/Switch */
export default function SwitchDisabled() {
  const checked = ref(false);
  return (
    <div>
      <ISwitch label="Airplane mode" disabled={true} v-model:checked={checked.value} />
    </div>
  );
}
