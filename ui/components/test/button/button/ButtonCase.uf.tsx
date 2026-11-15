// A harness parent: `mount` takes props but no slots, so this fills one button's slot.
import IButton from "../../../src/components/button/styled/IButton.uf.tsx";
import type { ButtonProps } from "../../../src/components/button/types.ts";

export default function ButtonCase({
  color,
  variant,
  size,
  block,
  loading,
  disabled,
  type,
}: Omit<ButtonProps, "label">) {
  return (
    <div>
      <IButton
        label="Save"
        color={color}
        variant={variant}
        size={size}
        block={block}
        loading={loading}
        disabled={disabled}
        type={type}
      />
      <IButton label="Overridden">Slotted</IButton>
    </div>
  );
}
