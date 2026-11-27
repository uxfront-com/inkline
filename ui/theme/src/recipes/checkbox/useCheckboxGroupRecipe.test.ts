import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { useCheckboxFieldRecipe } from "./useCheckboxFieldRecipe";
import { useCheckboxGroupRecipe } from "./useCheckboxGroupRecipe";
import { useCheckboxRecipe } from "./useCheckboxRecipe";

function createInstance() {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  return s;
}

describe("useCheckboxGroupRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCheckboxGroupRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("checkbox-group");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useCheckboxGroupRecipe(s);

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
      const recipe = useCheckboxGroupRecipe(s);

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["vertical", "horizontal"]);
      expect(recipe.variants!.orientation.vertical).toEqual({
        flexDirection: "column",
      });
      expect(recipe.variants!.orientation.horizontal).toEqual({
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "flex-start",
        gapX: "@1.5",
      });
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useCheckboxGroupRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
      expect(recipe.variants!.size.md).toEqual({ gapY: "@0.75" });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useCheckboxGroupRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      orientation: "vertical",
      size: "md",
    });
  });

  it("should add a hook class per size", () => {
    const s = createInstance();
    const recipe = useCheckboxGroupRecipe(s);

    expect(recipe.compoundVariants).toEqual([
      { match: { size: "sm" }, className: "-size-sm" },
      { match: { size: "md" }, className: "-size-md" },
      { match: { size: "lg" }, className: "-size-lg" },
    ]);
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useCheckboxGroupRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base?.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter orientation variants", () => {
      const s = createInstance();
      const recipe = useCheckboxGroupRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useCheckboxGroupRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(recipe.defaultVariants?.orientation).toBeUndefined();
    });
  });
});

/**
 * One test per stylesheet rule on the Open Components Checkbox Group page. The
 * contrast rule (`checkbox-group/legend-contrast`) is in
 * `checkboxGroupContrast.test.ts`.
 */
describe("Open Components rules", () => {
  type Node = {
    type: string;
    query?: string;
    rule?: string;
    declarations: Record<string, unknown>;
    children: Array<Node>;
  };
  type Block = Record<string, unknown>;

  function createAll() {
    const s = createInstance();
    const checkbox = useCheckboxRecipe(s);
    const field = useCheckboxFieldRecipe(s);
    const group = useCheckboxGroupRecipe(s);
    return { s, checkbox, field, group };
  }

  // The group's own setup selectors.
  const own = (s: ReturnType<typeof styleframe>) =>
    (s.root.children as unknown as Array<Node>).filter(
      (child) => child.type === "selector" && child.query!.startsWith(".checkbox-group"),
    );

  function find(s: ReturnType<typeof styleframe>, query: string) {
    const node = own(s).find((child) => child.query === query);
    expect(node, query).toBeDefined();
    return node!;
  }

  // Every declaration block of the group: base and variant values.
  function blocks(group: ReturnType<typeof useCheckboxGroupRecipe>) {
    return [
      group.base as Block,
      ...Object.values(group.variants ?? {}).flatMap((axis) => Object.values(axis) as Array<Block>),
    ];
  }

  // Every key of a declarations block, nested blocks included.
  function keys(block: Block): Array<string> {
    return Object.entries(block).flatMap(([key, value]) =>
      value && typeof value === "object" && !("type" in value)
        ? [key, ...keys(value as Block)]
        : [key],
    );
  }

  const sizing =
    /^(padding|margin|width|height|minHeight|minWidth|fontSize|lineHeight|borderWidth|gap|flex)/;

  it("checkbox-group/vertical-by-default runs options in a column, and wraps a row rather than overflowing", () => {
    const { s, group } = createAll();

    expect(group.defaultVariants!.orientation).toBe("vertical");
    expect(group.variants!.orientation.vertical).toMatchObject({
      flexDirection: "column",
    });
    expect(group.variants!.orientation.horizontal).toMatchObject({
      flexDirection: "row",
      flexWrap: "wrap",
    });
    // Options in a `[data-slot="options"]` wrapper take the group's direction.
    expect(find(s, '.checkbox-group > [data-slot="options"]').declarations).toMatchObject({
      display: "flex",
      flexDirection: "inherit",
      flexWrap: "inherit",
    });
  });

  it("checkbox-group/option-spacing puts at least 8px between rows and 24px between the options of a row", () => {
    const { s, group } = createAll();

    // `@<n>` is a multiple of the 1rem spacing unit.
    for (const size of Object.values(group.variants!.size)) {
      expect(size).toEqual({ gapY: expect.stringMatching(/^@/) });
      expect(Number.parseFloat((size.gapY as string).slice(1))).toBeGreaterThanOrEqual(0.5);
    }
    expect(group.variants!.orientation.horizontal.gapX).toBe("@1.5");
    expect(group.variants!.orientation.vertical).not.toHaveProperty("gapX");
    expect(find(s, '.checkbox-group > [data-slot="options"]').declarations.gap).toBe("inherit");
  });

  it("checkbox-group/select-all-indent sits the options in from a select-all box by its box and gap", () => {
    const { s, checkbox, field } = createAll();

    for (const size of ["sm", "md", "lg"] as const) {
      const indent = find(
        s,
        `.checkbox-group.-size-${size} > [data-slot="select-all"] + [data-slot="options"]`,
      ).declarations.paddingInlineStart;
      const box = field.variants!.size[size].width as string;
      const gap = Number((checkbox.variants!.size[size].gap as string).slice(1));
      expect(JSON.stringify(indent), size).toBe(
        JSON.stringify(s.css`calc(${box} + ${s.ref("spacing")} * ${gap})`),
      );
    }
  });

  it("checkbox-group/select-all-indent keeps the options right under the select-all box in a group taller than its content", () => {
    const { s, group } = createAll();

    // A flex basis would set their height in a column, and pull them apart.
    const parts = find(
      s,
      '.checkbox-group > [data-slot="select-all"], .checkbox-group > [data-slot="options"]',
    ).declarations;
    expect(parts).toEqual({ boxSizing: "border-box", width: "100%" });
    expect(group.variants!.orientation.horizontal.alignContent).toBe("flex-start");
  });

  it("checkbox-group/resizable sizes the legend, gaps and indent in rem, and lets the legend and a row wrap", () => {
    const { s, group } = createAll();

    expect(group.base).toMatchObject({ minWidth: "0" });
    for (const block of blocks(group)) {
      for (const [key, value] of Object.entries(block)) {
        if (/gap/i.test(key)) {
          expect(value, key).toMatch(/^@[\d.]+$/);
        }
      }
    }
    for (const [size, font] of [
      ["sm", "font-size.xs"],
      ["md", "font-size.sm"],
      ["lg", "font-size.md"],
    ] as const) {
      expect(find(s, `.checkbox-group.-size-${size} > legend`).declarations.fontSize).toMatchObject(
        { name: font },
      );
    }
    const legend = find(s, ".checkbox-group > legend").declarations;
    expect(legend.marginBlockEnd).toMatchObject({ name: "spacing.xs" });
    expect(legend).not.toHaveProperty("whiteSpace");
    expect(legend).not.toHaveProperty("overflow");
    expect(group.variants!.orientation.horizontal.flexWrap).toBe("wrap");
  });

  it("checkbox-group/disabled-look dims the legend of a disabled group, in GrayText in forced colors mode", () => {
    const { s } = createAll();

    const disabled = find(s, ".checkbox-group:disabled > legend");
    expect(disabled.declarations).toEqual({ opacity: "0.5" });
    const forced = disabled.children.find(
      (child) => child.type === "at-rule" && child.rule === "(forced-colors: active)",
    );
    expect(forced?.declarations).toEqual({ opacity: "1", color: "GrayText" });
  });

  it("checkbox-group/disabled-look keeps a disabled box's GrayText border in an invalid group in forced colors mode", () => {
    const { s } = createAll();

    const disabled = find(
      s,
      '.checkbox-group[aria-invalid="true"] .checkbox > .checkbox-field:disabled',
    );
    expect(disabled.declarations).toEqual({});
    const forced = disabled.children.find(
      (child) => child.type === "at-rule" && child.rule === "(forced-colors: active)",
    );
    expect(forced?.declarations).toEqual({ borderColor: "GrayText" });
  });

  it("checkbox-group/stable-size changes no size or position in any state", () => {
    const { s } = createAll();

    for (const query of [
      ".checkbox-group:disabled > legend",
      '.checkbox-group[aria-invalid="true"] .checkbox > .checkbox-field',
    ]) {
      const node = find(s, query);
      const all = [node.declarations, ...node.children.map((child) => child.declarations)];
      expect(
        all.flatMap((block) => keys(block)).filter((key) => sizing.test(key)),
        query,
      ).toEqual([]);
    }
  });

  it("checkbox-group/invalid-state gives every box the invalid border from the group's aria-invalid, never from :invalid", () => {
    const { s, group } = createAll();

    const invalid = find(s, '.checkbox-group[aria-invalid="true"] .checkbox > .checkbox-field');
    expect(invalid.declarations).toMatchObject({
      borderColor: expect.objectContaining({ name: "color.error" }),
      boxShadow: expect.objectContaining({ type: "css" }),
    });
    expect(invalid.declarations.boxShadow).toEqual({
      type: "css",
      value: ["inset 0 0 0 1px ", { type: "reference", name: "color.error" }],
    });
    expect(JSON.stringify(invalid)).not.toContain("outline");
    const all = JSON.stringify([own(s).map((node) => node.query), blocks(group).flatMap(keys)]);
    expect(all).not.toMatch(/:(user-)?invalid|:read-only/);
  });

  it("checkbox-group/mirrors-in-rtl indents with a logical property and uses no physical left or right", () => {
    const { s, group } = createAll();

    const physical = /(Left|Right)$|^(left|right)$/;
    expect(
      blocks(group)
        .flatMap(keys)
        .filter((k) => physical.test(k)),
    ).toEqual([]);
    expect(
      own(s)
        .flatMap((node) => keys(node.declarations))
        .filter((k) => physical.test(k)),
    ).toEqual([]);
    expect(
      find(s, '.checkbox-group.-size-md > [data-slot="select-all"] + [data-slot="options"]')
        .declarations,
    ).toHaveProperty("paddingInlineStart");
  });
});
