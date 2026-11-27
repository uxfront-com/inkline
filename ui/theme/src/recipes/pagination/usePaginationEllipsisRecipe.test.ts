import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { usePaginationEllipsisRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"color",
		"lineHeight",
		"userSelect",
		"fontSize",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("usePaginationEllipsisRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePaginationEllipsisRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("pagination-ellipsis");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePaginationEllipsisRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			color: "@color.text-weak",
			lineHeight: "@line-height.normal",
			userSelect: "none",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = usePaginationEllipsisRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.625",
					paddingBottom: "@0.625",
					paddingLeft: "@0.875",
					paddingRight: "@0.875",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePaginationEllipsisRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
		});
	});

	it("should have all color variants", () => {
		const s = createInstance();
		const recipe = usePaginationEllipsisRecipe(s);

		expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
	});

	it("should have correct color compound variants", () => {
		const s = createInstance();
		const recipe = usePaginationEllipsisRecipe(s);

		const light = recipe.compoundVariants!.find((v) => v.match.color === "light");
		expect(light).toEqual({
			match: { color: "light" },
			css: { color: "@color.gray-600", "&:dark": { color: "@color.gray-600" } },
		});

		const dark = recipe.compoundVariants!.find((v) => v.match.color === "dark");
		expect(dark).toEqual({
			match: { color: "dark" },
			css: { color: "@color.gray-400", "&:dark": { color: "@color.gray-400" } },
		});

		const neutral = recipe.compoundVariants!.find((v) => v.match.color === "neutral");
		expect(neutral).toEqual({
			match: { color: "neutral" },
			css: { color: "@color.gray-600", "&:dark": { color: "@color.gray-400" } },
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePaginationEllipsisRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base!.display).toBe("flex");
			expect(recipe.base!.alignItems).toBe("center");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = usePaginationEllipsisRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = usePaginationEllipsisRecipe(s, {
				filter: { size: ["sm"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
