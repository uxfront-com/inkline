import { styleframe } from "@styleframe/core";

import { useCalloutTitleRecipe } from "./useCalloutTitleRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "fontWeight", "lineHeight", "fontSize"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useCalloutTitleRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCalloutTitleRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("callout-title");
  });

  it("should render a semibold headline that inherits colour", () => {
    const s = createInstance();
    const recipe = useCalloutTitleRecipe(s);

    expect(recipe.base).toEqual({
      display: "block",
      fontWeight: "@font-weight.semibold",
      lineHeight: "@line-height.snug",
    });
  });

  it("should not set an explicit colour so it inherits the variant", () => {
    const s = createInstance();
    const recipe = useCalloutTitleRecipe(s);

    expect(recipe.base).not.toHaveProperty("color");
  });

  describe("size", () => {
    it("should track the size axis on the literal token", () => {
      const s = createInstance();
      const recipe = useCalloutTitleRecipe(s);

      // Mirrors useToastTitleRecipe exactly — sm → sm, md → md, lg → lg —
      // so the two siblings can't drift; the description sits one token
      // below at every step.
      expect(recipe.variants!.size).toEqual({
        sm: { fontSize: "@font-size.sm" },
        md: { fontSize: "@font-size.md" },
        lg: { fontSize: "@font-size.lg" },
      });
    });

    it("should default to the md size", () => {
      const s = createInstance();
      const recipe = useCalloutTitleRecipe(s);

      expect(recipe.defaultVariants).toEqual({ size: "md" });
    });
  });
});
