import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDarkModifier } from "@styleframe/theme";
import { usePageHeroRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "display",
    "flexDirection",
    "flexBasis",
    "width",
    "overflow",
    "lineHeight",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "gridTemplateColumns",
    "alignItems",
    "justifyItems",
    "textAlign",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("usePageHeroRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = usePageHeroRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("page-hero");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = usePageHeroRecipe(s);

    expect(recipe.base).toEqual({
      position: "relative",
      display: "flex",
      flexBasis: "100%",
      width: "100%",
      overflow: "hidden",
      lineHeight: "@line-height.normal",
      paddingTop: "@3",
      paddingBottom: "@3",
      paddingLeft: "@1.5",
      paddingRight: "@1.5",
      gap: "@1.5",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          paddingTop: "@2",
          paddingBottom: "@2",
          gap: "@1",
        },
        md: {
          paddingTop: "@3",
          paddingBottom: "@3",
          gap: "@1.5",
        },
        lg: {
          paddingTop: "@4",
          paddingBottom: "@4",
          gap: "@2",
        },
      });
    });

    it("should have orientation variants with correct styles", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        vertical: {
          flexDirection: "column",
        },
        horizontal: {
          flexDirection: "row",
          alignItems: "stretch",
        },
      });
    });

    it("should have alignment variants as empty objects", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      expect(Object.keys(recipe.variants!.alignment)).toEqual(["start", "center", "end"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = usePageHeroRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
      orientation: "vertical",
      alignment: "center",
    });
  });

  describe("compound variants", () => {
    it("should have 8 compound variants total", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      // 3 color + 3 vertical alignment + 2 reverse = 8
      expect(recipe.compoundVariants).toHaveLength(8);
    });

    it("should have correct light color compound variant", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      const lightCv = recipe.compoundVariants!.find((cv) => cv.match.color === "light");

      expect(lightCv).toEqual({
        match: { color: "light" },
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

    it("should have correct dark color compound variant", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      const darkCv = recipe.compoundVariants!.find((cv) => cv.match.color === "dark");

      expect(darkCv).toEqual({
        match: { color: "dark" },
        css: {
          background: "@color.gray-900",
          color: "@color.text-inverted",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.text",
          },
        },
      });
    });

    it("should have correct neutral color compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      const neutralCv = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

      expect(neutralCv).toEqual({
        match: { color: "neutral" },
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

    it("should have correct vertical + start orientation/alignment compound", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (c) => c.match.orientation === "vertical" && c.match.alignment === "start",
      );

      expect(cv?.css).toEqual({
        alignItems: "flex-start",
        textAlign: "left",
      });
    });

    it("should have correct horizontal + reverse compound", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (c) => c.match.orientation === "horizontal" && c.match.reverse === "true",
      );

      expect(cv?.css).toEqual({
        flexDirection: "row-reverse",
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base!.display).toBe("block");
      expect(recipe.base!.flexBasis).toBe("100%");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s, {
        filter: { color: ["neutral"] },
      });

      const colorCvs = recipe.compoundVariants!.filter((cv) => cv.match.color !== undefined);
      expect(colorCvs.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(colorCvs).toHaveLength(1);
    });

    it("should filter orientation axis", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s, {
        filter: { orientation: ["vertical"] },
      });

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["vertical"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = usePageHeroRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.size).toBe("md");
      expect(recipe.defaultVariants?.orientation).toBe("vertical");
      expect(recipe.defaultVariants?.alignment).toBe("center");
    });
  });
});
