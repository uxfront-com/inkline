import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useToastRecipe } from "./useToastRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "overflow",
    "display",
    "alignItems",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "boxShadow",
    "fontWeight",
    "fontSize",
    "lineHeight",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "gap",
    "borderRadius",
    "flexDirection",
    "background",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useToastRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useToastRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("toast");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useToastRecipe(s);

    expect(recipe.base).toEqual({
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-start",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      boxShadow: "@box-shadow.lg",
      fontWeight: "@font-weight.medium",
      fontSize: "@font-size.sm",
      lineHeight: "@line-height.normal",
      paddingTop: "@1",
      paddingBottom: "@1",
      paddingLeft: "@1.25",
      paddingRight: "@1.25",
      gap: "@1",
      borderRadius: "@border-radius.lg",
    });
  });

  describe("variants", () => {
    it("should not key off a color axis — color lives on the icon and progress bar", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(recipe.variants).not.toHaveProperty("color");
    });

    it("should carry the neutral surface on the variant axis", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
    });

    it("should render solid as an opaque neutral card in both modes", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(recipe.variants!.variant.solid).toEqual({
        background: "@color.white",
        color: "@color.text",
        borderColor: "@color.gray-200",
        "&:dark": {
          background: "@color.gray-900",
          color: "@color.white",
          borderColor: "@color.gray-800",
        },
      });
    });

    it("should render soft as a faint borderless fill in both modes", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(recipe.variants!.variant.soft).toEqual({
        background: "@color.gray-50",
        color: "@color.gray-700",
        "&:dark": {
          background: "@color.gray-800",
          color: "@color.gray-300",
        },
      });
    });

    it("should render subtle as a faint fill with a hairline border", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(recipe.variants!.variant.subtle).toEqual({
        background: "@color.gray-50",
        color: "@color.gray-700",
        borderColor: "@color.gray-300",
        "&:dark": {
          background: "@color.gray-800",
          color: "@color.gray-300",
          borderColor: "@color.gray-600",
        },
      });
    });

    it("should keep every variant surface neutral — no semantic color token in any variant", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      const serialized = JSON.stringify(recipe.variants!.variant);
      for (const color of ["primary", "secondary", "success", "info", "warning", "error"]) {
        expect(serialized).not.toContain(`@color.${color}`);
      }
    });

    it("should have size variants with correct styles", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: {
          fontSize: "@font-size.xs",
          paddingTop: "@0.5",
          paddingBottom: "@0.5",
          paddingLeft: "@0.75",
          paddingRight: "@0.75",
          gap: "@0.5",
        },
        md: {
          fontSize: "@font-size.sm",
          paddingTop: "@1",
          paddingBottom: "@1",
          paddingLeft: "@1.25",
          paddingRight: "@1.25",
          gap: "@1",
        },
        lg: {
          fontSize: "@font-size.md",
          paddingTop: "@1.25",
          paddingBottom: "@1.25",
          paddingLeft: "@1.5",
          paddingRight: "@1.5",
          gap: "@1.25",
        },
      });
    });

    it("should have orientation variants", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s);

      expect(recipe.variants!.orientation).toEqual({
        horizontal: { flexDirection: "row", alignItems: "center" },
        vertical: { flexDirection: "column" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useToastRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      variant: "solid",
      size: "md",
      orientation: "horizontal",
    });
  });

  it("should not declare any compound variants", () => {
    const s = createInstance();
    const recipe = useToastRecipe(s);

    // The color axis moved to the icon and progress bar, so the surface has
    // no color × variant interactions left to compound.
    expect(recipe.compoundVariants ?? []).toHaveLength(0);
  });

  it("should not have an outline variant", () => {
    const s = createInstance();
    const recipe = useToastRecipe(s);

    expect(recipe.variants!.variant).not.toHaveProperty("outline");
  });

  describe("setup callback", () => {
    it("should collapse the toast when hidden", () => {
      const s = createInstance();
      useToastRecipe(s);

      const hiddenSelector = s.root.children.find(
        (child) =>
          child.type === "selector" && (child as { query: string }).query === ".toast[hidden]",
      );

      expect(hiddenSelector).toBeDefined();
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.alignItems).toBe("flex-start");
    });
  });

  describe("filter", () => {
    it("should filter the variant axis", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s, {
        filter: { variant: ["solid", "soft"] },
      });

      expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
    });

    it("should clear the default variant when it is filtered out", () => {
      const s = createInstance();
      const recipe = useToastRecipe(s, {
        filter: { variant: ["subtle"] },
      });

      expect(recipe.defaultVariants?.variant).toBeUndefined();
      expect(recipe.defaultVariants?.size).toBe("md");
      expect(recipe.defaultVariants?.orientation).toBe("horizontal");
    });
  });
});
