import { styleframe } from "@styleframe/core";

import { usePaginationRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexWrap",
    "alignItems",
    "listStyle",
    "paddingLeft",
    "marginTop",
    "marginBottom",
    "flexDirection",
    "fontSize",
    "gap",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("usePaginationRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = usePaginationRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("pagination");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = usePaginationRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      listStyle: "none",
      paddingLeft: "0",
      marginTop: "0",
      marginBottom: "0",
    });
  });

  describe("variants", () => {
    it("should have orientation variants", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: {
          flexDirection: "row",
        },
        vertical: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
      });
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          fontSize: "@font-size.xs",
          gap: "@0.25",
        },
        md: {
          fontSize: "@font-size.sm",
          gap: "@0.375",
        },
        lg: {
          fontSize: "@font-size.md",
          gap: "@0.5",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = usePaginationRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      orientation: "horizontal",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 2 compound variants total", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(2);
    });

    it("should have horizontal className compound variant", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s);

      const horizontal = recipe.compoundVariants!.find(
        (cv) => cv.match.orientation === "horizontal",
      );

      expect(horizontal).toEqual({
        match: { orientation: "horizontal" },
        className: "-horizontal",
      });
    });

    it("should have vertical className compound variant", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s);

      const vertical = recipe.compoundVariants!.find((cv) => cv.match.orientation === "vertical");

      expect(vertical).toEqual({
        match: { orientation: "vertical" },
        className: "-vertical",
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.flexWrap).toBe("wrap");
      expect(recipe.base!.listStyle).toBe("none");
    });
  });

  describe("filter", () => {
    it("should filter orientation variants", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
    });

    it("should prune compound variants when filtering orientation", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      const orientationCompounds = recipe.compoundVariants!.filter(
        (cv) => cv.match.orientation !== undefined,
      );
      expect(orientationCompounds).toHaveLength(1);
      expect(orientationCompounds[0]!.match.orientation).toBe("horizontal");
    });

    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s, {
        filter: { size: ["sm", "lg"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "lg"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = usePaginationRecipe(s, {
        filter: { orientation: ["vertical"] },
      });

      expect(recipe.defaultVariants?.orientation).toBeUndefined();
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});
