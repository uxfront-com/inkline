import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { usePageHeroDescriptionRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of ["color", "lineHeight", "maxWidth", "marginTop", "marginBottom", "fontSize"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("usePageHeroDescriptionRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = usePageHeroDescriptionRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("page-hero-description");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = usePageHeroDescriptionRecipe(s);

    expect(recipe.base).toEqual({
      color: "@color.text-weak",
      lineHeight: "@line-height.relaxed",
      maxWidth: "60ch",
      marginTop: "0",
      marginBottom: "0",
    });
  });

  describe("variants", () => {
    it("should have size variants with correct font sizes", () => {
      const s = createInstance();
      const recipe = usePageHeroDescriptionRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: { fontSize: "@font-size.sm" },
        md: { fontSize: "@font-size.md" },
        lg: { fontSize: "@font-size.lg" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = usePageHeroDescriptionRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = usePageHeroDescriptionRecipe(s, {
        base: { maxWidth: "80ch" },
      });

      expect(recipe.base!.maxWidth).toBe("80ch");
      expect(recipe.base!.color).toBe("@color.text-weak");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = usePageHeroDescriptionRecipe(s, {
        filter: { size: ["md", "lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md", "lg"]);
    });
  });
});
