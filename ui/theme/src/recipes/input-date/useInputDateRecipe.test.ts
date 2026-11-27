import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { formatHex8 } from "culori";

import {
  useDarkModifier,
  useForcedColorsModifier,
  useHoverCapableModifier,
} from "@styleframe/theme";
import { useFocusWithinModifier, useHoverModifier } from "@styleframe/theme";
import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { FIELD_MUTED_TEXT } from "../input/createFieldRecipe";
import { useInputDateRecipe } from "./useInputDateRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "gap",
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
    "userSelect",
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
  s.variable("color.text-weak", "#475569", { default: true });
  s.variable("color.gray-400", "#94A3B8", { default: true });
  s.variable("spacing", "1rem", { default: true });
  s.variable("color.error", "#D22E3E", { default: true });
  s.variable("border-style.dashed", "dashed", { default: true });
  useDarkModifier(s);
  useHoverCapableModifier(s);
  useForcedColorsModifier(s);
  useHoverModifier(s);
  useFocusWithinModifier(s);
  return s;
}

describe("useInputDateRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useInputDateRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("input-date");
  });

  it("should have correct base styles with a focus-within ring", () => {
    const s = createInstance();
    const recipe = useInputDateRecipe(s);

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
      const recipe = useInputDateRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["default", "soft", "ghost"]);
    });

    it("should have size variants matching the field family", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });

    it("should have invalid boolean variants", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

      expect(recipe.variants!.invalid).toEqual({ true: {}, false: {} });
    });

    it("should have disabled boolean variants", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

      expect(recipe.variants!.disabled).toEqual({ true: {}, false: {} });
    });

    it("should have readonly boolean variants", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

      expect(recipe.variants!.readonly).toEqual({ true: {}, false: {} });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useInputDateRecipe(s);

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
    it("should have 14 compound variants total (9 color×variant + invalid + readonly + disabled + the light and dark hooks)", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(14);
    });

    it("should share the neutral default surface with the input recipe", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

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
      const recipe = useInputDateRecipe(s);

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
      const recipe = useInputDateRecipe(s);

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
      const recipe = useInputDateRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.readonly === "true");

      expect(cv).toEqual({
        match: { readonly: "true" },
        css: {
          borderStyle: "@border-style.dashed",
          cursor: "default",
        },
      });
    });

    it("should keep the focus-within ring and add an inset error shadow when invalid", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

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

    it("should dim and show a not-allowed cursor when disabled", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s);

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
    it("should register a .input-date-field selector", () => {
      const s = createInstance();
      useInputDateRecipe(s);

      const found = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".input-date-field",
      );

      expect(found).toBeDefined();
    });

    it("should register a .input-date-separator selector", () => {
      const s = createInstance();
      useInputDateRecipe(s);

      const found = s.root.children.find(
        (child) =>
          child.type === "selector" &&
          (child as { query: string }).query === ".input-date-separator",
      );

      expect(found).toBeDefined();
    });

    it("should keep the segments and separators at one font size on touch screens", () => {
      const s = createInstance();
      useInputDateRecipe(s);

      // The touch-screen text size belongs to text inputs. On the segment
      // container it would grow only the separators.
      const touch = (
        s.root.children.filter(
          (child) =>
            child.type === "selector" && (child as { query: string }).query === ".input-date-field",
        ) as Array<{
          children: Array<{
            rule?: string;
            declarations: Record<string, unknown>;
          }>;
        }>
      )
        .flatMap((selector) => selector.children)
        .filter((child) => child.rule === "(any-pointer: coarse)");

      expect(touch.map((child) => child.declarations.fontSize)).toEqual([]);
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should prune color-scoped compound variants when filtering colors", () => {
      const s = createInstance();
      const recipe = useInputDateRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.color === undefined || cv.match.color === "neutral",
        ),
      ).toBe(true);
      expect(recipe.compoundVariants!.length).toBeLessThan(12);
    });
  });
});

/**
 * The separator as each field shows it in each theme: the rule that wins for
 * the field's color, its dark-theme override in the dark theme, and every token
 * resolved for that theme. The muted text is the field's own text color at
 * 75%, so it is written as that resolved text.
 */
describe("useInputDateRecipe separator colors", () => {
  type Slot = Record<string, unknown>;
  type Theme = "light" | "dark";

  // The selector the `dark` modifier emits for the rest of the theme.
  const DARK_THEME = ':is(.dark-theme, [data-theme="dark"]) &';

  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  const recipe = useInputDateRecipe(s);

  const themes = {
    light: colorValues as Record<string, string>,
    dark: darkModeColorValues as Record<string, string>,
  };

  function resolve(name: string, theme: Theme): string {
    const key = name.slice("color.".length);
    const themed = themes[theme][key];
    if (themed) {
      return themed.startsWith("@") ? resolve(themed.slice(1), theme) : formatHex8(themed);
    }
    const variable = s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unknown token ${name}`);
    }
    if (typeof variable.value !== "string") {
      throw new Error(`Token ${variable.name} isn't a plain value`);
    }
    return formatHex8(variable.value);
  }

  function rule(query: string) {
    return s.root.children.find(
      (child) => child.type === "selector" && (child as { query: string }).query === query,
    ) as
      | {
          declarations: Slot;
          children: Array<{ query: string; declarations: Slot }>;
        }
      | undefined;
  }

  function separator(color: string, variant: string, theme: Theme) {
    const hook = recipe.compoundVariants!.find(
      (cv) => cv.match.color === color && cv.className,
    )?.className;
    const hooked = hook && rule(`.input-date.${hook} .input-date-separator`);
    const base = rule(".input-date-separator")!;
    const dark = base.children.find((child) => child.query === DARK_THEME);
    const value = hooked
      ? hooked.declarations.color
      : theme === "dark" && dark
        ? dark.declarations.color
        : base.declarations.color;

    if (value === FIELD_MUTED_TEXT) {
      const surface = recipe.compoundVariants!.find(
        (cv) => cv.match.color === color && cv.match.variant === variant,
      )!.css as Slot;
      const text = (theme === "dark" ? (surface["&:dark"] as Slot).color : surface.color) as string;
      return `${resolve(text.slice(1), theme)} at 75%`;
    }
    return resolve((value as { name: string }).name, theme);
  }

  const fields = ["light", "dark", "neutral"].flatMap((color) =>
    ["default", "soft", "ghost"].map((variant) => ({ color, variant })),
  );

  it.each(fields.filter(({ color }) => color !== "neutral"))(
    "input-date/fixed-colors keeps the $color $variant separator the same in both themes",
    ({ color, variant }) => {
      expect(separator(color, variant, "dark")).toBe(separator(color, variant, "light"));
    },
  );

  it.each(fields.filter(({ color }) => color === "neutral"))(
    "input-date/separator keeps the neutral $variant separator adaptive",
    ({ color, variant }) => {
      expect(separator(color, variant, "light")).toBe(resolve("color.text-weak", "light"));
      expect(separator(color, variant, "dark")).toBe(resolve("color.gray-400", "dark"));
    },
  );

  it("input-date/separator emits the neutral dark-theme color under the dark-theme selector", () => {
    const css = consumeCSS(s.root, s.options);

    expect(css).toMatch(
      /\.input-date-separator \{[^}]*:is\(\.dark-theme, \[data-theme="dark"\]\) & \{\s*color: var\(--color--gray-400\);/,
    );
    expect(css).not.toContain(".input-date-separator:dark");
  });
});
