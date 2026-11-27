import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useSidebarMenuBadgeRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "top",
    "right",
    "transform",
    "pointerEvents",
    "display",
    "alignItems",
    "justifyContent",
    "flexShrink",
    "borderRadius",
    "fontWeight",
    "fontVariantNumeric",
    "background",
    "color",
    "minWidth",
    "height",
    "paddingLeft",
    "paddingRight",
    "fontSize",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useSidebarMenuBadgeRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarMenuBadgeRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-menu-badge");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarMenuBadgeRecipe(s);

    expect(recipe.base).toEqual({
      position: "absolute",
      top: "50%",
      right: "0.5rem",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      borderRadius: "@border-radius.sm",
      fontWeight: "@font-weight.medium",
      fontVariantNumeric: "tabular-nums",
      background: "@color.gray-100",
      color: "@color.text-weak",
      "&:dark": {
        background: "@color.gray-800",
        color: "@color.gray-400",
      },
    });
  });

  it("should have size variants with correct styles", () => {
    const s = createInstance();
    const recipe = useSidebarMenuBadgeRecipe(s);

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    expect(recipe.variants!.size.md).toEqual({
      minWidth: "@1.25",
      height: "@1.25",
      paddingLeft: "@0.375",
      paddingRight: "@0.375",
      fontSize: "@font-size.xs",
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarMenuBadgeRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarMenuBadgeRecipe(s, {
        filter: { size: ["sm", "md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
    });
  });
});
