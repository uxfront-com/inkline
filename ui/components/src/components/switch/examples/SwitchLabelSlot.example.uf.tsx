import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// Parity: the `label` prop and the default slot resolve to the same accessible name; the slot wins
// when both are present. Both switches are live via `v-model:checked` so the accessible name is
// demonstrated on a real, toggleable control.
/** @category Components/Forms/Switch */
export default function SwitchLabelSlot() {
  const viaProp = ref(false);
  const viaSlot = ref(false);
  return (
    <div>
      <ISwitch label="Label via prop" v-model:checked={viaProp.value} />
      <ISwitch v-model:checked={viaSlot.value}>Label via slot</ISwitch>
    </div>
  );
}
