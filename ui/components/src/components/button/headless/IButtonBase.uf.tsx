import { defineEmits, defineSlots, onMounted, onUnmounted, ref, watch } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { ButtonBaseProps } from "../types.ts";

// The native `<button>`, or with an `href` a link (`<a href>`) for navigation, with its parts in a
// fixed order: leading, label, trailing, spinner.
//
// A loading button, and a disabled one that stays focusable, can't be activated, but keep their
// focus, so they're `aria-disabled` rather than natively disabled. `aria-disabled` stops nothing on
// its own, so the click handler cancels the click, which also cancels a form submission. That needs
// client code, so both states render natively disabled until the component mounts: on the server,
// and on Astro, which runs no client code, the button stays inert. The handler reads only the
// element, so Qwik can run it synchronously, before the browser submits the form.
//
// A link that's disabled or loading drops its `href`, so it can't navigate even before it mounts,
// and stays `role="link"` with `aria-disabled`, since an `<a>` without `href` has no role. It keeps
// its focus with `tabindex="0"` while loading or focusable when disabled, and otherwise leaves the
// tab order, as a disabled button does. A link takes no `type`, `disabled` or `aria-pressed`.
//
// When loading starts, the button announces its `loadingLabel` in a polite live region outside it,
// since a region inside the button would change its name. Screen readers announce only changes to
// a region that's already in the page, and loading usually starts from a click, so the button
// prepares the region when it gets focus or a pointer press, in a task before the click. A button
// that starts loading with neither prepares it then, and that first message may go unannounced.
export default function IButtonBase({
  label,
  type = "button",
  href,
  disabled = false,
  focusableWhenDisabled = false,
  loading = false,
  loadingLabel = "Loading",
  iconOnly = false,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaPressed,
  ariaExpanded,
  ariaHaspopup,
  ariaControls,
  variant,
  color,
  size,
}: ButtonBaseProps) {
  // `click` fires on the native button's or link's click, unless it's disabled or loading.
  // Unframework passes no listener through to a component's root, so the component declares the
  // one a button exists for.
  const emit = defineEmits<{ click: [] }>();
  const slots = defineSlots<{
    default?(): Element;
    leading?(): Element;
    trailing?(): Element;
    spinner?(): Element;
  }>();
  const mounted = ref(false);
  // Whether this button counts in the shared live region's `data-inkline-announcer`.
  const counted = ref(false);

  // The page's one polite live region, shared by every button. Each button that uses it counts
  // itself in, and the last one to unmount removes it.
  function announcer(): HTMLElement {
    let region = document.querySelector<HTMLElement>("[data-inkline-announcer]");
    if (!region) {
      region = document.createElement("div");
      region.setAttribute("role", "status");
      region.setAttribute("data-inkline-announcer", "0");
      // Visually hidden, but not with display: none, which would take it out of the accessibility
      // tree.
      region.style.cssText =
        "position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap";
      document.body.append(region);
    }
    if (!counted.value) {
      counted.value = true;
      const count = Number(region.getAttribute("data-inkline-announcer")) + 1;
      region.setAttribute("data-inkline-announcer", String(count));
    }
    return region;
  }

  onMounted(() => {
    mounted.value = true;
  });

  onUnmounted(() => {
    const region = document.querySelector<HTMLElement>("[data-inkline-announcer]");
    if (!counted.value || !region) return;
    const count = Number(region.getAttribute("data-inkline-announcer")) - 1;
    if (count > 0) region.setAttribute("data-inkline-announcer", String(count));
    else region.remove();
  });

  watch(
    () => loading,
    (value) => {
      if (!value) return;
      // A new node each time, so the same message is announced again.
      const message = document.createElement("div");
      message.textContent = loadingLabel;
      announcer().replaceChildren(message);
    },
    { flush: "post" },
  );

  return (
    <component
      is={href ? "a" : "button"}
      type={href ? undefined : type}
      href={href && !disabled && !loading ? href : undefined}
      role={href && (disabled || loading) ? "link" : undefined}
      tabindex={href && (loading || (disabled && focusableWhenDisabled)) ? 0 : undefined}
      id={id}
      disabled={
        (disabled && !focusableWhenDisabled) ||
        (!mounted.value && (loading || (disabled && focusableWhenDisabled)))
      }
      aria-disabled={loading || (disabled && (focusableWhenDisabled || href)) ? "true" : undefined}
      aria-pressed={href ? undefined : ariaPressed}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-icon-only={iconOnly ? "" : undefined}
      data-loading={loading ? "" : undefined}
      onFocus={() => announcer()}
      onPointerdown={() => announcer()}
      onClick={(event: MouseEvent) => {
        if ((event.currentTarget as HTMLElement).getAttribute("aria-disabled") === "true")
          event.preventDefault();
        if ((event.currentTarget as HTMLElement).getAttribute("aria-disabled") !== "true")
          emit("click");
      }}
    >
      {slots.leading ? (
        <span data-slot="leading" aria-hidden="true">
          {slots.leading?.()}
        </span>
      ) : null}
      <span data-slot="label">{slots.default?.() ?? label}</span>
      {slots.trailing && !iconOnly ? (
        <span data-slot="trailing" aria-hidden="true">
          {slots.trailing?.()}
        </span>
      ) : null}
      {loading
        ? (slots.spinner?.() ?? (
            <span data-slot="spinner" aria-hidden="true">
              <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" />
              </svg>
            </span>
          ))
        : null}
    </component>
  );
}
