import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

/** @category Components/Forms/Input */
export default function InputSizes() {
  return (
    <div>
      <IInput size="sm" placeholder="Small" />
      <IInput size="md" placeholder="Medium" />
      <IInput size="lg" placeholder="Large" />
    </div>
  );
}
