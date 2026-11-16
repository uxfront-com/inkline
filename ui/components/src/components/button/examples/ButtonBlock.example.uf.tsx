import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

export default function ButtonBlock() {
  return (
    <div>
      <IButton label="Button" block={true} />
    </div>
  );
}
