import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import {
  createBackdropRecipe,
  createOverlayBodyRecipe,
  createOverlayFooterRecipe,
  createOverlayHeaderRecipe,
  overlaySurfaceCompoundVariants,
} from "./createOverlayRecipes";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "flexDirection",
    "flexGrow",
    "alignItems",
    "justifyContent",
    "flexWrap",
    "gap",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "borderTopWidth",
    "borderTopStyle",
    "borderTopColor",
    "borderBottomWidth",
    "borderBottomStyle",
    "borderBottomColor",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "background",
    "zIndex",
    "color",
    "borderColor",
    "flexShrink",
    "minHeight",
    "overflowY",
    "paddingInlineStart",
    "paddingInlineEnd",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
  return s.root.children.find(
    (child) => child.type === "selector" && (child as { query: string }).query === query,
  );
}

describe("createOverlayRecipes", () => {
  describe("overlaySurfaceCompoundVariants", () => {
    it("has 9 color × variant entries", () => {
      expect(overlaySurfaceCompoundVariants).toHaveLength(9);
    });

    it("has the adaptive neutral solid surface", () => {
      const neutralSolid = overlaySurfaceCompoundVariants.find(
        (cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
      );

      expect(neutralSolid).toEqual({
        match: { color: "neutral", variant: "solid" },
        css: {
          background: "@color.white",
          color: "@color.text",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
            borderColor: "@color.gray-700",
          },
        },
      });
    });
  });

  describe("createOverlayHeaderRecipe", () => {
    it("namespaces the recipe and setup selectors by the given name", () => {
      const s = createInstance();
      const recipe = createOverlayHeaderRecipe("demo")(s);

      expect(recipe.type).toBe("recipe");
      expect(recipe.name).toBe("demo-header");
      expect(findSelector(s, ".demo-header:first-child")).toBeDefined();
      expect(findSelector(s, ".demo-header:last-child")).toBeDefined();
    });

    it("has the shared base, sizes, separators, and defaults", () => {
      const s = createInstance();
      const recipe = createOverlayHeaderRecipe("demo")(s);

      expect(recipe.base).toMatchObject({
        display: "flex",
        alignItems: "center",
        borderBottomWidth: "@border-width.thin",
      });
      expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
      expect(recipe.compoundVariants).toHaveLength(9);
      expect(recipe.defaultVariants).toEqual({
        color: "neutral",
        variant: "solid",
        size: "md",
      });
    });
  });

  describe("createOverlayFooterRecipe", () => {
    it("right-aligns actions and registers footer separators", () => {
      const s = createInstance();
      const recipe = createOverlayFooterRecipe("demo")(s);

      expect(recipe.name).toBe("demo-footer");
      expect(recipe.base!.justifyContent).toBe("flex-end");
      expect(recipe.compoundVariants).toHaveLength(9);
      expect(findSelector(s, ".demo-footer:first-child")).toBeDefined();
      expect(findSelector(s, ".demo-footer:last-child")).toBeDefined();
    });
  });

  describe("createOverlayBodyRecipe", () => {
    it("has size padding but no separators or compounds", () => {
      const s = createInstance();
      const recipe = createOverlayBodyRecipe("demo")(s);

      expect(recipe.name).toBe("demo-body");
      expect(recipe.variants!.size.sm).toEqual({
        paddingTop: "@0.5",
        paddingBottom: "@0.5",
        paddingInlineStart: "@0.75",
        paddingInlineEnd: "@0.75",
        gap: "@0.375",
      });
      expect(recipe.compoundVariants ?? []).toHaveLength(0);
    });
  });

  describe("createBackdropRecipe", () => {
    it("is a fixed full-screen backdrop with no variants", () => {
      const s = createInstance();
      const recipe = createBackdropRecipe("demo")(s);

      expect(recipe.name).toBe("demo-overlay");
      expect(recipe.base).toEqual({
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.75)",
        zIndex: "1000",
      });
      expect(Object.keys(recipe.variants ?? {})).toHaveLength(0);
    });
  });

  describe("Dialog rules", () => {
    it("dialog/backdrop dims the page, and every neutral panel has a border in the dark theme", () => {
      const s = createInstance();
      const backdrop = createBackdropRecipe("demo")(s);

      expect(backdrop.base!.background).toBe("rgba(0, 0, 0, 0.75)");
      for (const cv of overlaySurfaceCompoundVariants.filter(
        (cv) => cv.match.color === "neutral",
      )) {
        const dark = (cv.css as Record<string, Record<string, string>>)["&:dark"];
        expect(dark?.borderColor, `neutral ${cv.match.variant}`).toMatch(/^@color\./);
      }
    });

    it("dialog/actions-in-view keeps the header and footer in view while the body scrolls", () => {
      const s = createInstance();
      const header = createOverlayHeaderRecipe("demo")(s);
      const footer = createOverlayFooterRecipe("demo")(s);
      const body = createOverlayBodyRecipe("demo")(s);

      expect(header.base!.flexShrink).toBe("0");
      expect(footer.base!.flexShrink).toBe("0");
      expect(footer.base!.flexWrap).toBe("wrap");
      expect(body.base).toMatchObject({ minHeight: "0", overflowY: "auto" });
    });

    it("dialog/mirrors-in-rtl pads the sections with logical properties", () => {
      const s = createInstance();
      const recipes = [
        createOverlayHeaderRecipe("demo")(s),
        createOverlayFooterRecipe("demo")(s),
        createOverlayBodyRecipe("demo")(s),
      ];

      for (const recipe of recipes) {
        const json = JSON.stringify([recipe.base, recipe.variants]);
        expect(json).not.toMatch(/"(paddingLeft|paddingRight|left|right)"/);
        expect(recipe.base).toMatchObject({
          paddingInlineStart: "@1",
          paddingInlineEnd: "@1",
        });
      }
      expect(recipes[1]!.base!.justifyContent).toBe("flex-end");
    });

    it("dialog/reduced-motion adds no animation or transition to the sections or backdrop", () => {
      const s = createInstance();
      const recipes = [
        createOverlayHeaderRecipe("demo")(s),
        createOverlayFooterRecipe("demo")(s),
        createOverlayBodyRecipe("demo")(s),
        createBackdropRecipe("demo")(s),
      ];

      expect(JSON.stringify(recipes)).not.toMatch(/animation|transition/i);
    });
  });
});
