import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useToastIconRecipe } from "./useToastIconRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "flexShrink", "color"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useToastIconRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastIconRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-icon");
	});

	it("should keep the icon from shrinking", () => {
		const s = createInstance();
		const recipe = useToastIconRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			flexShrink: "0",
		});
	});

	describe("color", () => {
		it("should expose the full color axis", () => {
			const s = createInstance();
			const recipe = useToastIconRecipe(s);

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
		});

		it("should carry the semantic accent as the icon's foreground", () => {
			const s = createInstance();
			const recipe = useToastIconRecipe(s);

			expect(recipe.variants!.color.success).toEqual({
				color: "@color.success",
			});
		});

		it("should map neutral to the mode-adaptive foreground", () => {
			const s = createInstance();
			const recipe = useToastIconRecipe(s);

			expect(recipe.variants!.color.neutral).toEqual({
				color: "@color.text",
				"&:dark": { color: "@color.gray-200" },
			});
		});

		it("should default to the neutral accent", () => {
			const s = createInstance();
			const recipe = useToastIconRecipe(s);

			expect(recipe.defaultVariants).toEqual({ color: "neutral" });
		});
	});
});
