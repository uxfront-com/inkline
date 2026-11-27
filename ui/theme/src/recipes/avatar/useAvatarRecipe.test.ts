import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useAvatarRecipe } from "./useAvatarRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "display",
    "alignItems",
    "justifyContent",
    "flexShrink",
    "fontWeight",
    "lineHeight",
    "textTransform",
    "userSelect",
    "verticalAlign",
    "borderRadius",
    "width",
    "height",
    "fontSize",
    "background",
    "color",
    "objectFit",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useAvatarRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useAvatarRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("avatar");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useAvatarRecipe(s);

    expect(recipe.base).toEqual({
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      fontWeight: "@font-weight.medium",
      lineHeight: "1",
      textTransform: "uppercase",
      userSelect: "none",
      verticalAlign: "middle",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["primary", "light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
    });

    it("should have shape variants", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      expect(recipe.variants!.shape).toEqual({
        circle: {
          borderRadius: "@border-radius.full",
        },
        square: {
          borderRadius: "@border-radius.md",
        },
      });
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: { width: "@1.5", height: "@1.5", fontSize: "@font-size.2xs" },
        sm: { width: "@2", height: "@2", fontSize: "@font-size.xs" },
        md: { width: "@2.5", height: "@2.5", fontSize: "@font-size.sm" },
        lg: { width: "@3", height: "@3", fontSize: "@font-size.md" },
        xl: { width: "@4", height: "@4", fontSize: "@font-size.lg" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useAvatarRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "soft",
      size: "md",
      shape: "circle",
    });
  });

  describe("compound variants", () => {
    it("should have 8 compound variants total", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      // 4 colors × 2 variants = 8
      expect(recipe.compoundVariants).toHaveLength(8);
    });

    it("should have correct neutral soft compound variant (the default)", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      const neutralSoft = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "soft",
      );

      expect(neutralSoft).toEqual({
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

    it("should have correct primary solid compound variant", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s);

      const primarySolid = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "primary" && cv.match.variant === "solid",
      );

      expect(primarySolid).toEqual({
        match: { color: "primary", variant: "solid" },
        css: {
          background: "@color.primary",
          color: "@color.white",
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s, {
        base: { display: "flex" },
      });

      expect(recipe.base!.display).toBe("flex");
      expect(recipe.base!.position).toBe("relative");
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compound variants", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["primary"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "primary")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(2);
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useAvatarRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.variant).toBe("soft");
      expect(recipe.defaultVariants?.size).toBe("md");
      expect(recipe.defaultVariants?.shape).toBe("circle");
    });
  });
});
