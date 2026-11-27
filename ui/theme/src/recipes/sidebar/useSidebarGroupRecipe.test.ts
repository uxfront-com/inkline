import { styleframe } from "@styleframe/core";

import { useSidebarGroupRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "position",
    "width",
    "minWidth",
    "gap",
    "paddingTop",
    "paddingBottom",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useSidebarGroupRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarGroupRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-group");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarGroupRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      minWidth: "0",
    });
  });

  it("should have size variants with correct styles", () => {
    const s = createInstance();
    const recipe = useSidebarGroupRecipe(s);

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    expect(recipe.variants!.size.md).toEqual({
      gap: "@0.25",
      paddingTop: "@0.5",
      paddingBottom: "@0.5",
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarGroupRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarGroupRecipe(s, {
        filter: { size: ["md", "lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md", "lg"]);
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});
