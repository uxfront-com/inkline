import { styleframe } from "@styleframe/core";

import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import { useActiveModifier, useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";
import { useAccordionTriggerRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "width",
    "background",
    "color",
    "fontFamily",
    "fontWeight",
    "fontSize",
    "lineHeight",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "cursor",
    "textAlign",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "opacity",
    "pointerEvents",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useActiveModifier(s);
  useFocusVisibleModifier(s);
  useDisabledModifier(s);
  return s;
}

describe("useAccordionTriggerRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useAccordionTriggerRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("accordion-trigger");
  });

  it("should render as a reset, full-width button row", () => {
    const s = createInstance();
    const recipe = useAccordionTriggerRecipe(s);

    expect(recipe.base!.display).toBe("flex");
    expect(recipe.base!.justifyContent).toBe("space-between");
    expect(recipe.base!.width).toBe("100%");
    expect(recipe.base!.background).toBe("transparent");
    expect(recipe.base!.color).toBe("inherit");
    expect(recipe.base!.borderWidth).toBe("0");
    expect(recipe.base!.cursor).toBe("pointer");
  });

  it("should expose focus-visible and disabled states", () => {
    const s = createInstance();
    const recipe = useAccordionTriggerRecipe(s);

    expect(recipe.base!["&:focus-visible"]).toEqual({
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "@color.primary",
      outlineOffset: "-2px",
    });
    expect(recipe.base!["&:disabled"]).toEqual({
      cursor: "not-allowed",
      opacity: "0.75",
      pointerEvents: "none",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useAccordionTriggerRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should scale padding and font with size", () => {
      const s = createInstance();
      const recipe = useAccordionTriggerRecipe(s);

      expect(recipe.variants!.size.md).toEqual({
        fontSize: "@font-size.md",
        paddingTop: "@0.75",
        paddingBottom: "@0.75",
        paddingLeft: "@1",
        paddingRight: "@1",
        gap: "@0.75",
      });
    });
  });

  describe("compound variants", () => {
    it("should have one hover/active compound per color", () => {
      const s = createInstance();
      const recipe = useAccordionTriggerRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(3);
    });

    it("should tint the background on hover for neutral", () => {
      const s = createInstance();
      const recipe = useAccordionTriggerRecipe(s);

      const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

      expect(neutral).toEqual({
        match: { color: "neutral" },
        css: {
          "&:hover": { background: "@color.gray-100" },
          "&:active": { background: "@color.gray-150" },
          "&:dark:hover": { background: "@color.gray-800" },
          "&:dark:active": { background: "@color.gray-750" },
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useAccordionTriggerRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "solid",
      size: "md",
    });
  });
});
