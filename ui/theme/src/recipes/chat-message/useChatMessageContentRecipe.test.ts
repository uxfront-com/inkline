import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useChatMessageContentRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "background",
    "alignSelf",
    "lineHeight",
    "color",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useChatMessageContentRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useChatMessageContentRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("chat-message-content");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useChatMessageContentRecipe(s);

    expect(recipe.base).toEqual({
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      borderRadius: "@border-radius.md",
      background: "transparent",
      lineHeight: "@line-height.normal",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants including outline and ghost", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual([
        "solid",
        "outline",
        "soft",
        "subtle",
        "ghost",
      ]);
    });

    it("should have ghost variant that strips chrome", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      expect(recipe.variants!.variant.ghost).toEqual({
        background: "transparent",
        borderColor: "transparent",
        paddingTop: "0",
        paddingBottom: "0",
        paddingLeft: "0",
        paddingRight: "0",
        borderRadius: "0",
      });
    });

    it("should have size variants with correct padding and border-radius", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.75",
          paddingRight: "@0.75",
          borderRadius: "@border-radius.sm",
        },
        md: {
          paddingTop: "@0.75",
          paddingBottom: "@0.75",
          paddingLeft: "@1",
          paddingRight: "@1",
          borderRadius: "@border-radius.md",
        },
        lg: {
          paddingTop: "@1",
          paddingBottom: "@1",
          paddingLeft: "@1.25",
          paddingRight: "@1.25",
          borderRadius: "@border-radius.lg",
        },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useChatMessageContentRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      size: "md",
      variant: "subtle",
      side: "start",
    });
  });

  describe("compound variants", () => {
    it("should have 12 compound variants total", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      // 3 colors × 4 visual variants (solid/outline/soft/subtle) = 12
      // (ghost has no compound entries — it strips chrome regardless of color)
      expect(recipe.compoundVariants).toHaveLength(12);
    });

    it("should have correct light × outline compound variant", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      const lightOutline = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "light" && cv.match.variant === "outline",
      );

      expect(lightOutline).toEqual({
        match: { color: "light", variant: "outline" },
        css: {
          borderColor: "@color.gray-200",
          color: "@color.gray-700",
          "&:dark": {
            borderColor: "@color.gray-200",
            color: "@color.gray-700",
          },
        },
      });
    });

    it("should have correct neutral × subtle compound variant with adaptive dark mode", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      const neutralSubtle = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
      );

      expect(neutralSubtle).toEqual({
        match: { color: "neutral", variant: "subtle" },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-700",
          },
        },
      });
    });

    it("should have no compound variants for ghost", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s);

      const ghostEntries = recipe.compoundVariants!.filter((cv) => cv.match.variant === "ghost");

      expect(ghostEntries).toHaveLength(0);
    });
  });

  describe("filter", () => {
    it("should filter color variants", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(4);
    });

    it("should prune compound variants when filtering variant axis", () => {
      const s = createInstance();
      const recipe = useChatMessageContentRecipe(s, {
        filter: { variant: ["solid", "outline"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "outline"]);
      expect(
        recipe.compoundVariants!.every(
          (cv) => cv.match.variant === "solid" || cv.match.variant === "outline",
        ),
      ).toBe(true);
    });
  });
});
