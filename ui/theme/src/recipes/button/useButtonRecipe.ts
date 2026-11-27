import type {
  ModifierDeclarationsBlock,
  TokenValue,
  VariantDeclarationsBlock,
} from "@styleframe/core";
import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

type Color = (typeof colors)[number];

/**
 * Warning is a light colour, so a white label on it, or warning text on the
 * page, would fall below 4.5:1. It takes a dark label and darker levels.
 */
const solidLabel = (color: Color) => (color === "warning" ? "@color.warning-900" : "@color.white");
const solidHover = (color: Color) =>
  color === "warning" ? "@color.warning-tint-50" : `@color.${color}-shade-50`;
const solidActive = (color: Color) =>
  color === "warning" ? "@color.warning-tint-100" : `@color.${color}-shade-100`;
const pageText = (color: Color) => (color === "warning" ? "@color.warning-700" : `@color.${color}`);
const linkHoverText = (color: Color) =>
  color === "warning" ? "@color.warning-750" : `@color.${color}-shade-50`;
// Borders keep 3:1 against the page: level 450 does in both themes.
const solidBorder = (color: Color) =>
  color === "warning" ? "@color.warning-450" : `@color.${color}-shade-50`;
const outlineBorder = (color: Color) =>
  color === "warning" ? "@color.warning-450" : `@color.${color}`;

/**
 * The block padding of each size, in spacing steps. An icon-only button takes
 * it as its inline padding too, so its width matches its height.
 */
const blockPadding = {
  xs: 0.25,
  sm: 0.375,
  md: 0.5,
  lg: 0.625,
  xl: 0.75,
} as const;

/**
 * The size of a leading or trailing icon at each size, in spacing steps, as
 * in the Open Components reference. Each one fits in the line, so an icon
 * doesn't make a labelled button taller.
 */
const iconSize = {
  xs: 0.875,
  sm: 1,
  md: 1,
  lg: 1.25,
  xl: 1.25,
} as const;

type Size = keyof typeof blockPadding;
const sizes = Object.keys(blockPadding) as Array<Size>;

type Compound = {
  match: Record<string, string>;
  css: VariantDeclarationsBlock;
};
type Slot = ModifierDeclarationsBlock;

/**
 * Finishes the color × variant compounds in two ways. Each hover block repeats
 * the label color, so an `<a href>` button keeps it over the global `a:hover`
 * color. Then a trailing compound per pair puts the resting colors back while
 * the button is disabled, so it shows no hover, active or pressed look. Those
 * come last, so their rules follow every state rule in the stylesheet.
 */
function withStateColors<T extends Compound>(compounds: Array<T>): Array<T> {
  const resets: Array<Compound> = [];
  const finished = compounds.map((compound) => {
    const { match, css } = compound;
    if (!match.color || !match.variant) {
      return compound;
    }

    const dark = (css["&:dark"] ?? {}) as Slot;
    const rest = {
      background: (css.background ?? "transparent") as TokenValue,
      color: css.color as TokenValue,
    };
    const darkRest = {
      background: dark.background ?? rest.background,
      color: dark.color ?? rest.color,
    };
    resets.push({
      match,
      css: {
        "&:disabled": rest,
        "&:aria-disabled": rest,
        "&:dark:disabled": darkRest,
        "&:dark:aria-disabled": darkRest,
        // The `active` modifier also emits `&:focus:active`, which a focused
        // `aria-disabled` button matches, so these outrank it.
        "&:aria-disabled:active": rest,
        "&:dark:aria-disabled:active": darkRest,
      },
    });

    const next: VariantDeclarationsBlock = {
      ...css,
      "&:hover-capable:hover": {
        color: rest.color,
        ...(css["&:hover-capable:hover"] as Slot),
      },
    };
    if ("color" in dark) {
      next["&:dark:hover-capable:hover"] = {
        color: darkRest.color,
        ...(css["&:dark:hover-capable:hover"] as Slot),
      };
    }
    return { ...compound, css: next };
  });
  return [...finished, ...(resets as Array<T>)];
}

/**
 * Full button recipe with color, variant, and size variants.
 * Inspired by Nuxt UI Button with solid, outline, soft, subtle, ghost, and link variants.
 *
 * States are styled from the attributes that expose them (`:disabled`,
 * `aria-disabled`, `aria-pressed`, `aria-expanded`, `data-loading`), hover
 * styles apply only on devices that can hover, and focus shows a `color.focus` ring. The `light`
 * color is made for dark surfaces and the `dark` color for light surfaces, in
 * either theme.
 *
 * Icons and icon-only buttons are styled from the markup: a `data-size`
 * attribute on the button, `data-icon-only` on a button that shows only its
 * icon, and `data-slot="leading"`, `"label"` and `"trailing"` on its children.
 * Each size sets `--button--icon--size` for the icons. An icon-only button is
 * square, and its label stays as the accessible name, hidden from view.
 *
 * Selectors a recipe key can't express (the icon slots, the icon-only button,
 * the loading overlay, and the forced colors states that must outrank the
 * dark theme) are declared in `setup`.
 * Disabled buttons keep their pointer events, so their cursor shows and
 * clicks don't fall through to what's underneath.
 */
export const useButtonRecipe = createUseRecipe(
  "button",
  {
    base: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "@font-weight.medium",
      fontSize: "@font-size.sm",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      lineHeight: "@line-height.normal",
      textAlign: "center",
      paddingTop: "@0.5",
      paddingBottom: "@0.5",
      paddingInline: "@0.75",
      minHeight: "@2.25",
      minWidth: "@2.25",
      cursor: "pointer",
      transitionProperty: "color, background-color, border-color",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      textDecoration: "none",
      userSelect: "none",
      outline: "none",
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.focus",
        outlineOffset: "2px",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "0.75",
      },
      "&:aria-disabled": {
        cursor: "not-allowed",
        opacity: "0.75",
      },
      "&:data-loading": {
        cursor: "progress",
      },
      // An `<a href>` button keeps its look over the global `a:hover` styles.
      "&:hover-capable:hover": {
        textDecorationLine: "none",
      },
      "&:forced-colors:focus-visible": {
        outlineColor: "Highlight",
      },
      // On touch screens, every size gets a hit area of at least 44 × 44px.
      "&:any-pointer-coarse:before": {
        position: "absolute",
        inset: "min(0px, calc((100% - 2.75rem) / 2))",
      },
    },
    variants: {
      color: {
        primary: {},
        secondary: {},
        success: {},
        info: {},
        warning: {},
        error: {},
        light: {},
        dark: {},
        neutral: {},
      },
      variant: {
        solid: {},
        outline: {},
        soft: {},
        subtle: {},
        ghost: {
          background: "transparent",
        },
        link: {
          background: "transparent",
          borderColor: "transparent",
          borderWidth: "0",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          "&:hover-capable:hover": {
            textDecorationLine: "underline",
            textDecorationThickness: "2px",
          },
          "&:disabled": {
            textDecorationThickness: "auto",
          },
          "&:aria-disabled": {
            textDecorationThickness: "auto",
          },
          // Forced colors mode draws the border, so the link keeps a boundary.
          "&:forced-colors": {
            borderWidth: "@border-width.thin",
          },
        },
      },
      size: {
        xs: {
          fontSize: "@font-size.xs",
          paddingTop: `@${blockPadding.xs}`,
          paddingBottom: `@${blockPadding.xs}`,
          paddingInline: "@0.5",
          minHeight: "@1.5",
          minWidth: "@1.5",
          gap: "@0.25",
          borderRadius: "@border-radius.md",
        },
        sm: {
          fontSize: "@font-size.sm",
          paddingTop: `@${blockPadding.sm}`,
          paddingBottom: `@${blockPadding.sm}`,
          paddingInline: "@0.625",
          minHeight: "@2",
          minWidth: "@2",
          gap: "@0.375",
          borderRadius: "@border-radius.md",
        },
        md: {
          fontSize: "@font-size.sm",
          paddingTop: `@${blockPadding.md}`,
          paddingBottom: `@${blockPadding.md}`,
          paddingInline: "@0.75",
          minHeight: "@2.25",
          minWidth: "@2.25",
          gap: "@0.375",
          borderRadius: "@border-radius.md",
        },
        lg: {
          fontSize: "@font-size.md",
          paddingTop: `@${blockPadding.lg}`,
          paddingBottom: `@${blockPadding.lg}`,
          paddingInline: "@0.875",
          minHeight: "@2.5",
          minWidth: "@2.5",
          gap: "@0.5",
          borderRadius: "@border-radius.md",
        },
        xl: {
          fontSize: "@font-size.lg",
          paddingTop: `@${blockPadding.xl}`,
          paddingBottom: `@${blockPadding.xl}`,
          paddingInline: "@1",
          minHeight: "@3",
          minWidth: "@3",
          gap: "@0.5",
          borderRadius: "@border-radius.lg",
        },
      },
    },
    compoundVariants: withStateColors([
      // Solid variants
      ...colors.map((color) => ({
        match: { color, variant: "solid" as const },
        css: {
          background: `@color.${color}`,
          color: solidLabel(color),
          borderColor: solidBorder(color),
          "&:hover-capable:hover": {
            background: solidHover(color),
          },
          "&:active": {
            background: solidActive(color),
          },
          "&:aria-pressed": {
            background: solidActive(color),
          },
          "&:aria-expanded": {
            background: solidActive(color),
          },
          "&:dark": {
            borderColor: `@color.${color}-tint-50`,
          },
        },
      })),
      // Outline variants
      ...colors.map((color) => ({
        match: { color, variant: "outline" as const },
        css: {
          color: pageText(color),
          borderColor: outlineBorder(color),
          "&:hover-capable:hover": {
            color: `@color.${color}-700`,
            background: `@color.${color}-150`,
          },
          "&:active": {
            color: `@color.${color}-700`,
            background: `@color.${color}-200`,
          },
          "&:aria-pressed": {
            color: `@color.${color}-700`,
            background: `@color.${color}-200`,
          },
          "&:aria-expanded": {
            color: `@color.${color}-700`,
            background: `@color.${color}-200`,
          },
          "&:dark": {
            color: `@color.${color}-400`,
          },
          "&:dark:hover-capable:hover": {
            color: `@color.${color}-300`,
            background: `@color.${color}-800`,
          },
          "&:dark:active": {
            color: `@color.${color}-300`,
            background: `@color.${color}-750`,
          },
          "&:dark:aria-pressed": {
            color: `@color.${color}-300`,
            background: `@color.${color}-750`,
          },
          "&:dark:aria-expanded": {
            color: `@color.${color}-300`,
            background: `@color.${color}-750`,
          },
        },
      })),
      // Soft variants
      ...colors.map((color) => ({
        match: { color, variant: "soft" as const },
        css: {
          background: `@color.${color}-100`,
          color: `@color.${color}-700`,
          "&:hover-capable:hover": {
            background: `@color.${color}-150`,
          },
          "&:active": {
            background: `@color.${color}-200`,
          },
          "&:aria-pressed": {
            background: `@color.${color}-200`,
          },
          "&:aria-expanded": {
            background: `@color.${color}-200`,
          },
          "&:dark": {
            background: `@color.${color}-800`,
            color: `@color.${color}-400`,
          },
          "&:dark:hover-capable:hover": {
            background: `@color.${color}-750`,
            color: `@color.${color}-300`,
          },
          "&:dark:active": {
            background: `@color.${color}-700`,
            color: `@color.${color}-300`,
          },
          "&:dark:aria-pressed": {
            background: `@color.${color}-700`,
            color: `@color.${color}-300`,
          },
          "&:dark:aria-expanded": {
            background: `@color.${color}-700`,
            color: `@color.${color}-300`,
          },
        },
      })),
      // Subtle variants
      ...colors.map((color) => ({
        match: { color, variant: "subtle" as const },
        css: {
          background: `@color.${color}-100`,
          color: `@color.${color}-700`,
          borderColor: `@color.${color}-450`,
          "&:hover-capable:hover": {
            background: `@color.${color}-150`,
          },
          "&:active": {
            background: `@color.${color}-200`,
          },
          "&:aria-pressed": {
            background: `@color.${color}-200`,
          },
          "&:aria-expanded": {
            background: `@color.${color}-200`,
          },
          "&:dark": {
            background: `@color.${color}-800`,
            color: `@color.${color}-400`,
            borderColor: `@color.${color}-450`,
          },
          "&:dark:hover-capable:hover": {
            background: `@color.${color}-750`,
            color: `@color.${color}-300`,
          },
          "&:dark:active": {
            background: `@color.${color}-700`,
            color: `@color.${color}-300`,
          },
          "&:dark:aria-pressed": {
            background: `@color.${color}-700`,
            color: `@color.${color}-300`,
          },
          "&:dark:aria-expanded": {
            background: `@color.${color}-700`,
            color: `@color.${color}-300`,
          },
        },
      })),
      // Ghost variants
      ...colors.map((color) => ({
        match: { color, variant: "ghost" as const },
        css: {
          color: pageText(color),
          "&:hover-capable:hover": {
            color: `@color.${color}-700`,
            background: `@color.${color}-100`,
          },
          "&:active": {
            color: `@color.${color}-700`,
            background: `@color.${color}-200`,
          },
          "&:aria-pressed": {
            color: `@color.${color}-700`,
            background: `@color.${color}-200`,
          },
          "&:aria-expanded": {
            color: `@color.${color}-700`,
            background: `@color.${color}-200`,
          },
          "&:dark": {
            color: `@color.${color}-400`,
          },
          "&:dark:hover-capable:hover": {
            color: `@color.${color}-300`,
            background: `@color.${color}-750`,
          },
          "&:dark:active": {
            color: `@color.${color}-300`,
            background: `@color.${color}-700`,
          },
          "&:dark:aria-pressed": {
            color: `@color.${color}-300`,
            background: `@color.${color}-700`,
          },
          "&:dark:aria-expanded": {
            color: `@color.${color}-300`,
            background: `@color.${color}-700`,
          },
        },
      })),
      // Link variants
      ...colors.map((color) => ({
        match: { color, variant: "link" as const },
        css: {
          color: pageText(color),
          "&:hover-capable:hover": {
            color: linkHoverText(color),
          },
          "&:active": {
            color: linkHoverText(color),
          },
          "&:aria-pressed": {
            color: linkHoverText(color),
          },
          "&:aria-expanded": {
            color: linkHoverText(color),
          },
          "&:dark": {
            color: `@color.${color}-400`,
          },
          "&:dark:hover-capable:hover": {
            color: `@color.${color}-300`,
          },
          "&:dark:active": {
            color: `@color.${color}-300`,
          },
          "&:dark:aria-pressed": {
            color: `@color.${color}-300`,
          },
          "&:dark:aria-expanded": {
            color: `@color.${color}-300`,
          },
        },
      })),

      // Light color (neutral light-mode values, fixed across themes, for dark surfaces)
      {
        match: { color: "light" as const, variant: "solid" as const },
        css: {
          background: "@color.white",
          color: "@color.text",
          borderColor: "@color.gray-200",
          "&:hover-capable:hover": {
            background: "@color.gray-100",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            background: "@color.white",
            color: "@color.text-inverted",
            borderColor: "@color.gray-200",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-100",
          },
          "&:dark:active": {
            background: "@color.gray-200",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-200",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "outline" as const },
        css: {
          color: "@color.text-inverted",
          borderColor: "@color.gray-300",
          "&:hover-capable:hover": {
            background: "@color.gray-100",
            color: "@color.text",
          },
          "&:active": {
            background: "@color.gray-200",
            color: "@color.text",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
            color: "@color.text",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
            color: "@color.text",
          },
          "&:dark": {
            color: "@color.text",
            borderColor: "@color.gray-300",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.text-inverted",
          },
          "&:dark:active": {
            color: "@color.text-inverted",
          },
          "&:dark:aria-pressed": {
            color: "@color.text-inverted",
          },
          "&:dark:aria-expanded": {
            color: "@color.text-inverted",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          "&:hover-capable:hover": {
            background: "@color.gray-150",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            background: "@color.gray-100",
            color: "@color.gray-700",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-150",
          },
          "&:dark:active": {
            background: "@color.gray-200",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-200",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-300",
          "&:hover-capable:hover": {
            background: "@color.gray-150",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            background: "@color.gray-100",
            color: "@color.gray-700",
            borderColor: "@color.gray-300",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-150",
          },
          "&:dark:active": {
            background: "@color.gray-200",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-200",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "ghost" as const },
        css: {
          color: "@color.text-inverted",
          "&:hover-capable:hover": {
            background: "@color.gray-100",
            color: "@color.text",
          },
          "&:active": {
            background: "@color.gray-200",
            color: "@color.text",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
            color: "@color.text",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
            color: "@color.text",
          },
          "&:dark": {
            color: "@color.text",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.text-inverted",
          },
          "&:dark:active": {
            color: "@color.text-inverted",
          },
          "&:dark:aria-pressed": {
            color: "@color.text-inverted",
          },
          "&:dark:aria-expanded": {
            color: "@color.text-inverted",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "link" as const },
        css: {
          color: "@color.text-inverted",
          "&:hover-capable:hover": {
            color: "@color.white",
          },
          "&:active": {
            color: "@color.white",
          },
          "&:aria-pressed": {
            color: "@color.white",
          },
          "&:aria-expanded": {
            color: "@color.white",
          },
          "&:dark": {
            color: "@color.text",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.white",
          },
          "&:dark:active": {
            color: "@color.white",
          },
          "&:dark:aria-pressed": {
            color: "@color.white",
          },
          "&:dark:aria-expanded": {
            color: "@color.white",
          },
        },
      },

      // Dark color (neutral dark-mode values, fixed across themes, for light surfaces)
      {
        match: { color: "dark" as const, variant: "solid" as const },
        css: {
          background: "@color.gray-900",
          color: "@color.white",
          borderColor: "@color.gray-800",
          "&:hover-capable:hover": {
            background: "@color.gray-800",
          },
          "&:active": {
            background: "@color.gray-750",
          },
          "&:aria-pressed": {
            background: "@color.gray-750",
          },
          "&:aria-expanded": {
            background: "@color.gray-750",
          },
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
            borderColor: "@color.gray-800",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-800",
          },
          "&:dark:active": {
            background: "@color.gray-750",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-750",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-750",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "outline" as const },
        css: {
          color: "@color.text",
          borderColor: "@color.gray-600",
          "&:hover-capable:hover": {
            background: "@color.gray-800",
            color: "@color.text-inverted",
          },
          "&:active": {
            background: "@color.gray-750",
            color: "@color.text-inverted",
          },
          "&:aria-pressed": {
            background: "@color.gray-750",
            color: "@color.text-inverted",
          },
          "&:aria-expanded": {
            background: "@color.gray-750",
            color: "@color.text-inverted",
          },
          "&:dark": {
            color: "@color.text-inverted",
            borderColor: "@color.gray-600",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.text",
          },
          "&:dark:active": {
            color: "@color.text",
          },
          "&:dark:aria-pressed": {
            color: "@color.text",
          },
          "&:dark:aria-expanded": {
            color: "@color.text",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-800",
          color: "@color.gray-300",
          "&:hover-capable:hover": {
            background: "@color.gray-750",
          },
          "&:active": {
            background: "@color.gray-700",
          },
          "&:aria-pressed": {
            background: "@color.gray-700",
          },
          "&:aria-expanded": {
            background: "@color.gray-700",
          },
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-750",
          },
          "&:dark:active": {
            background: "@color.gray-700",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-700",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-800",
          color: "@color.gray-300",
          borderColor: "@color.gray-600",
          "&:hover-capable:hover": {
            background: "@color.gray-750",
          },
          "&:active": {
            background: "@color.gray-700",
          },
          "&:aria-pressed": {
            background: "@color.gray-700",
          },
          "&:aria-expanded": {
            background: "@color.gray-700",
          },
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-600",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-750",
          },
          "&:dark:active": {
            background: "@color.gray-700",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-700",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "ghost" as const },
        css: {
          color: "@color.text",
          "&:hover-capable:hover": {
            background: "@color.gray-800",
            color: "@color.text-inverted",
          },
          "&:active": {
            background: "@color.gray-750",
            color: "@color.text-inverted",
          },
          "&:aria-pressed": {
            background: "@color.gray-750",
            color: "@color.text-inverted",
          },
          "&:aria-expanded": {
            background: "@color.gray-750",
            color: "@color.text-inverted",
          },
          "&:dark": {
            color: "@color.text-inverted",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.text",
          },
          "&:dark:active": {
            color: "@color.text",
          },
          "&:dark:aria-pressed": {
            color: "@color.text",
          },
          "&:dark:aria-expanded": {
            color: "@color.text",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "link" as const },
        css: {
          color: "@color.text",
          "&:hover-capable:hover": {
            color: "@color.gray-900",
          },
          "&:active": {
            color: "@color.gray-900",
          },
          "&:aria-pressed": {
            color: "@color.gray-900",
          },
          "&:aria-expanded": {
            color: "@color.gray-900",
          },
          "&:dark": {
            color: "@color.text-inverted",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.gray-900",
          },
          "&:dark:active": {
            color: "@color.gray-900",
          },
          "&:dark:aria-pressed": {
            color: "@color.gray-900",
          },
          "&:dark:aria-expanded": {
            color: "@color.gray-900",
          },
        },
      },

      // Neutral color (light in light mode, dark in dark mode)
      {
        match: { color: "neutral" as const, variant: "solid" as const },
        css: {
          background: "@color.white",
          color: "@color.text",
          borderColor: "@color.gray-450",
          "&:hover-capable:hover": {
            background: "@color.gray-100",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
            borderColor: "@color.gray-450",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-800",
          },
          "&:dark:active": {
            background: "@color.gray-750",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-750",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-750",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "outline" as const },
        css: {
          color: "@color.text",
          borderColor: "@color.gray-450",
          "&:hover-capable:hover": {
            background: "@color.gray-100",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            color: "@color.gray-200",
            borderColor: "@color.gray-450",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-800",
          },
          "&:dark:active": {
            background: "@color.gray-750",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-750",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-750",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          "&:hover-capable:hover": {
            background: "@color.gray-150",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-750",
          },
          "&:dark:active": {
            background: "@color.gray-700",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-700",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-450",
          "&:hover-capable:hover": {
            background: "@color.gray-150",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-450",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-750",
          },
          "&:dark:active": {
            background: "@color.gray-700",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-700",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "ghost" as const },
        css: {
          color: "@color.text",
          "&:hover-capable:hover": {
            background: "@color.gray-100",
          },
          "&:active": {
            background: "@color.gray-200",
          },
          "&:aria-pressed": {
            background: "@color.gray-200",
          },
          "&:aria-expanded": {
            background: "@color.gray-200",
          },
          "&:dark": {
            color: "@color.gray-200",
          },
          "&:dark:hover-capable:hover": {
            background: "@color.gray-800",
          },
          "&:dark:active": {
            background: "@color.gray-750",
          },
          "&:dark:aria-pressed": {
            background: "@color.gray-750",
          },
          "&:dark:aria-expanded": {
            background: "@color.gray-750",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "link" as const },
        css: {
          color: "@color.text",
          "&:hover-capable:hover": {
            color: "@color.gray-900",
          },
          "&:active": {
            color: "@color.gray-900",
          },
          "&:aria-pressed": {
            color: "@color.gray-900",
          },
          "&:aria-expanded": {
            color: "@color.gray-900",
          },
          "&:dark": {
            color: "@color.gray-200",
          },
          "&:dark:hover-capable:hover": {
            color: "@color.white",
          },
          "&:dark:active": {
            color: "@color.white",
          },
          "&:dark:aria-pressed": {
            color: "@color.white",
          },
          "&:dark:aria-expanded": {
            color: "@color.white",
          },
        },
      },

      // With more contrast, the outline and subtle borders take the label's
      // color at full strength. These come last so their rules follow every
      // border color above in the stylesheet.
      ...(["outline", "subtle"] as const).map((variant) => ({
        match: { variant },
        css: {
          "&:contrast-more": {
            borderColor: "currentColor",
          },
          "&:dark:contrast-more": {
            borderColor: "currentColor",
          },
        },
      })),
    ]),
    defaultVariants: {
      color: "neutral",
      variant: "solid",
      size: "md",
    },
  },
  (s) => {
    const { selector, variable, ref, css } = s;
    // Steps of `spacing`, with the fallback the spacing utilities use.
    const spacing = (step: number) => css`calc(${ref("spacing", "1rem")} * ${step})`;

    // The icon size of each size. The root default makes it a theme variable,
    // and each button sets its own size's value. `:where()` keeps those at
    // zero specificity, so a consumer can set `--button--icon--size` with any
    // single class on the button.
    const iconSizeVariable = variable("button.icon.size", spacing(iconSize.md), { default: true });
    selector(":where(.button)", ({ variable }) => {
      variable(iconSizeVariable, spacing(iconSize.md));
    });
    for (const size of sizes.filter((size) => size !== "md")) {
      selector(`:where(.button[data-size="${size}"])`, ({ variable }) => {
        variable(iconSizeVariable, spacing(iconSize[size]));
      });
    }
    const icon = ref(iconSizeVariable);

    // The leading and trailing icons take the size's icon size, and the icon
    // inside fills its slot.
    const slots = '.button > :is([data-slot="leading"], [data-slot="trailing"])';
    selector(slots, {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      width: icon,
      height: icon,
    });
    selector(`${slots} > *`, {
      width: "100%",
      height: "100%",
    });

    // An icon-only button is square: its inline padding is its block padding,
    // and its icon sits in a square box as tall as the line, or as the icon
    // when a larger icon size is set. These rules outrank the size's padding
    // utility, which comes after them.
    for (const size of sizes) {
      selector(`.button[data-icon-only][data-size="${size}"]`, {
        paddingInline: spacing(blockPadding[size]),
      });
    }
    const box = css`max(1lh, ${icon})`;
    selector('.button[data-icon-only] > [data-slot="leading"]', {
      width: box,
      height: box,
    });
    selector('.button[data-icon-only] > [data-slot="leading"] > *', {
      width: icon,
      height: icon,
    });

    // The label of an icon-only button is hidden from view and stays in the
    // accessibility tree, so it still names the button.
    selector('.button[data-icon-only] > [data-slot="label"]', {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clipPath: "inset(50%)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    });

    // A disabled button that is loading keeps its full opacity, since the
    // spinner shows why it can't be used.
    selector('.button[data-loading]:is(:disabled, [aria-disabled="true"])', {
      opacity: "1",
    });

    // While loading, the content stays in place, so the size and the name
    // don't change, and a spinner is centered over it.
    selector(".button[data-loading] > :not(.spinner)", {
      opacity: "0",
    });
    selector(".button[data-loading] > .spinner", {
      position: "absolute",
      inset: "0",
      width: "1em",
      height: "1em",
      margin: "auto",
      color: "currentColor",
    });

    // Forced colors mode drops backgrounds and opacity cues, so the pressed,
    // expanded and disabled states use system colors, as in the Open
    // Components reference CSS: a disabled toggle keeps its pressed
    // background and turns `GrayText`. Setup rules come before the recipe's
    // utilities in the stylesheet, so these selectors must outrank every state
    // rule, up to the dark theme's `aria-disabled` press reset (0,5,0): that's
    // why they start with `:root` and repeat `.button`, for (0,6,0).
    const outrank = `:root ${".button".repeat(4)}`;
    selector(`${outrank}:is([aria-pressed="true"], [aria-expanded="true"])`, {
      "@media (forced-colors: active)": {
        forcedColorAdjust: "none",
        background: "Highlight",
        color: "HighlightText",
      },
    });
    selector(`${outrank}:is(:disabled, [aria-disabled="true"])`, {
      "@media (forced-colors: active)": {
        borderColor: "GrayText",
        color: "GrayText",
        opacity: "1",
      },
    });
  },
);
