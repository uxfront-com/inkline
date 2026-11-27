import { styleframe } from "@styleframe/core";

import { useCardMediaRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const size of ["sm", "md", "lg"]) {
    s.variable(`border-radius.${size}`, "0.5rem");
  }
  for (const name of [
    "order",
    "overflow",
    "aspectRatio",
    "background",
    "borderStartStartRadius",
    "borderStartEndRadius",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useCardMediaRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCardMediaRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("card-media");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useCardMediaRecipe(s);

    expect(recipe.base).toEqual({
      order: "-1",
      overflow: "hidden",
      aspectRatio: "16 / 9",
      background: "color-mix(in srgb, currentColor 8%, transparent)",
      borderStartStartRadius: "calc(@border-radius.md - 1px)",
      borderStartEndRadius: "calc(@border-radius.md - 1px)",
    });
  });

  it("should have the same color, variant and size axes as the other card parts", () => {
    const s = createInstance();
    const recipe = useCardMediaRecipe(s);

    expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    expect(recipe.variants!.size).toEqual({
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
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useCardMediaRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  describe("Open Components rules", () => {
    it("card/heading-first shows the media above the header, which comes first in the DOM", () => {
      const s = createInstance();
      const recipe = useCardMediaRecipe(s);

      expect(recipe.base!.order).toBe("-1");
    });

    it("card/media-ratio holds the media's space with an aspect ratio the image fills", () => {
      const s = createInstance();
      const recipe = useCardMediaRecipe(s);

      expect(recipe.base!.aspectRatio).toBe("16 / 9");

      const image = s.root.children.find(
        (child) =>
          child.type === "selector" &&
          (child as { query: string }).query === ".card-media > :is(img, picture, video, svg)",
      ) as { declarations: Record<string, unknown> } | undefined;
      expect(image?.declarations).toEqual({
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });
    });

    it("card/text-below-media keeps the media in the flow, so the text sits below it", () => {
      const s = createInstance();
      const recipe = useCardMediaRecipe(s);

      expect(recipe.base!.position).toBeUndefined();
      expect(recipe.base!.order).toBe("-1");
    });

    it("card/mirrors-in-rtl rounds the start corners with logical properties", () => {
      const s = createInstance();
      const recipe = useCardMediaRecipe(s);

      const blocks: Array<Record<string, unknown>> = [
        recipe.base!,
        ...Object.values(recipe.variants!.size),
      ];
      for (const block of blocks) {
        expect(block.borderStartStartRadius).toBeDefined();
        expect(block.borderStartEndRadius).toBeDefined();
        expect(block.borderTopLeftRadius).toBeUndefined();
      }
    });
  });
});
