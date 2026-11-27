import { defineEmits, defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { buttonRecipe, spinnerCircleRecipe, spinnerRecipe } from "virtual:styleframe";

import IButtonBase from "../headless/IButtonBase.uf.tsx";
import type { ButtonProps } from "../types.ts";

/**
 * The styled Button: the headless button with the theme's button recipe, and Styleframe's spinner
 * while it's loading. `leading` and `trailing` take icons, which are decorative. The data
 * attributes show the variant, colour and size in effect, the recipe's defaults included.
 */
export default function IButton({
  label,
  type,
  href,
  disabled,
  focusableWhenDisabled,
  loading,
  loadingLabel,
  iconOnly,
  color = "neutral",
  variant = "solid",
  size = "md",
  block = false,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaPressed,
  ariaExpanded,
  ariaHaspopup,
  ariaControls,
}: ButtonProps) {
  const emit = defineEmits<{ click: [] }>();
  const slots = defineSlots<{ default?(): Element; leading?(): Element; trailing?(): Element }>();

  return (
    <IButtonBase
      class={[buttonRecipe({ color, variant, size }), { "button--block": block }]}
      type={type}
      href={href}
      disabled={disabled}
      focusableWhenDisabled={focusableWhenDisabled}
      loading={loading}
      loadingLabel={loadingLabel}
      iconOnly={iconOnly}
      id={id}
      ariaLabel={ariaLabel}
      ariaDescribedby={ariaDescribedby}
      ariaPressed={ariaPressed}
      ariaExpanded={ariaExpanded}
      ariaHaspopup={ariaHaspopup}
      ariaControls={ariaControls}
      variant={variant}
      color={color}
      size={size}
      onClick={() => emit("click")}
    >
      {{
        default: () => <>{slots.default?.() ?? label}</>,
        leading: slots.leading,
        trailing: slots.trailing,
        spinner: () => (
          <span data-slot="spinner" aria-hidden="true" class={spinnerRecipe({ size: "inherit" })}>
            <svg class={spinnerCircleRecipe({ size: "inherit" })} viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" />
            </svg>
          </span>
        ),
      }}
    </IButtonBase>
  );
}
