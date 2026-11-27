import { styleframe } from "@styleframe/core";

import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import { useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";
import { useSidebarGroupActionRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "top",
    "right",
    "transform",
    "display",
    "alignItems",
    "justifyContent",
    "flexShrink",
    "background",
    "borderWidth",
    "borderRadius",
    "color",
    "cursor",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "opacity",
    "pointerEvents",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "width",
    "height",
    "fontSize",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useFocusVisibleModifier(s);
  useDisabledModifier(s);
  return s;
}

describe("useSidebarGroupActionRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarGroupActionRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-group-action");
  });

  it("should share the muted square icon-button surface", () => {
    const s = createInstance();
    const recipe = useSidebarGroupActionRecipe(s);

    expect(recipe.base!.display).toBe("inline-flex");
    expect(recipe.base!.color).toBe("@color.text-weak");
    expect(recipe.base!.borderWidth).toBe("0");
  });

  it("should have size variants", () => {
    const s = createInstance();
    const recipe = useSidebarGroupActionRecipe(s);

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarGroupActionRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSidebarGroupActionRecipe(s, {
        filter: { size: ["md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});
