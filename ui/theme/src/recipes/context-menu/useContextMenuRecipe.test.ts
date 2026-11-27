import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDarkModifier } from "@styleframe/theme";
import { useContextMenuRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexBasis",
    "minWidth",
    "maxWidth",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "lineHeight",
    "boxShadow",
    "zIndex",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useContextMenuRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useContextMenuRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("context-menu");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useContextMenuRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      minWidth: "@12",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      lineHeight: "@line-height.normal",
      boxShadow: "@box-shadow.md",
      zIndex: "@z-index.dropdown",
      maxWidth: "@18",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should have size variants", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useContextMenuRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct neutral solid compound variant", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "solid",
      );

      expect(cv?.css).toEqual({
        background: "@color.white",
        color: "@color.text",
        borderColor: "@color.gray-200",
        "&:dark": {
          background: "@color.gray-900",
          color: "@color.white",
          borderColor: "@color.gray-700",
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s, {
        base: { minWidth: "@16" },
      });

      expect(recipe.base!.minWidth).toBe("@16");
    });
  });

  describe("filter", () => {
    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useContextMenuRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("solid");
    });
  });
});
