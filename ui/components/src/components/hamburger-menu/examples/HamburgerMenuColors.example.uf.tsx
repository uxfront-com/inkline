import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

/** @category Components/Navigation/HamburgerMenu */
export default function HamburgerMenuColors() {
  return (
    <div>
      <IHamburgerMenu color="light" ariaLabel="Light menu" />
      <IHamburgerMenu color="dark" ariaLabel="Dark menu" />
      <IHamburgerMenu color="neutral" ariaLabel="Neutral menu" />
    </div>
  );
}
