import { styleframe } from "@styleframe/core";
import type { AtRule, Selector } from "@styleframe/core";

import { expectKeyframesRegistered } from "../../__tests__/expectKeyframesRegistered";
import { useMotionReduceModifier } from "@styleframe/theme";
import { useSpinnerCircleRecipe } from "./useSpinnerCircleRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "flexShrink",
    "animationName",
    "animationDuration",
    "animationTimingFunction",
    "animationIterationCount",
    "transformOrigin",
    "width",
    "height",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useMotionReduceModifier(s);
  return s;
}

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
  return s.root.children.find(
    (child): child is Selector => child.type === "selector" && (child as Selector).query === query,
  );
}

describe("useSpinnerCircleRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSpinnerCircleRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("spinner-circle");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSpinnerCircleRecipe(s);

    expect(recipe.base).toEqual({
      flexShrink: "0",
      animationName: "spinner-rotate",
      animationDuration: "1.2s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      transformOrigin: "center center",
      "&:motion-reduce": {
        animationName: "spinner-pulse",
        animationDuration: "1.6s !important",
        animationTimingFunction: "@easing.ease-in-out",
        animationIterationCount: "infinite !important",
      },
    });
  });

  describe("variants", () => {
    it("should have all size variants", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s);

      expect(Object.keys(recipe.variants!.size)).toEqual(["auto", "sm", "md", "lg", "inherit"]);
    });

    it("should have correct size variant styles", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s);

      expect(recipe.variants!.size).toEqual({
        auto: { width: "100%", height: "100%" },
        sm: { width: "@2", height: "@2" },
        md: { width: "@3", height: "@3" },
        lg: { width: "@4", height: "@4" },
        inherit: { width: "1em", height: "1em" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSpinnerCircleRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      size: "md",
    });
  });

  it("should have no compound variants", () => {
    const s = createInstance();
    const recipe = useSpinnerCircleRecipe(s);

    expect(recipe.compoundVariants).toEqual(undefined);
  });

  it("should register the keyframes referenced by animationName", () => {
    const s = createInstance();
    useSpinnerCircleRecipe(s);

    expectKeyframesRegistered(s, "spinner-rotate");
    expectKeyframesRegistered(s, "spinner-dash");
    expectKeyframesRegistered(s, "spinner-pulse");
  });

  describe("Open Components rules", () => {
    it("spinner/em-sized adds an inherit size of 1em, and keeps md as the default", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s);

      expect(recipe.variants!.size.inherit).toEqual({
        width: "1em",
        height: "1em",
      });
      expect(recipe.defaultVariants?.size).toBe("md");
    });

    it("spinner/current-color draws the circle in the text color", () => {
      const s = createInstance();
      useSpinnerCircleRecipe(s);

      const circle = findSelector(s, ".spinner-circle circle");
      expect(circle?.declarations.stroke).toBe("currentColor");
      expect(circle?.declarations.fill).toBe("none");
    });

    it("spinner/reduced-motion pulses instead of turning", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s);

      expect(recipe.base?.["&:motion-reduce"]).toEqual({
        animationName: "spinner-pulse",
        animationDuration: "1.6s !important",
        animationTimingFunction: "@easing.ease-in-out",
        animationIterationCount: "infinite !important",
      });
      const pulse = expectKeyframesRegistered(s, "spinner-pulse");
      const step = pulse.children[0] as Selector;
      expect(step.query).toBe("50%");
      expect(step.declarations).toEqual({ opacity: "0.4" });
    });

    it("spinner/reduced-motion stops the arc from growing and shrinking", () => {
      const s = createInstance();
      useSpinnerCircleRecipe(s);

      const circle = findSelector(s, ".spinner-circle circle");
      const reduced = circle?.children.find(
        (child): child is AtRule =>
          child.type === "at-rule" &&
          child.identifier === "media" &&
          child.rule === "(prefers-reduced-motion: reduce)",
      );
      expect(reduced?.declarations).toEqual({ animationName: "none" });
    });

    it("spinner/stable-layout keeps a fixed size and turns without taking more room", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s);

      expect(recipe.base?.flexShrink).toBe("0");
      for (const size of ["sm", "md", "lg", "inherit"] as const) {
        const { width, height } = recipe.variants!.size[size] as Record<string, string>;
        expect(width).toBe(height);
      }
      const rotate = expectKeyframesRegistered(s, "spinner-rotate");
      expect((rotate.children[0] as Selector).declarations).toEqual({
        transform: "rotate(360deg)",
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s, {
        base: { animationDuration: "2s" },
      });

      expect(recipe.base?.animationDuration).toBe("2s");
      expect(recipe.base?.animationName).toBe("spinner-rotate");
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s, {
        filter: { size: ["sm", "md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useSpinnerCircleRecipe(s, {
        filter: { size: ["sm", "lg"] },
      });

      expect(recipe.defaultVariants?.size).toBeUndefined();
    });
  });
});
