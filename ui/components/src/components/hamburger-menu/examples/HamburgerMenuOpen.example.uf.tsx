import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

export default function HamburgerMenuOpen() {
  const open = ref(true);
  return (
    <div>
      <IHamburgerMenu ariaLabel="Toggle menu" v-model:open={open.value} />
    </div>
  );
}
