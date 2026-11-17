import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

export default function ButtonLoading() {
  return (
    <div>
      <IButton label="Button" loading={true} />
    </div>
  );
}
