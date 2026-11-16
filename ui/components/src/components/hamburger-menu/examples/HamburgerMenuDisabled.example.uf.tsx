import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

export default function HamburgerMenuDisabled() {
  const open = ref(false);
  return (
    <div>
      <IHamburgerMenu ariaLabel="Toggle menu" disabled={true} v-model:open={open.value} />
    </div>
  );
}
