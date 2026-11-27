import type { Styleframe, VariantDeclarationsBlock } from "@styleframe/core";

import { createUseRecipe } from "@styleframe/theme";
import type { RecipeConfig } from "@styleframe/theme";

/**
 * Shared menu-surface recipe builders for the Dropdown, Select, and Context Menu
 * families. All three render the same floating panel with interactive rows,
 * dividers, and group headings, so the color/variant/size system and the
 * hover/focus/active states live here in a single place. Each builder bakes the
 * canonical surface and merges per-consumer `extras` (e.g. Select's
 * scroll-bound panel, or Context Menu's `inset`/`destructive` item axes).
 *
 * Dropdown is the canonical home; Select and Context Menu import these builders.
 * They are intentionally not re-exported from the package barrel &mdash; they are
 * internal to the menu recipes (mirrors `input/createFieldRecipe.ts`).
 *
 * Extras are merged like the field builders: `{ ...shared, ...extras }` for base,
 * variants, and defaults, and `[...shared, ...extras]` for compound variants so a
 * consumer's overrides come last and win on cascade.
 */

type MenuExtras<ExtraVariants extends Record<string, Record<string, VariantDeclarationsBlock>>> = {
  base?: VariantDeclarationsBlock;
  variants?: ExtraVariants;
  compoundVariants?: RecipeConfig["compoundVariants"];
  defaultVariants?: Record<string, string>;
};

/**
 * Builds a menu panel recipe (`.dropdown` / `.select-panel` / `.context-menu`):
 * a flex-column floating surface with elevation and the 9 color×variant
 * background combinations. Select passes `maxHeight`/`overflowY` via `extras`.
 */
export function createMenuPanelRecipe<
  const ExtraVariants extends Record<string, Record<string, VariantDeclarationsBlock>> = Record<
    string,
    Record<string, VariantDeclarationsBlock>
  >,
>(name: string, extras: MenuExtras<ExtraVariants> = {}, setup?: (s: Styleframe) => void) {
  const menuPanelVariants = {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    variant: {
      solid: {},
      soft: {},
      subtle: {},
    },
    size: {
      sm: {
        paddingTop: "@0.125",
        paddingBottom: "@0.125",
        paddingLeft: "@0.125",
        paddingRight: "@0.125",
        borderRadius: "@border-radius.sm",
      },
      md: {
        paddingTop: "@0.25",
        paddingBottom: "@0.25",
        paddingLeft: "@0.25",
        paddingRight: "@0.25",
        borderRadius: "@border-radius.md",
      },
      lg: {
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.375",
        paddingRight: "@0.375",
        borderRadius: "@border-radius.lg",
      },
    },
  };

  return createUseRecipe(
    name,
    {
      base: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
        minWidth: "@12",
        borderWidth: "@border-width.thin",
        borderStyle: "@border-style.solid",
        borderColor: "transparent",
        borderRadius: "@border-radius.md",
        lineHeight: "@line-height.normal",
        boxShadow: "@box-shadow.md",
        zIndex: "@z-index.dropdown",
        ...extras.base,
      },
      variants: {
        ...menuPanelVariants,
        ...extras.variants,
      } as typeof menuPanelVariants & ExtraVariants,
      compoundVariants: [
        // Light color (neutral light-mode values, fixed across themes)
        {
          match: { color: "light" as const, variant: "solid" as const },
          css: {
            background: "@color.white",
            color: "@color.text",
            borderColor: "@color.gray-200",
            "&:dark": {
              background: "@color.white",
              color: "@color.text-inverted",
              borderColor: "@color.gray-200",
            },
          },
        },
        {
          match: { color: "light" as const, variant: "soft" as const },
          css: {
            background: "@color.gray-100",
            color: "@color.gray-700",
            "&:dark": {
              background: "@color.gray-100",
              color: "@color.gray-700",
            },
          },
        },
        {
          match: { color: "light" as const, variant: "subtle" as const },
          css: {
            background: "@color.gray-100",
            color: "@color.gray-700",
            borderColor: "@color.gray-200",
            "&:dark": {
              background: "@color.gray-100",
              color: "@color.gray-700",
              borderColor: "@color.gray-200",
            },
          },
        },

        // Dark color (neutral dark-mode values, fixed across themes)
        {
          match: { color: "dark" as const, variant: "solid" as const },
          css: {
            background: "@color.gray-900",
            color: "@color.text-inverted",
            borderColor: "@color.gray-700",
            "&:dark": {
              background: "@color.gray-900",
              color: "@color.text",
              borderColor: "@color.gray-700",
            },
          },
        },
        {
          match: { color: "dark" as const, variant: "soft" as const },
          css: {
            background: "@color.gray-800",
            color: "@color.gray-300",
            "&:dark": {
              background: "@color.gray-800",
              color: "@color.gray-300",
            },
          },
        },
        {
          match: { color: "dark" as const, variant: "subtle" as const },
          css: {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-700",
            "&:dark": {
              background: "@color.gray-800",
              color: "@color.gray-300",
              borderColor: "@color.gray-700",
            },
          },
        },

        // Neutral color (adaptive: light in light mode, dark in dark mode)
        {
          match: { color: "neutral" as const, variant: "solid" as const },
          css: {
            background: "@color.white",
            color: "@color.text",
            borderColor: "@color.gray-200",
            "&:dark": {
              background: "@color.gray-900",
              color: "@color.white",
              borderColor: "@color.gray-700",
            },
          },
        },
        {
          match: { color: "neutral" as const, variant: "soft" as const },
          css: {
            background: "@color.gray-100",
            color: "@color.gray-700",
            "&:dark": {
              background: "@color.gray-800",
              color: "@color.gray-300",
            },
          },
        },
        {
          match: { color: "neutral" as const, variant: "subtle" as const },
          css: {
            background: "@color.gray-100",
            color: "@color.gray-700",
            borderColor: "@color.gray-200",
            "&:dark": {
              background: "@color.gray-800",
              color: "@color.gray-300",
              borderColor: "@color.gray-700",
            },
          },
        },
        ...(extras.compoundVariants ?? []),
      ],
      defaultVariants: {
        color: "neutral",
        variant: "solid",
        size: "md",
        ...extras.defaultVariants,
      },
    },
    setup,
  );
}

/**
 * Builds a menu item recipe (`.dropdown-item` / `.select-option` /
 * `.context-menu-item`): a full-width interactive row with hover/focus/active
 * backgrounds per color×variant. Consumers layer on state via `extras` &mdash;
 * Select adds `aria-selected`/`aria-disabled`, Context Menu adds
 * `inset`/`destructive` and an indicator slot.
 */
export function createMenuItemRecipe<
  const ExtraVariants extends Record<string, Record<string, VariantDeclarationsBlock>> = Record<
    string,
    Record<string, VariantDeclarationsBlock>
  >,
>(name: string, extras: MenuExtras<ExtraVariants> = {}, setup?: (s: Styleframe) => void) {
  const menuItemVariants = {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    variant: {
      solid: {},
      soft: {},
      subtle: {},
    },
    size: {
      sm: {
        fontSize: "@font-size.xs",
        paddingTop: "@0.25",
        paddingBottom: "@0.25",
        paddingLeft: "@0.5",
        paddingRight: "@0.5",
        gap: "@0.375",
        borderRadius: "@border-radius.sm",
      },
      md: {
        fontSize: "@font-size.sm",
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.625",
        paddingRight: "@0.625",
        gap: "@0.5",
        borderRadius: "@border-radius.sm",
      },
      lg: {
        fontSize: "@font-size.md",
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
        gap: "@0.625",
        borderRadius: "@border-radius.md",
      },
    },
  };

  return createUseRecipe(
    name,
    {
      base: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        background: "transparent",
        fontWeight: "@font-weight.normal",
        fontSize: "@font-size.sm",
        borderWidth: "@border-width.thin",
        borderStyle: "@border-style.solid",
        borderColor: "transparent",
        borderRadius: "@border-radius.sm",
        lineHeight: "@line-height.normal",
        paddingTop: "@0.375",
        paddingBottom: "@0.375",
        paddingLeft: "@0.625",
        paddingRight: "@0.625",
        gap: "@0.5",
        cursor: "pointer",
        transitionProperty: "color, background-color, border-color",
        transitionTimingFunction: "@easing.ease-in-out",
        transitionDuration: "150ms",
        textAlign: "left",
        textDecoration: "none",
        whiteSpace: "nowrap",
        userSelect: "none",
        outline: "none",
        "&:focus-visible": {
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineColor: "@color.primary",
          outlineOffset: "2px",
        },
        "&:disabled": {
          cursor: "not-allowed",
          opacity: "0.75",
          pointerEvents: "none",
        },
        ...extras.base,
      },
      variants: {
        ...menuItemVariants,
        ...extras.variants,
      } as typeof menuItemVariants & ExtraVariants,
      compoundVariants: [
        // Light color (fixed across themes — dark text on light surface)
        {
          match: { color: "light" as const, variant: "solid" as const },
          css: {
            color: "@color.text",
            "&:hover": { background: "@color.gray-100" },
            "&:focus": { background: "@color.gray-100" },
            "&:active": { background: "@color.gray-150" },
            "&:dark": { color: "@color.text-inverted" },
            "&:dark:hover": { background: "@color.gray-100" },
            "&:dark:focus": { background: "@color.gray-100" },
            "&:dark:active": { background: "@color.gray-150" },
          },
        },
        {
          match: { color: "light" as const, variant: "soft" as const },
          css: {
            color: "@color.gray-700",
            "&:hover": { background: "@color.gray-200" },
            "&:focus": { background: "@color.gray-200" },
            "&:active": { background: "@color.gray-250" },
            "&:dark": { color: "@color.gray-700" },
            "&:dark:hover": { background: "@color.gray-200" },
            "&:dark:focus": { background: "@color.gray-200" },
            "&:dark:active": { background: "@color.gray-250" },
          },
        },
        {
          match: { color: "light" as const, variant: "subtle" as const },
          css: {
            color: "@color.gray-700",
            "&:hover": { background: "@color.gray-200" },
            "&:focus": { background: "@color.gray-200" },
            "&:active": { background: "@color.gray-250" },
            "&:dark": { color: "@color.gray-700" },
            "&:dark:hover": { background: "@color.gray-200" },
            "&:dark:focus": { background: "@color.gray-200" },
            "&:dark:active": { background: "@color.gray-250" },
          },
        },

        // Dark color (fixed across themes — light text on dark surface)
        {
          match: { color: "dark" as const, variant: "solid" as const },
          css: {
            color: "@color.white",
            "&:hover": { background: "@color.gray-800" },
            "&:focus": { background: "@color.gray-800" },
            "&:active": { background: "@color.gray-750" },
            "&:dark": { color: "@color.white" },
            "&:dark:hover": { background: "@color.gray-800" },
            "&:dark:focus": { background: "@color.gray-800" },
            "&:dark:active": { background: "@color.gray-750" },
          },
        },
        {
          match: { color: "dark" as const, variant: "soft" as const },
          css: {
            color: "@color.gray-300",
            "&:hover": { background: "@color.gray-750" },
            "&:focus": { background: "@color.gray-750" },
            "&:active": { background: "@color.gray-700" },
            "&:dark": { color: "@color.gray-300" },
            "&:dark:hover": { background: "@color.gray-750" },
            "&:dark:focus": { background: "@color.gray-750" },
            "&:dark:active": { background: "@color.gray-700" },
          },
        },
        {
          match: { color: "dark" as const, variant: "subtle" as const },
          css: {
            color: "@color.gray-300",
            "&:hover": { background: "@color.gray-750" },
            "&:focus": { background: "@color.gray-750" },
            "&:active": { background: "@color.gray-700" },
            "&:dark": { color: "@color.gray-300" },
            "&:dark:hover": { background: "@color.gray-750" },
            "&:dark:focus": { background: "@color.gray-750" },
            "&:dark:active": { background: "@color.gray-700" },
          },
        },

        // Neutral color (adaptive: light in light mode, dark in dark mode)
        {
          match: { color: "neutral" as const, variant: "solid" as const },
          css: {
            color: "@color.text",
            "&:hover": { background: "@color.gray-100" },
            "&:focus": { background: "@color.gray-100" },
            "&:active": { background: "@color.gray-150" },
            "&:dark": { color: "@color.white" },
            "&:dark:hover": { background: "@color.gray-800" },
            "&:dark:focus": { background: "@color.gray-800" },
            "&:dark:active": { background: "@color.gray-750" },
          },
        },
        {
          match: { color: "neutral" as const, variant: "soft" as const },
          css: {
            color: "@color.gray-700",
            "&:hover": { background: "@color.gray-200" },
            "&:focus": { background: "@color.gray-200" },
            "&:active": { background: "@color.gray-250" },
            "&:dark": { color: "@color.gray-300" },
            "&:dark:hover": { background: "@color.gray-750" },
            "&:dark:focus": { background: "@color.gray-750" },
            "&:dark:active": { background: "@color.gray-700" },
          },
        },
        {
          match: { color: "neutral" as const, variant: "subtle" as const },
          css: {
            color: "@color.gray-700",
            "&:hover": { background: "@color.gray-200" },
            "&:focus": { background: "@color.gray-200" },
            "&:active": { background: "@color.gray-250" },
            "&:dark": { color: "@color.gray-300" },
            "&:dark:hover": { background: "@color.gray-750" },
            "&:dark:focus": { background: "@color.gray-750" },
            "&:dark:active": { background: "@color.gray-700" },
          },
        },
        ...(extras.compoundVariants ?? []),
      ],
      defaultVariants: {
        color: "neutral",
        variant: "solid",
        size: "md",
        ...extras.defaultVariants,
      },
    },
    setup,
  );
}

/**
 * Builds a menu separator recipe (`.dropdown-separator` / `.select-separator` /
 * `.context-menu-separator`): a 1px rule with a color axis only.
 */
export function createMenuSeparatorRecipe<
  const ExtraVariants extends Record<string, Record<string, VariantDeclarationsBlock>> = Record<
    string,
    Record<string, VariantDeclarationsBlock>
  >,
>(name: string, extras: MenuExtras<ExtraVariants> = {}, setup?: (s: Styleframe) => void) {
  const menuSeparatorVariants = {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
  };

  return createUseRecipe(
    name,
    {
      base: {
        display: "block",
        width: "100%",
        height: "1px",
        borderWidth: "0",
        marginTop: "@0.25",
        marginBottom: "@0.25",
        ...extras.base,
      },
      variants: {
        ...menuSeparatorVariants,
        ...extras.variants,
      } as typeof menuSeparatorVariants & ExtraVariants,
      compoundVariants: [
        {
          match: { color: "light" as const },
          css: {
            background: "@color.gray-200",
            "&:dark": {
              background: "@color.gray-200",
            },
          },
        },
        {
          match: { color: "dark" as const },
          css: {
            background: "@color.gray-700",
            "&:dark": {
              background: "@color.gray-700",
            },
          },
        },
        {
          match: { color: "neutral" as const },
          css: {
            background: "@color.gray-200",
            "&:dark": {
              background: "@color.gray-700",
            },
          },
        },
        ...(extras.compoundVariants ?? []),
      ],
      defaultVariants: {
        color: "neutral",
        ...extras.defaultVariants,
      },
    },
    setup,
  );
}

/**
 * Builds a menu label recipe (`.dropdown-label` / `.select-label` /
 * `.context-menu-label`): an uppercase, muted group heading with color and size
 * axes. Context Menu adds an `inset` axis via `extras`.
 */
export function createMenuLabelRecipe<
  const ExtraVariants extends Record<string, Record<string, VariantDeclarationsBlock>> = Record<
    string,
    Record<string, VariantDeclarationsBlock>
  >,
>(name: string, extras: MenuExtras<ExtraVariants> = {}, setup?: (s: Styleframe) => void) {
  const menuLabelVariants = {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    size: {
      sm: {
        fontSize: "@font-size.3xs",
        paddingTop: "@0.25",
        paddingBottom: "@0.125",
        paddingLeft: "@0.5",
        paddingRight: "@0.5",
      },
      md: {
        fontSize: "@font-size.2xs",
        paddingTop: "@0.375",
        paddingBottom: "@0.25",
        paddingLeft: "@0.625",
        paddingRight: "@0.625",
      },
      lg: {
        fontSize: "@font-size.xs",
        paddingTop: "@0.5",
        paddingBottom: "@0.375",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
      },
    },
  };

  return createUseRecipe(
    name,
    {
      base: {
        display: "block",
        fontSize: "@font-size.2xs",
        fontWeight: "@font-weight.semibold",
        lineHeight: "@line-height.tight",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        paddingTop: "@0.375",
        paddingBottom: "@0.25",
        paddingLeft: "@0.625",
        paddingRight: "@0.625",
        ...extras.base,
      },
      variants: {
        ...menuLabelVariants,
        ...extras.variants,
      } as typeof menuLabelVariants & ExtraVariants,
      compoundVariants: [
        {
          match: { color: "light" as const },
          css: {
            color: "@color.gray-600",
            "&:dark": {
              color: "@color.gray-600",
            },
          },
        },
        {
          match: { color: "dark" as const },
          css: {
            color: "@color.gray-400",
            "&:dark": {
              color: "@color.gray-400",
            },
          },
        },
        {
          match: { color: "neutral" as const },
          css: {
            color: "@color.gray-600",
            "&:dark": {
              color: "@color.gray-400",
            },
          },
        },
        ...(extras.compoundVariants ?? []),
      ],
      defaultVariants: {
        color: "neutral",
        size: "md",
        ...extras.defaultVariants,
      },
    },
    setup,
  );
}
