import { styleframe } from "@styleframe/core";

import { useColorPickerThumbRecipe } from "./useColorPickerThumbRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["position", "width", "height", "borderRadius", "cursor"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useColorPickerThumbRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useColorPickerThumbRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("color-picker-thumb");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useColorPickerThumbRecipe(s);

		expect(recipe.base).toEqual({
			position: "absolute",
			width: "@1",
			height: "@1",
			borderRadius: "@border-radius.full",
			cursor: "pointer",
		});
	});

	it("should have no size variant (fixed across picker sizes)", () => {
		const s = createInstance();
		const recipe = useColorPickerThumbRecipe(s);

		expect(recipe.variants).toEqual(undefined);
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = useColorPickerThumbRecipe(s);

		expect(recipe.compoundVariants).toEqual(undefined);
	});

	describe("setup callback", () => {
		it("should register thumb ring and disabled-cursor selectors", () => {
			const s = createInstance();
			useColorPickerThumbRecipe(s);

			const queries = s.root.children
				.filter((child) => child.type === "selector")
				.map((child) => (child as { query: string }).query);

			expect(queries).toContain(".color-picker-thumb");
			expect(queries).toContain(".color-picker-thumb[data-disabled]");
		});
	});

	it("should support config overrides", () => {
		const s = createInstance();
		const recipe = useColorPickerThumbRecipe(s, {
			base: { cursor: "grab" },
		});

		expect(recipe.base!.cursor).toBe("grab");
		expect(recipe.base!.position).toBe("absolute");
	});
});
