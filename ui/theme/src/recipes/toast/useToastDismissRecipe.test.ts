import { styleframe } from "@styleframe/core";
import { useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";

import { useToastDismissRecipe } from "./useToastDismissRecipe";

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

describe("useToastDismissRecipe", () => {
	it("should namespace the shared dismiss recipe to toast", () => {
		const s = createInstance();
		const recipe = useToastDismissRecipe(s);

		expect(recipe.name).toBe("toast-dismiss");
		expect(recipe.base).toMatchObject({
			marginInlineStart: "auto",
			cursor: "pointer",
		});
	});
});
