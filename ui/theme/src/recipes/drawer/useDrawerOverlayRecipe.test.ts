import { styleframe } from "@styleframe/core";

import { useDrawerOverlayRecipe } from "./index";

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

describe("useDrawerOverlayRecipe", () => {
  it("is a fixed full-screen backdrop namespaced to drawer", () => {
    const s = createInstance();
    const recipe = useDrawerOverlayRecipe(s);

    expect(recipe.name).toBe("drawer-overlay");
    expect(recipe.base!.position).toBe("fixed");
    expect(recipe.base!.zIndex).toBe("1000");
  });
});
