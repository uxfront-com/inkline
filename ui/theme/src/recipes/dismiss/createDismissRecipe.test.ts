import { styleframe } from "@styleframe/core";
import { useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";

import { createDismissRecipe } from "./createDismissRecipe";

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

describe("createDismissRecipe", () => {
	it("should namespace the recipe to the component", () => {
		const s = createInstance();
		const useWidgetDismissRecipe = createDismissRecipe("widget");
		const recipe = useWidgetDismissRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("widget-dismiss");
	});

	it("should reset the button and size it in em", () => {
		const s = createInstance();
		const recipe = createDismissRecipe("widget")(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			width: "1em",
			height: "1em",
			marginInlineStart: "auto",
			padding: "0",
			borderWidth: "0",
			background: "transparent",
			color: "inherit",
			fontSize: "inherit",
			lineHeight: "1",
			borderRadius: "@border-radius.sm",
			cursor: "pointer",
			opacity: "0.7",
		});
	});

	it("should include hover and focus-visible states", () => {
		const s = createInstance();
		const recipe = createDismissRecipe("widget")(s);

		expect(recipe.base).toMatchObject({
			"&:hover": {
				opacity: "1",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "1px",
			},
		});
	});
});
