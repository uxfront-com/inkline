import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// The canonical single switch, live via `v-model:checked`, click it and it flips and stays flipped.
export default function SwitchDefault() {
  const checked = ref(false);
  return (
    <div>
      <ISwitch label="Airplane mode" name="airplane" v-model:checked={checked.value} />
    </div>
  );
}
