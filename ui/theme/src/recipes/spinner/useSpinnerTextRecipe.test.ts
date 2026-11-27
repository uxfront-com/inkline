import { styleframe } from "@styleframe/core";

import { useSpinnerTextRecipe } from "./useSpinnerTextRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "display",
    "alignItems",
    "justifyContent",
    "lineHeight",
    "fontSize",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useSpinnerTextRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSpinnerTextRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("spinner-text");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSpinnerTextRecipe(s);

    expect(recipe.base).toEqual({
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "@line-height.normal",
    });
  });

  describe("variants", () => {
    it("should have all size variants", () => {
      const s = createInstance();
      const recipe = useSpinnerTextRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["auto", "sm", "md", "lg", "inherit"]);
    });

    it("should have correct size variant styles", () => {
      const s = createInstance();
      const recipe = useSpinnerTextRecipe(s);

      expect(recipe.variants!.size).toEqual({
        auto: {},
        sm: { fontSize: "@font-size.2xs" },
        md: { fontSize: "@font-size.xs" },
        lg: { fontSize: "@font-size.sm" },
        inherit: {},
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSpinnerTextRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  it("should have no compound variants", () => {
    const s = createInstance();
    const recipe = useSpinnerTextRecipe(s);

    expect(recipe.compoundVariants).toEqual(undefined);
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSpinnerTextRecipe(s, {
        base: { position: "relative" },
      });

      expect(recipe.base?.position).toBe("relative");
      expect(recipe.base?.display).toBe("flex");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSpinnerTextRecipe(s, {
        filter: { size: ["sm", "md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
    });
  });
});
