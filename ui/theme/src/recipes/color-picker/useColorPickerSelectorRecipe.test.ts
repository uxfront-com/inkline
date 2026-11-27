import { styleframe } from "@styleframe/core";

import { useColorPickerSelectorRecipe } from "./useColorPickerSelectorRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["position", "borderRadius", "width", "height"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useColorPickerSelectorRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useColorPickerSelectorRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("color-picker-selector");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useColorPickerSelectorRecipe(s);

    expect(recipe.base).toEqual({
      position: "relative",
      borderRadius: "@border-radius.md",
    });
  });

  describe("variants", () => {
    it("should have all size variants", () => {
      const s = createInstance();
      const recipe = useColorPickerSelectorRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["xs", "sm", "md", "lg", "xl"]);
    });

    it("should size the square equally on both axes", () => {
      const s = createInstance();
      const recipe = useColorPickerSelectorRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: { width: "@9.5", height: "@9.5" },
        sm: { width: "@10", height: "@10" },
        md: { width: "@10.5", height: "@10.5" },
        lg: { width: "@11", height: "@11" },
        xl: { width: "@11.5", height: "@11.5" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useColorPickerSelectorRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  it("should have no compound variants", () => {
    const s = createInstance();
    const recipe = useColorPickerSelectorRecipe(s);

    expect(recipe.compoundVariants).toEqual(undefined);
  });

  describe("setup callback", () => {
    it("should register the --color-picker--hue variable", () => {
      const s = createInstance();
      useColorPickerSelectorRecipe(s);

      expect(s.root.variables.some((v) => v.name === "color-picker.hue")).toBe(true);
    });

    it("should paint the saturation/value gradient on the selector", () => {
      const s = createInstance();
      useColorPickerSelectorRecipe(s);

      const queries = s.root.children
        .filter((child) => child.type === "selector")
        .map((child) => (child as { query: string }).query);

      expect(queries).toContain(".color-picker-selector");
    });
  });

  it("should support config overrides", () => {
    const s = createInstance();
    const recipe = useColorPickerSelectorRecipe(s, {
      base: { borderRadius: "@border-radius.lg" },
    });

    expect(recipe.base!.borderRadius).toBe("@border-radius.lg");
    expect(recipe.base!.position).toBe("relative");
  });

  it("should support filter for size variants", () => {
    const s = createInstance();
    const recipe = useColorPickerSelectorRecipe(s, {
      filter: { size: ["md", "lg"] },
    });

    expect(Object.keys(recipe.variants!.size)).toEqual(["md", "lg"]);
  });
});
