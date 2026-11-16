import { defineEmits, defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { ButtonBaseProps } from "../types.ts";

export default function IButtonBase({
  label,
  type = "button",
  disabled = false,
  loading = false,
  id,
  ariaLabel,
  ariaDescribedby,
}: ButtonBaseProps) {
  // \`click\` fires on the native button's click. Unframework passes no listener through to a
  // component's root, so the component declares the one a button exists for.
  const emit = defineEmits<{ click: [] }>();
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <button
      type={type}
      id={id}
      disabled={disabled || loading}
      aria-busy={loading ? "true" : "false"}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      onClick={() => emit("click")}
    >
      {loading ? <span class="button-spinner" aria-hidden="true" /> : null}
      {slots.default?.() ?? label}
    </button>
  );
}
