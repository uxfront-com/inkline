import { styleframe } from "@styleframe/core";

import { useSidebarHeaderRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "flexShrink",
    "gap",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useSidebarHeaderRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarHeaderRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-header");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarHeaderRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      alignItems: "center",
      flexShrink: "0",
    });
  });

  it("should have size variants with correct styles", () => {
    const s = createInstance();
    const recipe = useSidebarHeaderRecipe(s);

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    expect(recipe.variants!.size.md).toEqual({
      gap: "@0.5",
      paddingTop: "@0.5",
      paddingBottom: "@0.5",
      paddingLeft: "@0.75",
      paddingRight: "@0.75",
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarHeaderRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSidebarHeaderRecipe(s, {
        base: { alignItems: "flex-start" },
      });

      expect(recipe.base!.alignItems).toBe("flex-start");
      expect(recipe.base!.display).toBe("flex");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarHeaderRecipe(s, {
        filter: { size: ["sm", "lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "lg"]);
      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
