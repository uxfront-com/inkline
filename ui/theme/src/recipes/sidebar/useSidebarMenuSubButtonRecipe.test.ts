import { styleframe } from "@styleframe/core";

import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
  useActiveModifier,
  useFocusModifier,
  useFocusVisibleModifier,
  useHoverModifier,
} from "@styleframe/theme";
import { useSidebarMenuSubButtonRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "width",
    "background",
    "fontWeight",
    "lineHeight",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "textAlign",
    "textDecoration",
    "whiteSpace",
    "overflow",
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
    "fontSize",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  useHoverModifier(s);
  useFocusModifier(s);
  useFocusVisibleModifier(s);
  useActiveModifier(s);
  useDisabledModifier(s);
  return s;
}

describe("useSidebarMenuSubButtonRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubButtonRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("sidebar-menu-sub-button");
  });

  it("should share the menu-button surface (block nav item base)", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubButtonRecipe(s);

    expect(recipe.base!.display).toBe("flex");
    expect(recipe.base!.width).toBe("100%");
    expect(recipe.base!.justifyContent).toBe("flex-start");
    expect(recipe.base!.textAlign).toBe("left");
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubButtonRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have ghost and subtle style variants", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubButtonRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["ghost", "subtle"]);
    });

    it("should have active and disabled boolean axes", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubButtonRecipe(s);

      expect(Object.keys(recipe.variants!.active)).toEqual(["true", "false"]);
      expect(Object.keys(recipe.variants!.disabled)).toEqual(["true", "false"]);
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useSidebarMenuSubButtonRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "ghost",
      size: "md",
      active: "false",
      disabled: "false",
    });
  });

  describe("compound variants", () => {
    it("should have 9 compound variants total", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubButtonRecipe(s);

      expect(recipe.compoundVariants).toHaveLength(9);
    });

    it("should have correct neutral ghost compound variant", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubButtonRecipe(s);

      const neutralGhost = recipe.compoundVariants!.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "ghost",
      );

      expect(neutralGhost).toEqual({
        match: { color: "neutral", variant: "ghost" },
        css: {
          color: "@color.text",
          "&:hover": { background: "@color.gray-100" },
          "&:focus": { background: "@color.gray-100" },
          "&:active": { background: "@color.gray-200" },
          "&:dark": { color: "@color.gray-200" },
          "&:dark:hover": { background: "@color.gray-800" },
          "&:dark:focus": { background: "@color.gray-800" },
          "&:dark:active": { background: "@color.gray-750" },
        },
      });
    });
  });

  describe("filter", () => {
    it("should filter color variants and prune their compounds", () => {
      const s = createInstance();
      const recipe = useSidebarMenuSubButtonRecipe(s, {
        filter: { color: ["neutral"] },
      });

      expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
      expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
      expect(recipe.compoundVariants).toHaveLength(3);
    });
  });
});
