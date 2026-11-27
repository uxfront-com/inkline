import { styleframe } from "@styleframe/core";

import { useTabsRecipe } from "./useTabsRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "flexDirection", "gap"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useTabsRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useTabsRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("tabs");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useTabsRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
    });
  });

  describe("variants", () => {
    it("should flip flex direction per orientation", () => {
      const s = createInstance();
      const recipe = useTabsRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: { flexDirection: "column" },
        vertical: { flexDirection: "row" },
      });
    });

    it("should have size variants controlling the gap", () => {
      const s = createInstance();
      const recipe = useTabsRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
      expect(recipe.variants!.size.md).toEqual({ gap: "@0.75" });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useTabsRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      orientation: "horizontal",
      size: "md",
    });
  });

  describe("filter", () => {
    it("should filter the orientation axis and drop its default", () => {
      const s = createInstance();
      const recipe = useTabsRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
      expect(recipe.defaultVariants?.orientation).toBe("horizontal");
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});
