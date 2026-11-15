import { defineModel } from "@uxfront/unframework";
import { hamburgerMenuRecipe } from "virtual:styleframe";

import IHamburgerMenuBase from "../headless/IHamburgerMenuBase.uf.tsx";
import type { HamburgerMenuProps } from "../types.ts";

export default function IHamburgerMenu({
  ariaLabel,
  ariaControls,
  disabled,
  color,
  size,
  animation,
}: HamburgerMenuProps) {
  const open = defineModel<boolean>("open", { default: false });

  return (
    <IHamburgerMenuBase
      class={hamburgerMenuRecipe({ color, size, animation, active: open.value ? "true" : "false" })}
      v-model:open={open.value}
      ariaLabel={ariaLabel}
      ariaControls={ariaControls}
      disabled={disabled}
    />
  );
}
