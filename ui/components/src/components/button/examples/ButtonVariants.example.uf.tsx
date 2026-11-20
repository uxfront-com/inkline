import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/** @category Components/Actions/Button */
export default function ButtonVariants() {
  return (
    <div>
      <IButton color="primary" variant="solid" label="Solid" />
      <IButton color="primary" variant="outline" label="Outline" />
      <IButton color="primary" variant="soft" label="Soft" />
      <IButton color="primary" variant="subtle" label="Subtle" />
      <IButton color="primary" variant="ghost" label="Ghost" />
      <IButton color="primary" variant="link" label="Link" />
    </div>
  );
}
