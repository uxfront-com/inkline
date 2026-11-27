import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useAvatarBadgeRecipe } from "./useAvatarBadgeRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "top",
    "bottom",
    "left",
    "right",
    "display",
    "borderRadius",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "boxSizing",
    "width",
    "height",
    "background",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useAvatarBadgeRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useAvatarBadgeRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("avatar-badge");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useAvatarBadgeRecipe(s);

    expect(recipe.base).toEqual({
      position: "absolute",
      display: "inline-flex",
      borderRadius: "@border-radius.full",
      borderWidth: "@border-width.medium",
      borderStyle: "@border-style.solid",
      borderColor: "@color.background",
      boxSizing: "border-box",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual([
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "light",
        "dark",
        "neutral",
      ]);
    });

    it("should have all position variants with correct styles", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s);

      expect(recipe.variants!.position).toEqual({
        "top-left": { top: "0", right: "auto", bottom: "auto", left: "0" },
        "top-right": { top: "0", right: "0", bottom: "auto", left: "auto" },
        "bottom-left": { top: "auto", right: "auto", bottom: "0", left: "0" },
        "bottom-right": { top: "auto", right: "0", bottom: "0", left: "auto" },
      });
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s);

      expect(recipe.variants!.size).toEqual({
        xs: { width: "8px", height: "8px" },
        sm: { width: "10px", height: "10px" },
        md: { width: "12px", height: "12px" },
        lg: { width: "14px", height: "14px" },
        xl: { width: "18px", height: "18px" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useAvatarBadgeRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "success",
      size: "md",
      position: "bottom-right",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s);

      // 6 semantic + light/dark/neutral = 9
      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct success compound variant", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s);

      const success = recipe.compoundVariants!.find((cv) => cv.match.color === "success");

      expect(success).toEqual({
        match: { color: "success" },
        css: {
          background: "@color.success",
        },
      });
    });

    it("should have correct neutral compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s);

      const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

      expect(neutral).toEqual({
        match: { color: "neutral" },
        css: {
          background: "@color.gray-400",
          "&:dark": {
            background: "@color.gray-500",
          },
        },
      });
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s, {
        base: { bottom: "2px" },
      });

      expect(recipe.base!.bottom).toBe("2px");
      expect(recipe.base!.position).toBe("absolute");
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune compound variants", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s, {
        filter: { color: ["success"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["success"]);
      expect(recipe.compoundVariants).toHaveLength(1);
      expect(recipe.defaultVariants?.color).toBe("success");
    });

    it("should adjust default variants when filtered out", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s, {
        filter: { color: ["primary"] },
      });

      expect(recipe.defaultVariants?.color).toBeUndefined();
      expect(recipe.defaultVariants?.size).toBe("md");
      expect(recipe.defaultVariants?.position).toBe("bottom-right");
    });

    it("should filter position variants", () => {
      const s = createInstance();
      const recipe = useAvatarBadgeRecipe(s, {
        filter: { position: ["top-right", "bottom-right"] },
      });

      expect(Object.keys(recipe.variants!.position)).toEqual(["top-right", "bottom-right"]);
      expect(recipe.defaultVariants?.position).toBe("bottom-right");
    });
  });
});
