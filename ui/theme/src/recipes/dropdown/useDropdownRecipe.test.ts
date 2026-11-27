import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useDropdownRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexBasis",
    "minWidth",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "lineHeight",
    "boxShadow",
    "zIndex",
    "background",
    "color",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useDropdownRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useDropdownRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("dropdown");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useDropdownRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      minWidth: "@12",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      lineHeight: "@line-height.normal",
      boxShadow: "@box-shadow.md",
      zIndex: "@z-index.dropdown",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          paddingTop: "@0.125",
          paddingBottom: "@0.125",
          paddingLeft: "@0.125",
          paddingRight: "@0.125",
          borderRadius: "@border-radius.sm",
        },
        md: {
          paddingTop: "@0.25",
          paddingBottom: "@0.25",
          paddingLeft: "@0.25",
          paddingRight: "@0.25",
          borderRadius: "@border-radius.md",
        },
        lg: {
          paddingTop: "@0.375",
          paddingBottom: "@0.375",
          paddingLeft: "@0.375",
          paddingRight: "@0.375",
          borderRadius: "@border-radius.lg",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useDropdownRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      // 3 colors × 3 variants = 9
      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct light solid compound variant", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      const lightSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "light" && cv.match.variant === "solid",
      );

      expect(lightSolid).toEqual({
        match: { color: "light", variant: "solid" },
        css: {
          background: "@color.white",
          color: "@color.text",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.white",
            color: "@color.text-inverted",
            borderColor: "@color.gray-200",
          },
        },
      });
    });

    it("should have correct dark solid compound variant", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      const darkSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "dark" && cv.match.variant === "solid",
      );

      expect(darkSolid).toEqual({
        match: { color: "dark", variant: "solid" },
        css: {
          background: "@color.gray-900",
          color: "@color.text-inverted",
          borderColor: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.text",
            borderColor: "@color.gray-700",
          },
        },
      });
    });

    it("should have correct neutral solid compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      const neutralSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
      );

      expect(neutralSolid).toEqual({
        match: { color: "neutral", variant: "solid" },
        css: {
          background: "@color.white",
          color: "@color.text",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
            borderColor: "@color.gray-700",
          },
        },
      });
    });

    it("should have correct neutral subtle compound variant", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s);

      const neutralSubtle = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
      );

      expect(neutralSubtle).toEqual({
        match: { color: "neutral", variant: "subtle" },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-700",
          },
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.flexDirection).toBe("column");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should filter variant axis", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s, {
        filter: { variant: ["solid", "soft"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.variant === "solid" || cv.match.variant === "soft",
        ),
      ).toBe(true);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useDropdownRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("solid");
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});
