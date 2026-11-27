import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useSelectChipRecipe } from "./useSelectChipRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "fontWeight",
    "fontSize",
    "lineHeight",
    "maxWidth",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "borderRadius",
    "gap",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  s.variable("border-radius.sm", "0.125rem", { default: true });
  s.variable("easing.ease-in-out", "ease-in-out", { default: true });
  s.variable("color.primary", "#006cff", { default: true });
  useDarkModifier(s);
  return s;
}

describe("useSelectChipRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSelectChipRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("select-chip");
  });

  it("should be a compact inline tag", () => {
    const s = createInstance();
    const recipe = useSelectChipRecipe(s);

    expect(recipe.base).toMatchObject({
      display: "inline-flex",
      alignItems: "center",
      fontWeight: "@font-weight.medium",
      maxWidth: "100%",
    });
  });

  describe("variants", () => {
    it("should be scoped to the container palette (light, dark, neutral)", () => {
      const s = createInstance();
      const recipe = useSelectChipRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have the badge-style variant axis (solid, outline, soft, subtle)", () => {
      const s = createInstance();
      const recipe = useSelectChipRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "outline", "soft", "subtle"]);
    });

    it("should have size variants", () => {
      const s = createInstance();
      const recipe = useSelectChipRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });
  });

  it("should default to a soft neutral small chip", () => {
    const s = createInstance();
    const recipe = useSelectChipRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "soft",
      size: "sm",
    });
  });

  describe("compound variants", () => {
    it("should have 12 compound variants (3 colors × 4 variants)", () => {
      const s = createInstance();
      const recipe = useSelectChipRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(12);
    });

    it("should have an adaptive neutral soft chip", () => {
      const s = createInstance();
      const recipe = useSelectChipRecipe(s);

      const cv = recipe.compoundVariants!.find(
        (v) => v.match.color === "neutral" && v.match.variant === "soft",
      );

      expect(cv).toEqual({
        match: { color: "neutral", variant: "soft" },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
          },
        },
      });
    });
  });

  describe("setup callback", () => {
    it("should register the .select-chip-remove dismiss button", () => {
      const s = createInstance();
      useSelectChipRecipe(s);

      const removeSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".select-chip-remove",
      );

      expect(removeSelector).toBeDefined();
    });
  });

  describe("filter", () => {
    it("should filter variants and prune compounds", () => {
      const s = createInstance();
      const recipe = useSelectChipRecipe(s, {
        filter: { variant: ["soft"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["soft"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.variant === "soft")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(3);
    });
  });
});
