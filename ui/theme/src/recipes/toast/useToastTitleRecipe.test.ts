import { styleframe } from "@styleframe/core";

import { useToastTitleRecipe } from "./useToastTitleRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "fontWeight", "lineHeight", "fontSize"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useToastTitleRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useToastTitleRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("toast-title");
  });

  it("should render a semibold headline that inherits colour", () => {
    const s = createInstance();
    const recipe = useToastTitleRecipe(s);

    expect(recipe.base).toEqual({
      display: "block",
      fontWeight: "@font-weight.semibold",
      lineHeight: "@line-height.snug",
    });
  });

  it("should not set an explicit colour so it inherits the variant", () => {
    const s = createInstance();
    const recipe = useToastTitleRecipe(s);

    expect(recipe.base).not.toHaveProperty("color");
  });

  describe("size", () => {
    it("should track the size axis on the literal token", () => {
      const s = createInstance();
      const recipe = useToastTitleRecipe(s);

      // Title tracks the size axis on the literal token — sm → sm,
      // md → md, lg → lg. The description carries the same axis one token
      // below (sm → xs, md → sm, lg → md), so it sits a step under the
      // title at every size; the title stays dominant through weight
      // (semibold vs normal) reinforced by that size step.
      expect(recipe.variants!.size).toEqual({
        sm: { fontSize: "@font-size.sm" },
        md: { fontSize: "@font-size.md" },
        lg: { fontSize: "@font-size.lg" },
      });
    });

    it("should default to the md size", () => {
      const s = createInstance();
      const recipe = useToastTitleRecipe(s);

      expect(recipe.defaultVariants).toEqual({ size: "md" });
    });
  });
});
