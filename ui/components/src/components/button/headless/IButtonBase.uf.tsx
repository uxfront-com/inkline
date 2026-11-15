import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { ButtonBaseProps } from "../types.ts";

export default function IButtonBase({
  label,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonBaseProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading ? "true" : "false"}>
      {loading ? <span class="button-spinner" aria-hidden="true" /> : null}
      {slots.default?.() ?? label}
    </button>
  );
}
