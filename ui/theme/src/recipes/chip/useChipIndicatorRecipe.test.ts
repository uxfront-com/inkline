import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useChipIndicatorRecipe } from "./useChipIndicatorRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "position",
    "borderRadius",
    "fontWeight",
    "lineHeight",
    "whiteSpace",
    "zIndex",
    "width",
    "height",
    "minWidth",
    "fontSize",
    "paddingLeft",
    "paddingRight",
    "top",
    "right",
    "bottom",
    "left",
    "transform",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useChipIndicatorRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useChipIndicatorRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("chip-indicator");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useChipIndicatorRecipe(s);

    expect(recipe.base).toEqual({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      borderRadius: "@border-radius.full",
      fontWeight: "@font-weight.medium",
      lineHeight: "1",
      whiteSpace: "nowrap",
      zIndex: "@z-index.base",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual([
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "light",
        "dark",
        "neutral",
      ]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: {
          width: "@0.375",
          height: "@0.375",
          fontSize: "@font-size.3xs",
        },
        sm: {
          minWidth: "@0.75",
          height: "@0.75",
          fontSize: "@font-size.3xs",
          paddingLeft: "@0.125",
          paddingRight: "@0.125",
        },
        md: {
          minWidth: "@1",
          height: "@1",
          fontSize: "@font-size.2xs",
          paddingLeft: "@0.25",
          paddingRight: "@0.25",
        },
        lg: {
          minWidth: "@1.25",
          height: "@1.25",
          fontSize: "@font-size.xs",
          paddingLeft: "@0.25",
          paddingRight: "@0.25",
        },
        xl: {
          minWidth: "@1.5",
          height: "@1.5",
          fontSize: "@font-size.sm",
          paddingLeft: "@0.375",
          paddingRight: "@0.375",
        },
      });
    });

    it("should have position variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      expect(recipe.variants!.position).toEqual({
        "top-right": {
          top: "0",
          right: "0",
          transform: "translate(50%, -50%)",
        },
        "top-left": {
          top: "0",
          left: "0",
          transform: "translate(-50%, -50%)",
        },
        "bottom-right": {
          bottom: "0",
          right: "0",
          transform: "translate(50%, 50%)",
        },
        "bottom-left": {
          bottom: "0",
          left: "0",
          transform: "translate(-50%, 50%)",
        },
      });
    });

    it("should have inset variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      expect(Object.keys(recipe.variants!.inset)).toEqual(["true", "false"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useChipIndicatorRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "primary",
      variant: "solid",
      size: "md",
      position: "top-right",
      inset: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 22 compound variants total", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      // 6 semantic colors × 2 variants + 3 non-semantic × 2 variants + 4 position×inset = 22
      expect(recipe.compoundVariants).toHaveLength(22);
    });

    it("should have correct solid compound variant for semantic colors", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      const primarySolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "primary" && cv.match.variant === "solid",
      );

      expect(primarySolid).toEqual({
        match: { color: "primary", variant: "solid" },
        css: {
          background: "@color.primary",
          color: "@color.white",
        },
      });
    });

    it("should have correct soft compound variant with dark mode", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      const successSoft = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "success" && cv.match.variant === "soft",
      );

      expect(successSoft).toEqual({
        match: { color: "success", variant: "soft" },
        css: {
          background: "@color.success-100",
          color: "@color.success-700",
          "&:dark": {
            background: "@color.success-800",
            color: "@color.success-400",
          },
        },
      });
    });

    it("should have correct light color compound variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      const lightSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "light" && cv.match.variant === "solid",
      );

      expect(lightSolid).toEqual({
        match: { color: "light", variant: "solid" },
        css: {
          background: "@color.white",
          color: "@color.text",
          "&:dark": {
            background: "@color.white",
            color: "@color.text-inverted",
          },
        },
      });
    });

    it("should have correct dark color compound variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      const darkSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "dark" && cv.match.variant === "solid",
      );

      expect(darkSolid).toEqual({
        match: { color: "dark", variant: "solid" },
        css: {
          background: "@color.gray-900",
          color: "@color.white",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
          },
        },
      });
    });

    it("should have correct neutral color compound variants with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      const neutralSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
      );

      expect(neutralSolid).toEqual({
        match: { color: "neutral", variant: "solid" },
        css: {
          background: "@color.white",
          color: "@color.text",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
          },
        },
      });
    });

    it("should have correct position x inset compound variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s);

      const topRightInset = recipe.compoundVariants!.find(
        (cv) => cv.match.position === "top-right" && cv.match.inset === "true",
      );

      expect(topRightInset).toEqual({
        match: { position: "top-right", inset: "true" },
        css: {
          transform: "translate(0, 0)",
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s, {
        base: { display: "flex" },
      });

      expect(recipe.base!.display).toBe("flex");
      expect(recipe.base!.position).toBe("absolute");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s, {
        filter: { color: ["primary", "success"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["primary", "success"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s, {
        filter: { color: ["primary"] },
      });

      const colorCompounds = recipe.compoundVariants!.filter((cv) => cv.match.color !== undefined);
      expect(colorCompounds.every((cv) => cv.match.color === "primary")).toBe(true);
      expect(colorCompounds).toHaveLength(2);
    });

    it("should filter variant axis", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s, {
        filter: { variant: ["solid"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid"]);
      expect(
        recipe
          .compoundVariants!.filter((cv) => cv.match.variant !== undefined)
          .every((cv) => cv.match.variant === "solid"),
      ).toBe(true);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useChipIndicatorRecipe(s, {
        filter: { color: ["success"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("solid");
      expect(recipe.defaultVariants?.size).toBe("md");
      expect(recipe.defaultVariants?.position).toBe("top-right");
      expect(recipe.defaultVariants?.inset).toBe("false");
    });
  });
});
