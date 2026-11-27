import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useSliderRangeRecipe } from "./useSliderRangeRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["borderRadius", "height", "width", "background"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useSliderRangeRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSliderRangeRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("slider-range");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSliderRangeRecipe(s);

    expect(recipe.base).toEqual({
      borderRadius: "@border-radius.full",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual([
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "light",
        "dark",
        "neutral",
      ]);
    });

    it("should have orientation variants", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: {
          height: "100%",
        },
        vertical: {
          width: "100%",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSliderRangeRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "primary",
      orientation: "horizontal",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s);

      // 6 semantic colors + 3 non-semantic (light/dark/neutral) = 9
      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct compound variant for semantic colors", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s);

      const primary = recipe.compoundVariants!.find((cv) => cv.match.color === "primary");

      expect(primary).toEqual({
        match: { color: "primary" },
        css: {
          background: "@color.primary",
        },
      });
    });

    it("should have correct neutral color compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s);

      const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

      expect(neutral).toEqual({
        match: { color: "neutral" },
        css: {
          background: "@color.gray-400",
          "&:dark": {
            background: "@color.gray-600",
          },
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s, {
        base: { borderRadius: "@border-radius.sm" },
      });

      expect(recipe.base!.borderRadius).toBe("@border-radius.sm");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s, {
        filter: { color: ["primary", "success"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["primary", "success"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(recipe.compoundVariants).toHaveLength(1);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "primary")).toBe(true);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useSliderRangeRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.orientation).toBe("horizontal");
    });
  });
});
