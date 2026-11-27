import { styleframe } from "@styleframe/core";

import { useFocusModifier } from "@styleframe/theme";
import { useInputDateSegmentRecipe } from "./useInputDateSegmentRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "boxSizing",
    "fontFamily",
    "fontWeight",
    "fontSize",
    "lineHeight",
    "fontVariantNumeric",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "borderRadius",
    "background",
    "color",
    "outline",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useFocusModifier(s);
  return s;
}

describe("useInputDateSegmentRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useInputDateSegmentRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("input-date-segment");
  });

  it("should have transparent, centered base styles with a focus highlight", () => {
    const s = createInstance();
    const recipe = useInputDateSegmentRecipe(s);

    expect(recipe.base).toEqual({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      fontFamily: "inherit",
      fontWeight: "@font-weight.normal",
      lineHeight: "@line-height.normal",
      fontVariantNumeric: "tabular-nums",
      paddingTop: "@0.125",
      paddingBottom: "@0.125",
      background: "transparent",
      color: "inherit",
      outline: "none",
      transitionProperty: "color, background-color",
      transitionTimingFunction: "@easing.ease-in-out",
      transitionDuration: "150ms",
      "&:focus": {
        background: "@color.primary",
        color: "@color.white",
      },
    });
  });

  it("should have size variants with scaled font, padding and radius", () => {
    const s = createInstance();
    const recipe = useInputDateSegmentRecipe(s);

    expect(recipe.variants!.size).toEqual({
      sm: {
        fontSize: "@font-size.xs",
        paddingLeft: "@0.125",
        paddingRight: "@0.125",
        borderRadius: "@border-radius.sm",
      },
      md: {
        fontSize: "@font-size.sm",
        paddingLeft: "@0.25",
        paddingRight: "@0.25",
        borderRadius: "@border-radius.sm",
      },
      lg: {
        fontSize: "@font-size.md",
        paddingLeft: "@0.25",
        paddingRight: "@0.25",
        borderRadius: "@border-radius.md",
      },
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useInputDateSegmentRecipe(s);

    expect(recipe.defaultVariants).toEqual({ size: "md" });
  });

  it("should not declare a color or variant axis", () => {
    const s = createInstance();
    const recipe = useInputDateSegmentRecipe(s);

    expect(recipe.variants).not.toHaveProperty("color");
    expect(recipe.variants).not.toHaveProperty("variant");
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useInputDateSegmentRecipe(s, {
        base: { justifyContent: "flex-start" },
      });

      expect(recipe.base!.justifyContent).toBe("flex-start");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useInputDateSegmentRecipe(s, {
        filter: { size: ["md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
    });
  });
});
