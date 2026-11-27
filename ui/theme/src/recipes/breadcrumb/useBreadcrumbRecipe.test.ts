import { styleframe } from "@styleframe/core";

import { useBreadcrumbRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexWrap",
    "alignItems",
    "listStyle",
    "paddingLeft",
    "marginTop",
    "marginBottom",
    "fontSize",
    "gap",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useBreadcrumbRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useBreadcrumbRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("breadcrumb");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useBreadcrumbRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      listStyle: "none",
      paddingLeft: "0",
      marginTop: "0",
      marginBottom: "0",
    });
  });

  describe("variants", () => {
    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useBreadcrumbRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          fontSize: "@font-size.xs",
          gap: "@0.5",
        },
        md: {
          fontSize: "@font-size.sm",
          gap: "@0.75",
        },
        lg: {
          fontSize: "@font-size.md",
          gap: "@1",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useBreadcrumbRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useBreadcrumbRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.flexDirection).toBe("row");
      expect(recipe.base!.listStyle).toBe("none");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useBreadcrumbRecipe(s, {
        filter: { size: ["sm", "lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "lg"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useBreadcrumbRecipe(s, {
        filter: { size: ["lg"] },
      });

      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
