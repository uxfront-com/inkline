import { styleframe } from "@styleframe/core";

import { useOtpRecipe } from "./useOtpRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "alignItems", "gap"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useOtpRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useOtpRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("otp");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useOtpRecipe(s);

    expect(recipe.base).toEqual({
      display: "inline-flex",
      alignItems: "center",
    });
  });

  it("should have size variants that scale the gap", () => {
    const s = createInstance();
    const recipe = useOtpRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: { gap: "@0.5" },
      md: { gap: "@0.75" },
      lg: { gap: "@1" },
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useOtpRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  it("should not declare a color or variant axis", () => {
    const s = createInstance();
    const recipe = useOtpRecipe(s);

    expect(recipe.variants).not.toHaveProperty("color");
    expect(recipe.variants).not.toHaveProperty("variant");
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useOtpRecipe(s, {
        base: { display: "flex" },
      });

      expect(recipe.base!.display).toBe("flex");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useOtpRecipe(s, {
        filter: { size: ["md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
    });
  });
});
