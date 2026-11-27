import { styleframe } from "@styleframe/core";

import { useDarkModifier, useForcedColorsModifier } from "@styleframe/theme";
import { useModalRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexBasis",
    "alignItems",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "overflow",
    "width",
    "height",
    "maxWidth",
    "fontSize",
    "lineHeight",
    "boxShadow",
    "background",
    "color",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "borderBottomWidth",
    "borderBottomStyle",
    "borderBottomColor",
    "borderTopWidth",
    "borderTopStyle",
    "borderTopColor",
    "flexShrink",
    "maxHeight",
    "overflowWrap",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useForcedColorsModifier(s);
  return s;
}

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
  return s.root.children.find(
    (child) => child.type === "selector" && (child as { query: string }).query === query,
  ) as
    | {
        declarations: Record<string, unknown>;
        children: Array<{
          identifier: string;
          rule: string;
          declarations: Record<string, unknown>;
        }>;
      }
    | undefined;
}

describe("useModalRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useModalRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("modal");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useModalRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      maxHeight: "calc(100% - 2rem)",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      overflow: "auto",
      overflowWrap: "anywhere",
      lineHeight: "@line-height.normal",
      boxShadow: "@box-shadow.sm",
      "&:forced-colors": {
        borderColor: "CanvasText",
      },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          maxWidth: "min(24rem, 100% - 2rem)",
          borderRadius: "@border-radius.sm",
        },
        md: {
          maxWidth: "min(32rem, 100% - 2rem)",
          borderRadius: "@border-radius.md",
        },
        lg: {
          maxWidth: "min(48rem, 100% - 2rem)",
          borderRadius: "@border-radius.lg",
        },
      });
    });

    it("should have fullscreen variant with true and false keys", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(Object.keys(recipe.variants!.fullscreen)).toEqual(["true", "false"]);
    });

    it("should have correct fullscreen variant styles", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(recipe.variants!.fullscreen).toEqual({
        true: {
          width: "100%",
          height: "100%",
          maxWidth: "none",
          maxHeight: "none",
          borderRadius: "0",
        },
        false: {},
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useModalRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
      fullscreen: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      // 3 colors × 3 variants = 9
      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct light solid compound variant", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

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
      const recipe = useModalRecipe(s);

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
      const recipe = useModalRecipe(s);

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
      const recipe = useModalRecipe(s);

      const neutralSubtle = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
      );

      expect(neutralSubtle).toEqual({
        match: { color: "neutral", variant: "subtle" },
        css: {
          background: "@color.gray-50",
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
      const recipe = useModalRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.flexDirection).toBe("column");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should filter variant axis", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s, {
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
      const recipe = useModalRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("solid");
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });

  describe("Dialog rules", () => {
    it("dialog/fits-screen keeps the panel within the screen, less a margin", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(recipe.base!.maxHeight).toBe("calc(100% - 2rem)");
      for (const size of Object.values(recipe.variants!.size)) {
        expect(size.maxWidth).toMatch(/^min\(\d+rem, 100% - 2rem\)$/);
      }
    });

    it("dialog/resizable sizes the panel in rem and wraps a long title", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(recipe.variants!.size.sm.maxWidth).toBe("min(24rem, 100% - 2rem)");
      expect(recipe.variants!.size.md.maxWidth).toBe("min(32rem, 100% - 2rem)");
      expect(recipe.variants!.size.lg.maxWidth).toBe("min(48rem, 100% - 2rem)");
      expect(recipe.base!.overflowWrap).toBe("anywhere");
    });

    it("dialog/actions-in-view caps the panel's height, and scrolls it whole only when even the header and footer don't fit", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(recipe.base).toMatchObject({
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100% - 2rem)",
        overflow: "auto",
      });
    });

    it("dialog/scroll-lock stops the page scrolling while an overlay is on it", () => {
      const s = createInstance();
      useModalRecipe(s);

      expect(findSelector(s, ":root:has(.modal-overlay)")?.declarations).toEqual({
        overflow: "hidden",
        scrollbarGutter: "stable",
      });
    });

    it("dialog/reduced-motion adds no animation or transition", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      const keys = JSON.stringify([
        recipe.base,
        recipe.variants,
        recipe.compoundVariants,
        s.root.children.filter((child) => child.type === "selector"),
      ]);
      expect(keys).not.toMatch(/animation|transition/i);
    });

    it("dialog/forced-colors keeps the panel's border in the system text color", () => {
      const s = createInstance();
      const recipe = useModalRecipe(s);

      expect(recipe.base).toMatchObject({
        borderWidth: "@border-width.thin",
        borderStyle: "@border-style.solid",
        "&:forced-colors": { borderColor: "CanvasText" },
      });
      expect(recipe.variants!.fullscreen.true).not.toHaveProperty("borderWidth");
    });

    it("dialog/more-contrast draws the panel's border at full strength", () => {
      const s = createInstance();
      useModalRecipe(s);

      expect(findSelector(s, ".modal")?.children).toEqual([
        expect.objectContaining({
          identifier: "media",
          rule: "(prefers-contrast: more)",
          declarations: { borderColor: "currentColor !important" },
        }),
      ]);
    });
  });
});
