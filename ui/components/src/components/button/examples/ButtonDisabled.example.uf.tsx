import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/** @category Components/Actions/Button */
export default function ButtonDisabled() {
  return (
    <div>
      <IButton label="Button" disabled={true} />
    </div>
  );
}
