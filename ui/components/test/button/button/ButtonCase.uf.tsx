// A harness parent: `mount` takes props but no slots, so this fills the buttons' slots. Each
// `scenario` renders a different set:
//
// - `default`: a labelled button that takes the state props, and a slotted one.
// - `attributes`: buttons that take the declared id, accessible name and description.
// - `icons`: an icon-only button, and one with a leading and a trailing icon.
// - `toggles`: a toggle button, and a menu button with the list it controls.
// - `form`: a submit button in a form with one text field. The form emits `submit` and cancels it.
// - `inert`: two submit buttons that can't be activated, one loading and one focusable disabled.
//
// It emits `click` with the button's id whenever one of them does.
import { defineEmits } from "@uxfront/unframework";

import IButton from "../../../src/components/button/styled/IButton.uf.tsx";
import type { ButtonProps } from "../../../src/components/button/types.ts";

export default function ButtonCase({
  color,
  variant,
  size,
  block,
  loading,
  loadingLabel,
  disabled,
  focusableWhenDisabled,
  type,
  ariaPressed,
  ariaExpanded,
  scenario = "default",
}: Omit<
  ButtonProps,
  "label" | "id" | "ariaLabel" | "ariaDescribedby" | "ariaHaspopup" | "ariaControls" | "iconOnly"
> & {
  scenario?: "default" | "attributes" | "icons" | "toggles" | "form" | "inert";
}) {
  const emit = defineEmits<{ click: [button: string]; submit: [] }>();

  return (
    <>
      {scenario === "attributes" ? (
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
      ) : scenario === "icons" ? (
        <div>
          <IButton
            label="Settings"
            variant="outline"
            iconOnly={true}
            onClick={() => emit("click", "settings")}
          >
            {{
              leading: () => (
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <circle cx="8" cy="8" r="3" />
                </svg>
              ),
              trailing: () => (
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              ),
            }}
          </IButton>
          <IButton
            label="Continue"
            color="primary"
            loading={loading}
            loadingLabel={loadingLabel}
            onClick={() => emit("click", "continue")}
          >
            {{
              leading: () => (
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path d="M8 3v10M3 8h10" />
                </svg>
              ),
              trailing: () => (
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              ),
            }}
          </IButton>
        </div>
      ) : scenario === "toggles" ? (
        <div>
          <IButton
            label="Mute"
            variant="ghost"
            ariaPressed={ariaPressed}
            onClick={() => emit("click", "mute")}
          />
          <IButton
            label="Options"
            variant="outline"
            ariaHaspopup="menu"
            ariaExpanded={ariaExpanded}
            ariaControls="options-menu"
            onClick={() => emit("click", "options")}
          />
          <ul id="options-menu" aria-label="Options">
            <li>Rename</li>
          </ul>
        </div>
      ) : scenario === "form" ? (
        <form
          aria-label="Post"
          onSubmit={(event: SubmitEvent) => {
            event.preventDefault();
            emit("submit");
          }}
        >
          <input type="text" name="title" aria-label="Title" />
          <IButton
            type="submit"
            label="Publish"
            color="primary"
            loading={loading}
            disabled={disabled}
            focusableWhenDisabled={focusableWhenDisabled}
            onClick={() => emit("click", "publish")}
          />
        </form>
      ) : scenario === "inert" ? (
        <form aria-label="Post">
          <IButton type="submit" label="Publish" color="primary" loading={true} />
          <IButton
            type="submit"
            label="Delete"
            color="error"
            disabled={true}
            focusableWhenDisabled={true}
          />
        </form>
      ) : (
        <div>
          <IButton
            label="Save"
            color={color}
            variant={variant}
            size={size}
            block={block}
            loading={loading}
            loadingLabel={loadingLabel}
            disabled={disabled}
            focusableWhenDisabled={focusableWhenDisabled}
            type={type}
            ariaPressed={ariaPressed}
            ariaExpanded={ariaExpanded}
            onClick={() => emit("click", "save")}
          />
          <IButton label="Overridden" onClick={() => emit("click", "slotted")}>
            Slotted
          </IButton>
        </div>
      )}
    </>
  );
}
