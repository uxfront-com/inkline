import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useDropdownLabelRecipe } from "./index";

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

describe("useDropdownLabelRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDropdownLabelRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("dropdown-label");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useDropdownLabelRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			fontSize: "@font-size.2xs",
			fontWeight: "@font-weight.semibold",
			lineHeight: "@line-height.tight",
			textTransform: "uppercase",
			letterSpacing: "0.05em",
			paddingTop: "@0.375",
			paddingBottom: "@0.25",
			paddingLeft: "@0.625",
			paddingRight: "@0.625",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should not have a variant axis", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			expect(Object.keys(recipe.variants!)).not.toContain("variant");
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.3xs",
					paddingTop: "@0.25",
					paddingBottom: "@0.125",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
				},
				md: {
					fontSize: "@font-size.2xs",
					paddingTop: "@0.375",
					paddingBottom: "@0.25",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
				},
				lg: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.5",
					paddingBottom: "@0.375",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useDropdownLabelRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			// 3 colors × (no variant axis)
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have correct light compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			const light = recipe.compoundVariants!.find((cv) => cv.match.color === "light");

			expect(light).toEqual({
				match: { color: "light" },
				css: {
					color: "@color.gray-600",
					"&:dark": { color: "@color.gray-600" },
				},
			});
		});

		it("should have correct dark compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			const dark = recipe.compoundVariants!.find((cv) => cv.match.color === "dark");

			expect(dark).toEqual({
				match: { color: "dark" },
				css: {
					color: "@color.gray-400",
					"&:dark": { color: "@color.gray-400" },
				},
			});
		});

		it("should have correct neutral compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					color: "@color.gray-600",
					"&:dark": { color: "@color.gray-400" },
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s, {
				base: { textTransform: "none" },
			});

			expect(recipe.base!.textTransform).toBe("none");
			expect(recipe.base!.fontWeight).toBe("@font-weight.semibold");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useDropdownLabelRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
