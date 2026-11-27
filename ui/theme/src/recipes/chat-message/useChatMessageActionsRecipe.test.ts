import { styleframe } from "@styleframe/core";

import { useDarkModifier } from "@styleframe/theme";
import { useChatMessageActionsRecipe } from "./index";

function createInstance() {
  const s = styleframe();
  for (const name of ["display", "flexDirection", "justifyContent", "gap", "marginTop"]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);
  return s;
}

describe("useChatMessageActionsRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useChatMessageActionsRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("chat-message-actions");
  });

  it("should have correct base styles", () => {
    const s = createInstance();
    const recipe = useChatMessageActionsRecipe(s);

    expect(recipe.base).toEqual({
      display: "flex",
      flexDirection: "row",
      gap: "@0.25",
      marginTop: "@0.25",
    });
  });

  describe("variants", () => {
    it("should have all color variants", () => {
      const s = createInstance();
      const recipe = useChatMessageActionsRecipe(s);

      expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
    });

    it("should have all style variants", () => {
      const s = createInstance();
      const recipe = useChatMessageActionsRecipe(s);

      expect(Object.keys(recipe.variants!.variant)).toEqual([
        "solid",
        "outline",
        "soft",
        "subtle",
        "ghost",
      ]);
    });

    it("should have size variants with correct gap and margin", () => {
      const s = createInstance();
      const recipe = useChatMessageActionsRecipe(s);

      expect(recipe.variants!.size).toEqual({
        sm: { gap: "@0.125", marginTop: "@0.125" },
        md: { gap: "@0.25", marginTop: "@0.25" },
        lg: { gap: "@0.375", marginTop: "@0.375" },
      });
    });
  });

  it("should have correct default variants", () => {
    const s = createInstance();
    const recipe = useChatMessageActionsRecipe(s);

    expect(recipe.defaultVariants).toEqual({
      color: "neutral",
      variant: "subtle",
      size: "md",
      side: "start",
    });
  });

  describe("filter", () => {
    it("should filter size variants", () => {
      const s = createInstance();
      const recipe = useChatMessageActionsRecipe(s, {
        filter: { size: ["md"] },
      });

      expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
    });
  });
});
