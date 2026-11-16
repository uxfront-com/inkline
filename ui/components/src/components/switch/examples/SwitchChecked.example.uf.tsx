import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// Both switches are live: each owns a ref via `v-model:checked`, so the initial off/on state is
// only the seed, click either and it flips and stays flipped.
export default function SwitchChecked() {
  const off = ref(false);
  const on = ref(true);
  return (
    <div>
      <ISwitch label="Off" v-model:checked={off.value} />
      <ISwitch label="On" v-model:checked={on.value} />
    </div>
  );
}
