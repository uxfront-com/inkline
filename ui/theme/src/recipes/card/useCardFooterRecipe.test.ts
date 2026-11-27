import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useCardFooterRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexBasis",
    "alignItems",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "overflow",
    "fontSize",
    "lineHeight",
    "boxShadow",
    "background",
    "color",
    "paddingTop",
    "paddingBottom",
    "paddingInline",
    "gap",
    "borderBottomWidth",
    "borderBottomStyle",
    "borderBottomColor",
    "borderTopWidth",
    "borderTopStyle",
    "borderTopColor",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useCardFooterRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCardFooterRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("card-footer");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useCardFooterRecipe(s);

    expect(recipe.base).toEqual({
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
    });
  });

  it("should have correct size variants", () => {
    const s = createInstance();
    const recipe = useCardFooterRecipe(s);

    expect(recipe.variants!.size).toEqual({
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
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useCardFooterRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useCardFooterRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should set both borderTopColor and borderBottomColor", () => {
      const s = createInstance();
      const recipe = useCardFooterRecipe(s);

      const neutralSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
      );

      expect(neutralSolid).toEqual({
        match: { color: "neutral", variant: "solid" },
        css: {
          borderTopColor: "@color.gray-200",
          borderBottomColor: "@color.gray-200",
          "&:dark": {
            borderTopColor: "@color.gray-700",
            borderBottomColor: "@color.gray-700",
          },
        },
      });
    });
  });
});

describe("useCardFooterRecipe Open Components rules", () => {
  it("card/mirrors-in-rtl pads the inline sides with logical properties", () => {
    const s = createInstance();
    const recipe = useCardFooterRecipe(s);

    const blocks: Array<Record<string, unknown>> = [
      recipe.base!,
      ...Object.values(recipe.variants!.size),
    ];
    for (const block of blocks) {
      expect(block.paddingInline).toBeDefined();
      expect(block.paddingLeft).toBeUndefined();
      expect(block.paddingRight).toBeUndefined();
    }
  });
});
