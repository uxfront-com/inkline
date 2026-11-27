import { createUseRecipe } from "@styleframe/theme";

/**
 * Chat message content recipe — the bubble itself. Owns the
 * color × variant compound matrix (12 entries: 3 colors × 4 visual variants).
 * The ghost variant strips bubble chrome (transparent bg, no border, no
 * padding) — used for assistant turns that should read as inline prose.
 */
export const useChatMessageContentRecipe = createUseRecipe("chat-message-content", {
  base: {
    borderWidth: "@border-width.thin",
    borderStyle: "@border-style.solid",
    borderColor: "transparent",
    borderRadius: "@border-radius.md",
    background: "transparent",
    lineHeight: "@line-height.normal",
  },
  variants: {
    color: {
      light: {},
      dark: {},
      neutral: {},
    },
    side: {
      start: {},
      end: { alignSelf: "flex-end" },
    },
    size: {
      sm: {
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingLeft: "@0.75",
        paddingRight: "@0.75",
        borderRadius: "@border-radius.sm",
      },
      md: {
        paddingTop: "@0.75",
        paddingBottom: "@0.75",
        paddingLeft: "@1",
        paddingRight: "@1",
        borderRadius: "@border-radius.md",
      },
      lg: {
        paddingTop: "@1",
        paddingBottom: "@1",
        paddingLeft: "@1.25",
        paddingRight: "@1.25",
        borderRadius: "@border-radius.lg",
      },
    },
    variant: {
      solid: {},
      outline: {},
      soft: {},
      subtle: {},
      ghost: {
        background: "transparent",
        borderColor: "transparent",
        paddingTop: "0",
        paddingBottom: "0",
        paddingLeft: "0",
        paddingRight: "0",
        borderRadius: "0",
      },
    },
  },
  compoundVariants: [
    // Light (fixed across themes — light-toned bubble in both modes)
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
      match: { color: "light" as const, variant: "outline" as const },
      css: {
        borderColor: "@color.gray-200",
        color: "@color.gray-700",
        "&:dark": {
          borderColor: "@color.gray-200",
          color: "@color.gray-700",
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

    // Dark (fixed across themes — dark-toned bubble in both modes)
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
      match: { color: "dark" as const, variant: "outline" as const },
      css: {
        borderColor: "@color.gray-700",
        color: "@color.gray-300",
        "&:dark": {
          borderColor: "@color.gray-700",
          color: "@color.gray-300",
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

    // Neutral (adaptive — light in light mode, dark in dark mode)
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
      match: { color: "neutral" as const, variant: "outline" as const },
      css: {
        borderColor: "@color.gray-200",
        color: "@color.gray-700",
        "&:dark": {
          borderColor: "@color.gray-700",
          color: "@color.gray-300",
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
  ],
  defaultVariants: {
    color: "neutral",
    size: "md",
    variant: "subtle",
    side: "start",
  },
});
