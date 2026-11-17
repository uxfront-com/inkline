import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

/** @category Components/Navigation/HamburgerMenu */
export default function HamburgerMenuSizes() {
  return (
    <div>
      <IHamburgerMenu size="sm" ariaLabel="Small menu" />
      <IHamburgerMenu size="md" ariaLabel="Medium menu" />
      <IHamburgerMenu size="lg" ariaLabel="Large menu" />
    </div>
  );
}
