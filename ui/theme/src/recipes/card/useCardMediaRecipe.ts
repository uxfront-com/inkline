import { createUseRecipe } from "@styleframe/theme";

/**
 * Card media recipe for an image at the top of the card, edge to edge.
 *
 * It's shown first while it comes after the header in the DOM, so heading
 * navigation lands at the start of the card. Its aspect ratio holds its space
 * while the image loads, and the text always sits below it. Its start corners
 * sit inside the card's 1px border, so they're rounded 1px less than the card.
 * The border-width.thin token is the `thin` keyword, which calc() can't use.
 */
export const useCardMediaRecipe = createUseRecipe(
  "card-media",
  {
    base: {
      order: "-1",
      overflow: "hidden",
      aspectRatio: "16 / 9",
      background: "color-mix(in srgb, currentColor 8%, transparent)",
      borderStartStartRadius: "calc(@border-radius.md - 1px)",
      borderStartEndRadius: "calc(@border-radius.md - 1px)",
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
          borderStartStartRadius: "calc(@border-radius.sm - 1px)",
          borderStartEndRadius: "calc(@border-radius.sm - 1px)",
        },
        md: {
          borderStartStartRadius: "calc(@border-radius.md - 1px)",
          borderStartEndRadius: "calc(@border-radius.md - 1px)",
        },
        lg: {
          borderStartStartRadius: "calc(@border-radius.lg - 1px)",
          borderStartEndRadius: "calc(@border-radius.lg - 1px)",
        },
      },
    },
    defaultVariants: {
      color: "neutral",
      variant: "solid",
      size: "md",
    },
  },
  (s) => {
    // The image fills the media's space, whatever its own size.
    s.selector(".card-media > :is(img, picture, video, svg)", {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });
  },
);
