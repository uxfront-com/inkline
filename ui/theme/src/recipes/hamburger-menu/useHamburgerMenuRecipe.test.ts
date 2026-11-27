import { styleframe } from "@styleframe/core";

import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import { useHoverModifier, useFocusVisibleModifier } from "@styleframe/theme";
import { useHamburgerMenuRecipe } from "./useHamburgerMenuRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "display",
    "alignItems",
    "justifyContent",
    "background",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "color",
    "cursor",
    "userSelect",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "opacity",
    "pointerEvents",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useFocusVisibleModifier(s);
  useDisabledModifier(s);
  return s;
}

describe("useHamburgerMenuRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useHamburgerMenuRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("hamburger-menu");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useHamburgerMenuRecipe(s);

    expect(recipe.base).toEqual({
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      borderWidth: "0",
      borderStyle: "none",
      borderColor: "transparent",
      color: "@color.text",
      cursor: "pointer",
      userSelect: "none",
      outline: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      "&:hover": {
        opacity: "0.8",
      },
      "&:focus-visible": {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "@color.primary",
        outlineOffset: "2px",
        borderRadius: "@border-radius.sm",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: "0.5",
        pointerEvents: "none",
      },
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all size variants", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
    });

    it("should have all animation variants", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      expect(Object.keys(recipe.variants!.animation)).toEqual([
        "close",
        "arrow-up",
        "arrow-down",
        "arrow-left",
        "arrow-right",
        "minus",
        "plus",
      ]);
    });

    it("should have active boolean variant", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      expect(Object.keys(recipe.variants!.active)).toEqual(["true", "false"]);
    });

    it("should have correct size padding values", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          paddingTop: "@0.375",
          paddingBottom: "@0.375",
          paddingLeft: "@0.375",
          paddingRight: "@0.375",
        },
        md: {
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.5",
          paddingRight: "@0.5",
        },
        lg: {
          paddingTop: "@0.625",
          paddingBottom: "@0.625",
          paddingLeft: "@0.625",
          paddingRight: "@0.625",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useHamburgerMenuRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
      animation: "close",
      active: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 14 compound variants (3 color + 3 size + 7 animation + 1 active)", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(14);
    });

    it("should have correct light compound variant", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.color === "light");
      expect(cv?.css).toEqual({
        color: "@color.gray-900",
        "&:dark": {
          color: "@color.gray-900",
        },
      });
    });

    it("should have correct dark compound variant", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.color === "dark");
      expect(cv?.css).toEqual({
        color: "@color.white",
        "&:dark": {
          color: "@color.white",
        },
      });
    });

    it("should have correct neutral compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.color === "neutral");
      expect(cv?.css).toEqual({
        color: "@color.gray-900",
        "&:dark": {
          color: "@color.white",
        },
      });
    });

    it("should add size className modifiers", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      const sm = recipe.compoundVariants!.find((v) => v.match.size === "sm");
      const md = recipe.compoundVariants!.find((v) => v.match.size === "md");
      const lg = recipe.compoundVariants!.find((v) => v.match.size === "lg");

      expect(sm?.className).toBe("-sm");
      expect(md?.className).toBe("-md");
      expect(lg?.className).toBe("-lg");
    });

    it("should add animation className modifiers for each animation value", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      const animations = [
        "close",
        "arrow-up",
        "arrow-down",
        "arrow-left",
        "arrow-right",
        "minus",
        "plus",
      ];

      for (const animation of animations) {
        const cv = recipe.compoundVariants!.find((v) => v.match.animation === animation);
        expect(cv?.className).toBe(`-${animation}`);
      }
    });

    it("should add -active className when active is true", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s);

      const cv = recipe.compoundVariants!.find((v) => v.match.active === "true");
      expect(cv?.className).toBe("-active");
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s, {
        base: { display: "block" },
      });

      expect(recipe.base?.display).toBe("block");
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
    });

    it("should filter animation variants", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s, {
        filter: { animation: ["close", "plus"] },
      });

      expect(Object.keys(recipe.variants!.animation)).toEqual(["close", "plus"]);
    });

    it("should prune compound variants when filtering", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s, {
        filter: { color: ["neutral"], animation: ["close"] },
      });

      expect(recipe.compoundVariants!.length).toBeLessThan(14);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useHamburgerMenuRecipe(s, {
        filter: { color: ["light"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
    });
  });
});
