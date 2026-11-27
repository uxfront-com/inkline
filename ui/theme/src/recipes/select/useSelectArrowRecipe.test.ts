import { styleframe } from "@styleframe/core";

import { useSelectArrowRecipe } from "./useSelectArrowRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexShrink",
		"alignItems",
		"justifyContent",
		"marginLeft",
		"color",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"width",
		"height",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useSelectArrowRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSelectArrowRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("select-arrow");
	});

	it("should inherit color and transition transform", () => {
		const s = createInstance();
		const recipe = useSelectArrowRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			color: "inherit",
			transitionProperty: "transform",
		});
	});

	it("should have only a size axis", () => {
		const s = createInstance();
		const recipe = useSelectArrowRecipe(s);

		expect(Object.keys(recipe.variants!)).toEqual(["size"]);
		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
	});

	it("should default to size md", () => {
		const s = createInstance();
		const recipe = useSelectArrowRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	describe("setup callback", () => {
		it("should register rotation selectors for the open state", () => {
			const s = createInstance();
			useSelectArrowRecipe(s);

			const queries = s.root.children
				.filter((child) => child.type === "selector")
				.map((child) => (child as { query: string }).query);

			expect(queries).toContain('.select-arrow[data-open="true"]');
			expect(queries).toContain(".select.-open .select-arrow");
		});
	});
});
