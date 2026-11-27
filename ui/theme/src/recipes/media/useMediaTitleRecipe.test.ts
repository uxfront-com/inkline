import { styleframe } from "@styleframe/core";

import { useMediaTitleRecipe } from "./useMediaTitleRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["fontWeight", "lineHeight", "margin", "fontSize"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useMediaTitleRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useMediaTitleRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("media-title");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useMediaTitleRecipe(s);

    expect(recipe.base).toEqual({
      fontWeight: "@font-weight.semibold",
      lineHeight: "@line-height.snug",
      margin: "0",
    });
  });

  it("should have size variants", () => {
    const s = createInstance();
    const recipe = useMediaTitleRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: { fontSize: "@font-size.sm" },
      md: { fontSize: "@font-size.md" },
      lg: { fontSize: "@font-size.lg" },
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useMediaTitleRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  it("should not have compound variants", () => {
    const s = createInstance();
    const recipe = useMediaTitleRecipe(s);

    expect(recipe.compoundVariants).toBeUndefined();
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useMediaTitleRecipe(s, {
        base: { fontWeight: "@font-weight.bold" },
      });

      expect(recipe.base!.fontWeight).toBe("@font-weight.bold");
      expect(recipe.base!.margin).toBe("0");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useMediaTitleRecipe(s, {
        filter: { size: ["lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["lg"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useMediaTitleRecipe(s, {
        filter: { size: ["sm"] },
      });

      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
