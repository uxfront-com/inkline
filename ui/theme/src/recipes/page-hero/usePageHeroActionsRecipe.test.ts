import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { usePageHeroActionsRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "flexDirection", "flexWrap", "gap", "justifyContent"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("usePageHeroActionsRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = usePageHeroActionsRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("page-hero-actions");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = usePageHeroActionsRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "@0.75",
    });
  });

  describe("variants", () => {
    it("should have size variants with correct gaps", () => {
      const s = createInstance();
      const recipe = usePageHeroActionsRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: { gap: "@0.5" },
        md: { gap: "@0.75" },
        lg: { gap: "@1" },
      });
    });

    it("should have alignment variants with correct justify-content", () => {
      const s = createInstance();
      const recipe = usePageHeroActionsRecipe(s);

      expect(recipe.variants!.alignment).toEqual({
        start: { justifyContent: "flex-start" },
        center: { justifyContent: "center" },
        end: { justifyContent: "flex-end" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = usePageHeroActionsRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
      alignment: "center",
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = usePageHeroActionsRecipe(s, {
        base: { flexWrap: "nowrap" },
      });

      expect(recipe.base!.flexWrap).toBe("nowrap");
      expect(recipe.base!.display).toBe("flex");
    });
  });

  describe("filter", () => {
    it("should filter alignment variants", () => {
      const s = createInstance();
      const recipe = usePageHeroActionsRecipe(s, {
        filter: { alignment: ["start"] },
      });

      expect(Object.keys(recipe.variants!.alignment)).toEqual(["start"]);
    });
  });
});
