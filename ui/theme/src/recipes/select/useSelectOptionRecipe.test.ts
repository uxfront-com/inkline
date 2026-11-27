import { styleframe } from "@styleframe/core";

import { useAriaDisabledModifier, useAriaSelectedModifier } from "@styleframe/theme";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
  useActiveModifier,
  useFocusModifier,
  useFocusVisibleModifier,
  useHoverModifier,
} from "@styleframe/theme";
import { useSelectOptionRecipe } from "./useSelectOptionRecipe";

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
  useAriaSelectedModifier(s);
  useAriaDisabledModifier(s);
  return s;
}

describe("useSelectOptionRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSelectOptionRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("select-option");
  });

  it("should style the selected and disabled states in base", () => {
    const s = createInstance();
    const recipe = useSelectOptionRecipe(s);

    // The selected weight lives in base; the selected background is per-color
    // (see compound variants) so `light`/`dark` stay theme-fixed.
    expect(recipe.base).toMatchObject({
      display: "flex",
      width: "100%",
      cursor: "pointer",
      "&:aria-selected": {
        fontWeight: "@font-weight.medium",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "0.75",
        pointerEvents: "none",
      },
      "&:aria-disabled": {
        cursor: "not-allowed",
        opacity: "0.75",
        pointerEvents: "none",
      },
    });
    // The adaptive background must NOT be in base.
    expect(
      (recipe.base as Record<string, Record<string, unknown>>)["&:aria-selected"]?.background,
    ).toBeUndefined();
  });

  it("should keep the selected tint theme-fixed for light/dark, adaptive for neutral", () => {
    const s = createInstance();
    const recipe = useSelectOptionRecipe(s);

    const colorOnly = (color: string) =>
      recipe.compoundVariants!.find(
        (cv) => cv.match.color === color && cv.match.variant === undefined,
      );

    // light stays light in both themes
    expect(colorOnly("light")?.css).toEqual({
      "&:aria-selected": { background: "@color.gray-100" },
      "&:dark:aria-selected": { background: "@color.gray-100" },
    });
    // dark stays dark in both themes
    expect(colorOnly("dark")?.css).toEqual({
      "&:aria-selected": { background: "@color.gray-800" },
      "&:dark:aria-selected": { background: "@color.gray-800" },
    });
    // neutral adapts
    expect(colorOnly("neutral")?.css).toEqual({
      "&:aria-selected": { background: "@color.gray-100" },
      "&:dark:aria-selected": { background: "@color.gray-800" },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSelectOptionRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have the dropdown-style variant axis (solid, soft, subtle)", () => {
      const s = createInstance();
      const recipe = useSelectOptionRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should have size variants", () => {
      const s = createInstance();
      const recipe = useSelectOptionRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSelectOptionRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 12 compound variants total", () => {
      const s = createInstance();
      const recipe = useSelectOptionRecipe(s);

      // 9 color×variant + 3 color-only selected-tint compounds
      expect(recipe.compoundVariants).toHaveLength(12);
    });

    it("should have neutral solid hover/focus/active states", () => {
      const s = createInstance();
      const recipe = useSelectOptionRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "solid",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "solid" },
        css: {
          color: "@color.text",
          "&:hover": { background: "@color.gray-100" },
          "&:focus": { background: "@color.gray-100" },
          "&:active": { background: "@color.gray-150" },
          "&:dark": { color: "@color.white" },
          "&:dark:hover": { background: "@color.gray-800" },
          "&:dark:focus": { background: "@color.gray-800" },
          "&:dark:active": { background: "@color.gray-750" },
        },
      });
    });
  });

  describe("setup callback", () => {
    it("should register the check slot and its reveal selector", () => {
      const s = createInstance();
      useSelectOptionRecipe(s);

      const queries = s.root.children
        .filter((child) => child.type === "selector")
        .map((child) => (child as { query: string }).query);

      expect(queries).toContain(".select-option-check");
      expect(queries).toContain('.select-option[aria-selected="true"] .select-option-check');
    });

    it("should pin the check to the trailing edge via margin-left auto", () => {
      const s = createInstance();
      useSelectOptionRecipe(s);

      const checkSelector = s.root.children.find(
        (child) =>
          child.type === "selector" &&
          (child as { query: string }).query === ".select-option-check",
      ) as { declarations: Record<string, unknown> } | undefined;

      expect(checkSelector?.declarations.marginLeft).toBe("auto");
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compounds", () => {
      const s = createInstance();
      const recipe = useSelectOptionRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      // 3 neutral color×variant + 1 neutral color-only selected-tint compound
      expect(recipe.compoundVariants).toHaveLength(4);
    });
  });
});
