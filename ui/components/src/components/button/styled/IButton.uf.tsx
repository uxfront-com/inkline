import { defineSlots } from "@uxfront/unframework";
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
}: ButtonProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <IButtonBase
      class={[buttonRecipe({ color, variant, size }), { "button--block": block }]}
      type={type}
      disabled={disabled}
      loading={loading}
    >
      {slots.default?.() ?? label}
    </IButtonBase>
  );
}
