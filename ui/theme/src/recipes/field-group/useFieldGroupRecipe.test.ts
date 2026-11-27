import { styleframe } from "@styleframe/core";

import { useFieldGroupRecipe } from "./useFieldGroupRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "verticalAlign",
    "position",
    "flexDirection",
    "width",
    "minWidth",
    "flexBasis",
    "flexGrow",
    "borderTopRightRadius",
    "borderBottomRightRadius",
    "borderRightWidth",
    "borderTopLeftRadius",
    "borderBottomLeftRadius",
    "borderBottomWidth",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
  return s.root.children.find(
    (child) => child.type === "selector" && (child as { query: string }).query === query,
  ) as { children: Array<{ type: string; query?: string }> } | undefined;
}

function findChildRule(
  selector: { children: Array<{ type: string; query?: string }> } | undefined,
  query: string,
) {
  return selector?.children.find((child) => child.type === "selector" && child.query === query) as
    | { declarations?: Record<string, unknown> }
    | undefined;
}

describe("useFieldGroupRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useFieldGroupRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("field-group");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useFieldGroupRecipe(s);

    expect(recipe.base).toEqual({
      display: "inline-flex",
      verticalAlign: "middle",
      position: "relative",
    });
  });

  describe("variants", () => {
    it("should have orientation variants", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: { flexDirection: "row" },
        vertical: { flexDirection: "column" },
      });
    });

    it("should have block variants", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s);

      expect(recipe.variants!.block).toEqual({
        true: { display: "flex", width: "100%" },
        false: {},
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useFieldGroupRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      orientation: "horizontal",
      block: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 3 compound variants total", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should have horizontal className compound variant", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s);

      const horizontal = recipe.compoundVariants!.find(
        (cv) => cv.match.orientation === "horizontal",
      );

      expect(horizontal).toEqual({
        match: { orientation: "horizontal" },
        className: "-horizontal",
      });
    });

    it("should have vertical className compound variant", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s);

      const vertical = recipe.compoundVariants!.find((cv) => cv.match.orientation === "vertical");

      expect(vertical).toEqual({
        match: { orientation: "vertical" },
        className: "-vertical",
      });
    });

    it("should have block className compound variant", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s);

      const block = recipe.compoundVariants!.find((cv) => cv.match.block === "true");

      expect(block).toEqual({
        match: { block: "true" },
        className: "-block",
      });
    });
  });

  describe("seam selectors", () => {
    const C = `:where(.input, .textarea, .select, .button, .dropdown)`;
    const K = `:is(.input, .textarea, .select, .button, .dropdown)`;

    it("flattens horizontal seams and grows fields", () => {
      const s = createInstance();
      useFieldGroupRecipe(s);

      const horizontal = findSelector(s, ".field-group.-horizontal");
      expect(horizontal).toBeDefined();

      expect(findChildRule(horizontal, `& > ${C}:has(~ ${K})`)?.declarations).toMatchObject({
        borderRightWidth: "0",
      });
      expect(findChildRule(horizontal, `& > ${C} ~ ${K}`)?.declarations).toMatchObject({
        borderTopLeftRadius: "0",
      });

      for (const query of ["& > .input", "& > .select", "& > .textarea"]) {
        expect(findChildRule(horizontal, query)?.declarations).toMatchObject({
          flexGrow: "1",
          minWidth: "0",
        });
      }
    });

    it("flattens vertical seams", () => {
      const s = createInstance();
      useFieldGroupRecipe(s);

      const vertical = findSelector(s, ".field-group.-vertical");
      expect(vertical).toBeDefined();

      expect(findChildRule(vertical, `& > ${C}:has(~ ${K})`)?.declarations).toMatchObject({
        borderBottomWidth: "0",
      });
      expect(findChildRule(vertical, `& > ${C} ~ ${K}`)?.declarations).toMatchObject({
        borderTopLeftRadius: "0",
      });
    });

    it("equal-fills buttons in block mode", () => {
      const s = createInstance();
      useFieldGroupRecipe(s);

      const block = findSelector(s, ".field-group.-block");
      expect(block).toBeDefined();

      expect(findChildRule(block, "& > .button")?.declarations).toMatchObject({
        flexBasis: "0",
        flexGrow: "1",
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s, {
        base: { display: "flex" },
      });

      expect(recipe.base!.display).toBe("flex");
      expect(recipe.base!.verticalAlign).toBe("middle");
      expect(recipe.base!.position).toBe("relative");
    });
  });

  describe("filter", () => {
    it("should filter orientation variants", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
    });

    it("should prune compound variants when filtering orientation", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s, {
        filter: { orientation: ["horizontal"] },
      });

      const orientationCompounds = recipe.compoundVariants!.filter(
        (cv) => cv.match.orientation !== undefined,
      );
      expect(orientationCompounds).toHaveLength(1);
      expect(orientationCompounds[0]!.match.orientation).toBe("horizontal");
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useFieldGroupRecipe(s, {
        filter: { orientation: ["vertical"] },
      });

      expect(recipe.defaultVariants?.orientation).toBeUndefined();
      expect(recipe.defaultVariants?.block).toBe("false");
    });
  });
});
