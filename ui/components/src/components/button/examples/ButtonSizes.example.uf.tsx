import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/** @category Components/Actions/Button */
export default function ButtonSizes() {
  return (
    <div>
      <IButton size="xs">Extra Small</IButton>
      <IButton size="sm">Small</IButton>
      <IButton size="md">Medium</IButton>
      <IButton size="lg">Large</IButton>
      <IButton size="xl">Extra Large</IButton>
    </div>
  );
}
