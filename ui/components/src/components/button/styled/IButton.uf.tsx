import { defineEmits, defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { buttonRecipe } from "virtual:styleframe";

import IButtonBase from "../headless/IButtonBase.uf.tsx";
import type { ButtonProps } from "../types.ts";

export default function IButton({
  label,
  type,
  disabled,
  loading,
  color,
  variant,
  size,
  block = false,
  id,
  ariaLabel,
  ariaDescribedby,
}: ButtonProps) {
  const emit = defineEmits<{ click: [] }>();
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <IButtonBase
      class={[buttonRecipe({ color, variant, size }), { "button--block": block }]}
      type={type}
      disabled={disabled}
      loading={loading}
      id={id}
      ariaLabel={ariaLabel}
      ariaDescribedby={ariaDescribedby}
      onClick={() => emit("click")}
    >
      {slots.default?.() ?? label}
    </IButtonBase>
  );
}
