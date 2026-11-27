import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useCardBodyRecipe } from "./index";

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

describe("useCardBodyRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCardBodyRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("card-body");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useCardBodyRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      gap: "@0.5",
      paddingTop: "@0.75",
      paddingBottom: "@0.75",
      paddingInline: "@1",
    });
  });

  it("should have correct size variants", () => {
    const s = createInstance();
    const recipe = useCardBodyRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: {
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingInline: "@0.75",
        gap: "@0.375",
      },
      md: {
        paddingTop: "@0.75",
        paddingBottom: "@0.75",
        paddingInline: "@1",
        gap: "@0.5",
      },
      lg: {
        paddingTop: "@1",
        paddingBottom: "@1",
        paddingInline: "@1.25",
        gap: "@0.75",
      },
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useCardBodyRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  it("should not have compound variants", () => {
    const s = createInstance();
    const recipe = useCardBodyRecipe(s);

    expect(recipe.compoundVariants).toBeUndefined();
  });
});

describe("useCardBodyRecipe Open Components rules", () => {
  it("card/mirrors-in-rtl pads the inline sides with logical properties", () => {
    const s = createInstance();
    const recipe = useCardBodyRecipe(s);

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
