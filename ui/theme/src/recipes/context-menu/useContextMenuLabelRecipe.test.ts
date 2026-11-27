import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDarkModifier } from "@styleframe/theme";
import { useContextMenuLabelRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "textTransform",
    "letterSpacing",
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

describe("useContextMenuLabelRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useContextMenuLabelRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("context-menu-label");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useContextMenuLabelRecipe(s);

    expect(recipe.base).toEqual({
      display: "block",
      fontSize: "@font-size.2xs",
      fontWeight: "@font-weight.semibold",
      lineHeight: "@line-height.tight",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      paddingTop: "@0.375",
      paddingBottom: "@0.25",
      paddingLeft: "@0.625",
      paddingRight: "@0.625",
    });
  });

  describe("variants", () => {
    it("should have color, size, and inset axes", () => {
      const s = createInstance();
      const recipe = useContextMenuLabelRecipe(s);

      expect(Object.keys(recipe.variants!)).toEqual(["color", "size", "inset"]);
      expect(Object.keys(recipe.variants!.inset)).toEqual(["true", "false"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useContextMenuLabelRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
      inset: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 4 compound variants total (3 color + 1 inset)", () => {
      const s = createInstance();
      const recipe = useContextMenuLabelRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(4);
    });

    it("should have an inset compound that adds leading padding", () => {
      const s = createInstance();
      const recipe = useContextMenuLabelRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.inset === "true");

      expect(cv?.css).toEqual({ paddingLeft: "@2" });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useContextMenuLabelRecipe(s, {
        base: { letterSpacing: "0.1em" },
      });

      expect(recipe.base!.letterSpacing).toBe("0.1em");
    });
  });
});
