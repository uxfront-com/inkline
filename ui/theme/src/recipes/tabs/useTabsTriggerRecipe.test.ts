import { styleframe } from "@styleframe/core";

import { useAriaSelectedModifier } from "@styleframe/theme";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import { useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";
import { useTabsTriggerRecipe } from "./useTabsTriggerRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "fontFamily",
    "fontWeight",
    "fontSize",
    "lineHeight",
    "background",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "color",
    "cursor",
    "whiteSpace",
    "userSelect",
    "textDecoration",
    "textAlign",
    "width",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "opacity",
    "pointerEvents",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "boxShadow",
    "borderBottomWidth",
    "borderBottomColor",
    "marginBottom",
    "borderRightWidth",
    "borderRightColor",
    "marginRight",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useFocusVisibleModifier(s);
  useDisabledModifier(s);
  useAriaSelectedModifier(s);
  return s;
}

describe("useTabsTriggerRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useTabsTriggerRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("tabs-trigger");
  });

  it("should have an interactive base with focus ring and disabled state", () => {
    const s = createInstance();
    const recipe = useTabsTriggerRecipe(s);

    expect(recipe.base).toMatchObject({
      display: "inline-flex",
      cursor: "pointer",
      fontWeight: "@font-weight.medium",
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.primary",
        outlineOffset: "2px",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "0.5",
        pointerEvents: "none",
      },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should square the line variant and round the pill/soft variants", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      expect(recipe.variants!.variant.line).toEqual({ borderRadius: "0" });
      expect(recipe.variants!.variant.pill).toEqual({
        borderRadius: "@border-radius.md",
      });
      expect(recipe.variants!.variant.soft).toEqual({
        borderRadius: "@border-radius.md",
      });
    });

    it("should left-align and stretch the trigger when vertical", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      expect(recipe.variants!.orientation.vertical).toEqual({
        justifyContent: "flex-start",
        width: "100%",
        textAlign: "left",
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useTabsTriggerRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "line",
      size: "md",
      orientation: "horizontal",
    });
  });

  describe("compound variants", () => {
    it("should have 11 compound variants total", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      // 9 color×variant + 2 line edge (orientation)
      expect(recipe.compoundVariants).toHaveLength(11);
    });

    it("should paint the neutral line indicator adaptively when selected", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "line",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "line" },
        css: {
          color: "@color.gray-600",
          "&:hover": { color: "@color.gray-900" },
          "&:aria-selected": {
            color: "@color.gray-900",
            borderBottomColor: "@color.gray-900",
            borderRightColor: "@color.gray-900",
          },
          "&:dark": { color: "@color.gray-400" },
          "&:dark:hover": { color: "@color.white" },
          "&:dark:aria-selected": {
            color: "@color.white",
            borderBottomColor: "@color.white",
            borderRightColor: "@color.white",
          },
        },
      });
    });

    it("should raise the neutral pill surface when selected", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "pill",
      );

      expect(cv?.css).toMatchObject({
        "&:aria-selected": {
          background: "@color.white",
          color: "@color.gray-900",
          boxShadow: "@box-shadow.sm",
        },
        "&:dark:aria-selected": {
          background: "@color.gray-900",
          color: "@color.white",
          boxShadow: "@box-shadow.sm",
        },
      });
    });

    it("should overlap the list track on the bottom edge when horizontal", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.variant === "line" && v.match.orientation === "horizontal",
      );

      expect(cv).toEqual({
        match: { variant: "line", orientation: "horizontal" },
        css: {
          borderBottomWidth: "2px",
          borderBottomColor: "transparent",
          marginBottom: "-1px",
        },
      });
    });

    it("should overlap the list track on the right edge when vertical", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.variant === "line" && v.match.orientation === "vertical",
      );

      expect(cv).toEqual({
        match: { variant: "line", orientation: "vertical" },
        css: {
          borderRightWidth: "2px",
          borderRightColor: "transparent",
          marginRight: "-1px",
        },
      });
    });
  });

  describe("filter", () => {
    it("should keep neutral color×variant and orientation compounds when filtered", () => {
      const s = createInstance();
      const recipe = useTabsTriggerRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      // 3 neutral color×variant + 2 orientation (no color in match)
      expect(recipe.compoundVariants).toHaveLength(5);
      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.color === undefined || cv.match.color === "neutral",
        ),
      ).toBe(true);
    });
  });
});
