import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useToastProgressRecipe } from "./useToastProgressRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"bottom",
		"left",
		"right",
		"height",
		"transformOrigin",
		"background",
		"borderRadius",
		"animationName",
		"animationDuration",
		"animationTimingFunction",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useToastProgressRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-progress");
	});

	it("should pin the bar flush to the bottom edge, spanning the full width", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.base).toEqual({
			position: "absolute",
			bottom: "0",
			left: "0",
			right: "0",
			height: "@spacing.2xs",
			transformOrigin: "left center",
			background: "currentColor",
			borderRadius: "@border-radius.full",
			animationName: "toast-progress",
			animationDuration: "var(--toast-duration, 5s)",
			animationTimingFunction: "linear",
		});
	});

	it("should read its duration from the --toast-duration custom property", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.base?.animationDuration).toBe("var(--toast-duration, 5s)");
	});

	describe("color", () => {
		it("should carry the toast's accent so background: currentColor paints it", () => {
			const s = createInstance();
			const recipe = useToastProgressRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"primary",
				"secondary",
				"success",
				"info",
				"warning",
				"error",
				"light",
				"dark",
				"neutral",
			]);
			expect(recipe.variants!.color.success).toEqual({
				color: "@color.success",
			});
		});

		it("should default to the neutral accent", () => {
			const s = createInstance();
			const recipe = useToastProgressRecipe(s);

			expect(recipe.defaultVariants).toEqual({ color: "neutral" });
		});
	});
});
