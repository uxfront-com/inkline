import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { useRadioFieldRecipe } from "./useRadioFieldRecipe";

function createInstance() {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  return s;
}

describe("useRadioFieldRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useRadioFieldRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("radio-field");
  });

  it("should build against the design-tokens, utilities, and modifiers presets", () => {
    const s = styleframe();
    useDesignTokensPreset(s);
    useUtilitiesPreset(s);
    useModifiersPreset(s);

    // Reproduces the real init environment: every declared property must
    // resolve to a registered utility (e.g. -webkit-appearance).
    expect(() => useRadioFieldRecipe(s)).not.toThrow();
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useRadioFieldRecipe(s);

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

  it("should fill the circle with primary and paint an SVG dot when checked", () => {
    const s = createInstance();
    const recipe = useRadioFieldRecipe(s);

    const checked = recipe.base?.["&:checked"] as Record<string, string>;
    expect(checked).toMatchObject({
      backgroundColor: "@color.primary",
      borderColor: "@color.primary",
    });
    expect(checked.backgroundImage).toContain("data:image/svg+xml");
    expect(checked.backgroundImage).toContain("circle");
  });

  it("should not define an indeterminate state", () => {
    const s = createInstance();
    const recipe = useRadioFieldRecipe(s);

    expect(recipe.base?.["&:indeterminate"]).toBeUndefined();
  });

  it("should style focus-visible and disabled states", () => {
    const s = createInstance();
    const recipe = useRadioFieldRecipe(s);

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
      const recipe = useRadioFieldRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have size variants with a circular radius", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
      expect(recipe.variants!.size.md).toEqual({
        width: "1rem",
        height: "1rem",
        borderRadius: "@border-radius.full",
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useRadioFieldRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
    });
  });

  describe("compound variants", () => {
    it("should have 3 compound variants", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should set the neutral unchecked surface and re-assert the checked fill in dark mode", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.color === "neutral");
      expect(cv?.css).toEqual({
        backgroundColor: "@color.white",
        borderColor: "@color.gray-450",
        color: "@color.gray-900",
        "&:dark": {
          backgroundColor: "@color.gray-900",
          borderColor: "@color.gray-500",
          color: "@color.white",
        },
        "&:dark:checked": {
          backgroundColor: "@color.primary",
          borderColor: "@color.primary",
        },
      });
    });

    it("should keep fixed light/dark surfaces free of dark overrides", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s);

      const light = recipe.compoundVariants!.find((v) => v.match.color === "light");
      expect(light?.css).toEqual({
        backgroundColor: "@color.white",
        borderColor: "@color.gray-450",
        color: "@color.gray-900",
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base?.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compound variants", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants).toHaveLength(1);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useRadioFieldRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
    });
  });
});
