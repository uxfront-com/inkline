import { styleframe } from "@styleframe/core";

import { useFocusVisibleModifier } from "@styleframe/theme";
import { useTabsContentRecipe } from "./useTabsContentRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "color",
    "lineHeight",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useFocusVisibleModifier(s);
  return s;
}

describe("useTabsContentRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useTabsContentRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("tabs-content");
  });

  it("should have an adaptive text color and a focus ring in base", () => {
    const s = createInstance();
    const recipe = useTabsContentRecipe(s);

    expect(recipe.base).toEqual({
      color: "@color.text",
      lineHeight: "@line-height.normal",
      outline: "none",
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.primary",
        outlineOffset: "2px",
      },
    });
  });

  it("should expose only a size axis with padding", () => {
    const s = createInstance();
    const recipe = useTabsContentRecipe(s);

    expect(Object.keys(recipe.variants!)).toEqual(["size"]);
    expect(recipe.variants!.size.md).toEqual({
      paddingTop: "@0.75",
      paddingBottom: "@0.75",
      paddingLeft: "@0.75",
      paddingRight: "@0.75",
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useTabsContentRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  it("should filter the size axis", () => {
    const s = createInstance();
    const recipe = useTabsContentRecipe(s, {
      filter: { size: ["sm", "md"] },
    });

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
  });
});
