import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * One primary action, with the others in less emphatic variants.
 *
 * @category Components/Actions/Button
 */
export default function ButtonHierarchy() {
  return (
    <div>
      <IButton variant="ghost" label="Cancel" />
      <IButton variant="outline" label="Schedule…" />
      <IButton color="primary" label="Publish post" />
    </div>
  );
}
