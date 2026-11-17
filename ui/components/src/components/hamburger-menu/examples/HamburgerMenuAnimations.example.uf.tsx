import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

// Each toggle starts open, so its morph target, the `animation` axis, shows.
export default function HamburgerMenuAnimations() {
  const close = ref(true);
  const arrowUp = ref(true);
  const arrowDown = ref(true);
  const arrowLeft = ref(true);
  const arrowRight = ref(true);
  const minus = ref(true);
  const plus = ref(true);
  return (
    <div>
      <IHamburgerMenu animation="close" ariaLabel="Close morph" v-model:open={close.value} />
      <IHamburgerMenu
        animation="arrow-up"
        ariaLabel="Arrow-up morph"
        v-model:open={arrowUp.value}
      />
      <IHamburgerMenu
        animation="arrow-down"
        ariaLabel="Arrow-down morph"
        v-model:open={arrowDown.value}
      />
      <IHamburgerMenu
        animation="arrow-left"
        ariaLabel="Arrow-left morph"
        v-model:open={arrowLeft.value}
      />
      <IHamburgerMenu
        animation="arrow-right"
        ariaLabel="Arrow-right morph"
        v-model:open={arrowRight.value}
      />
      <IHamburgerMenu animation="minus" ariaLabel="Minus morph" v-model:open={minus.value} />
      <IHamburgerMenu animation="plus" ariaLabel="Plus morph" v-model:open={plus.value} />
    </div>
  );
}
