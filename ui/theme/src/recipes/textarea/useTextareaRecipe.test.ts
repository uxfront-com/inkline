import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";

import {
  useDarkModifier,
  useForcedColorsModifier,
  useHoverCapableModifier,
} from "@styleframe/theme";
import { useFocusWithinModifier, useHoverModifier } from "@styleframe/theme";
import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { useTextareaPrefixRecipe } from "./useTextareaPrefixRecipe";
import { useTextareaRecipe } from "./useTextareaRecipe";
import { useTextareaSuffixRecipe } from "./useTextareaSuffixRecipe";

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
  useDarkModifier(s);
  useHoverCapableModifier(s);
  useForcedColorsModifier(s);
  useHoverModifier(s);
  useFocusWithinModifier(s);
  return s;
}

describe("useTextareaRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useTextareaRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("textarea");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useTextareaRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      alignItems: "flex-start",
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
      const recipe = useTextareaRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["default", "soft", "ghost"]);
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

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

    it("should have all resize variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(Object.keys(recipe.variants!.resize)).toEqual([
        "none",
        "vertical",
        "horizontal",
        "both",
      ]);
    });

    it("should have autogrow boolean variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(recipe.variants!.autogrow).toEqual({
        true: {},
        false: {},
      });
    });

    it("should have invalid boolean variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(recipe.variants!.invalid).toEqual({
        true: {},
        false: {},
      });
    });

    it("should have disabled boolean variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(recipe.variants!.disabled).toEqual({
        true: {},
        false: {},
      });
    });

    it("should have readonly boolean variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(recipe.variants!.readonly).toEqual({
        true: {},
        false: {},
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useTextareaRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "default",
      size: "md",
      resize: "vertical",
      autogrow: "false",
      invalid: "false",
      disabled: "false",
      readonly: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 17 compound variants total", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      // 3 colors × 3 variants = 9, plus 3 standalone states
      // (invalid, readonly, disabled), plus 4 resize markers and the
      // autogrow marker.
      expect(recipe.compoundVariants).toHaveLength(17);
    });

    it("should have correct neutral default compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

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
      const recipe = useTextareaRecipe(s);

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
      const recipe = useTextareaRecipe(s);

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

    it("should have correct readonly compound variant with a dashed border", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.readonly === "true");

      expect(cv).toEqual({
        match: { readonly: "true" },
        css: {
          borderStyle: "@border-style.dashed",
          cursor: "default",
        },
      });
    });

    it("should have correct invalid compound variant with an error border and inset shadow", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

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

    it("should have correct disabled compound variant with dimmed styling", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

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

    it("should map each resize value to a marker class", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s);

      expect(recipe.compoundVariants!.find((v) => v.match.resize === "vertical")).toEqual({
        match: { resize: "vertical" },
        className: "-resize-vertical",
      });
      expect(recipe.compoundVariants!.find((v) => v.match.resize === "both")).toEqual({
        match: { resize: "both" },
        className: "-resize-both",
      });
    });
  });

  describe("setup callback", () => {
    it("should register a .textarea-field selector with transparent styling", () => {
      const s = createInstance();
      useTextareaRecipe(s);

      const fieldSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".textarea-field",
      );

      expect(fieldSelector).toBeDefined();
    });

    it("should register resize selectors targeting the nested field", () => {
      const s = createInstance();
      useTextareaRecipe(s);

      const expectedQueries = [
        ".textarea.-resize-none .textarea-field",
        ".textarea.-resize-vertical .textarea-field",
        ".textarea.-resize-horizontal .textarea-field",
        ".textarea.-resize-both .textarea-field",
      ];

      for (const query of expectedQueries) {
        const rule = s.root.children.find(
          (child) => child.type === "selector" && (child as { query: string }).query === query,
        );
        expect(rule, `missing resize selector: ${query}`).toBeDefined();
      }
    });

    it("should give the disabled nested textarea a not-allowed cursor", () => {
      const s = createInstance();
      useTextareaRecipe(s);

      const fieldSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".textarea-field",
      ) as
        | {
            children: Array<{
              query: string;
              declarations: Record<string, unknown>;
            }>;
          }
        | undefined;

      expect(
        fieldSelector?.children.find((child) => child.query === "&:disabled")?.declarations,
      ).toEqual({ cursor: "not-allowed" });
    });

    it("should turn the resize handle off on a disabled textarea, after every resize selector", () => {
      const s = createInstance();
      useTextareaRecipe(s);

      const queries = s.root.children
        .filter((child) => child.type === "selector")
        .map((child) => (child as { query: string }).query);
      const disabledIndex = queries.indexOf(".textarea .textarea-field:disabled");
      const disabledRule = s.root.children.find(
        (child) =>
          child.type === "selector" &&
          (child as { query: string }).query === ".textarea .textarea-field:disabled",
      ) as { declarations: Record<string, unknown> } | undefined;

      expect(disabledRule?.declarations).toEqual({ resize: "none" });
      for (const query of queries.filter((q) => q.includes("-resize-"))) {
        expect(disabledIndex, query).toBeGreaterThan(queries.indexOf(query));
      }
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base!.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s, {
        filter: { color: ["neutral"] },
      });

      // Every color-scoped compound variant should be for `neutral`; the
      // standalone state and resize compounds have no `color` field.
      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.color === undefined || cv.match.color === "neutral",
        ),
      ).toBe(true);
      expect(recipe.compoundVariants!.length).toBeLessThan(17);
    });

    it("should keep resize variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.resize)).toEqual([
        "none",
        "vertical",
        "horizontal",
        "both",
      ]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useTextareaRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.resize).toBe("vertical");
      expect(recipe.defaultVariants?.size).toBe("md");
    });
  });
});

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
    const recipe = useTextareaRecipe(s);
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

  // The declarations of every `query` rule, merged, or of its `rule` blocks.
  function declarations(s: ReturnType<typeof styleframe>, query: string, rule?: string) {
    const nodes = find(s, query);
    return Object.assign(
      {},
      ...(rule
        ? nodes.flatMap((node) => node.children).filter((child) => child.rule === rule)
        : nodes
      ).map((node) => node.declarations),
    ) as Record<string, unknown>;
  }

  const state = (attribute: string) => `.textarea:has(> .textarea-field${attribute})`;
  const autogrow = ".textarea.-autogrow .textarea-field";
  const lines = (attribute: string, fallback = "") =>
    `calc(attr(${attribute} type(<number>)${fallback}) * 1lh)`;

  const css = (cv: { css?: unknown }) => cv.css as Record<string, unknown>;

  // Every key of a declarations block, nested blocks included.
  function keys(block: Record<string, unknown>): Array<string> {
    return Object.entries(block).flatMap(([key, value]) =>
      value && typeof value === "object" && !("type" in value)
        ? [key, ...keys(value as Record<string, unknown>)]
        : [key],
    );
  }

  it("textarea/focus-visible draws a 2px @color.focus ring outside the field in every state", () => {
    const { s, recipe } = createPresetInstance();

    expect(recipe.base!["&:focus-within"]).toEqual({
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.focus",
      outlineOffset: "2px",
    });
    for (const cv of recipe.compoundVariants!) {
      expect(keys(css(cv) ?? {}).filter((key) => key.includes("outline"))).toEqual([]);
    }
    for (const node of selectors(s).filter((n) => n.query!.startsWith(".textarea:has"))) {
      expect(JSON.stringify(node)).not.toContain("outline");
    }
  });

  it("textarea/target-size keeps the field at least 24px tall, and the textarea itself 44px tall on touch screens", () => {
    const { s, recipe } = createPresetInstance();

    expect(recipe.variants!.size.sm.minHeight).toBe("2rem");
    // The textarea takes the pointer, so it gets the 44px itself: 2.75rem
    // first, then the larger of that and its rows, where typed attr() works.
    const coarse = find(s, ".textarea-field")
      .flatMap((node) => node.children)
      .filter((child) => child.rule === "(any-pointer: coarse)")
      .map((child) => child.declarations.minHeight)
      .filter(Boolean);
    expect(coarse).toEqual(["2.75rem", `max(${lines("rows", ", 2")}, 2.75rem)`]);
    expect(find(s, ".textarea:has(> .textarea-field)")).toEqual([]);
  });

  it("textarea/no-zoom-on-focus sets the textarea's text to at least 16px on touch screens", () => {
    const { s } = createPresetInstance();

    expect(declarations(s, ".textarea-field", "(any-pointer: coarse)").fontSize).toBe(
      "max(1em, 1rem)",
    );
  });

  it("textarea/min-rows never lets the textarea get shorter than its rows, resized or growing", () => {
    const { s } = createPresetInstance();

    // The browser's default is 2 rows.
    expect(declarations(s, ".textarea-field").minHeight).toBe(lines("rows", ", 2"));
    expect(declarations(s, autogrow, "(field-sizing: content)")).not.toHaveProperty("minHeight");
    expect(consumeCSS(s.root, s.options)).toContain(
      "min-height: calc(attr(rows type(<number>), 2) * 1lh);",
    );
  });

  it("textarea/resizable sizes the field with min-heights, in rem for the wrapper and lines for the textarea", () => {
    const { s, recipe } = createPresetInstance();

    for (const size of Object.values(recipe.variants!.size)) {
      expect(size.minHeight).toMatch(/^[\d.]+rem$/);
      expect(size).not.toHaveProperty("height");
    }
    expect(recipe.base).not.toHaveProperty("height");
    expect(declarations(s, ".textarea-field").minHeight).toMatch(/\* 1lh\)$/);
    expect(declarations(s, ".textarea-field")).not.toHaveProperty("height");
  });

  it("textarea/block-resize resizes on the block axis by default, and turns resizing off only to grow or when disabled", () => {
    const { s, recipe } = createPresetInstance();

    expect(recipe.defaultVariants!.resize).toBe("vertical");
    // `block` follows the writing mode, and `vertical` is for browsers that
    // don't know it.
    expect(declarations(s, ".textarea.-resize-vertical .textarea-field")).toEqual({
      resize: "vertical",
    });
    expect(
      declarations(s, ".textarea.-resize-vertical .textarea-field", "(resize: block)"),
    ).toEqual({ resize: "block" });
    const off = selectors(s)
      .filter(
        (node) =>
          node.declarations.resize === "none" ||
          node.children.some((child) => child.declarations.resize === "none"),
      )
      .map((node) => node.query);
    expect(off).toEqual([
      ".textarea.-resize-none .textarea-field",
      ".textarea .textarea-field:disabled",
      autogrow,
    ]);
  });

  it("textarea/auto-grow grows with its text through field-sizing, up to its data-max-rows", () => {
    const { s, recipe } = createPresetInstance();

    expect(recipe.defaultVariants!.autogrow).toBe("false");
    expect(recipe.compoundVariants!.find((cv) => cv.match.autogrow === "true")).toEqual({
      match: { autogrow: "true" },
      className: "-autogrow",
    });
    expect(declarations(s, autogrow)).toEqual({});
    expect(declarations(s, autogrow, "(field-sizing: content)")).toEqual({
      fieldSizing: "content",
      resize: "none",
      maxHeight: lines("data-max-rows"),
    });
    // It comes after every resize selector, so it wins over them.
    const queries = selectors(s).map((node) => node.query!);
    for (const query of queries.filter((q) => q.includes("-resize-"))) {
      expect(queries.indexOf(autogrow), query).toBeGreaterThan(queries.indexOf(query));
    }
    expect(consumeCSS(s.root, s.options)).toContain("field-sizing: content;");
  });

  it("textarea/stable-size changes no size in any state", () => {
    const { s, recipe } = createPresetInstance();
    const sizing =
      /^(padding|margin|width|height|minHeight|maxHeight|fontSize|lineHeight|borderWidth)/;

    const states = recipe.compoundVariants!.filter(
      (cv) => cv.css && !cv.match.color && !cv.match.variant,
    );
    expect(states).toHaveLength(3);
    for (const cv of states) {
      expect(keys(css(cv)).filter((key) => sizing.test(key))).toEqual([]);
    }
    for (const attribute of ['[aria-invalid="true"]', "[readonly]", ":disabled"]) {
      for (const node of find(s, state(attribute))) {
        expect(keys(node.declarations).filter((key) => sizing.test(key))).toEqual([]);
      }
    }
  });

  it("textarea/state-selectors styles states from the native textarea's attributes, never :invalid or :read-only", () => {
    const { s, recipe } = createPresetInstance();

    for (const attribute of ['[aria-invalid="true"]', "[readonly]", ":disabled"]) {
      expect(find(s, state(attribute)), attribute).toHaveLength(1);
    }
    const all = JSON.stringify([selectors(s).map((node) => node.query), recipe]);
    expect(all).not.toMatch(/:(user-)?invalid|:read-only|&:readonly"/);
  });

  it("textarea/invalid-state shows invalid through the border and an inset shadow, from aria-invalid or the class", () => {
    const { s, recipe } = createPresetInstance();

    expect(css(recipe.compoundVariants!.find((cv) => cv.match.invalid === "true")!)).toMatchObject({
      borderColor: "@color.error",
      boxShadow: "inset 0 0 0 1px @color.error",
    });
    const [invalid] = find(s, state('[aria-invalid="true"]'));
    expect(invalid!.declarations).toMatchObject({
      borderColor: expect.objectContaining({ name: "color.error" }),
      boxShadow: expect.objectContaining({ type: "css" }),
    });
  });

  it("textarea/hover-capable puts every hover style behind @media (hover: hover)", () => {
    const { s, recipe } = createPresetInstance();

    const recipeKeys = [
      ...keys(recipe.base!),
      ...recipe.compoundVariants!.flatMap((cv) => keys(css(cv) ?? {})),
    ];
    const hovers = recipeKeys.filter((key) => key.includes(":hover"));
    expect(hovers.length).toBeGreaterThan(0);
    for (const key of hovers) {
      expect(key).toMatch(/:hover-capable:hover$/);
    }
    const [invalid] = find(s, state('[aria-invalid="true"]'));
    expect(media([invalid!], "(hover: hover)")?.children[0]?.query).toBe("&:hover");
    expect(consumeCSS(s.root, s.options)).not.toMatch(/^\.textarea[^{]*:hover/m);
  });

  it("textarea/forced-colors keeps the border and the focus, disabled and read-only states visible", () => {
    const { s, recipe } = createPresetInstance();
    const visible = {
      borderColor: "GrayText",
      color: "GrayText",
      opacity: "1",
    };

    expect(recipe.base!.borderWidth).toBe("@border-width.thin");
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
    expect(find(s, state("[readonly]"))[0]!.declarations).toMatchObject({
      borderStyle: expect.objectContaining({ name: "border-style.dashed" }),
    });
  });

  it("textarea/more-contrast draws every border in the text color with prefers-contrast: more", () => {
    const { s } = createPresetInstance();

    expect(consumeCSS(s.root, s.options)).toMatch(
      /\.textarea \{\s+@media \(prefers-contrast: more\) \{\s+--color--gray-450: currentColor;\s+--color--gray-500: currentColor;/,
    );
  });

  it("textarea/mirrors-in-rtl uses logical padding for the prefix and suffix, and the same padding on both sides", () => {
    const { s, recipe } = createPresetInstance();
    const prefix = useTextareaPrefixRecipe(s);
    const suffix = useTextareaSuffixRecipe(s);

    for (const size of Object.values(prefix.variants!.size)) {
      expect(Object.keys(size)).toContain("paddingInlineEnd");
    }
    for (const size of Object.values(suffix.variants!.size)) {
      expect(Object.keys(size)).toContain("paddingInlineStart");
    }
    for (const block of [recipe.base!, ...Object.values(recipe.variants!.size)]) {
      expect(block.paddingLeft).toBe(block.paddingRight);
    }
    for (const node of selectors(s).filter((n) => n.query!.includes("textarea"))) {
      expect(JSON.stringify(node)).not.toMatch(/Left|Right/);
    }
  });
});
