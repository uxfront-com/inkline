import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useSidebarGroupLabelRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "flexShrink",
    "fontWeight",
    "lineHeight",
    "whiteSpace",
    "fontSize",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useSidebarGroupLabelRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarGroupLabelRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-group-label");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSidebarGroupLabelRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      alignItems: "center",
      flexShrink: "0",
      fontWeight: "@font-weight.medium",
      lineHeight: "@line-height.tight",
      whiteSpace: "nowrap",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSidebarGroupLabelRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have size variants", () => {
      const s = createInstance();
      const recipe = useSidebarGroupLabelRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarGroupLabelRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 3 compound variants total", () => {
      const s = createInstance();
      const recipe = useSidebarGroupLabelRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should have correct neutral compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useSidebarGroupLabelRecipe(s);

      const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

      expect(neutral).toEqual({
        match: { color: "neutral" },
        css: {
          color: "@color.gray-600",
          "&:dark": {
            color: "@color.gray-400",
          },
        },
      });
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compounds", () => {
      const s = createInstance();
      const recipe = useSidebarGroupLabelRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(1);
    });
  });
});
