import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

/** @category Components/Forms/Input */
export default function InputVariants() {
  return (
    <div>
      <IInput variant="default" placeholder="Default" />
      <IInput variant="soft" placeholder="Soft" />
      <IInput variant="ghost" placeholder="Ghost" />
    </div>
  );
}
