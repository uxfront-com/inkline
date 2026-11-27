import { styleframe } from "@styleframe/core";

import { useSidebarMenuRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "width",
    "minWidth",
    "listStyle",
    "marginTop",
    "marginBottom",
    "paddingLeft",
    "gap",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useSidebarMenuRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarMenuRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-menu");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarMenuRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minWidth: "0",
      listStyle: "none",
      marginTop: "0",
      marginBottom: "0",
      paddingLeft: "0",
    });
  });

  it("should have size variants with correct styles", () => {
    const s = createInstance();
    const recipe = useSidebarMenuRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: { gap: "@0.125" },
      md: { gap: "@0.25" },
      lg: { gap: "@0.375" },
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarMenuRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarMenuRecipe(s, {
        filter: { size: ["sm"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm"]);
      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
