import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { useRadioFieldRecipe } from "./useRadioFieldRecipe";
import { useRadioGroupRecipe } from "./useRadioGroupRecipe";
import { useRadioRecipe } from "./useRadioRecipe";

function createInstance() {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  return s;
}

describe("useRadioGroupRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useRadioGroupRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("radio-group");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useRadioGroupRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      minWidth: "0",
      margin: "0",
      padding: "0",
      borderWidth: "0",
      color: "@color.text",
    });
  });

  describe("variants", () => {
    it("should have all orientation variants", () => {
      const s = createInstance();
      const recipe = useRadioGroupRecipe(s);

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["vertical", "horizontal"]);
      expect(recipe.variants!.orientation.vertical).toEqual({
        flexDirection: "column",
      });
      expect(recipe.variants!.orientation.horizontal).toEqual({
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      });
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useRadioGroupRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
      expect(recipe.variants!.size.md).toEqual({ gap: "@0.75" });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useRadioGroupRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      orientation: "vertical",
      size: "md",
    });
  });

  it("should not define compound variants", () => {
    const s = createInstance();
    const recipe = useRadioGroupRecipe(s);

    expect(recipe.compoundVariants ?? []).toHaveLength(0);
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useRadioGroupRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base?.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter orientation variants", () => {
      const s = createInstance();
      const recipe = useRadioGroupRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useRadioGroupRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(recipe.defaultVariants?.orientation).toBeUndefined();
    });
  });
});

/**
 * One test per stylesheet rule on the Open Components Radio Group page, across
 * the three radio recipes. The contrast rules (`radio-group/contrast`,
 * `radio-group/indicator-contrast`) are in `radioGroupContrast.test.ts`.
 */
describe("Open Components rules", () => {
  type Node = {
    type: string;
    query?: string;
    rule?: string;
    name?: string;
    value?: unknown;
    declarations: Record<string, unknown>;
    variables?: Array<{ name: string; value: unknown }>;
    children: Array<Node>;
  };
  type Block = Record<string, unknown>;

  function createAll() {
    const s = createInstance();
    const radio = useRadioRecipe(s);
    const field = useRadioFieldRecipe(s);
    const group = useRadioGroupRecipe(s);
    return { s, radio, field, group };
  }

  const selectors = (s: ReturnType<typeof styleframe>) =>
    s.root.children.filter((child) => child.type === "selector") as Array<Node>;

  function find(s: ReturnType<typeof styleframe>, query: string) {
    const node = selectors(s).find((child) => child.query === query);
    expect(node, query).toBeDefined();
    return node!;
  }

  function media(node: Node, rule: string) {
    const child = node.children.find((c) => c.type === "at-rule" && c.rule === rule);
    expect(child, rule).toBeDefined();
    return child!;
  }

  // Every declaration block of the three recipes: base, variant values and
  // compound variants, with their nested modifier blocks.
  function blocks(all: ReturnType<typeof createAll>) {
    return [all.radio, all.field, all.group].flatMap((recipe) => [
      recipe.base as Block,
      ...Object.values(recipe.variants ?? {}).flatMap((axis) => Object.values<Block>(axis)),
      ...(recipe.compoundVariants ?? []).map((cv) => cv.css as Block),
    ]);
  }

  // Every key of a declarations block, nested blocks included.
  function keys(block: Block): Array<string> {
    return Object.entries(block).flatMap(([key, value]) =>
      value && typeof value === "object" && !("type" in value)
        ? [key, ...keys(value as Block)]
        : [key],
    );
  }

  // The radio recipes' own setup selectors.
  const own = (s: ReturnType<typeof styleframe>) =>
    selectors(s).filter((node) => node.query!.startsWith(".radio"));

  const sizing =
    /^(padding|margin|width|height|minHeight|minWidth|fontSize|lineHeight|borderWidth|gap)/;

  it("radio-group/checked-shape marks a checked radio with a dot, not its colour alone", () => {
    const { field } = createAll();

    const checked = field.base!["&:checked"] as Block;
    expect(checked.backgroundImage).toMatch(/^url\("data:image\/svg\+xml/);
    expect(checked.backgroundImage).toContain("circle");
    expect(field.base).toMatchObject({
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    });
  });

  it("radio-group/focus-visible draws a 2px @color.focus outline outside the circle in every state", () => {
    const { s, field } = createAll();

    expect(field.base!["&:focus-visible"]).toEqual({
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.focus",
      outlineOffset: "2px",
    });
    const outlines = blocks(createAll())
      .flatMap((block) => Object.entries(block))
      .filter(([key]) => key !== "&:focus-visible")
      .filter(([key, value]) => JSON.stringify({ [key]: value }).includes("outline"))
      .map(([key]) => key);
    expect(outlines).toEqual(["&:forced-colors:focus-visible"]);
    for (const node of own(s)) {
      expect(JSON.stringify(node), node.query).not.toContain("outline");
    }
  });

  it("radio-group/target-size makes the label at least 24px tall, and 44px on touch screens", () => {
    const { s, radio } = createAll();

    for (const size of Object.values(radio.variants!.size)) {
      expect(Number.parseFloat(size.minHeight as string)).toBeGreaterThanOrEqual(1.5);
    }
    const coarse = media(find(s, ".radio:has(> .radio-field)"), "(any-pointer: coarse)");
    expect(coarse.declarations).toEqual({ minHeight: "2.75rem" });
  });

  it("radio-group/input-heights gives each row the minimum height the standard gives the Input of the same size", () => {
    const { radio } = createAll();

    // The Open Components Input's sm, md and lg heights.
    expect(radio.variants!.size.sm.minHeight).toBe("2rem");
    expect(radio.variants!.size.md.minHeight).toBe("2.25rem");
    expect(radio.variants!.size.lg.minHeight).toBe("2.5rem");
  });

  it("radio-group/resizable sizes rows with a min-height in rem and the circle in rem", () => {
    const { radio, field } = createAll();

    for (const size of Object.values(radio.variants!.size)) {
      expect(size.minHeight).toMatch(/^[\d.]+rem$/);
      expect(size).not.toHaveProperty("height");
    }
    for (const size of Object.values(field.variants!.size)) {
      expect(size.width).toMatch(/^[\d.]+rem$/);
      expect(size.height).toMatch(/^[\d.]+rem$/);
    }
    expect(radio.base).not.toHaveProperty("height");
    expect(radio.base).not.toHaveProperty("whiteSpace");
  });

  it("radio-group/stable-size changes no size or position in any state", () => {
    const { s, field } = createAll();

    const states = Object.entries(field.base!)
      .filter(([key]) => key.startsWith("&:"))
      .map(([, value]) => value as Block);
    expect(states.length).toBeGreaterThan(0);
    for (const block of [...states, ...field.compoundVariants!.map((cv) => cv.css as Block)]) {
      expect(keys(block).filter((key) => sizing.test(key))).toEqual([]);
    }
    for (const query of [
      ".radio:has(.radio-field:disabled)",
      '.radio-group[aria-invalid="true"] .radio > .radio-field',
    ]) {
      expect(keys(find(s, query).declarations).filter((key) => sizing.test(key))).toEqual([]);
    }
  });

  it("radio-group/state-selectors styles states from the input's and the group's attributes, never :invalid", () => {
    const { s, field } = createAll();

    find(s, '.radio-group[aria-invalid="true"] .radio > .radio-field');
    find(s, ".radio:has(.radio-field:disabled)");
    expect(field.base).toHaveProperty("&:checked");
    expect(field.base).toHaveProperty("&:disabled");
    const all = JSON.stringify([
      own(s).map((node) => node.query),
      blocks(createAll()).flatMap(keys),
    ]);
    expect(all).not.toMatch(/:(user-)?invalid|:read-only/);
  });

  it("radio-group/invalid-state turns the rings red from the group's aria-invalid, through the border and an inset shadow", () => {
    const { s } = createAll();

    const invalid = find(s, '.radio-group[aria-invalid="true"] .radio > .radio-field');
    expect(invalid.declarations).toMatchObject({
      borderColor: expect.objectContaining({ name: "color.error" }),
      boxShadow: expect.objectContaining({ type: "css" }),
    });
    expect(JSON.stringify(invalid.declarations.boxShadow)).toContain("inset 0 0 0 1px");
    expect(JSON.stringify(invalid)).not.toContain("outline");
  });

  it("radio-group/hover-capable leaves no hover style outside @media (hover: hover)", () => {
    const { s } = createAll();

    const hovers = blocks(createAll())
      .flatMap(keys)
      .filter((key) => key.includes(":hover"));
    for (const key of hovers) {
      expect(key).toMatch(/:hover-capable:hover$/);
    }
    expect(JSON.stringify(own(s))).not.toContain(":hover");
  });

  it("radio-group/forced-colors keeps every radio, its checked state, focus and disabled state visible", () => {
    const { s, field } = createAll();

    expect(field.base!["&:forced-colors"]).toEqual({
      appearance: "auto",
      WebkitAppearance: "auto",
    });
    expect(field.base!["&:forced-colors:checked"]).toEqual({
      backgroundImage: "none",
    });
    expect(field.base!["&:forced-colors:focus-visible"]).toEqual({
      outlineColor: "Highlight",
    });
    expect(field.base!["&:forced-colors:disabled"]).toEqual({ opacity: "1" });
    const disabled = media(find(s, ".radio:has(.radio-field:disabled)"), "(forced-colors: active)");
    expect(disabled.declarations).toEqual({ color: "GrayText", opacity: "1" });
  });

  it("radio-group/more-contrast draws every unchecked ring at full strength", () => {
    const { s, field } = createAll();

    const rings = field
      .compoundVariants!.flatMap((cv) => {
        const css = cv.css as Block;
        return [css.borderColor, (css["&:dark"] as Block | undefined)?.borderColor];
      })
      .filter((value) => value && value !== "@color.primary");
    expect(new Set(rings)).toEqual(new Set(["@color.gray-450", "@color.gray-500"]));
    const more = media(find(s, ".radio-field"), "(prefers-contrast: more)");
    expect(
      Object.fromEntries(more.variables!.map((variable) => [variable.name, variable.value])),
    ).toEqual({
      "color.gray-450": "currentColor",
      "color.gray-500": "currentColor",
    });
  });

  it("radio-group/mirrors-in-rtl uses no physical left or right property", () => {
    const { s, field } = createAll();

    const physical = /(Left|Right)$|^(left|right)$/;
    expect(
      blocks(createAll())
        .flatMap(keys)
        .filter((k) => physical.test(k)),
    ).toEqual([]);
    expect(
      own(s)
        .flatMap((node) => keys(node.declarations))
        .filter((k) => physical.test(k)),
    ).toEqual([]);
    // The browser's own margin on a radio is uneven, so it's reset.
    expect(field.base!.margin).toBe("0");
  });
});
