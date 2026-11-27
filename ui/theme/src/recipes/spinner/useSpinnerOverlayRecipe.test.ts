import { styleframe } from "@styleframe/core";

import { useSpinnerOverlayRecipe } from "./useSpinnerOverlayRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "display",
    "alignItems",
    "justifyContent",
    "background",
    "zIndex",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  return s;
}

describe("useSpinnerOverlayRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useSpinnerOverlayRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("spinner-overlay");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useSpinnerOverlayRecipe(s);

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
      zIndex: "@z-index.overlay",
    });
  });

  it("should have no variants", () => {
    const s = createInstance();
    const recipe = useSpinnerOverlayRecipe(s);

    expect(recipe.variants).toEqual({});
  });

  it("should have no compound variants", () => {
    const s = createInstance();
    const recipe = useSpinnerOverlayRecipe(s);

    expect(recipe.compoundVariants).toEqual([]);
  });

  it("should have no default variants", () => {
    const s = createInstance();
    const recipe = useSpinnerOverlayRecipe(s);

    expect(recipe.defaultVariants).toEqual({});
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = useSpinnerOverlayRecipe(s, {
        base: { position: "absolute" },
      });

      expect(recipe.base?.position).toBe("absolute");
      expect(recipe.base?.background).toBe("rgba(0, 0, 0, 0.75)");
    });
  });
});
