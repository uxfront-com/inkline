import { createUseRecipe } from "@styleframe/theme";

/**
 * Tooltip content bubble recipe.
 * Supports color (light, dark, neutral), variant, size, and placement axes.
 *
 * On an element with the `popover` attribute it opens in the top layer,
 * beside its trigger on the side `placement` names, and flips when there's no
 * room. Every other element keeps its own positioning.
 */
export const useTooltipRecipe = createUseRecipe(
  "tooltip",
  {
    base: {
      display: "inline-flex",
      alignItems: "center",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      fontWeight: "@font-weight.medium",
      fontSize: "@font-size.sm",
      lineHeight: "@line-height.normal",
      paddingTop: "@0.375",
      paddingBottom: "@0.375",
      paddingLeft: "@0.625",
      paddingRight: "@0.625",
      borderRadius: "@border-radius.md",
      boxShadow: "@box-shadow.sm",
      zIndex: "@z-index.tooltip",
      // In ch, so long text wraps at about 32 characters, however big it gets.
      maxWidth: "32ch",
      // `anywhere`, since the text is a flex item that `break-word` can't shrink.
      overflowWrap: "anywhere",
      // Forced colours drop the fill and the shadow, so the border, transparent
      // in the soft variant, marks the edge in the system's text colour.
      "&:forced-colors": {
        borderColor: "CanvasText",
        background: "Canvas",
        color: "CanvasText",
      },
    },
    variants: {
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
          borderRadius: "@border-radius.sm",
        },
        md: {
          fontSize: "@font-size.sm",
          paddingTop: "@0.375",
          paddingBottom: "@0.375",
          paddingLeft: "@0.625",
          paddingRight: "@0.625",
          borderRadius: "@border-radius.md",
        },
        lg: {
          fontSize: "@font-size.md",
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.75",
          paddingRight: "@0.75",
          borderRadius: "@border-radius.md",
        },
      },
      placement: {
        top: {},
        bottom: {},
        start: {},
        end: {},
      },
    },
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
          background: "@color.gray-50",
          color: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-50",
            color: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-50",
          color: "@color.gray-700",
          borderColor: "@color.gray-300",
          "&:dark": {
            background: "@color.gray-50",
            color: "@color.gray-700",
            borderColor: "@color.gray-300",
          },
        },
      },

      // Dark color (neutral dark-mode values, fixed across themes)
      {
        match: { color: "dark" as const, variant: "solid" as const },
        css: {
          background: "@color.gray-900",
          color: "@color.text-inverted",
          borderColor: "@color.gray-800",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.text",
            borderColor: "@color.gray-800",
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
          borderColor: "@color.gray-600",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-600",
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
            borderColor: "@color.gray-800",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-50",
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
          background: "@color.gray-50",
          color: "@color.gray-700",
          borderColor: "@color.gray-300",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-600",
          },
        },
      },

      // Placement, read by the top-layer selectors in the setup callback
      { match: { placement: "top" as const }, className: "-placement-top" },
      {
        match: { placement: "bottom" as const },
        className: "-placement-bottom",
      },
      { match: { placement: "start" as const }, className: "-placement-start" },
      { match: { placement: "end" as const }, className: "-placement-end" },
    ],
    defaultVariants: {
      color: "dark",
      variant: "solid",
      size: "md",
      placement: "top",
    },
  },
  (s) => {
    const { selector, variable } = s;

    // The gap between the trigger and the tooltip.
    variable("tooltip.offset", "@spacing.xs", { default: true });

    // Only an element with the `popover` attribute is positioned here, in the
    // top layer, so the recipe leaves every other element where it is.
    selector(".tooltip[popover]", {
      position: "fixed",
      inset: "auto",
      margin: "@tooltip.offset",
      width: "max-content",
      overflow: "visible",
      positionArea: "top",
      positionTryFallbacks: "flip-block, flip-inline",
    });
    // The utility classes set `display: inline-flex`, which would show it closed.
    selector(".tooltip[popover]:not(:popover-open)", {
      display: "none",
    });
    selector(".tooltip[popover].-placement-top", {
      positionArea: "top",
    });
    selector(".tooltip[popover].-placement-bottom", {
      positionArea: "bottom",
    });
    // In the tooltip's own direction, which is its trigger's.
    selector(".tooltip[popover].-placement-start", {
      positionArea: "self-inline-start",
    });
    selector(".tooltip[popover].-placement-end", {
      positionArea: "self-inline-end",
    });

    // It fades and grows in as it opens, and only fades with reduced motion.
    selector(".tooltip[popover]:popover-open", {
      transition: "opacity @duration.fast @easing.ease-out, scale @duration.fast @easing.ease-out",
      "@starting-style": {
        opacity: "0",
        scale: "0.96",
      },
      "@media (prefers-reduced-motion: reduce)": {
        transition: "opacity @duration.fast @easing.ease-out",
        "@starting-style": {
          scale: "1",
        },
      },
    });
  },
);

/**
 * Tooltip arrow recipe.
 * Arrow background and border match the tooltip content.
 *
 * `placement` names the side of the trigger the tooltip opens on, like the
 * tooltip's own axis, so the arrow points back at the trigger. The outer
 * triangle draws in `color` and its `:after` in its own `color`, which the
 * color compounds set. Inside a top-layer tooltip, it sits on the edge that
 * faces the trigger.
 */
export const useTooltipArrowRecipe = createUseRecipe(
  "tooltip-arrow",
  {
    base: {
      width: "0",
      height: "0",
      position: "absolute",
      zIndex: "@z-index.tooltip",
      "&:after": {
        position: "absolute",
        zIndex: "0",
      },
      // Forced colours draw the transparent sides of the triangle too, so the
      // arrow steps aside and the tooltip's own border marks its edge.
      "&:forced-colors": {
        display: "none",
      },
    },
    variants: {
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
      placement: {
        top: {
          borderInlineStartWidth: "calc(@tooltip.arrow.size + 1px)",
          borderInlineStartStyle: "@border-style.solid",
          borderInlineStartColor: "transparent",
          borderInlineEndWidth: "calc(@tooltip.arrow.size + 1px)",
          borderInlineEndStyle: "@border-style.solid",
          borderInlineEndColor: "transparent",
          borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
          borderTopStyle: "@border-style.solid",
          borderTopColor: "currentColor",
          "&:after": {
            borderInlineStartWidth: "@tooltip.arrow.size",
            borderInlineStartStyle: "@border-style.solid",
            borderInlineStartColor: "transparent",
            borderInlineEndWidth: "@tooltip.arrow.size",
            borderInlineEndStyle: "@border-style.solid",
            borderInlineEndColor: "transparent",
            borderTopWidth: "@tooltip.arrow.size",
            borderTopStyle: "@border-style.solid",
            borderTopColor: "currentColor",
            insetInlineStart: "calc(@tooltip.arrow.size * -1)",
            top: "calc(@tooltip.arrow.size * -1 - 1px)",
          },
        },
        bottom: {
          borderInlineStartWidth: "calc(@tooltip.arrow.size + 1px)",
          borderInlineStartStyle: "@border-style.solid",
          borderInlineStartColor: "transparent",
          borderInlineEndWidth: "calc(@tooltip.arrow.size + 1px)",
          borderInlineEndStyle: "@border-style.solid",
          borderInlineEndColor: "transparent",
          borderBottomWidth: "calc(@tooltip.arrow.size + 1px)",
          borderBottomStyle: "@border-style.solid",
          borderBottomColor: "currentColor",
          "&:after": {
            borderInlineStartWidth: "@tooltip.arrow.size",
            borderInlineStartStyle: "@border-style.solid",
            borderInlineStartColor: "transparent",
            borderInlineEndWidth: "@tooltip.arrow.size",
            borderInlineEndStyle: "@border-style.solid",
            borderInlineEndColor: "transparent",
            borderBottomWidth: "@tooltip.arrow.size",
            borderBottomStyle: "@border-style.solid",
            borderBottomColor: "currentColor",
            insetInlineStart: "calc(@tooltip.arrow.size * -1)",
            top: "1px",
          },
        },
        start: {
          borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
          borderTopStyle: "@border-style.solid",
          borderTopColor: "transparent",
          borderBottomWidth: "calc(@tooltip.arrow.size + 1px)",
          borderBottomStyle: "@border-style.solid",
          borderBottomColor: "transparent",
          borderInlineStartWidth: "calc(@tooltip.arrow.size + 1px)",
          borderInlineStartStyle: "@border-style.solid",
          borderInlineStartColor: "currentColor",
          "&:after": {
            borderTopWidth: "@tooltip.arrow.size",
            borderTopStyle: "@border-style.solid",
            borderTopColor: "transparent",
            borderBottomWidth: "@tooltip.arrow.size",
            borderBottomStyle: "@border-style.solid",
            borderBottomColor: "transparent",
            borderInlineStartWidth: "@tooltip.arrow.size",
            borderInlineStartStyle: "@border-style.solid",
            borderInlineStartColor: "currentColor",
            insetInlineStart: "calc(@tooltip.arrow.size * -1 - 1px)",
            top: "calc(@tooltip.arrow.size * -1)",
          },
        },
        end: {
          borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
          borderTopStyle: "@border-style.solid",
          borderTopColor: "transparent",
          borderBottomWidth: "calc(@tooltip.arrow.size + 1px)",
          borderBottomStyle: "@border-style.solid",
          borderBottomColor: "transparent",
          borderInlineEndWidth: "calc(@tooltip.arrow.size + 1px)",
          borderInlineEndStyle: "@border-style.solid",
          borderInlineEndColor: "currentColor",
          "&:after": {
            borderTopWidth: "@tooltip.arrow.size",
            borderTopStyle: "@border-style.solid",
            borderTopColor: "transparent",
            borderBottomWidth: "@tooltip.arrow.size",
            borderBottomStyle: "@border-style.solid",
            borderBottomColor: "transparent",
            borderInlineEndWidth: "@tooltip.arrow.size",
            borderInlineEndStyle: "@border-style.solid",
            borderInlineEndColor: "currentColor",
            insetInlineStart: "1px",
            top: "calc(@tooltip.arrow.size * -1)",
          },
        },
      },
    },
    compoundVariants: [
      // Light color (fixed across themes)
      {
        match: { color: "light" as const, variant: "solid" as const },
        css: {
          color: "@color.gray-200",
          "&:after": {
            color: "@color.white",
          },
          "&:dark": {
            color: "@color.gray-200",
          },
          "&:dark:after": {
            color: "@color.white",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "soft" as const },
        css: {
          color: "@color.gray-50",
          "&:after": {
            color: "@color.gray-50",
          },
          "&:dark": {
            color: "@color.gray-50",
          },
          "&:dark:after": {
            color: "@color.gray-50",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "subtle" as const },
        css: {
          color: "@color.gray-300",
          "&:after": {
            color: "@color.gray-50",
          },
          "&:dark": {
            color: "@color.gray-300",
          },
          "&:dark:after": {
            color: "@color.gray-50",
          },
        },
      },

      // Dark color (fixed across themes)
      {
        match: { color: "dark" as const, variant: "solid" as const },
        css: {
          color: "@color.gray-800",
          "&:after": {
            color: "@color.gray-900",
          },
          "&:dark": {
            color: "@color.gray-800",
          },
          "&:dark:after": {
            color: "@color.gray-900",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "soft" as const },
        css: {
          color: "@color.gray-800",
          "&:after": {
            color: "@color.gray-800",
          },
          "&:dark": {
            color: "@color.gray-800",
          },
          "&:dark:after": {
            color: "@color.gray-800",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "subtle" as const },
        css: {
          color: "@color.gray-600",
          "&:after": {
            color: "@color.gray-800",
          },
          "&:dark": {
            color: "@color.gray-600",
          },
          "&:dark:after": {
            color: "@color.gray-800",
          },
        },
      },

      // Neutral color (adaptive: light in light mode, dark in dark mode)
      {
        match: { color: "neutral" as const, variant: "solid" as const },
        css: {
          color: "@color.gray-200",
          "&:after": {
            color: "@color.white",
          },
          "&:dark": {
            color: "@color.gray-800",
          },
          "&:dark:after": {
            color: "@color.gray-900",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "soft" as const },
        css: {
          color: "@color.gray-50",
          "&:after": {
            color: "@color.gray-50",
          },
          "&:dark": {
            color: "@color.gray-800",
          },
          "&:dark:after": {
            color: "@color.gray-800",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "subtle" as const },
        css: {
          color: "@color.gray-300",
          "&:after": {
            color: "@color.gray-50",
          },
          "&:dark": {
            color: "@color.gray-600",
          },
          "&:dark:after": {
            color: "@color.gray-800",
          },
        },
      },

      // Placement, read by the top-layer selectors in the setup callback
      { match: { placement: "top" as const }, className: "-placement-top" },
      {
        match: { placement: "bottom" as const },
        className: "-placement-bottom",
      },
      { match: { placement: "start" as const }, className: "-placement-start" },
      { match: { placement: "end" as const }, className: "-placement-end" },
    ],
    defaultVariants: {
      color: "dark",
      variant: "solid",
      placement: "top",
    },
  },
  (s) => {
    const { selector, variable } = s;

    variable("tooltip.arrow.size", "5px", { default: true });

    // Inside a top-layer tooltip, on the edge that faces the trigger and
    // centred on it, with its base over the tooltip's border.
    selector(".tooltip[popover] > .tooltip-arrow.-placement-top", {
      top: "100%",
      insetInlineStart: "calc(50% - @tooltip.arrow.size - 1px)",
    });
    selector(".tooltip[popover] > .tooltip-arrow.-placement-bottom", {
      bottom: "100%",
      insetInlineStart: "calc(50% - @tooltip.arrow.size - 1px)",
    });
    selector(".tooltip[popover] > .tooltip-arrow.-placement-start", {
      top: "calc(50% - @tooltip.arrow.size - 1px)",
      insetInlineStart: "100%",
    });
    selector(".tooltip[popover] > .tooltip-arrow.-placement-end", {
      top: "calc(50% - @tooltip.arrow.size - 1px)",
      insetInlineEnd: "100%",
    });
  },
);
