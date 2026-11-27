import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useHoverModifier, useFocusVisibleModifier } from "@styleframe/theme";
import { useCalendarDayRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "alignItems",
    "justifyContent",
    "gap",
    "aspectRatio",
    "minWidth",
    "minHeight",
    "padding",
    "paddingLeft",
    "paddingRight",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "color",
    "background",
    "borderStyle",
    "borderRadius",
    "borderRadiusLeft",
    "borderRadiusRight",
    "cursor",
    "userSelect",
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "pointerEvents",
    "opacity",
    "textDecoration",
    "boxShadow",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useFocusVisibleModifier(s);
  return s;
}

describe("useCalendarDayRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCalendarDayRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("calendar-day");
  });

  it("should be square and inherit the cascaded cell size", () => {
    const s = createInstance();
    const recipe = useCalendarDayRecipe(s);

    expect(recipe.base?.aspectRatio).toBe("1 / 1");
    expect(recipe.base?.minWidth).toBe("var(--calendar-cell-size, calc(var(--spacing) * 2.25))");
    expect(recipe.base?.minHeight).toBe("var(--calendar-cell-size, calc(var(--spacing) * 2.25))");
    expect(recipe.base?.fontSize).toBe("var(--calendar-cell-font-size, 0.875rem)");
  });

  it("should remove the native button border", () => {
    const s = createInstance();
    const recipe = useCalendarDayRecipe(s);

    expect(recipe.base?.borderStyle).toBe("none");
  });

  describe("variants", () => {
    it("should expose the period type axis with pill-shaped picker cells", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      expect(Object.keys(recipe.variants!.type)).toEqual(["day", "month", "year"]);
      expect(recipe.variants!.type.day).toEqual({});
      expect(recipe.variants!.type.month).toMatchObject({
        aspectRatio: "auto",
        minWidth: "auto",
      });
      expect(recipe.variants!.type.year).toMatchObject({
        aspectRatio: "auto",
        minWidth: "auto",
      });
    });

    it("should expose the selection variant axis", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "outline", "soft", "subtle"]);
    });

    it("should expose the boolean state axes", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      expect(Object.keys(recipe.variants!.selected)).toEqual(["true", "false"]);
      expect(Object.keys(recipe.variants!.today)).toEqual(["true", "false"]);
      expect(Object.keys(recipe.variants!.outside)).toEqual(["true", "false"]);
      expect(Object.keys(recipe.variants!.disabled)).toEqual(["true", "false"]);
      expect(Object.keys(recipe.variants!.booked)).toEqual(["true", "false"]);
    });

    it("should expose the positional range axis", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      expect(Object.keys(recipe.variants!.range)).toEqual(["none", "start", "middle", "end"]);
    });

    it("should fill the selected day per variant", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      const fillFor = (variant: string) =>
        recipe.compoundVariants!.find(
          (v) =>
            v.match.variant === variant &&
            v.match.selected === "true" &&
            !v.match.today &&
            !v.match.outside,
        )?.css;

      expect(fillFor("solid")).toMatchObject({
        background: "@color.primary",
        color: "@color.white",
      });
      expect(fillFor("outline")).toMatchObject({
        background: "transparent",
        color: "@color.primary",
        boxShadow: "inset 0 0 0 1px var(--color--primary)",
      });
      expect(fillFor("soft")).toMatchObject({
        background: "@color.primary-200",
        color: "@color.primary-800",
      });
      expect(fillFor("subtle")).toMatchObject({
        background: "@color.primary-200",
        boxShadow: "inset 0 0 0 1px var(--color--primary-300)",
      });
    });

    it("should apply the same fill to range endpoints", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      for (const position of ["start", "end"] as const) {
        const cv = recipe.compoundVariants!.find(
          (v) => v.match.variant === "solid" && v.match.range === position,
        );
        expect(cv?.css).toMatchObject({ background: "@color.primary" });
      }
    });

    it("should strike through booked days without dimming them like disabled", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      expect(recipe.variants!.booked.true).toMatchObject({
        textDecoration: "line-through",
        cursor: "not-allowed",
      });
      expect(recipe.variants!.booked.true).not.toHaveProperty("opacity");
      expect(recipe.variants!.disabled.true).toMatchObject({ opacity: "0.5" });
    });

    it("should square the inner edge of range endpoints", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      expect(recipe.variants!.range.start.borderRadiusRight).toBe("0");
      expect(recipe.variants!.range.end.borderRadiusLeft).toBe("0");
      expect(recipe.variants!.range.middle.borderRadius).toBe("0");
    });
  });

  it("should default every state to off and the variant to solid", () => {
    const s = createInstance();
    const recipe = useCalendarDayRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      type: "day",
      variant: "solid",
      selected: "false",
      today: "false",
      outside: "false",
      disabled: "false",
      booked: "false",
      range: "none",
    });
  });

  describe("compound variants", () => {
    it("should have 5 compound variants per selection variant", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      // 4 variants × (selected fill, range start, range end, +2 legibility)
      expect(recipe.compoundVariants).toHaveLength(20);
    });

    it("should keep selected text legible over today and outside", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s);

      const selectedToday = recipe.compoundVariants!.find(
        (v) =>
          v.match.variant === "solid" && v.match.selected === "true" && v.match.today === "true",
      );
      expect(selectedToday?.css).toEqual({ color: "@color.white" });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s, {
        base: { borderRadius: "@border-radius.full" },
      });

      expect(recipe.base!.borderRadius).toBe("@border-radius.full");
      expect(recipe.base!.aspectRatio).toBe("1 / 1");
    });
  });

  describe("filter", () => {
    it("should filter the range axis", () => {
      const s = createInstance();
      const recipe = useCalendarDayRecipe(s, {
        filter: { range: ["none", "start"] },
      });

      expect(Object.keys(recipe.variants!.range)).toEqual(["none", "start"]);
    });
  });
});
