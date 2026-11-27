import { styleframe } from "@styleframe/core";

import { useSliderRecipe } from "./useSliderRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "display",
    "alignItems",
    "justifyContent",
    "userSelect",
    "touchAction",
    "flexDirection",
    "width",
    "height",
    "minHeight",
    "minWidth",
    "opacity",
    "cursor",
    "pointerEvents",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useSliderRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSliderRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("slider");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSliderRecipe(s);

    expect(recipe.base).toEqual({
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      touchAction: "none",
    });
  });

  describe("variants", () => {
    it("should have orientation variants", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: {
          flexDirection: "row",
          width: "100%",
        },
        vertical: {
          flexDirection: "column",
          height: "100%",
        },
      });
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: { minHeight: "@0.75" },
        sm: { minHeight: "@1" },
        md: { minHeight: "@1.25" },
        lg: { minHeight: "@1.5" },
        xl: { minHeight: "@2" },
      });
    });

    it("should have disabled variants", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s);

      expect(recipe.variants!.disabled).toEqual({
        true: {},
        false: {},
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSliderRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      orientation: "horizontal",
      size: "md",
      disabled: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 6 compound variants total", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s);

      // 5 vertical × size overrides + 1 disabled = 6
      expect(recipe.compoundVariants).toHaveLength(6);
    });

    it("should have vertical × size compound variants", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s);

      const verticalMd = recipe.compoundVariants!.find(
        (cv) => cv.match.orientation === "vertical" && cv.match.size === "md",
      );

      expect(verticalMd).toEqual({
        match: { orientation: "vertical", size: "md" },
        css: {
          minHeight: "0",
          minWidth: "@1.25",
        },
      });
    });

    it("should have a disabled compound variant", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s);

      const disabled = recipe.compoundVariants!.find((cv) => cv.match.disabled === "true");

      expect(disabled).toEqual({
        match: { disabled: "true" },
        css: {
          opacity: "0.5",
          cursor: "not-allowed",
          pointerEvents: "none",
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s, {
        base: { display: "flex" },
      });

      expect(recipe.base!.display).toBe("flex");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s, {
        filter: { size: ["sm", "md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
    });

    it("should prune compound variants when filtering sizes", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s, {
        filter: { size: ["md"] },
      });

      const verticalCvs = recipe.compoundVariants!.filter(
        (cv) => cv.match.orientation === "vertical",
      );
      expect(verticalCvs).toHaveLength(1);
      expect(verticalCvs.every((cv) => cv.match.size === "md")).toBe(true);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useSliderRecipe(s, {
        filter: { size: ["sm"] },
      });

      expect(recipe.defaultVariants?.size).toBeUndefined();
      expect(recipe.defaultVariants?.orientation).toBe("horizontal");
    });
  });
});
