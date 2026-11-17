import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

export default function ButtonDisabled() {
  return (
    <div>
      <IButton label="Button" disabled={true} />
    </div>
  );
}
