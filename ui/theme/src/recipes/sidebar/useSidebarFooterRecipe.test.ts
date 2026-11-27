import { styleframe } from "@styleframe/core";

import { useSidebarFooterRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexShrink",
    "marginTop",
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

describe("useSidebarFooterRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarFooterRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-footer");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarFooterRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      marginTop: "auto",
    });
  });

  it("should have size variants with correct styles", () => {
    const s = createInstance();
    const recipe = useSidebarFooterRecipe(s);

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
    const recipe = useSidebarFooterRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarFooterRecipe(s, {
        filter: { size: ["sm"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm"]);
      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
