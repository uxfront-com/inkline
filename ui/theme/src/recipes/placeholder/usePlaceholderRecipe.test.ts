import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { usePlaceholderRecipe } from "./usePlaceholderRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "overflow",
    "opacity",
    "padding",
    "backgroundImage",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("usePlaceholderRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = usePlaceholderRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("placeholder");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = usePlaceholderRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.dashed",
      borderColor: "@color.gray-300",
      borderRadius: "@border-radius.md",
      overflow: "hidden",
      opacity: "0.75",
      padding: "@1",
      backgroundImage:
        "repeating-linear-gradient(-45deg, transparent, transparent 7px, rgba(0, 0, 0, 0.04) 7px, rgba(0, 0, 0, 0.04) 8px)",
      "&:dark": {
        borderColor: "@color.gray-600",
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 7px, rgba(255, 255, 255, 0.04) 7px, rgba(255, 255, 255, 0.04) 8px)",
      },
    });
  });

  describe("config overrides", () => {
    it("should allow overriding base styles", () => {
      const s = createInstance();
      const recipe = usePlaceholderRecipe(s, {
        base: { display: "inline-flex" },
      });

      expect(recipe.base!.display).toBe("inline-flex");
      expect(recipe.base!.alignItems).toBe("center");
    });
  });
});
