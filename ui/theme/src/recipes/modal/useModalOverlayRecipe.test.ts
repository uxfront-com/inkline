import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useModalOverlayRecipe } from "./index";

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
  useDarkModifier(s);
  return s;
}

describe("useModalOverlayRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useModalOverlayRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("modal-overlay");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useModalOverlayRecipe(s);

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
  });

  it("should have empty variants", () => {
    const s = createInstance();
    const recipe = useModalOverlayRecipe(s);

    expect(recipe.variants).toEqual({});
  });

  it("should have no compound variants", () => {
    const s = createInstance();
    const recipe = useModalOverlayRecipe(s);

    expect(recipe.compoundVariants).toHaveLength(0);
  });

  it("should have empty default variants", () => {
    const s = createInstance();
    const recipe = useModalOverlayRecipe(s);

    expect(recipe.defaultVariants).toEqual({});
  });
});
