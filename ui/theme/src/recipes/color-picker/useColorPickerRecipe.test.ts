import { styleframe } from "@styleframe/core";

import { useColorPickerRecipe } from "./useColorPickerRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "alignItems", "position", "gap"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useColorPickerRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("color-picker");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
    });
  });

  describe("variants", () => {
    it("should have all size variants", () => {
      const s = createInstance();
      const recipe = useColorPickerRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["xs", "sm", "md", "lg", "xl"]);
    });

    it("should have correct size variant styles", () => {
      const s = createInstance();
      const recipe = useColorPickerRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: { gap: "@0.5" },
        sm: { gap: "@0.75" },
        md: { gap: "@1" },
        lg: { gap: "@1" },
        xl: { gap: "@1.25" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  it("should have no compound variants", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s);

    expect(recipe.compoundVariants).toEqual(undefined);
  });

  describe("setup callback", () => {
    it("should register disabled-state selectors", () => {
      const s = createInstance();
      useColorPickerRecipe(s);

      const queries = s.root.children
        .filter((child) => child.type === "selector")
        .map((child) => (child as { query: string }).query);

      expect(queries).toContain(".color-picker[data-disabled]");
      expect(queries).toContain(".color-picker[data-disabled] .color-picker-thumb");
    });
  });

  it("should support config overrides", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s, {
      base: { display: "inline-flex" },
    });

    expect(recipe.base!.display).toBe("inline-flex");
    expect(recipe.base!.position).toBe("relative");
  });

  it("should support filter for size variants", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s, {
      filter: { size: ["sm", "md"] },
    });

    expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
  });

  it("should clear default variant when filtered out", () => {
    const s = createInstance();
    const recipe = useColorPickerRecipe(s, {
      filter: { size: ["xs", "sm"] },
    });

    expect(recipe.defaultVariants!.size).toBeUndefined();
  });
});
