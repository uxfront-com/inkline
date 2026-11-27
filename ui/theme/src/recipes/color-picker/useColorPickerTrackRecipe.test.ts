import { styleframe } from "@styleframe/core";

import { useColorPickerTrackRecipe } from "./useColorPickerTrackRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["position", "width", "borderRadius", "height"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useColorPickerTrackRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("color-picker-track");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.base).toEqual({
			position: "relative",
			borderRadius: "@border-radius.full",
		});
	});

	describe("variants", () => {
		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useColorPickerTrackRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["xs", "sm", "md", "lg", "xl"]);
		});

		it("should scale rail thickness (width) and height per size", () => {
			const s = createInstance();
			const recipe = useColorPickerTrackRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: { width: "@0.25", height: "@9.5" },
				sm: { width: "@0.375", height: "@10" },
				md: { width: "@0.5", height: "@10.5" },
				lg: { width: "@0.75", height: "@11" },
				xl: { width: "@1", height: "@11.5" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.compoundVariants).toEqual(undefined);
	});

	describe("setup callback", () => {
		it("should paint the hue rainbow on the track", () => {
			const s = createInstance();
			useColorPickerTrackRecipe(s);

			const queries = s.root.children
				.filter((child) => child.type === "selector")
				.map((child) => (child as { query: string }).query);

			expect(queries).toContain(".color-picker-track");
		});
	});

	it("should support config overrides", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s, {
			base: { borderRadius: "@border-radius.md" },
		});

		expect(recipe.base!.borderRadius).toBe("@border-radius.md");
		expect(recipe.base!.position).toBe("relative");
	});

	it("should support filter for size variants", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s, {
			filter: { size: ["sm", "md"] },
		});

		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
	});
});
