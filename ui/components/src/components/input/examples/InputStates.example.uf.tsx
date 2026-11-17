import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

/** @category Components/Forms/Input */
export default function InputStates() {
  const readOnly = ref("Read only");
  return (
    <div>
      <IInput invalid={true} placeholder="Invalid" />
      <IInput disabled={true} placeholder="Disabled" />
      <IInput readonly={true} v-model:value={readOnly.value} />
    </div>
  );
}
