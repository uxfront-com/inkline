import { styleframe } from "@styleframe/core";

import { useMediaRecipe } from "./useMediaRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "alignItems", "flexDirection", "gap"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useMediaRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useMediaRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("media");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useMediaRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "flex-start",
			gap: "@0.75",
		});
	});

	describe("variants", () => {
		it("should have orientation variants", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s);

			expect(recipe.variants!.orientation).toEqual({
				horizontal: { flexDirection: "row" },
				vertical: { flexDirection: "column" },
			});
		});

		it("should have align variants", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s);

			expect(recipe.variants!.align).toEqual({
				start: { alignItems: "flex-start" },
				center: { alignItems: "center" },
				end: { alignItems: "flex-end" },
			});
		});

		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { gap: "@0.5" },
				md: { gap: "@0.75" },
				lg: { gap: "@1" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useMediaRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			orientation: "horizontal",
			align: "start",
			size: "md",
		});
	});

	it("should not have compound variants", () => {
		const s = createInstance();
		const recipe = useMediaRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.alignItems).toBe("flex-start");
			expect(recipe.base!.gap).toBe("@0.75");
		});
	});

	describe("filter", () => {
		it("should filter orientation variants", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s, {
				filter: { orientation: ["horizontal"] },
			});

			expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
		});

		it("should filter align variants", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s, {
				filter: { align: ["start", "center"] },
			});

			expect(Object.keys(recipe.variants!.align)).toEqual(["start", "center"]);
		});

		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useMediaRecipe(s, {
				filter: { orientation: ["vertical"] },
			});

			expect(recipe.defaultVariants?.orientation).toBeUndefined();
			expect(recipe.defaultVariants?.align).toBe("start");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
