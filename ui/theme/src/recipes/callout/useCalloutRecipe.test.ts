import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useCalloutRecipe } from "./useCalloutRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexBasis",
    "alignItems",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "fontWeight",
    "fontSize",
    "lineHeight",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "borderRadius",
    "flexDirection",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useCalloutRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCalloutRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("callout");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useCalloutRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexBasis: "100%",
      alignItems: "flex-start",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      fontWeight: "@font-weight.medium",
      fontSize: "@font-size.sm",
      lineHeight: "@line-height.normal",
      paddingTop: "@0.75",
      paddingBottom: "@0.75",
      paddingLeft: "@1",
      paddingRight: "@1",
      gap: "@0.75",
      borderRadius: "@border-radius.md",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

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
      const recipe = useCalloutRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "outline", "soft", "subtle"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          fontSize: "@font-size.xs",
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.75",
          paddingRight: "@0.75",
          gap: "@0.5",
        },
        md: {
          fontSize: "@font-size.sm",
          paddingTop: "@0.75",
          paddingBottom: "@0.75",
          paddingLeft: "@1",
          paddingRight: "@1",
          gap: "@0.75",
        },
        lg: {
          fontSize: "@font-size.md",
          paddingTop: "@1",
          paddingBottom: "@1",
          paddingLeft: "@1.25",
          paddingRight: "@1.25",
          gap: "@1",
        },
      });
    });

    it("should have orientation variants", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: { flexDirection: "row", alignItems: "center" },
        vertical: { flexDirection: "column" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useCalloutRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "subtle",
      size: "md",
      orientation: "horizontal",
    });
  });

  describe("compound variants", () => {
    it("should have 36 compound variants total", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      // 6 standard colors × 4 variants + 3 special colors × 4 variants = 36
      expect(recipe.compoundVariants).toHaveLength(36);
    });

    it("should have correct solid compound variant for standard colors", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      const primarySolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "primary" && cv.match.variant === "solid",
      );

      expect(primarySolid).toEqual({
        match: { color: "primary", variant: "solid" },
        css: {
          background: "@color.primary",
          color: "@color.white",
          borderColor: "@color.primary-shade-50",
          "&:dark": {
            borderColor: "@color.primary-tint-50",
          },
        },
      });
    });

    it("should have correct outline compound variant for standard colors", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      const infoOutline = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "info" && cv.match.variant === "outline",
      );

      expect(infoOutline).toEqual({
        match: { color: "info", variant: "outline" },
        css: {
          color: "@color.info",
          borderColor: "@color.info",
        },
      });
    });

    it("should have correct soft compound variant with dark mode", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

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

    it("should have correct subtle compound variant with dark mode", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      const errorSubtle = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "error" && cv.match.variant === "subtle",
      );

      expect(errorSubtle).toEqual({
        match: { color: "error", variant: "subtle" },
        css: {
          background: "@color.error-100",
          color: "@color.error-700",
          borderColor: "@color.error-300",
          "&:dark": {
            background: "@color.error-800",
            color: "@color.error-400",
            borderColor: "@color.error-600",
          },
        },
      });
    });

    it("should have correct light color compound variants", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

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

    it("should have correct dark color compound variants", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

      const darkSolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "dark" && cv.match.variant === "solid",
      );

      expect(darkSolid).toEqual({
        match: { color: "dark", variant: "solid" },
        css: {
          background: "@color.gray-900",
          color: "@color.text-inverted",
          borderColor: "@color.gray-800",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.text",
            borderColor: "@color.gray-800",
          },
        },
      });
    });

    it("should have correct neutral color compound variants with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s);

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
            borderColor: "@color.gray-800",
          },
        },
      });
    });
  });

  describe("setup callback", () => {
    it("should collapse the callout when hidden", () => {
      const s = createInstance();
      useCalloutRecipe(s);

      const hiddenSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".callout[hidden]",
      );

      expect(hiddenSelector).toBeDefined();
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.alignItems).toBe("flex-start");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s, {
        filter: { color: ["info", "success"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["success", "info"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "primary")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(4);
    });

    it("should filter variant axis", () => {
      const s = createInstance();
      const recipe = useCalloutRecipe(s, {
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
      const recipe = useCalloutRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("subtle");
      expect(recipe.defaultVariants?.size).toBe("md");
      expect(recipe.defaultVariants?.orientation).toBe("horizontal");
    });
  });
});
