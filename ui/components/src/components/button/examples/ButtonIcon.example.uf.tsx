import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/** @category Components/Actions/Button */
export default function ButtonIcon() {
  return (
    <div>
      <IButton>
        <span aria-hidden="true">★</span> Starred
      </IButton>
      <IButton color="primary">
        <span aria-hidden="true">→</span> Continue
      </IButton>
    </div>
  );
}
