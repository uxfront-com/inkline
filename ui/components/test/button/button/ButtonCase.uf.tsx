// A harness parent: `mount` takes props but no slots, so this fills one button's slot. With
// `attributes`, it renders buttons that take the declared id, accessible name and description, an
// icon-only one among them, and emits `click` with the button's id whenever one of them does.
import { defineEmits } from "@uxfront/unframework";

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
  attributes = false,
}: Omit<ButtonProps, "label" | "id" | "ariaLabel" | "ariaDescribedby"> & { attributes?: boolean }) {
  const emit = defineEmits<{ click: [button: string] }>();

  return (
    <>
      {attributes ? (
        <div>
          <IButton
            id="save"
            label="Save"
            color="primary"
            ariaDescribedby="save-hint"
            onClick={() => emit("click", "save")}
          />
          <IButton ariaLabel="Close" variant="ghost" onClick={() => emit("click", "close")}>
            <span aria-hidden="true">×</span>
          </IButton>
          <p id="save-hint">Saves the draft.</p>
        </div>
      ) : (
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
      )}
    </>
  );
}
