import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { usePseudoStateModifiers } from "@styleframe/theme";
import { useSliderThumbRecipe } from "./useSliderThumbRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "boxSizing",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "boxShadow",
    "cursor",
    "outline",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "width",
    "height",
    "background",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  usePseudoStateModifiers(s);
  useDarkModifier(s);
  return s;
}

describe("useSliderThumbRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSliderThumbRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("slider-thumb");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSliderThumbRecipe(s);

    expect(recipe.base).toEqual({
      position: "absolute",
      boxSizing: "border-box",
      borderWidth: "@border-width.medium",
      borderStyle: "@border-style.solid",
      borderColor: "@color.white",
      borderRadius: "@border-radius.full",
      boxShadow: "@box-shadow.sm",
      cursor: "grab",
      outline: "none",
      transitionProperty: "box-shadow, transform",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      "&:hover": {
        boxShadow: "@box-shadow.md",
      },
      "&:focus": {
        boxShadow: "@box-shadow.md",
      },
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.primary",
        outlineOffset: "2px",
      },
      "&:active": {
        cursor: "grabbing",
      },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s);

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

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: { width: "@0.75", height: "@0.75" },
        sm: { width: "@1", height: "@1" },
        md: { width: "@1.25", height: "@1.25" },
        lg: { width: "@1.5", height: "@1.5" },
        xl: { width: "@2", height: "@2" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSliderThumbRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "primary",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s);

      // 6 semantic colors + 3 non-semantic (light/dark/neutral) = 9
      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct compound variant for semantic colors", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s);

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
      const recipe = useSliderThumbRecipe(s);

      const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

      expect(neutral).toEqual({
        match: { color: "neutral" },
        css: {
          background: "@color.white",
          borderColor: "@color.gray-300",
          "&:dark": {
            background: "@color.gray-700",
            borderColor: "@color.gray-900",
          },
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s, {
        base: { cursor: "pointer" },
      });

      expect(recipe.base!.cursor).toBe("pointer");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["primary"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(recipe.compoundVariants).toHaveLength(1);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "primary")).toBe(true);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useSliderThumbRecipe(s, {
        filter: { color: ["success"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});
