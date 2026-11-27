import { styleframe } from "@styleframe/core";

import { useCalloutContentRecipe } from "./useCalloutContentRecipe";

function createInstance() {
  const s = styleframe();
  s.utility("flex", ({ value }) => ({ flex: value }));
  return s;
}

describe("useCalloutContentRecipe", () => {
  it("should create a recipe with correct metadata", () => {
    const s = createInstance();
    const recipe = useCalloutContentRecipe(s);

    expect(recipe.type).toBe("recipe");
    expect(recipe.name).toBe("callout-content");
  });

  it("should fill the available space", () => {
    const s = createInstance();
    const recipe = useCalloutContentRecipe(s);

    expect(recipe.base).toEqual({
      flex: "1 1 auto",
    });
  });
});
