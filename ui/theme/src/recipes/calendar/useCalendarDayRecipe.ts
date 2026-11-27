import { createUseRecipe } from "@styleframe/theme";

const variants = ["solid", "outline", "soft", "subtle"] as const;

/**
 * The active-selection fill applied to the selected day and to range endpoints,
 * per variant (Nuxt UI-style): solid fills with the primary color, outline draws
 * an inset ring (box-shadow, so the borderless cell never shifts), soft uses a
 * tinted surface, and subtle is soft plus a ring. The range middle band and the
 * today/outside treatments are variant-independent.
 */
const selectionFill = {
  solid: {
    background: "@color.primary",
    color: "@color.white",
    "&:hover": { background: "@color.primary" },
    "&:dark:hover": { background: "@color.primary" },
  },
  outline: {
    background: "transparent",
    color: "@color.primary",
    boxShadow: "inset 0 0 0 1px var(--color--primary)",
    "&:hover": { background: "transparent" },
    "&:dark:hover": { background: "transparent" },
  },
  soft: {
    background: "@color.primary-200",
    color: "@color.primary-800",
    "&:hover": { background: "@color.primary-200" },
    "&:dark": {
      background: "@color.primary-700",
      color: "@color.primary-100",
    },
    "&:dark:hover": { background: "@color.primary-700" },
  },
  subtle: {
    background: "@color.primary-200",
    color: "@color.primary-800",
    boxShadow: "inset 0 0 0 1px var(--color--primary-300)",
    "&:hover": { background: "@color.primary-200" },
    "&:dark": {
      background: "@color.primary-700",
      color: "@color.primary-100",
      boxShadow: "inset 0 0 0 1px var(--color--primary-600)",
    },
    "&:dark:hover": { background: "@color.primary-700" },
  },
} as const;

/**
 * Text color that keeps the selected day legible when it is also today or an
 * outside-month day (both set their own muted/accent text color).
 */
const selectionText = {
  solid: { color: "@color.white" },
  outline: { color: "@color.primary" },
  soft: {
    color: "@color.primary-800",
    "&:dark": { color: "@color.primary-100" },
  },
  subtle: {
    color: "@color.primary-800",
    "&:dark": { color: "@color.primary-100" },
  },
} as const;

/**
 * Calendar day-cell recipe — the interactive `<button>` rendered for each day.
 *
 * Sizing is inherited, not owned: the cell reads `--calendar-cell-size` and
 * `--calendar-cell-font-size` (set per size by {@link useCalendarRecipe} on the
 * `.calendar` root) so a single `calendar({ size })` drives every cell. The fallbacks
 * keep a standalone cell usable. `aspect-ratio: 1 / 1` plus `min-width`/`min-height`
 * keep the cell square while letting it grow to fit content (e.g. a price label on a
 * booked date); override `--calendar-cell-size` for a fully custom size.
 *
 * State axes mirror react-day-picker modifiers and are independent booleans, except
 * `range` (none | start | middle | end) which is positional. `booked` is intentionally
 * distinct from `disabled`: a reserved/unavailable day is struck through and muted but
 * not dimmed away. The `variant` axis (solid | outline | soft | subtle) restyles the
 * active selection — the selected day and range endpoints — via compound variants.
 * The `type` axis (day | month | year) reuses the same cell for month/year picker
 * views, where cells render as column-filling pills instead of squares.
 */
export const useCalendarDayRecipe = createUseRecipe("calendar-day", {
  base: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "@0.125",
    aspectRatio: "1 / 1",
    minWidth: "var(--calendar-cell-size, calc(var(--spacing) * 2.25))",
    minHeight: "var(--calendar-cell-size, calc(var(--spacing) * 2.25))",
    padding: "@0.25",
    fontSize: "var(--calendar-cell-font-size, 0.875rem)",
    fontWeight: "@font-weight.normal",
    lineHeight: "1",
    color: "@color.text",
    background: "transparent",
    borderStyle: "none",
    borderRadius: "@border-radius.md",
    cursor: "pointer",
    userSelect: "none",
    outline: "none",
    transitionProperty: "color, background-color",
    transitionTimingFunction: "@easing.ease-in-out",
    transitionDuration: "150ms",
    "&:hover": { background: "@color.gray-100" },
    "&:dark:hover": { background: "@color.gray-800" },
    "&:focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.primary",
      outlineOffset: "2px",
    },
  },
  variants: {
    // What period the cell represents. Month/year picker cells are pills:
    // they keep the cascaded cell height but stretch to their grid column
    // instead of staying square.
    type: {
      day: {},
      month: {
        aspectRatio: "auto",
        minWidth: "auto",
        paddingLeft: "@0.5",
        paddingRight: "@0.5",
      },
      year: {
        aspectRatio: "auto",
        minWidth: "auto",
        paddingLeft: "@0.5",
        paddingRight: "@0.5",
      },
    },
    variant: {
      solid: {},
      outline: {},
      soft: {},
      subtle: {},
    },
    selected: {
      true: {
        fontWeight: "@font-weight.medium",
      },
      false: {},
    },
    today: {
      true: {
        color: "@color.primary",
        fontWeight: "@font-weight.semibold",
      },
      false: {},
    },
    outside: {
      true: {
        color: "@color.text-weakest",
      },
      false: {},
    },
    disabled: {
      true: {
        color: "@color.text-weakest",
        cursor: "not-allowed",
        pointerEvents: "none",
        opacity: "0.5",
        "&:hover": { background: "transparent" },
      },
      false: {},
    },
    booked: {
      true: {
        color: "@color.text-weak",
        textDecoration: "line-through",
        cursor: "not-allowed",
        background: "@color.gray-50",
        "&:hover": { background: "@color.gray-50" },
        "&:dark": { background: "@color.gray-800" },
        "&:dark:hover": { background: "@color.gray-800" },
      },
      false: {},
    },
    range: {
      none: {},
      start: {
        borderRadiusRight: "0",
      },
      middle: {
        background: "@color.primary-100",
        color: "@color.primary-700",
        borderRadius: "0",
        "&:hover": { background: "@color.primary-100" },
        "&:dark": {
          background: "@color.primary-800",
          color: "@color.primary-200",
        },
        "&:dark:hover": { background: "@color.primary-800" },
      },
      end: {
        borderRadiusLeft: "0",
      },
    },
  },
  compoundVariants: variants.flatMap((variant) => [
    // The active-selection fill: the selected day and both range endpoints.
    {
      match: { variant, selected: "true" as const },
      css: selectionFill[variant],
    },
    {
      match: { variant, range: "start" as const },
      css: selectionFill[variant],
    },
    { match: { variant, range: "end" as const }, css: selectionFill[variant] },
    // Keep the selected text legible over the today and outside-month colors.
    {
      match: { variant, selected: "true" as const, today: "true" as const },
      css: selectionText[variant],
    },
    {
      match: { variant, selected: "true" as const, outside: "true" as const },
      css: selectionText[variant],
    },
  ]),
  defaultVariants: {
    type: "day",
    variant: "solid",
    selected: "false",
    today: "false",
    outside: "false",
    disabled: "false",
    booked: "false",
    range: "none",
  },
});
