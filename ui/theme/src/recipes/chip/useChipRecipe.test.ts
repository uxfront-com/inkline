import { styleframe } from "@styleframe/core";

import { useChipRecipe } from "./useChipRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["position", "display"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useChipRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useChipRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("chip");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useChipRecipe(s);

		expect(recipe.base).toEqual({
			position: "relative",
			display: "inline-flex",
		});
	});

	it("should have no variants", () => {
		const s = createInstance();
		const recipe = useChipRecipe(s);

		expect(recipe.variants).toEqual({});
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = useChipRecipe(s);

		expect(recipe.compoundVariants).toEqual([]);
	});

	it("should have no default variants", () => {
		const s = createInstance();
		const recipe = useChipRecipe(s);

		expect(recipe.defaultVariants).toEqual({});
	});
});
