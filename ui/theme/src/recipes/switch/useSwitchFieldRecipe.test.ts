import { styleframe } from "@styleframe/core";
import type { AtRule, Selector } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { useSwitchFieldRecipe } from "./useSwitchFieldRecipe";

type Block = Record<string, unknown>;

function createInstance() {
  const s = styleframe();
  useDesignTokensPreset(s);
  useUtilitiesPreset(s);
  useModifiersPreset(s);
  return s;
}

/** The declarations a setup selector sets inside a media query. */
function mediaDeclarations(
  s: ReturnType<typeof styleframe>,
  query: string,
  media: string,
): Block | undefined {
  const selector = s.root.children.find(
    (child): child is Selector => child.type === "selector" && child.query === query,
  );
  const atRule = selector?.children.find(
    (child): child is AtRule =>
      child.type === "at-rule" && child.identifier === "media" && child.rule === media,
  );
  return atRule?.declarations;
}

const field = '.switch-field[type="checkbox"]';

describe("useSwitchFieldRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("switch-field");
  });

  it("should build against the design-tokens, utilities, and modifiers presets", () => {
    const s = createInstance();

    // Reproduces the real init environment: every declared property must
    // resolve to a registered utility (e.g. -webkit-appearance).
    expect(() => useSwitchFieldRecipe(s)).not.toThrow();
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base).toMatchObject({
      appearance: "none",
      boxSizing: "border-box",
      display: "inline-block",
      cursor: "pointer",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderRadius: "@border-radius.full",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0.125rem center",
      transitionProperty: "background-color, background-position, border-color",
    });
  });

  it("should paint a white thumb as a background image", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    const image = recipe.base?.backgroundImage as string;
    expect(image).toContain("radial-gradient(circle closest-side");
    expect(image).toContain("@color.white");
  });

  it("switch/contrast gives each unchecked track a 3:1 border and its own thumb", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);
    const css = (color: string) =>
      recipe.compoundVariants!.find((v) => v.match.color === color)?.css as Block;

    expect(css("neutral")).toEqual({
      backgroundColor: "@color.gray-450",
      borderColor: "@color.gray-450",
      "&:contrast-more": {
        borderColor: "@color.text",
      },
    });
    expect(css("dark")).toEqual({
      backgroundColor: "@color.gray-700",
      borderColor: "@color.gray-450",
    });
    expect(css("light")).toMatchObject({
      backgroundColor: "@color.gray-200",
      borderColor: "@color.gray-500",
    });
    expect(css("light").backgroundImage).toContain("@color.gray-600");
    expect((css("light")["&:checked"] as Block).backgroundImage).toContain("@color.white");
  });

  it("switch/more-than-colour moves the thumb and fills the track when checked", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:checked"]).toEqual({
      backgroundColor: "@color.primary",
      borderColor: "@color.primary",
      backgroundPosition: "calc(100% - 0.125rem) center",
    });
  });

  it("switch/focus-visible draws a 2px @color.focus outline outside the track", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:focus-visible"]).toEqual({
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.focus",
      outlineOffset: "2px",
    });
  });

  it("switch/focus-visible keeps the focus ring in every state", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    const blocks = [
      recipe.base,
      ...Object.values(recipe.variants!).flatMap((axis) => Object.values(axis)),
      ...recipe.compoundVariants!.map((v) => v.css),
    ] as Array<Block>;
    for (const block of blocks) {
      for (const [key, value] of Object.entries(block)) {
        if (typeof value === "object" && key !== "&:focus-visible") {
          expect(value, key).not.toHaveProperty("outlineColor");
        }
      }
    }
  });

  it("switch/resizable sizes the track and the thumb in rem", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: {
        width: "2rem",
        height: "1.125rem",
        backgroundSize: "0.875rem 0.875rem",
      },
      md: {
        width: "2.25rem",
        height: "1.25rem",
        backgroundSize: "1rem 1rem",
      },
      lg: {
        width: "2.75rem",
        height: "1.5rem",
        backgroundSize: "1.25rem 1.25rem",
      },
    });
  });

  it("switch/stable-size changes no size in any state", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    const sizing = ["width", "height", "borderWidth", "backgroundSize", "padding", "margin"];
    const stateBlocks = [recipe.base!, ...recipe.compoundVariants!.map((v) => v.css ?? {})].flatMap(
      (block) => Object.entries(block).filter(([, value]) => typeof value === "object"),
    );
    expect(stateBlocks.length).toBeGreaterThan(0);
    for (const [key, value] of stateBlocks) {
      for (const property of sizing) {
        expect(value, key).not.toHaveProperty(property);
      }
    }
    // The forced colors rules in the setup callback change no size either.
    const forced = s.root.children.filter(
      (child): child is Selector =>
        child.type === "selector" && child.query.startsWith(".switch-field"),
    );
    expect(forced.length).toBeGreaterThan(0);
    for (const selector of forced) {
      for (const atRule of selector.children as Array<AtRule>) {
        for (const property of sizing) {
          expect(atRule.declarations, selector.query).not.toHaveProperty(property);
        }
      }
    }
    // The invalid border's second pixel is drawn inside.
    const invalid = recipe.base?.["&:aria-invalid"] as Block;
    expect(invalid.boxShadow).toMatch(/^inset /);
  });

  it("switch/state-selectors styles states from the native input's attributes", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    const keys = Object.keys(recipe.base!).filter((key) => key.startsWith("&:"));
    expect(keys).toEqual(
      expect.arrayContaining(["&:checked", "&:disabled", "&:aria-invalid", "&:aria-readonly"]),
    );
    for (const key of keys) {
      expect(key).not.toMatch(/:(invalid|read-only|readonly)(:|$)/);
    }
  });

  it("switch/invalid-state shows an error border, doubled inside, checked or not", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:aria-invalid"]).toEqual({
      borderColor: "@color.error",
      boxShadow: "inset 0 0 0 1px @color.error",
    });
    expect(recipe.base?.["&:aria-invalid:checked"]).toEqual({
      borderColor: "@color.error",
    });
  });

  it("switch/read-only shows a dashed border against the page", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:aria-readonly"]).toEqual({
      borderStyle: "@border-style.dashed",
      backgroundClip: "padding-box",
      cursor: "default",
    });
  });

  it("switch/hover-capable leaves no bare hover style", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    const keys = [
      ...Object.keys(recipe.base!),
      ...recipe.compoundVariants!.flatMap((v) => Object.keys(v.css ?? {})),
    ];
    expect(keys.length).toBeGreaterThan(0);
    expect(
      keys.filter((key) => key.includes("hover") && !key.includes("hover-capable:hover")),
    ).toEqual([]);
  });

  it("switch/reduced-motion stops the thumb sliding", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:motion-reduce"]).toEqual({
      transitionProperty: "background-color, border-color",
    });
  });

  it("switch/forced-colors opts out and draws the track and thumb in system colors", () => {
    const s = createInstance();
    useSwitchFieldRecipe(s);
    const media = "(forced-colors: active)";

    expect(useSwitchFieldRecipe(s).base?.["&:forced-colors"]).toEqual({
      forcedColorAdjust: "none",
    });
    const off = mediaDeclarations(s, field, media)!;
    expect(off).toMatchObject({
      backgroundColor: "Canvas",
      borderColor: "CanvasText",
    });
    expect(off.backgroundImage).toContain("CanvasText");
    const on = mediaDeclarations(s, `${field}:checked`, media)!;
    expect(on).toMatchObject({
      backgroundColor: "Highlight",
      borderColor: "Highlight",
    });
    expect(on.backgroundImage).toContain("HighlightText");
  });

  it("switch/forced-colors keeps the focus, invalid and disabled states visible", () => {
    const s = createInstance();
    useSwitchFieldRecipe(s);
    const media = "(forced-colors: active)";

    expect(mediaDeclarations(s, `${field}:focus-visible`, media)).toEqual({
      outlineColor: "Highlight",
    });
    expect(
      mediaDeclarations(
        s,
        `${field}[aria-invalid="true"], ${field}[aria-invalid="true"]:checked`,
        media,
      ),
    ).toEqual({
      borderColor: "CanvasText",
      boxShadow: "inset 0 0 0 1px CanvasText",
    });
    const disabled = mediaDeclarations(s, `${field}:disabled`, media)!;
    expect(disabled).toEqual({
      backgroundColor: "Canvas",
      borderColor: "GrayText",
      backgroundImage: expect.stringContaining("GrayText"),
      boxShadow: "none",
      opacity: "1",
    });
  });

  it("switch/more-contrast draws the neutral border in the text color, and keeps the light and dark borders", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);
    const css = (color: string) =>
      recipe.compoundVariants!.find((cv) => cv.match.color === color)?.css as Record<
        string,
        unknown
      >;

    expect(css("neutral")["&:contrast-more"]).toEqual({
      borderColor: "@color.text",
    });
    expect(css("light")).not.toHaveProperty("&:contrast-more");
    expect(css("dark")).not.toHaveProperty("&:contrast-more");

    // No setup rule draws a more-contrast border over the compounds, or
    // `light` and `dark` would follow the theme's text color again.
    const setup = s.root.children.filter(
      (child): child is Selector =>
        child.type === "selector" && child.query.startsWith(".switch-field"),
    );
    for (const selector of setup) {
      expect(
        mediaDeclarations(s, selector.query, "(prefers-contrast: more)"),
        selector.query,
      ).toBeUndefined();
    }
  });

  it("switch/mirrors-in-rtl starts the thumb at the inline start", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:rtl"]).toEqual({
      backgroundPosition: "right 0.125rem center",
    });
    expect(recipe.base?.["&:rtl:checked"]).toEqual({
      backgroundPosition: "left 0.125rem center",
    });
  });

  it("should dim the disabled state", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.base?.["&:disabled"]).toEqual({
      opacity: "0.5",
      cursor: "not-allowed",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSwitchFieldRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have size variants", () => {
      const s = createInstance();
      const recipe = useSwitchFieldRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
    });
  });

  it("should have 3 compound variants", () => {
    const s = createInstance();
    const recipe = useSwitchFieldRecipe(s);

    expect(recipe.compoundVariants).toHaveLength(3);
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSwitchFieldRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base?.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compound variants", () => {
      const s = createInstance();
      const recipe = useSwitchFieldRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants).toHaveLength(1);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useSwitchFieldRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
    });
  });
});
