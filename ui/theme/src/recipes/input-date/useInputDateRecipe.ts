import { FIELD_MUTED_TEXT, createFieldRecipe } from "../input/createFieldRecipe";

/**
 * InputDate wrapper recipe. The `.input-date` class sits on a wrapper element
 * that contains an optional inline `#prefix`/`#suffix` slot (reusing the Input
 * prefix/suffix recipes for a leading calendar icon) and a nested
 * `<span class="input-date-field">` that lays out the editable date/time
 * segments (`.input-date-segment`) and separators (`.input-date-separator`).
 * The wrapper owns the visual field (border, background, padding, focus ring via
 * `:focus-within`); the inner segments are transparent and inherit typography.
 *
 * A member of the field recipes family — color (light, dark, neutral), variant
 * (default, soft, ghost), size, and the `invalid` / `disabled` / `readonly`
 * boolean axes — built from the shared field surface in
 * `../input/createFieldRecipe`; the wrapper sits inline (inline-flex, vertically
 * centered). Calendar/popover styling is out of scope (see the `calendar`
 * recipe). The setup callback turns the shared `.input-date-field` reset into a
 * horizontal flex row for the segments and registers the muted separator glyph.
 */
export const useInputDateRecipe = createFieldRecipe(
  "input-date",
  {
    base: {
      display: "inline-flex",
      alignItems: "center",
    },
    // Stable `.-light` and `.-dark` hooks, so the separator rules in the
    // setup callback can tell the fixed colors from `neutral`.
    compoundVariants: [
      { match: { color: "light" }, className: "-light" },
      { match: { color: "dark" }, className: "-dark" },
    ],
  },
  (s) => {
    const { selector } = s;

    // Lay the segments + separators out as a horizontal row inside the
    // shared transparent field container. "calc(@spacing * 0.125)" is an
    // embedded reference expression: Styleframe parses the "@spacing" ref and
    // keeps the surrounding calc arithmetic, so a raw selector can scale a
    // token inline without a pre-declared "0.125" multiplier variable.
    selector(".input-date-field", {
      display: "flex",
      alignItems: "center",
      gap: "calc(@spacing * 0.125)",
    });

    // Muted, non-selectable date/range separator glyph (e.g. "/" or "–").
    // On `neutral` it adapts with the theme. A raw selector doesn't resolve
    // modifier keys, so the dark theme is written as the selector the `dark`
    // modifier emits.
    selector(".input-date-separator", {
      color: "@color.text-weak",
      userSelect: "none",
      paddingLeft: "calc(@spacing * 0.125)",
      paddingRight: "calc(@spacing * 0.125)",
      ':is(.dark-theme, [data-theme="dark"]) &': {
        color: "@color.gray-400",
      },
    });

    // `light` and `dark` fields keep one color in both themes, so their
    // separator takes the field's muted text, which follows that fixed text.
    selector(".input-date.-light .input-date-separator", {
      color: FIELD_MUTED_TEXT,
    });
    selector(".input-date.-dark .input-date-separator", {
      color: FIELD_MUTED_TEXT,
    });
  },
);
