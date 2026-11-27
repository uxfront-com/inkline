import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useTabsListRecipe } from "./useTabsListRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "alignItems",
    "gap",
    "background",
    "borderRadius",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "borderBottomWidth",
    "borderBottomStyle",
    "borderBottomColor",
    "borderRightWidth",
    "borderRightStyle",
    "borderRightColor",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useTabsListRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useTabsListRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("tabs-list");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useTabsListRecipe(s);

    expect(recipe.base).toEqual({ display: "flex" });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have the line/pill/soft variant axis", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["line", "pill", "soft"]);
    });

    it("should flip flex direction per orientation", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: { flexDirection: "row", alignItems: "center" },
        vertical: { flexDirection: "column", alignItems: "stretch" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useTabsListRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "line",
      size: "md",
      orientation: "horizontal",
    });
  });

  describe("compound variants", () => {
    it("should have 8 compound variants total", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s);

      // 3 line track colors + 3 pill backgrounds + 2 line edge (orientation)
      expect(recipe.compoundVariants).toHaveLength(8);
    });

    it("should paint the neutral line track adaptively on both edges", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "line",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "line" },
        css: {
          borderBottomColor: "@color.gray-200",
          borderRightColor: "@color.gray-200",
          "&:dark": {
            borderBottomColor: "@color.gray-700",
            borderRightColor: "@color.gray-700",
          },
        },
      });
    });

    it("should give the line track a width on the bottom edge when horizontal", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.variant === "line" && v.match.orientation === "horizontal",
      );

      expect(cv).toEqual({
        match: { variant: "line", orientation: "horizontal" },
        css: {
          borderBottomWidth: "@border-width.thin",
          borderBottomStyle: "@border-style.solid",
        },
      });
    });
  });

  describe("filter", () => {
    it("should prune compounds when filtering colors", () => {
      const s = createInstance();
      const recipe = useTabsListRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      // 1 neutral line + 1 neutral pill + 2 orientation (no color in match)
      expect(recipe.compoundVariants).toHaveLength(4);
      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.color === undefined || cv.match.color === "neutral",
        ),
      ).toBe(true);
    });
  });
});
