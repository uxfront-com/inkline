import { styleframe } from "@styleframe/core";

import { useToastDescriptionRecipe } from "./useToastDescriptionRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "marginTop", "fontSize", "fontWeight", "lineHeight"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useToastDescriptionRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useToastDescriptionRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("toast-description");
  });

  it("should step down from the title in weight, with the size on the axis", () => {
    const s = createInstance();
    const recipe = useToastDescriptionRecipe(s);

    expect(recipe.base).toEqual({
      display: "block",
      marginTop: "@0.25",
      fontWeight: "@font-weight.normal",
      lineHeight: "@line-height.normal",
    });
  });

  it("should not set an explicit colour so it inherits the variant", () => {
    const s = createInstance();
    const recipe = useToastDescriptionRecipe(s);

    expect(recipe.base).not.toHaveProperty("color");
  });

  describe("size", () => {
    it("should track the size axis one token below the title at every step", () => {
      const s = createInstance();
      const recipe = useToastDescriptionRecipe(s);

      // The title is sm → sm, md → md, lg → lg; the description sits one
      // token below at each size, so the hierarchy reads by both size and
      // weight.
      expect(recipe.variants!.size).toEqual({
        sm: { fontSize: "@font-size.xs" },
        md: { fontSize: "@font-size.sm" },
        lg: { fontSize: "@font-size.md" },
      });
    });

    it("should default to the md size", () => {
      const s = createInstance();
      const recipe = useToastDescriptionRecipe(s);

      expect(recipe.defaultVariants).toEqual({ size: "md" });
    });
  });
});
