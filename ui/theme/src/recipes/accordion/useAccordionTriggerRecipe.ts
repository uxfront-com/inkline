import { createUseRecipe } from "@styleframe/theme";

/**
 * Accordion trigger recipe.
 * The full-width `<button>` that toggles an item open/closed. Renders the
 * label and a trailing chevron (`.accordion-trigger-icon`) that rotates 180°
 * when the trigger carries `data-state="open"`.
 *
 * Inherits text color from the accordion surface; the `color` axis only drives
 * the hover/active background.
 */
export const useAccordionTriggerRecipe = createUseRecipe(
  "accordion-trigger",
  {
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      background: "transparent",
      color: "inherit",
      fontFamily: "inherit",
      fontWeight: "@font-weight.medium",
      fontSize: "@font-size.md",
      lineHeight: "@line-height.normal",
      borderWidth: "0",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      paddingTop: "@0.75",
      paddingBottom: "@0.75",
      paddingLeft: "@1",
      paddingRight: "@1",
      gap: "@0.75",
      cursor: "pointer",
      textAlign: "left",
      transitionProperty: "color, background-color",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      outline: "none",
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.primary",
        outlineOffset: "-2px",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "0.75",
        pointerEvents: "none",
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
        ghost: {},
      },
      size: {
        sm: {
          fontSize: "@font-size.sm",
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.75",
          paddingRight: "@0.75",
          gap: "@0.5",
        },
        md: {
          fontSize: "@font-size.md",
          paddingTop: "@0.75",
          paddingBottom: "@0.75",
          paddingLeft: "@1",
          paddingRight: "@1",
          gap: "@0.75",
        },
        lg: {
          fontSize: "@font-size.lg",
          paddingTop: "@1",
          paddingBottom: "@1",
          paddingLeft: "@1.25",
          paddingRight: "@1.25",
          gap: "@1",
        },
      },
    },
    compoundVariants: [
      // Hover/active background tint per color (text color is inherited).
      {
        match: { color: "light" as const },
        css: {
          "&:hover": {
            background: "@color.gray-100",
          },
          "&:active": {
            background: "@color.gray-150",
          },
          "&:dark:hover": {
            background: "@color.gray-100",
          },
          "&:dark:active": {
            background: "@color.gray-150",
          },
        },
      },
      {
        match: { color: "dark" as const },
        css: {
          "&:hover": {
            background: "@color.gray-800",
          },
          "&:active": {
            background: "@color.gray-750",
          },
          "&:dark:hover": {
            background: "@color.gray-800",
          },
          "&:dark:active": {
            background: "@color.gray-750",
          },
        },
      },
      {
        match: { color: "neutral" as const },
        css: {
          "&:hover": {
            background: "@color.gray-100",
          },
          "&:active": {
            background: "@color.gray-150",
          },
          "&:dark:hover": {
            background: "@color.gray-800",
          },
          "&:dark:active": {
            background: "@color.gray-750",
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
    // Trailing chevron: keep it from shrinking and animate its rotation.
    // Setup selectors resolve token refs eagerly, so use literal values here.
    s.selector(".accordion-trigger-icon", {
      flexShrink: "0",
      transitionProperty: "transform",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "150ms",
    });
    s.selector('.accordion-trigger[data-state="open"] .accordion-trigger-icon', {
      transform: "rotate(180deg)",
    });
  },
);
