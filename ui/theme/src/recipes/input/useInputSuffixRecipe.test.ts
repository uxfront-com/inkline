import { styleframe } from "@styleframe/core";

import { useInputSuffixRecipe } from "./useInputSuffixRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"flexShrink",
		"color",
		"whiteSpace",
		"userSelect",
		"fontSize",
		"paddingInlineStart",
		"gap",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useInputSuffixRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useInputSuffixRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("input-suffix");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useInputSuffixRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			flexShrink: "0",
			color: "color-mix(in srgb, currentColor 75%, transparent)",
			whiteSpace: "nowrap",
			userSelect: "none",
		});
	});

	describe("variants", () => {
		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useInputSuffixRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have correct md size styles", () => {
			const s = createInstance();
			const recipe = useInputSuffixRecipe(s);

			expect(recipe.variants!.size.md).toEqual({
				fontSize: "@font-size.sm",
				paddingInlineStart: "@0.5",
				gap: "@0.375",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useInputSuffixRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});
});
