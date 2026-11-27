import { styleframe } from "@styleframe/core";

import { useMediaBodyRecipe } from "./useMediaBodyRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "flexDirection", "flexGrow", "minWidth", "gap"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useMediaBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useMediaBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("media-body");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useMediaBodyRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			flexGrow: "1",
			minWidth: "0",
			gap: "@0.375",
		});
	});

	it("should have size variants", () => {
		const s = createInstance();
		const recipe = useMediaBodyRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: { gap: "@0.25" },
			md: { gap: "@0.375" },
			lg: { gap: "@0.5" },
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useMediaBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	it("should not have compound variants", () => {
		const s = createInstance();
		const recipe = useMediaBodyRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useMediaBodyRecipe(s, {
				base: { gap: "@1" },
			});

			expect(recipe.base!.gap).toBe("@1");
			expect(recipe.base!.minWidth).toBe("0");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useMediaBodyRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useMediaBodyRecipe(s, {
				filter: { size: ["sm"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
