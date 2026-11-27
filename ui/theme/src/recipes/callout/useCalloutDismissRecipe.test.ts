import { styleframe } from "@styleframe/core";

import { useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";
import { useCalloutDismissRecipe } from "./useCalloutDismissRecipe";

function createInstance() {
  const s = styleframe();
  for (const name of [
    "display",
    "alignItems",
    "justifyContent",
    "flexShrink",
    "width",
    "height",
    "marginInlineStart",
    "padding",
    "borderWidth",
    "background",
    "color",
    "fontSize",
    "lineHeight",
    "borderRadius",
    "cursor",
    "opacity",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDuration",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useHoverModifier(s);
  useFocusVisibleModifier(s);
  return s;
}

describe("useCalloutDismissRecipe", () => {
  it("should namespace the shared dismiss recipe to callout", () => {
    const s = createInstance();
    const recipe = useCalloutDismissRecipe(s);

    expect(recipe.name).toBe("callout-dismiss");
    expect(recipe.base).toMatchObject({
      marginInlineStart: "auto",
      cursor: "pointer",
    });
  });
});
