import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useSelectSeparatorRecipe } from "./useSelectSeparatorRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"width",
		"height",
		"borderWidth",
		"marginTop",
		"marginBottom",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSelectSeparatorRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSelectSeparatorRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("select-separator");
	});

	it("should be a 1px full-width rule", () => {
		const s = createInstance();
		const recipe = useSelectSeparatorRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "block",
			width: "100%",
			height: "1px",
		});
	});

	it("should have a color axis only", () => {
		const s = createInstance();
		const recipe = useSelectSeparatorRecipe(s);

		expect(Object.keys(recipe.variants!)).toEqual(["color"]);
		expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
	});

	it("should default to neutral", () => {
		const s = createInstance();
		const recipe = useSelectSeparatorRecipe(s);

		expect(recipe.defaultVariants).toEqual({ color: "neutral" });
	});

	it("should have 3 compound variants (one per color)", () => {
		const s = createInstance();
		const recipe = useSelectSeparatorRecipe(s);

		expect(recipe.compoundVariants).toHaveLength(3);
	});
});
