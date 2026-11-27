import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useSidebarMenuSubRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "minWidth",
    "listStyle",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "paddingLeft",
    "borderLeftWidth",
    "borderLeftStyle",
    "borderLeftColor",
    "gap",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useSidebarMenuSubRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-menu-sub");
  });

  it("should have correct base styles with an adaptive guide line", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      minWidth: "0",
      listStyle: "none",
      marginTop: "@0.125",
      marginBottom: "0",
      marginLeft: "@0.625",
      paddingLeft: "@0.75",
      borderLeftWidth: "@border-width.thin",
      borderLeftStyle: "@border-style.solid",
      borderLeftColor: "@color.gray-200",
      "&:dark": {
        borderLeftColor: "@color.gray-700",
      },
    });
  });

  it("should have size variants", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubRecipe(s);

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubRecipe(s, {
        filter: { size: ["md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
    });
  });
});
