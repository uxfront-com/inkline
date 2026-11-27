import { styleframe } from "@styleframe/core";
import type { AtRule, Selector } from "@styleframe/core";

import {
  useContrastMoreModifier,
  useDarkModifier,
  useForcedColorsModifier,
} from "@styleframe/theme";
import { usePopoverRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexBasis",
    "position",
    "alignItems",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "overflow",
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
    "overflowWrap",
    "maxWidth",
    "maxHeight",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useContrastMoreModifier(s);
  useForcedColorsModifier(s);
  s.variable("spacing.xs", "0.5rem");
  s.variable("spacing.xl", "2rem");
  s.variable("border-width.thin", "1px");
  s.variable("spacing.2xl", "3rem");
  s.variable("duration.fast", "150ms");
  s.variable("easing.ease-out", "ease-out");
  return s;
}

function findSelector(s: ReturnType<typeof createInstance>, query: string): Selector | undefined {
  return s.root.children.find(
    (child): child is Selector => child.type === "selector" && child.query === query,
  );
}

function findPositionTry(s: ReturnType<typeof createInstance>, name: string): AtRule | undefined {
  return s.root.children.find(
    (child): child is AtRule =>
      child.type === "at-rule" && child.identifier === "position-try" && child.rule === name,
  );
}

describe("usePopoverRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = usePopoverRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("popover");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = usePopoverRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      position: "relative",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      overflow: "hidden",
      lineHeight: "@line-height.normal",
      overflowWrap: "break-word",
      maxWidth: "calc(100vw - @spacing.xl)",
      maxHeight: "calc(100dvh - @spacing.xl)",
      boxShadow: "@box-shadow.md",
      "&:contrast-more": {
        outlineWidth: "@border-width.thin",
        outlineStyle: "@border-style.solid",
        outlineColor: "currentColor",
        outlineOffset: "calc(@border-width.thin * -1)",
      },
      "&:forced-colors": {
        outlineWidth: "@border-width.thin",
        outlineStyle: "@border-style.solid",
        outlineColor: "CanvasText",
        outlineOffset: "calc(@border-width.thin * -1)",
      },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          borderRadius: "@border-radius.sm",
        },
        md: {
          borderRadius: "@border-radius.md",
        },
        lg: {
          borderRadius: "@border-radius.lg",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = usePopoverRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
      placement: "top",
    });
  });

  describe("compound variants", () => {
    it("should have 13 compound variants total", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      // 3 colors × 3 variants + 4 placements = 13
      expect(recipe.compoundVariants).toHaveLength(13);
    });

    it("should have correct light solid compound variant", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

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
      const recipe = usePopoverRecipe(s);

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
      const recipe = usePopoverRecipe(s);

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
      const recipe = usePopoverRecipe(s);

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
      const recipe = usePopoverRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.flexDirection).toBe("column");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s, {
        filter: { color: ["neutral"] },
      });

      const colorCompounds = recipe.compoundVariants!.filter((cv) => cv.match.color);
      expect(colorCompounds.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(colorCompounds).toHaveLength(3);
    });

    it("should filter variant axis", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s, {
        filter: { variant: ["solid", "soft"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
      expect(
        recipe
          .compoundVariants!.filter((cv) => cv.match.variant)
          .every((cv) => cv.match.variant === "solid" || cv.match.variant === "soft"),
      ).toBe(true);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("solid");
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });

  describe("Open Components rules", () => {
    it("popover/edge sets the solid and subtle panels apart with a border and a shadow", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.base!.borderWidth).toBe("@border-width.thin");
      expect(recipe.base!.borderStyle).toBe("@border-style.solid");
      expect(recipe.base!.boxShadow).toBe("@box-shadow.md");
      const edged = recipe.compoundVariants!.filter(
        (cv) => cv.match.variant === "solid" || cv.match.variant === "subtle",
      );
      expect(edged).toHaveLength(6);
      for (const cv of edged) {
        const css = cv.css as Record<string, string> & {
          "&:dark": Record<string, string>;
        };
        for (const theme of [css, css["&:dark"]]) {
          expect(theme.borderColor).toMatch(/^@color\./);
          expect(theme.borderColor).not.toBe(theme.background);
        }
      }
    });

    it("popover/top-layer positions a [popover] element as fixed, with the offset as margin", () => {
      const s = createInstance();
      usePopoverRecipe(s);

      const topLayer = findSelector(s, ".popover[popover]");
      expect(topLayer?.declarations).toMatchObject({
        position: "fixed",
        inset: "auto",
        padding: "0",
        margin: { type: "reference", name: "popover.offset" },
        overflow: "visible",
      });
      expect(findSelector(s, ".popover[popover]:not(:popover-open)")?.declarations).toEqual({
        display: "none",
      });
      expect(s.root.variables.find((v) => v.name === "popover.offset")?.value).toEqual({
        type: "reference",
        name: "spacing.xs",
      });
    });

    it("popover/top-layer leaves an element without the popover attribute in place", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.base!.position).toBe("relative");
      expect(findSelector(s, ".popover")).toBeUndefined();
    });

    it("popover/flips sets position-area from the placement axis and flips with position-try-fallbacks", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(Object.keys(recipe.variants!.placement)).toEqual(["top", "bottom", "start", "end"]);
      expect(recipe.defaultVariants!.placement).toBe("top");
      for (const placement of ["top", "bottom", "start", "end"] as const) {
        expect(recipe.compoundVariants!.find((cv) => cv.match.placement === placement)).toEqual({
          match: { placement },
          className: `-placement-${placement}`,
        });
      }

      expect(findSelector(s, ".popover[popover]")?.declarations).toMatchObject({
        positionArea: "top",
        positionTryFallbacks: "flip-block, flip-inline, --popover-fit, flip-block --popover-fit",
      });
      expect(findSelector(s, ".popover[popover].-placement-top")?.declarations).toEqual({
        positionArea: "top",
      });
      expect(findSelector(s, ".popover[popover].-placement-bottom")?.declarations).toEqual({
        positionArea: "bottom",
      });
      expect(findSelector(s, ".popover[popover].-placement-start")?.declarations).toEqual({
        positionArea: "self-inline-start",
        positionTryFallbacks: "flip-inline, bottom, top, --popover-fit-below, --popover-fit-above",
      });
      expect(findSelector(s, ".popover[popover].-placement-end")?.declarations).toEqual({
        positionArea: "self-inline-end",
        positionTryFallbacks: "flip-inline, bottom, top, --popover-fit-below, --popover-fit-above",
      });
    });

    it("popover/flips declares the @position-try fallbacks", () => {
      const s = createInstance();
      usePopoverRecipe(s);

      expect(Object.keys(findPositionTry(s, "--popover-fit")!.declarations)).toEqual([
        "maxHeight",
        "minHeight",
      ]);
      expect(findPositionTry(s, "--popover-fit-below")?.declarations.positionArea).toBe("bottom");
      expect(findPositionTry(s, "--popover-fit-above")?.declarations.positionArea).toBe("top");
    });

    it("popover/fits-screen is never wider or taller than the screen less 16px on each side", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.base!.maxWidth).toBe("calc(100vw - @spacing.xl)");
      expect(recipe.base!.maxHeight).toBe("calc(100dvh - @spacing.xl)");
    });

    it("popover/resizable wraps its title rather than cutting it off", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.base!.overflowWrap).toBe("break-word");
      expect(recipe.base!.width).toBeUndefined();
    });

    it("popover/reduced-motion only animates as it opens without a reduced-motion preference", () => {
      const s = createInstance();
      usePopoverRecipe(s);

      const opening = findSelector(s, ".popover[popover]:popover-open");
      const media = opening?.children.find((child): child is AtRule => child.type === "at-rule");
      expect(media?.identifier).toBe("media");
      expect(media?.rule).toBe("(prefers-reduced-motion: no-preference)");
      expect(Object.keys(media!.declarations)).toEqual(["transition"]);
      const starting = media!.children.find((child): child is AtRule => child.type === "at-rule");
      expect(starting?.identifier).toBe("starting-style");
      expect(starting?.declarations).toEqual({ opacity: "0", scale: "0.96" });
      expect(opening?.declarations).toEqual({});
    });

    it("popover/forced-colors keeps the panel's edge visible in CanvasText", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.base!["&:forced-colors"]).toEqual({
        outlineWidth: "@border-width.thin",
        outlineStyle: "@border-style.solid",
        outlineColor: "CanvasText",
        outlineOffset: "calc(@border-width.thin * -1)",
      });
    });

    it("popover/more-contrast draws the panel's edge at full strength", () => {
      const s = createInstance();
      const recipe = usePopoverRecipe(s);

      expect(recipe.base!["&:contrast-more"]).toEqual({
        outlineWidth: "@border-width.thin",
        outlineStyle: "@border-style.solid",
        outlineColor: "currentColor",
        outlineOffset: "calc(@border-width.thin * -1)",
      });
    });

    it("popover/follows-direction opens start and end in the popover's own direction", () => {
      const s = createInstance();
      usePopoverRecipe(s);

      expect(findSelector(s, ".popover[popover].-placement-start")?.declarations.positionArea).toBe(
        "self-inline-start",
      );
      expect(findSelector(s, ".popover[popover].-placement-end")?.declarations.positionArea).toBe(
        "self-inline-end",
      );
    });
  });
});
