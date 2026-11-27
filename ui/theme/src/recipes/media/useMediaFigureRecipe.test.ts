import { styleframe } from "@styleframe/core";

import { useMediaFigureRecipe } from "./useMediaFigureRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexShrink",
    "alignItems",
    "justifyContent",
    "overflow",
    "borderRadius",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useMediaFigureRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useMediaFigureRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("media-figure");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useMediaFigureRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexShrink: "0",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    });
  });

  it("should have size variants", () => {
    const s = createInstance();
    const recipe = useMediaFigureRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: { borderRadius: "@border-radius.sm" },
      md: { borderRadius: "@border-radius.md" },
      lg: { borderRadius: "@border-radius.lg" },
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useMediaFigureRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  it("should not have compound variants", () => {
    const s = createInstance();
    const recipe = useMediaFigureRecipe(s);

    expect(recipe.compoundVariants).toBeUndefined();
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useMediaFigureRecipe(s, {
        base: { overflow: "visible" },
      });

      expect(recipe.base!.overflow).toBe("visible");
      expect(recipe.base!.flexShrink).toBe("0");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useMediaFigureRecipe(s, {
        filter: { size: ["sm", "md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useMediaFigureRecipe(s, {
        filter: { size: ["lg"] },
      });

      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
