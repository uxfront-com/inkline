import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// Two-way binding: toggling the switch updates `on`, reflected live below.
export default function SwitchTwoWay() {
  const on = ref(false);
  return (
    <div>
      <ISwitch label="Airplane mode" name="airplane" v-model:checked={on.value} />
      <p>Airplane mode is {on.value ? "on" : "off"}.</p>
    </div>
  );
}
