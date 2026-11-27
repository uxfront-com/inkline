import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useSelectPanelRecipe } from "./useSelectPanelRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexBasis",
    "minWidth",
    "maxHeight",
    "overflowY",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "lineHeight",
    "boxShadow",
    "zIndex",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useSelectPanelRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSelectPanelRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("select-panel");
  });

  it("should be a scrollable, elevated column", () => {
    const s = createInstance();
    const recipe = useSelectPanelRecipe(s);

    expect(recipe.base).toMatchObject({
      display: "flex",
      flexDirection: "column",
      maxHeight: "@12",
      overflowY: "auto",
      boxShadow: "@box-shadow.md",
      zIndex: "@z-index.dropdown",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSelectPanelRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have the dropdown-style variant axis (solid, soft, subtle)", () => {
      const s = createInstance();
      const recipe = useSelectPanelRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should have size variants", () => {
      const s = createInstance();
      const recipe = useSelectPanelRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSelectPanelRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useSelectPanelRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have an adaptive neutral solid surface", () => {
      const s = createInstance();
      const recipe = useSelectPanelRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "solid",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "solid" },
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
      });
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compounds", () => {
      const s = createInstance();
      const recipe = useSelectPanelRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(3);
    });
  });
});
