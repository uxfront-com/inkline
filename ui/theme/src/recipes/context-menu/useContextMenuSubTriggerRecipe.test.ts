import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
  useActiveModifier,
  useFocusModifier,
  useFocusVisibleModifier,
  useHoverModifier,
} from "@styleframe/theme";
import { useContextMenuSubTriggerRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "width",
    "background",
    "fontWeight",
    "fontSize",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "lineHeight",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "cursor",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "textAlign",
    "textDecoration",
    "whiteSpace",
    "userSelect",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "opacity",
    "pointerEvents",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useFocusModifier(s);
  useFocusVisibleModifier(s);
  useActiveModifier(s);
  useDisabledModifier(s);
  return s;
}

describe("useContextMenuSubTriggerRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useContextMenuSubTriggerRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("context-menu-sub-trigger");
  });

  it("should reuse the shared menu item base", () => {
    const s = createInstance();
    const recipe = useContextMenuSubTriggerRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      background: "transparent",
      fontWeight: "@font-weight.normal",
      fontSize: "@font-size.sm",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.sm",
      lineHeight: "@line-height.normal",
      paddingTop: "@0.375",
      paddingBottom: "@0.375",
      paddingLeft: "@0.625",
      paddingRight: "@0.625",
      gap: "@0.5",
      cursor: "pointer",
      transitionProperty: "color, background-color, border-color",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      textAlign: "left",
      textDecoration: "none",
      whiteSpace: "normal",
      userSelect: "none",
      outline: "none",
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.primary",
        outlineOffset: "2px",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "0.75",
        pointerEvents: "none",
      },
    });
  });

  describe("variants", () => {
    it("should have color, variant, size, and open axes", () => {
      const s = createInstance();
      const recipe = useContextMenuSubTriggerRecipe(s);

      expect(Object.keys(recipe.variants!)).toEqual(["color", "variant", "size", "open"]);
      expect(Object.keys(recipe.variants!.open)).toEqual(["true", "false"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useContextMenuSubTriggerRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
      open: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 18 compound variants (9 surface + 9 open)", () => {
      const s = createInstance();
      const recipe = useContextMenuSubTriggerRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(18);
    });

    it("should paint the open state with the neutral solid hover surface", () => {
      const s = createInstance();
      const recipe = useContextMenuSubTriggerRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) =>
          v.match.color === "neutral" && v.match.variant === "solid" && v.match.open === "true",
      );

      expect(cv?.css).toEqual({
        background: "@color.gray-100",
        "&:dark": { background: "@color.gray-800" },
      });
    });
  });

  describe("filter", () => {
    it("should prune both surface and open compounds for filtered colors", () => {
      const s = createInstance();
      const recipe = useContextMenuSubTriggerRecipe(s, {
        filter: { color: ["neutral"] },
      });

      // 3 neutral surface + 3 neutral open
      expect(recipe.compoundVariants).toHaveLength(6);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
    });
  });
});
