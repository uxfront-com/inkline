import { styleframe } from "@styleframe/core";

import { useSidebarInsetRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexGrow",
    "flexShrink",
    "minWidth",
    "minHeight",
    "position",
    "background",
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

describe("useSidebarInsetRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarInsetRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-inset");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarInsetRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
      flexShrink: "1",
      minWidth: "0",
      minHeight: "100%",
      position: "relative",
      background: "@color.background",
    });
  });

  it("should have size variants with correct styles", () => {
    const s = createInstance();
    const recipe = useSidebarInsetRecipe(s);

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    expect(recipe.variants!.size.md).toEqual({
      gap: "@1",
      paddingTop: "@1",
      paddingBottom: "@1",
      paddingLeft: "@1",
      paddingRight: "@1",
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarInsetRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarInsetRecipe(s, {
        filter: { size: ["lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["lg"]);
      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
