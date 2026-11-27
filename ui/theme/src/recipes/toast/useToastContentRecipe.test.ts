import { styleframe } from "@styleframe/core";

import { useToastContentRecipe } from "./useToastContentRecipe";

function createInstance() {
	const s = styleframe();
	s.utility("flex", ({ value }) => ({ flex: value }));
	return s;
}

describe("useToastContentRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastContentRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-content");
	});

	it("should fill the available space", () => {
		const s = createInstance();
		const recipe = useToastContentRecipe(s);

		expect(recipe.base).toEqual({
			flex: "1 1 auto",
		});
	});
});
