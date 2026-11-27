import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";

import {
  useDarkModifier,
  useForcedColorsModifier,
  useHoverCapableModifier,
} from "@styleframe/theme";
import { useFocusWithinModifier, useHoverModifier } from "@styleframe/theme";
import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { useInputPrefixRecipe } from "./useInputPrefixRecipe";
import { useInputRecipe } from "./useInputRecipe";
import { useInputSuffixRecipe } from "./useInputSuffixRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "flexGrow",
    "minWidth",
    "width",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "border",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "borderBottomColor",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "padding",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "background",
    "color",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "cursor",
    "opacity",
    "minHeight",
    "boxShadow",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  s.variable("color.text-weakest", "#64748B", { default: true });
  s.variable("color.error", "#D22E3E", { default: true });
  s.variable("border-style.dashed", "dashed", { default: true });
  s.variable("spacing", "1rem", { default: true });
  useDarkModifier(s);
  useHoverCapableModifier(s);
  useForcedColorsModifier(s);
  useHoverModifier(s);
  useFocusWithinModifier(s);
  return s;
}

describe("useInputRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useInputRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("input");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useInputRecipe(s);

    expect(recipe.base).toEqual({
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "inherit",
      fontSize: "@font-size.sm",
      fontWeight: "@font-weight.normal",
      lineHeight: "@line-height.normal",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      paddingTop: "@0.5",
      paddingBottom: "@0.5",
      paddingLeft: "@0.75",
      paddingRight: "@0.75",
      background: "transparent",
      color: "@color.text",
      outline: "none",
      transitionProperty: "color, background-color, border-color",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      "&:focus-within": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.focus",
        outlineOffset: "2px",
      },
      "&:forced-colors:focus-within": {
        outlineColor: "Highlight",
      },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["default", "soft", "ghost"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          fontSize: "@font-size.xs",
          minHeight: "2rem",
          paddingTop: "@0.375",
          paddingBottom: "@0.375",
          paddingLeft: "@0.625",
          paddingRight: "@0.625",
          borderRadius: "@border-radius.sm",
        },
        md: {
          fontSize: "@font-size.sm",
          minHeight: "2.25rem",
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.75",
          paddingRight: "@0.75",
          borderRadius: "@border-radius.md",
        },
        lg: {
          fontSize: "@font-size.md",
          minHeight: "2.5rem",
          paddingTop: "@0.625",
          paddingBottom: "@0.625",
          paddingLeft: "@0.875",
          paddingRight: "@0.875",
          borderRadius: "@border-radius.md",
        },
      });
    });

    it("should have invalid boolean variants", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      expect(recipe.variants!.invalid).toEqual({
        true: {},
        false: {},
      });
    });

    it("should have disabled boolean variants", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      expect(recipe.variants!.disabled).toEqual({
        true: {},
        false: {},
      });
    });

    it("should have readonly boolean variants", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      expect(recipe.variants!.readonly).toEqual({
        true: {},
        false: {},
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useInputRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "default",
      size: "md",
      invalid: "false",
      disabled: "false",
      readonly: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 12 compound variants total", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      // 3 colors × 3 variants = 9, plus 3 standalone (invalid, readonly, disabled)
      expect(recipe.compoundVariants).toHaveLength(12);
    });

    it("should have correct light default compound variant", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "light" && v.match.variant === "default",
      );

      expect(cv).toEqual({
        match: { color: "light", variant: "default" },
        css: {
          background: "@color.white",
          borderColor: "@color.gray-450",
          color: "@color.text",
          "&:hover-capable:hover": {
            borderColor: "@color.gray-500",
          },
          "&:dark": {
            background: "@color.white",
            borderColor: "@color.gray-450",
            color: "@color.text-inverted",
          },
          "&:dark:hover-capable:hover": {
            borderColor: "@color.gray-500",
          },
        },
      });
    });

    it("should have correct dark soft compound variant", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "dark" && v.match.variant === "soft",
      );

      expect(cv).toEqual({
        match: { color: "dark", variant: "soft" },
        css: {
          background: "@color.gray-800",
          borderColor: "@color.gray-500",
          color: "@color.gray-300",
          "&:hover-capable:hover": {
            borderColor: "@color.gray-450",
          },
          "&:dark": {
            background: "@color.gray-800",
            borderColor: "@color.gray-500",
            color: "@color.gray-300",
          },
          "&:dark:hover-capable:hover": {
            borderColor: "@color.gray-450",
          },
        },
      });
    });

    it("should have correct neutral default compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "default",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "default" },
        css: {
          background: "@color.white",
          borderColor: "@color.gray-450",
          color: "@color.text",
          "&:hover-capable:hover": {
            borderColor: "@color.gray-500",
          },
          "&:dark": {
            background: "@color.gray-900",
            borderColor: "@color.gray-500",
            color: "@color.white",
          },
          "&:dark:hover-capable:hover": {
            borderColor: "@color.gray-450",
          },
        },
      });
    });

    it("should give the neutral ghost compound variant an adaptive bottom border and square bottom corners", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "ghost",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "ghost" },
        css: {
          background: "transparent",
          borderColor: "transparent",
          borderBottomColor: "@color.gray-450",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          color: "@color.text",
          "&:hover-capable:hover": {
            borderBottomColor: "@color.gray-500",
          },
          "&:dark": {
            background: "transparent",
            borderColor: "transparent",
            borderBottomColor: "@color.gray-500",
            color: "@color.white",
          },
          "&:dark:hover-capable:hover": {
            borderBottomColor: "@color.gray-450",
          },
        },
      });
    });

    it("should paint a ghost invalid bottom border with the error color", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const ghost = recipe.compoundVariants!.findIndex(
        (v) => v.match.color === "neutral" && v.match.variant === "ghost",
      );
      const invalid = recipe.compoundVariants!.findIndex((v) => v.match.invalid === "true");

      // A later compound replaces an earlier one's key, so invalid must follow ghost.
      expect(invalid).toBeGreaterThan(ghost);
      expect(recipe.compoundVariants![invalid]!.css).toMatchObject({
        borderBottomColor: "@color.error",
        "&:hover-capable:hover": { borderBottomColor: "@color.error" },
        "&:dark": { borderBottomColor: "@color.error" },
        "&:dark:hover-capable:hover": { borderBottomColor: "@color.error" },
      });
    });

    it("should have correct invalid compound variant with an error border and inset shadow", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.invalid === "true");

      expect(cv).toEqual({
        match: { invalid: "true" },
        css: {
          borderColor: "@color.error",
          borderBottomColor: "@color.error",
          boxShadow: "inset 0 0 0 1px @color.error",
          "&:hover-capable:hover": {
            borderColor: "@color.error",
            borderBottomColor: "@color.error",
          },
          "&:dark": {
            borderColor: "@color.error",
            borderBottomColor: "@color.error",
          },
          "&:dark:hover-capable:hover": {
            borderColor: "@color.error",
            borderBottomColor: "@color.error",
          },
        },
      });
    });

    it("should have correct readonly compound variant with a dashed border", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.readonly === "true");

      expect(cv).toEqual({
        match: { readonly: "true" },
        css: {
          borderStyle: "@border-style.dashed",
          cursor: "default",
        },
      });
    });

    it("should have correct disabled compound variant with dimmed styling", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.disabled === "true");

      expect(cv).toEqual({
        match: { disabled: "true" },
        css: {
          opacity: "0.5",
          cursor: "not-allowed",
          "&:forced-colors": {
            borderColor: "GrayText",
            color: "GrayText",
            opacity: "1",
          },
          "&:dark:forced-colors": {
            borderColor: "GrayText",
            color: "GrayText",
          },
        },
      });
    });
  });

  describe("setup callback", () => {
    it("should register a .input-field selector with transparent styling", () => {
      const s = createInstance();
      useInputRecipe(s);

      const inputFieldSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".input-field",
      ) as { type: "selector"; query: string; children: Array<unknown> } | undefined;

      expect(inputFieldSelector).toBeDefined();
      expect(inputFieldSelector?.query).toBe(".input-field");
    });

    it("should give the disabled nested input a not-allowed cursor", () => {
      const s = createInstance();
      useInputRecipe(s);

      const inputFieldSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".input-field",
      ) as
        | {
            children: Array<{
              query: string;
              declarations: Record<string, unknown>;
            }>;
          }
        | undefined;

      expect(
        inputFieldSelector?.children.find((child) => child.query === "&:disabled")?.declarations,
      ).toEqual({ cursor: "not-allowed" });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base!.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s, {
        filter: { color: ["neutral"] },
      });

      // Every color-scoped compound variant should be for `neutral`;
      // the standalone invalid/readonly/disabled compounds have no `color` field.
      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.color === undefined || cv.match.color === "neutral",
        ),
      ).toBe(true);
      expect(recipe.compoundVariants!.length).toBeLessThan(12);
    });

    it("should filter variant axis", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s, {
        filter: { variant: ["default", "soft"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["default", "soft"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useInputRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("default");
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});

/**
 * One test per stylesheet rule on the Open Components Input page. The
 * contrast rules (`input/contrast`, `input/boundary-contrast`) are in
 * `fieldSurfaceContrast.test.ts`.
 */
describe("Open Components rules", () => {
  type Node = {
    type: string;
    query?: string;
    rule?: string;
    declarations: Record<string, unknown>;
    children: Array<Node>;
  };

  function createPresetInstance(options?: Parameters<typeof styleframe>[0]) {
    const s = styleframe(options);
    useDesignTokensPreset(s);
    useModifiersPreset(s);
    useUtilitiesPreset(s);
    const recipe = useInputRecipe(s);
    return { s, recipe };
  }

  const selectors = (s: ReturnType<typeof styleframe>) =>
    s.root.children.filter((child) => child.type === "selector") as Array<Node>;

  function find(s: ReturnType<typeof styleframe>, query: string) {
    return selectors(s).filter((child) => child.query === query);
  }

  function media(nodes: Array<Node>, rule: string) {
    return nodes
      .flatMap((node) => node.children)
      .find((child) => child.type === "at-rule" && child.rule === rule);
  }

  // The input's touch-screen declarations, from every `.input-field` rule.
  function coarse(s: ReturnType<typeof styleframe>) {
    return Object.assign(
      {},
      ...find(s, ".input-field")
        .flatMap((node) => node.children)
        .filter((child) => child.rule === "(any-pointer: coarse)")
        .map((child) => child.declarations),
    ) as Record<string, unknown>;
  }

  const state = (attribute: string) => `.input:has(> .input-field${attribute})`;

  const css = (cv: { css?: unknown }) => cv.css as Record<string, unknown>;

  // Every key of a declarations block, nested blocks included.
  function keys(block: Record<string, unknown>): Array<string> {
    return Object.entries(block).flatMap(([key, value]) =>
      value && typeof value === "object" && !("type" in value)
        ? [key, ...keys(value as Record<string, unknown>)]
        : [key],
    );
  }

  it("input/focus-visible draws a 2px @color.focus ring outside the field in every state", () => {
    const { s, recipe } = createPresetInstance();

    expect(recipe.base!["&:focus-within"]).toEqual({
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.focus",
      outlineOffset: "2px",
    });
    for (const cv of recipe.compoundVariants!) {
      expect(keys(css(cv)).filter((key) => key.includes("outline"))).toEqual([]);
    }
    for (const node of selectors(s).filter((n) => n.query!.startsWith(".input:has"))) {
      expect(JSON.stringify(node)).not.toContain("outline");
    }
  });

  it("input/target-size keeps the field at least 24px tall and gives the input a 44px hit area on touch screens", () => {
    const { s, recipe } = createPresetInstance();

    expect(recipe.variants!.size.sm.minHeight).toBe("2rem");
    // 16px text on a 1.5 line is 24px, and 10px above and below make 44px.
    expect(coarse(s)).toMatchObject({ backgroundClip: "padding-box" });
    const output = consumeCSS(s.root, s.options);
    expect(output).toContain("margin-block: calc(var(--spacing) * -0.625);");
    expect(output).toContain("border-block: calc(var(--spacing) * 0.625) solid transparent;");
  });

  it("input/no-zoom-on-focus sets the input's text to at least 16px on touch screens", () => {
    const { s } = createPresetInstance();

    expect(coarse(s).fontSize).toBe("max(1em, 1rem)");
  });

  it("input/resizable sizes the field with a min-height in rem and no fixed height", () => {
    const { recipe } = createPresetInstance();

    for (const size of Object.values(recipe.variants!.size)) {
      expect(size.minHeight).toMatch(/^[\d.]+rem$/);
      expect(size).not.toHaveProperty("height");
    }
    expect(recipe.base).not.toHaveProperty("height");
  });

  it("input/stable-size changes no size in any state", () => {
    const { s, recipe } = createPresetInstance();
    const sizing = /^(padding|margin|width|height|minHeight|fontSize|lineHeight|borderWidth)/;

    const states = recipe.compoundVariants!.filter((cv) => !cv.match.color && !cv.match.variant);
    expect(states).toHaveLength(3);
    for (const cv of states) {
      expect(keys(css(cv)).filter((key) => sizing.test(key))).toEqual([]);
    }
    for (const node of selectors(s).filter((n) => n.query!.startsWith(".input:has"))) {
      expect(keys(node.declarations).filter((key) => sizing.test(key))).toEqual([]);
    }
  });

  it("input/state-selectors styles states from the native input's attributes, never :invalid or :read-only", () => {
    const { s } = createPresetInstance();

    for (const attribute of ['[aria-invalid="true"]', "[readonly]", ":disabled"]) {
      expect(find(s, state(attribute)), attribute).toHaveLength(1);
    }
    const all = JSON.stringify([
      selectors(s).map((node) => node.query),
      createPresetInstance().recipe,
    ]);
    expect(all).not.toMatch(/:(user-)?invalid|:read-only|&:readonly"/);
  });

  it("input/invalid-state shows invalid through the border and an inset shadow, from aria-invalid or the class", () => {
    const { s, recipe } = createPresetInstance();
    const shadow = "inset 0 0 0 1px @color.error";

    expect(css(recipe.compoundVariants!.find((cv) => cv.match.invalid === "true")!)).toMatchObject({
      borderColor: "@color.error",
      boxShadow: shadow,
    });
    const [invalid] = find(s, state('[aria-invalid="true"]'));
    expect(invalid!.declarations).toMatchObject({
      borderColor: expect.objectContaining({ name: "color.error" }),
      boxShadow: expect.objectContaining({ type: "css" }),
    });
  });

  it("input/hover-capable puts every hover style behind @media (hover: hover)", () => {
    const { s, recipe } = createPresetInstance();

    const recipeKeys = [
      ...keys(recipe.base!),
      ...recipe.compoundVariants!.flatMap((cv) => keys(css(cv))),
    ];
    const hovers = recipeKeys.filter((key) => key.includes(":hover"));
    expect(hovers.length).toBeGreaterThan(0);
    for (const key of hovers) {
      expect(key).toMatch(/:hover-capable:hover$/);
    }
    const [invalid] = find(s, state('[aria-invalid="true"]'));
    expect(media([invalid!], "(hover: hover)")?.children[0]?.query).toBe("&:hover");
  });

  it("input/forced-colors keeps the focus, disabled and read-only states visible", () => {
    const { s, recipe } = createPresetInstance();
    const visible = {
      borderColor: "GrayText",
      color: "GrayText",
      opacity: "1",
    };

    expect(recipe.base!["&:forced-colors:focus-within"]).toEqual({
      outlineColor: "Highlight",
    });
    expect(
      css(recipe.compoundVariants!.find((cv) => cv.match.disabled === "true")!)["&:forced-colors"],
    ).toEqual(visible);
    expect(media(find(s, state(":disabled")), "(forced-colors: active)")?.declarations).toEqual(
      visible,
    );
    // A dashed border survives forced colors, so read-only needs no override.
    expect(css(recipe.compoundVariants!.find((cv) => cv.match.readonly === "true")!)).toMatchObject(
      { borderStyle: "@border-style.dashed" },
    );
  });

  it("input/more-contrast draws every border in the text color with prefers-contrast: more", () => {
    const { s, recipe } = createPresetInstance();

    const borders = new Set(
      recipe
        .compoundVariants!.filter((cv) => cv.match.color)
        .flatMap((cv) =>
          JSON.stringify(cv.css).match(/@color\.gray-4[0-9]+|@color\.gray-5[0-9]+/g),
        ),
    );
    expect([...borders].sort((a, b) => String(a).localeCompare(String(b)))).toEqual([
      "@color.gray-450",
      "@color.gray-500",
    ]);
    expect(media(find(s, ".input"), "(prefers-contrast: more)")).toBeDefined();
  });

  it("input/more-contrast overrides the border colors under the instance's own variable names", () => {
    const { s } = createPresetInstance({
      variables: { name: ({ name }) => `sf-${name.replaceAll(".", "-")}` },
    });

    const output = consumeCSS(s.root, s.options);
    expect(output).toContain("var(--sf-color-gray-450)");
    expect(output).toMatch(
      /@media \(prefers-contrast: more\) \{\s+--sf-color-gray-450: currentColor;\s+--sf-color-gray-500: currentColor;/,
    );
  });

  it("input/mirrors-in-rtl uses logical padding for the prefix and suffix, and the same padding on both sides", () => {
    const { s, recipe } = createPresetInstance();
    const prefix = useInputPrefixRecipe(s);
    const suffix = useInputSuffixRecipe(s);

    for (const size of Object.values(prefix.variants!.size)) {
      expect(Object.keys(size)).toContain("paddingInlineEnd");
    }
    for (const size of Object.values(suffix.variants!.size)) {
      expect(Object.keys(size)).toContain("paddingInlineStart");
    }
    for (const block of [recipe.base!, ...Object.values(recipe.variants!.size)]) {
      expect(block.paddingLeft).toBe(block.paddingRight);
    }
  });
});
