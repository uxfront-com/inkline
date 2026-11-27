import { createUseRecipe } from "@styleframe/theme";

/**
 * Card container recipe.
 * Supports color (light, dark, neutral), variant, and size axes.
 *
 * A link inside a heading in the card's header stretches over the whole card,
 * and the card shows the hover and focus states of that link. Those states
 * read the link through `:has()`, which is a raw CSS selector rather than a
 * registered modifier, so they are declared via the `setup` callback.
 */
export const useCardRecipe = createUseRecipe(
  "card",
  {
    base: {
      // The containing block of the stretched link.
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      // In a grid or a flex row, it gets narrower rather than overflow.
      minWidth: "0",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      lineHeight: "@line-height.normal",
      boxShadow: "@box-shadow.sm",
      // Long words, like a web address, wrap rather than overflow the card.
      overflowWrap: "break-word",
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
    },
    compoundVariants: [
      // Light color (neutral light-mode values, fixed across themes)
      {
        match: { color: "light" as const, variant: "solid" as const },
        css: {
          background: "@color.white",
          color: "@color.gray-900",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.white",
            color: "@color.gray-900",
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
          color: "@color.gray-100",
          borderColor: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.gray-100",
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
    ],
    defaultVariants: {
      color: "neutral",
      variant: "solid",
      size: "md",
    },
  },
  (s) => {
    const { selector } = s;

    const heading = ":is(h1, h2, h3, h4, h5, h6)";
    const headerLink = `> .card-header ${heading} a[href]`;
    const interactive = ":is(a[href], button, input, select, textarea, summary, [tabindex])";

    // The link in the heading stretches over the card with a pseudo-element,
    // so pressing anywhere on the card follows it, while its name stays the
    // heading alone. Its focus ring is drawn around the card instead.
    selector(`.card ${headerLink}`, {
      color: "inherit",
      textDecoration: "none",
      outline: "none",
      "&::after": {
        content: '""',
        position: "absolute",
        // Over the border too, so the whole card follows the link. The
        // border-width.thin token is the `thin` keyword, which calc() can't
        // negate, so this is the 1px browsers draw for it.
        inset: "-1px",
      },
      "@media (hover: hover)": {
        "&:hover": {
          textDecorationLine: "underline",
          textUnderlineOffset: "0.2em",
        },
      },
    });

    // Everything else people can press sits above the stretched link.
    // `:where()` keeps this at zero specificity, so a recipe or utility class
    // that positions the element itself, like the slider thumb's, still wins.
    selector(
      `:where(.card > :is(.card-media, .card-body, .card-footer) ${interactive}, .card > .card-header ${interactive}:not(${heading} *))`,
      {
        position: "relative",
        zIndex: "1",
      },
    );

    // With more contrast, the border is drawn in the text colour at full
    // strength, and in forced colours mode in a system colour. The color
    // compounds' border classes come later in the stylesheet, and the dark
    // theme's are more specific, so this repeats the class to win over both.
    selector(".card.card.card", {
      "@media (prefers-contrast: more)": {
        borderColor: "currentColor",
      },
      "@media (forced-colors: active)": {
        borderColor: "CanvasText",
      },
    });

    // Hover reads the link, so the card only looks hovered while the
    // pointer is over the part of it that follows the link.
    selector(`.card:has(${headerLink}:hover)`, {
      "@media (hover: hover)": {
        borderColor: "color-mix(in srgb, currentColor 45%, transparent)",
      },
      "@media (hover: hover) and (prefers-contrast: more)": {
        borderColor: "currentColor",
      },
    });

    // Projects that replace the default colors may not define `color.focus`,
    // so the ring falls back to the primary color it references.
    const focusColor = s.root.variables.some((variable) => variable.name === "color.focus")
      ? "@color.focus"
      : "@color.primary";

    // Focus is drawn around the whole card, outside its border.
    selector(`.card:has(${headerLink}:focus-visible)`, {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: focusColor,
      outlineOffset: "2px",
      "@media (forced-colors: active)": {
        outlineColor: "Highlight",
      },
    });
  },
);
