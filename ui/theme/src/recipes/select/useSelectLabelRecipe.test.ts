import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useSelectLabelRecipe } from "./useSelectLabelRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"textTransform",
		"letterSpacing",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSelectLabelRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSelectLabelRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("select-label");
	});

	it("should be an uppercase caption", () => {
		const s = createInstance();
		const recipe = useSelectLabelRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "block",
			textTransform: "uppercase",
			fontWeight: "@font-weight.semibold",
		});
	});

	it("should have color and size axes but no variant axis", () => {
		const s = createInstance();
		const recipe = useSelectLabelRecipe(s);

		expect(Object.keys(recipe.variants!)).toEqual(["color", "size"]);
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSelectLabelRecipe(s);

		expect(recipe.defaultVariants).toEqual({ color: "neutral", size: "md" });
	});

	it("should have 3 compound variants (one per color)", () => {
		const s = createInstance();
		const recipe = useSelectLabelRecipe(s);

		expect(recipe.compoundVariants).toHaveLength(3);
	});
});
