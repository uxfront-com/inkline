import { defineModel } from "@uxfront/unframework";

import type { HamburgerMenuBaseProps } from "../types.ts";

export default function IHamburgerMenuBase({
  ariaLabel = "Toggle menu",
  ariaControls,
  disabled = false,
}: HamburgerMenuBaseProps) {
  // The disclosure state, a model, so a parent can bind it.
  const open = defineModel<boolean>("open", { default: false });

  return (
    <button
      type="button"
      aria-expanded={open.value ? "true" : "false"}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => (open.value = !open.value)}
    >
      <span class="hamburger-menu-inner" aria-hidden="true" />
    </button>
  );
}
