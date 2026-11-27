import { createUseRecipe } from "@styleframe/theme";

/**
 * Calendar root recipe — the surface that wraps the header, day grid, optional
 * presets sidebar and footer. A calendar styles *parts and states*; the date logic
 * (selection, ranges, navigation, time) is the consumer's (e.g. react-day-picker or
 * `@internationalized/date`).
 *
 * `size` is the single source of truth for density: each value sets the
 * `--calendar-cell-size` and `--calendar-cell-font-size` custom properties on the root,
 * which cascade to {@link useCalendarDayRecipe} cells, week numbers and weekday labels.
 * Override `--calendar-cell-size` directly for a fully custom cell size. Because custom
 * properties and grid layout aren't expressible as utility declarations, the per-size
 * variables and all structural parts are emitted as raw selectors in `setup`, bridged to
 * the `size` axis via the `-size-*` marker classes (the same pattern as the textarea
 * `resize` axis).
 *
 * Structural parts (referenced by class name; see the docs anatomy table):
 * `.calendar-months`, `.calendar-body`, `.calendar-caption`, `.calendar-caption-label`,
 * `.calendar-caption-dropdowns`, `.calendar-nav`, `.calendar-grid` (+ `.-week-numbers`),
 * `.calendar-weekdays`, `.calendar-weekday`, `.calendar-week`, `.calendar-week-number`,
 * `.calendar-day-spacer`, `.calendar-presets`, `.calendar-footer`. Nav/preset buttons
 * reuse the `button` recipe,
 * time fields the `input` recipe, and month/year selects the `select` recipe.
 */
export const useCalendarRecipe = createUseRecipe(
  "calendar",
  {
    base: {
      display: "inline-flex",
      flexDirection: "column",
      gap: "@0.5",
      padding: "@0.75",
      background: "@color.white",
      color: "@color.text",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "@color.gray-200",
      borderRadius: "@border-radius.lg",
      fontSize: "@font-size.sm",
      lineHeight: "@line-height.normal",
      "&:dark": {
        background: "@color.gray-900",
        borderColor: "@color.gray-800",
      },
    },
    variants: {
      size: {
        sm: { gap: "@0.25", padding: "@0.625" },
        md: { gap: "@0.5", padding: "@0.75" },
        lg: { gap: "@0.625", padding: "@0.875" },
      },
    },
    // Bridge each size to a stable marker class so `setup` can attach the per-size
    // `--calendar-cell-size` / `--calendar-cell-font-size` custom properties.
    compoundVariants: [
      { match: { size: "sm" }, className: "-size-sm" },
      { match: { size: "md" }, className: "-size-md" },
      { match: { size: "lg" }, className: "-size-lg" },
    ],
    defaultVariants: {
      size: "md",
    },
  },
  (s) => {
    const { selector, ref, css } = s;

    // Per-size cell dimensions + typography, cascaded via custom properties.
    const sizes = [
      ["sm", 2, "font-size.sm"],
      ["md", 2.25, "font-size.sm"],
      ["lg", 2.5, "font-size.md"],
    ] as const;
    // `:where()` keeps these at zero specificity so a consumer can override
    // `--calendar-cell-size` with any single class on the calendar element.
    for (const [key, multiplier, font] of sizes) {
      selector(`:where(.calendar.-size-${key})`, {
        "--calendar-cell-size": css`calc(${ref("spacing")} * ${multiplier})`,
        "--calendar-cell-font-size": ref(font),
      });
    }

    const cellSize = "var(--calendar-cell-size, calc(var(--spacing) * 2.25))";

    // Dual-month wrapper and the presets-beside-calendar body layout.
    selector(".calendar-months", {
      display: "flex",
      flexWrap: "wrap",
      gap: css`calc(${ref("spacing")} * 1)`,
    });
    selector(".calendar-body", {
      display: "flex",
      alignItems: "flex-start",
      gap: css`calc(${ref("spacing")} * 1)`,
    });
    // A single month column (caption + grid + footer); repeats inside
    // `.calendar-months` for multi-month layouts.
    selector(".calendar-month", {
      display: "flex",
      flexDirection: "column",
      gap: css`calc(${ref("spacing")} * 0.5)`,
    });

    // Header: navigation + month/year label or dropdown selects.
    selector(".calendar-caption", {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: css`calc(${ref("spacing")} * 0.5)`,
    });
    selector(".calendar-caption-label", {
      fontWeight: "600",
      fontSize: "var(--calendar-cell-font-size, 0.875rem)",
    });
    selector(".calendar-caption-dropdowns", {
      display: "flex",
      gap: css`calc(${ref("spacing")} * 0.25)`,
    });
    // Baseline styling for native month/year selects dropped into the slot;
    // replace with the Select recipe for full theming.
    selector(".calendar-caption-dropdowns select", {
      fontFamily: "inherit",
      fontSize: "var(--calendar-cell-font-size, 0.875rem)",
      fontWeight: "500",
      color: ref("color.text"),
      background: "transparent",
      border: css`1px solid ${ref("color.gray-300")}`,
      borderRadius: ref("border-radius.md"),
      padding: css`calc(${ref("spacing")} * 0.25) calc(${ref("spacing")} * 0.375)`,
    });
    selector(".calendar-nav", {
      display: "flex",
      alignItems: "center",
      gap: css`calc(${ref("spacing")} * 0.25)`,
    });

    // Day grid: 7 equal, square-floored columns (8 with a leading week-number
    // column). Rows are spaced apart so stacked range bands don't merge; cells
    // stay flush horizontally to keep the range band continuous.
    selector(".calendar-grid", {
      display: "grid",
      gridTemplateColumns: `repeat(7, minmax(${cellSize}, 1fr))`,
      rowGap: css`calc(${ref("spacing")} * 0.125)`,
    });
    selector(".calendar-grid.-week-numbers", {
      gridTemplateColumns: `auto repeat(7, minmax(${cellSize}, 1fr))`,
    });
    // Month / year picker views: 4 equal columns of period pills, floored to
    // the day grid's width (7 cells) so switching views keeps the same footprint.
    selector(".calendar-grid.-months", {
      gridTemplateColumns: "repeat(4, 1fr)",
      columnGap: css`calc(${ref("spacing")} * 0.25)`,
      minWidth: `calc(${cellSize} * 7)`,
    });
    selector(".calendar-grid.-years", {
      gridTemplateColumns: "repeat(4, 1fr)",
      columnGap: css`calc(${ref("spacing")} * 0.25)`,
      minWidth: `calc(${cellSize} * 7)`,
    });

    // Weekday header row and labels.
    selector(".calendar-weekdays", { display: "contents" });
    selector(".calendar-weekday", {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: cellSize,
      fontSize: "var(--calendar-cell-font-size, 0.875rem)",
      fontWeight: "500",
      color: ref("color.text-weak"),
    });

    // Week rows and the optional leading week-number cell.
    selector(".calendar-week", { display: "contents" });
    // Invisible stand-in for a hidden outside-month day — keeps the grid
    // aligned when side-by-side months show exactly one month each.
    selector(".calendar-day-spacer", {
      minWidth: cellSize,
      minHeight: cellSize,
    });
    selector(".calendar-week-number", {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: cellSize,
      minHeight: cellSize,
      fontSize: "0.75rem",
      color: ref("color.text-weakest"),
    });

    // Presets sidebar (buttons reuse the button recipe).
    selector(".calendar-presets", {
      display: "flex",
      flexDirection: "column",
      gap: css`calc(${ref("spacing")} * 0.25)`,
      minWidth: css`calc(${ref("spacing")} * 8)`,
      paddingRight: css`calc(${ref("spacing")} * 0.75)`,
      borderRight: css`1px solid ${ref("color.gray-200")}`,
    });

    // Footer (time-picker fields reuse the input recipe).
    selector(".calendar-footer", {
      display: "flex",
      alignItems: "center",
      gap: css`calc(${ref("spacing")} * 0.5)`,
      paddingTop: css`calc(${ref("spacing")} * 0.5)`,
      borderTop: css`1px solid ${ref("color.gray-200")}`,
    });
  },
);
