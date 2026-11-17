import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/** @category Components/Actions/Button */
export default function ButtonLoading() {
  return (
    <div>
      <IButton label="Button" loading={true} />
    </div>
  );
}
