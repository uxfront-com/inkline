import { createUseRecipe } from "@styleframe/theme";

/**
 * Card header recipe with bottom separator.
 */
export const useCardHeaderRecipe = createUseRecipe(
  "card-header",
  {
    base: {
      display: "flex",
      alignItems: "center",
      gap: "@0.75",
      paddingTop: "@0.75",
      paddingBottom: "@0.75",
      paddingInline: "@1",
      borderTopWidth: "@border-width.thin",
      borderTopStyle: "@border-style.solid",
      borderTopColor: "transparent",
      borderBottomWidth: "@border-width.thin",
      borderBottomStyle: "@border-style.solid",
      borderBottomColor: "transparent",
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
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingInline: "@0.75",
          gap: "@0.5",
        },
        md: {
          paddingTop: "@0.75",
          paddingBottom: "@0.75",
          paddingInline: "@1",
          gap: "@0.75",
        },
        lg: {
          paddingTop: "@1",
          paddingBottom: "@1",
          paddingInline: "@1.25",
          gap: "@1",
        },
      },
    },
    compoundVariants: [
      // Light
      {
        match: { color: "light" as const, variant: "solid" as const },
        css: {
          borderTopColor: "@color.gray-200",
          borderBottomColor: "@color.gray-200",
          "&:dark": {
            borderTopColor: "@color.gray-200",
            borderBottomColor: "@color.gray-200",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "soft" as const },
        css: {
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          "&:dark": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "subtle" as const },
        css: {
          borderTopColor: "@color.gray-200",
          borderBottomColor: "@color.gray-200",
          "&:dark": {
            borderTopColor: "@color.gray-200",
            borderBottomColor: "@color.gray-200",
          },
        },
      },

      // Dark
      {
        match: { color: "dark" as const, variant: "solid" as const },
        css: {
          borderTopColor: "@color.gray-700",
          borderBottomColor: "@color.gray-700",
          "&:dark": {
            borderTopColor: "@color.gray-700",
            borderBottomColor: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "soft" as const },
        css: {
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          "&:dark": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "subtle" as const },
        css: {
          borderTopColor: "@color.gray-700",
          borderBottomColor: "@color.gray-700",
          "&:dark": {
            borderTopColor: "@color.gray-700",
            borderBottomColor: "@color.gray-700",
          },
        },
      },

      // Neutral
      {
        match: { color: "neutral" as const, variant: "solid" as const },
        css: {
          borderTopColor: "@color.gray-200",
          borderBottomColor: "@color.gray-200",
          "&:dark": {
            borderTopColor: "@color.gray-700",
            borderBottomColor: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "soft" as const },
        css: {
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          "&:dark": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "subtle" as const },
        css: {
          borderTopColor: "@color.gray-200",
          borderBottomColor: "@color.gray-200",
          "&:dark": {
            borderTopColor: "@color.gray-700",
            borderBottomColor: "@color.gray-700",
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
    // Collapse bottom border when followed by another card part
    s.selector(".card-header:first-child", {
      borderTopColor: "transparent",
    });
    s.selector(".card-header:last-child", {
      borderBottomColor: "transparent",
    });
  },
);
