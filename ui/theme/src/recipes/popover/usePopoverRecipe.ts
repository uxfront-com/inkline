import { createUseRecipe } from "@styleframe/theme";

/**
 * Popover container recipe.
 * Supports color (light, dark, neutral), variant, size, and placement axes.
 *
 * On an element with the `popover` attribute it opens in the top layer,
 * beside its anchor on the side `placement` names, and flips when there's no
 * room. Every other element keeps its own positioning.
 */
export const usePopoverRecipe = createUseRecipe(
  "popover",
  {
    base: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      position: "relative",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      overflow: "hidden",
      lineHeight: "@line-height.normal",
      overflowWrap: "break-word",
      maxWidth: "calc(100vw - @spacing.xl)",
      maxHeight: "calc(100dvh - @spacing.xl)",
      boxShadow: "@box-shadow.md",
      // The colour compounds set the border in each theme, so the full-strength
      // edge is an outline drawn over it, which no compound overrides.
      "&:contrast-more": {
        outlineWidth: "@border-width.thin",
        outlineStyle: "@border-style.solid",
        outlineColor: "currentColor",
        outlineOffset: "calc(@border-width.thin * -1)",
      },
      // Forced colours drop the shadow, so the edge is drawn in the system's
      // text colour, the soft variant's transparent border included.
      "&:forced-colors": {
        outlineWidth: "@border-width.thin",
        outlineStyle: "@border-style.solid",
        outlineColor: "CanvasText",
        outlineOffset: "calc(@border-width.thin * -1)",
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
          borderRadius: "@border-radius.sm",
        },
        md: {
          borderRadius: "@border-radius.md",
        },
        lg: {
          borderRadius: "@border-radius.lg",
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
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-50",
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
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-700",
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
      color: "neutral",
      variant: "solid",
      size: "md",
      placement: "top",
    },
  },
  (s) => {
    const { selector, atRule, variable } = s;

    // The gap between the anchor and the popover.
    variable("popover.offset", "@spacing.xs", { default: true });

    // Only an element with the `popover` attribute is positioned here, in the
    // top layer, so the recipe keeps `position: relative` everywhere else.
    selector(".popover[popover]", {
      position: "fixed",
      inset: "auto",
      // The browser's own `[popover]` padding would inset the header and footer.
      padding: "0",
      margin: "@popover.offset",
      // The arrow sits half outside the panel, and the body scrolls instead.
      overflow: "visible",
      positionArea: "top",
      positionTryFallbacks: "flip-block, flip-inline, --popover-fit, flip-block --popover-fit",
    });
    // The utility classes set `display: flex`, which would show it closed.
    selector(".popover[popover]:not(:popover-open)", {
      display: "none",
    });
    selector(".popover[popover].-placement-top", {
      positionArea: "top",
    });
    selector(".popover[popover].-placement-bottom", {
      positionArea: "bottom",
    });
    // In the popover's own direction, which is its anchor's.
    selector(".popover[popover].-placement-start", {
      positionArea: "self-inline-start",
      positionTryFallbacks: "flip-inline, bottom, top, --popover-fit-below, --popover-fit-above",
    });
    selector(".popover[popover].-placement-end", {
      positionArea: "self-inline-end",
      positionTryFallbacks: "flip-inline, bottom, top, --popover-fit-below, --popover-fit-above",
    });

    // It fades and grows in, unless people have asked for less motion.
    selector(".popover[popover]:popover-open", {
      "@media (prefers-reduced-motion: no-preference)": {
        transition:
          "opacity @duration.fast @easing.ease-out, scale @duration.fast @easing.ease-out",
        "@starting-style": {
          opacity: "0",
          scale: "0.96",
        },
      },
    });

    // Its last resorts, as tall as the side it opens on allows, on a side with
    // about half the screen or more. The `below` and `above` ones are for
    // `start` and `end`.
    const fit = {
      maxHeight: "calc(100% - 2 * @popover.offset)",
      minHeight: "calc(50dvh - @spacing.2xl)",
    };
    atRule("position-try", "--popover-fit", { ...fit });
    atRule("position-try", "--popover-fit-below", {
      positionArea: "bottom",
      ...fit,
    });
    atRule("position-try", "--popover-fit-above", {
      positionArea: "top",
      ...fit,
    });
  },
);
