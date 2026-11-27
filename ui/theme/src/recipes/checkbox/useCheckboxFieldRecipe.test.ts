import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useAriaInvalidModifier, useAriaReadonlyModifier } from "@styleframe/theme";
import {
  useCheckedModifier,
  useDisabledModifier,
  useIndeterminateModifier,
} from "@styleframe/theme";
import {
  useContrastMoreModifier,
  useDarkModifier,
  useForcedColorsModifier,
} from "@styleframe/theme";
import { useFocusVisibleModifier } from "@styleframe/theme";
import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { useCheckboxFieldRecipe } from "./useCheckboxFieldRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "appearance",
    "WebkitAppearance",
    "boxSizing",
    "display",
    "flexShrink",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "backgroundColor",
    "backgroundImage",
    "backgroundRepeat",
    "backgroundPosition",
    "backgroundSize",
    "cursor",
    "transitionProperty",
    "transitionDuration",
    "transitionTimingFunction",
    "width",
    "height",
    "opacity",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "position",
    "marginBlock",
    "backgroundClip",
    "boxShadow",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  // Tokens referenced inside composite values (calc, box-shadow) resolve
  // when the recipe registers its utilities.
  for (const name of [
    "color.error",
    "font-size.xs",
    "font-size.sm",
    "font-size.md",
    "line-height.normal",
  ]) {
    s.variable(name, "0");
  }
  useDarkModifier(s);
  useCheckedModifier(s);
  useIndeterminateModifier(s);
  useDisabledModifier(s);
  useFocusVisibleModifier(s);
  useAriaReadonlyModifier(s);
  useAriaInvalidModifier(s);
  useForcedColorsModifier(s);
  useContrastMoreModifier(s);
  return s;
}

describe("useCheckboxFieldRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCheckboxFieldRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("checkbox-field");
  });

  it("should build against the design-tokens, utilities, and modifiers presets", () => {
    const s = styleframe();
    useDesignTokensPreset(s);
    useUtilitiesPreset(s);
    useModifiersPreset(s);

    // Reproduces the real init environment: every declared property must
    // resolve to a registered utility (e.g. -webkit-appearance).
    expect(() => useCheckboxFieldRecipe(s)).not.toThrow();
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useCheckboxFieldRecipe(s);

    expect(recipe.base).toMatchObject({
      appearance: "none",
      boxSizing: "border-box",
      display: "inline-block",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      cursor: "pointer",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
    });
  });

  it("should fill the box with primary and paint an SVG mark when checked or indeterminate", () => {
    const s = createInstance();
    const recipe = useCheckboxFieldRecipe(s);

    const checked = recipe.base?.["&:checked"] as Record<string, string>;
    expect(checked).toMatchObject({
      backgroundColor: "@color.primary",
      borderColor: "@color.primary",
    });
    expect(checked.backgroundImage).toContain("data:image/svg+xml");
    expect(checked.backgroundImage).toContain("M3.5 8.5l3 3 6-6");

    const indeterminate = recipe.base?.["&:indeterminate"] as Record<string, string>;
    expect(indeterminate).toMatchObject({
      backgroundColor: "@color.primary",
      borderColor: "@color.primary",
    });
    expect(indeterminate.backgroundImage).toContain("M4 8h8");
  });

  it("should style focus-visible and disabled states", () => {
    const s = createInstance();
    const recipe = useCheckboxFieldRecipe(s);

    expect(recipe.base?.["&:focus-visible"]).toMatchObject({
      outlineColor: "@color.focus",
    });
    expect(recipe.base?.["&:disabled"]).toEqual({
      opacity: "0.5",
      cursor: "not-allowed",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
      expect(recipe.variants!.size.md).toEqual({
        width: "1rem",
        height: "1rem",
        marginBlock: "calc((@font-size.sm * @line-height.normal - 1rem) / 2)",
        borderRadius: "@border-radius.sm",
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useCheckboxFieldRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 3 compound variants", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should set the neutral unchecked surface and re-assert the checked fill in dark mode", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.color === "neutral");
      expect(cv?.css).toMatchObject({
        backgroundColor: "@color.white",
        borderColor: "@color.gray-450",
        "&:dark": {
          backgroundColor: "@color.gray-900",
          borderColor: "@color.gray-500",
        },
        "&:dark:checked": {
          backgroundColor: "@color.primary",
          borderColor: "@color.primary",
        },
        "&:dark:indeterminate": {
          backgroundColor: "@color.primary",
          borderColor: "@color.primary",
        },
      });
    });

    it("should keep fixed light/dark surfaces free of dark overrides", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      const light = recipe.compoundVariants!.find((v) => v.match.color === "light");
      expect(light?.css).toEqual({
        backgroundColor: "@color.white",
        borderColor: "@color.gray-450",
        "&:contrast-more": {
          borderColor: "@color.gray-900",
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base?.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compound variants", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants).toHaveLength(1);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
    });
  });

  describe("Open Components rules", () => {
    type Block = Record<string, unknown>;

    function allKeys(block: Block, prefix = ""): Array<string> {
      return Object.entries(block).flatMap(([key, value]) =>
        typeof value === "object" && value !== null
          ? [prefix + key, ...allKeys(value as Block, prefix + key)]
          : [],
      );
    }

    function recipeKeys() {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);
      return [
        ...allKeys(recipe.base as Block),
        ...Object.values(recipe.variants!).flatMap((axis) =>
          Object.values(axis).flatMap((value) => allKeys(value as Block)),
        ),
        ...recipe.compoundVariants!.flatMap((cv) => allKeys(cv.css as Block)),
      ];
    }

    it("checkbox/focus-visible draws a 2px @color.focus outline outside the box on :focus-visible", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(recipe.base?.["&:focus-visible"]).toEqual({
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.focus",
        outlineOffset: "2px",
      });
    });

    it("checkbox/distinct-marks paints a check when checked and a dash when indeterminate", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      const checked = recipe.base?.["&:checked"] as Block;
      const indeterminate = recipe.base?.["&:indeterminate"] as Block;
      expect(checked.backgroundImage).toContain("M3.5 8.5l3 3 6-6");
      expect(indeterminate.backgroundImage).toContain("M4 8h8");
      expect(checked.backgroundImage).not.toBe(indeterminate.backgroundImage);
    });

    it("checkbox/resizable sizes the box in rem", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      for (const size of Object.values(recipe.variants!.size) as Array<Block>) {
        expect(size.width).toMatch(/rem$/);
        expect(size.height).toBe(size.width);
        expect(size.marginBlock).toContain("@line-height.normal");
      }
    });

    it("checkbox/stable-size changes no size in any state", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);
      const states = Object.entries(recipe.base!).filter(
        ([key, value]) => key.startsWith("&:") && typeof value === "object",
      );

      expect(states.length).toBeGreaterThan(0);
      for (const [, block] of states) {
        for (const property of [
          "width",
          "height",
          "borderWidth",
          "padding",
          "margin",
          "marginBlock",
        ]) {
          expect(block).not.toHaveProperty(property);
        }
      }
      expect(recipe.base?.["&:aria-invalid"]).toMatchObject({
        boxShadow: "inset 0 0 0 1px @color.error",
      });
    });

    it("checkbox/state-selectors styles read-only and invalid from aria attributes, never from :read-only or :invalid", () => {
      const keys = recipeKeys();

      expect(keys).toEqual(
        expect.arrayContaining([
          "&:checked",
          "&:indeterminate",
          "&:disabled",
          "&:aria-readonly",
          "&:aria-invalid",
        ]),
      );
      for (const key of keys) {
        expect(key).not.toMatch(/:(invalid|read-only|readonly)(:|$)/);
      }
    });

    it("checkbox/hover-capable applies no hover style outside @media (hover: hover)", () => {
      for (const key of recipeKeys()) {
        if (key.includes(":hover")) {
          expect(key).toContain("hover-capable");
        }
      }
    });

    it("checkbox/invalid-state draws an error border from aria-invalid, re-asserted in dark mode", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(recipe.base?.["&:aria-invalid"]).toEqual({
        borderColor: "@color.error",
        boxShadow: "inset 0 0 0 1px @color.error",
      });
      expect(recipe.base?.["&:aria-invalid:checked"]).toEqual({
        borderColor: "@color.error",
      });
      expect(recipe.base?.["&:aria-invalid:indeterminate"]).toEqual({
        borderColor: "@color.error",
      });
      const neutral = recipe.compoundVariants!.find((v) => v.match.color === "neutral")
        ?.css as Block;
      expect(neutral["&:dark:aria-invalid"]).toEqual({
        borderColor: "@color.error",
      });
    });

    it("checkbox/read-only gives aria-readonly a dashed border and a default cursor", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(recipe.base?.["&:aria-readonly"]).toEqual({
        borderStyle: "@border-style.dashed",
        backgroundClip: "padding-box",
        cursor: "default",
      });
    });

    it("checkbox/forced-colors marks checked, indeterminate, focus and disabled with system colours", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);
      const base = recipe.base as Record<string, Block>;

      // The outlined marks: a black stroke under the white one, on the same path.
      const outlinedCheck = expect.stringMatching(
        /M3\.5 8\.5l3 3 6-6' stroke='black'.*M3\.5 8\.5l3 3 6-6' stroke='white'/,
      );
      const outlinedDash = expect.stringMatching(/M4 8h8' stroke='black'.*M4 8h8' stroke='white'/);
      const gray = { backgroundColor: "GrayText", borderColor: "GrayText" };

      expect(base["&:forced-colors:checked"]).toEqual({
        backgroundColor: "Highlight",
        borderColor: "Highlight",
        backgroundImage: outlinedCheck,
      });
      expect(base["&:forced-colors:checked"]?.backgroundImage).not.toContain("M4 8h8");
      expect(base["&:forced-colors:indeterminate"]).toEqual({
        backgroundColor: "Highlight",
        borderColor: "Highlight",
        backgroundImage: outlinedDash,
      });
      expect(base["&:forced-colors:indeterminate"]?.backgroundImage).not.toContain(
        "M3.5 8.5l3 3 6-6",
      );
      expect(base["&:forced-colors:focus-visible"]).toEqual({
        outlineColor: "Highlight",
      });
      expect(base["&:forced-colors:disabled"]).toEqual({
        opacity: "1",
        borderColor: "GrayText",
      });
      expect(base["&:forced-colors:disabled:checked"]).toEqual(gray);
      expect(base["&:forced-colors:disabled:indeterminate"]).toEqual(gray);

      // The neutral dark surface out-specifies the base rules, so each one is
      // re-asserted under `&:dark`.
      const neutral = recipe.compoundVariants!.find((v) => v.match.color === "neutral")
        ?.css as Record<string, Block>;
      const highlight = {
        backgroundColor: "Highlight",
        borderColor: "Highlight",
      };
      expect(neutral["&:dark:forced-colors:checked"]).toEqual(highlight);
      expect(neutral["&:dark:forced-colors:indeterminate"]).toEqual(highlight);
      expect(neutral["&:dark:forced-colors:disabled"]).toEqual({
        borderColor: "GrayText",
      });
      expect(neutral["&:dark:forced-colors:disabled:checked"]).toEqual(gray);
      expect(neutral["&:dark:forced-colors:disabled:indeterminate"]).toEqual(gray);
    });

    it("checkbox/more-contrast draws the border at full strength for every color", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);
      const css = (color: string) =>
        recipe.compoundVariants!.find((v) => v.match.color === color)?.css as Record<string, Block>;

      expect(css("light")["&:contrast-more"]).toEqual({
        borderColor: "@color.gray-900",
      });
      expect(css("dark")["&:contrast-more"]).toEqual({
        borderColor: "@color.white",
      });
      expect(css("neutral")["&:contrast-more"]).toEqual({
        borderColor: "@color.text",
      });
      expect(css("neutral")["&:dark:contrast-more"]).toEqual({
        borderColor: "@color.text",
      });
    });

    it("checkbox/mirrors-in-rtl uses only block-axis spacing on the box", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      for (const size of Object.values(recipe.variants!.size) as Array<Block>) {
        for (const property of [
          "marginLeft",
          "marginRight",
          "paddingLeft",
          "paddingRight",
          "left",
          "right",
        ]) {
          expect(size).not.toHaveProperty(property);
        }
      }
    });

    it("checkbox/target-size keeps the box above the checkbox hit area", () => {
      const s = createInstance();
      const recipe = useCheckboxFieldRecipe(s);

      expect(recipe.base?.position).toBe("relative");
    });
  });
});
