import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useDropdownSeparatorRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"width",
		"height",
		"borderWidth",
		"marginTop",
		"marginBottom",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useDropdownSeparatorRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDropdownSeparatorRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("dropdown-separator");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useDropdownSeparatorRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			width: "100%",
			height: "1px",
			borderWidth: "0",
			marginTop: "@0.25",
			marginBottom: "@0.25",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should not have a variant axis", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			expect(Object.keys(recipe.variants!)).not.toContain("variant");
		});

		it("should not have a size axis", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			expect(Object.keys(recipe.variants!)).not.toContain("size");
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useDropdownSeparatorRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			// 3 colors × (no variant axis)
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have correct light compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			const light = recipe.compoundVariants!.find((cv) => cv.match.color === "light");

			expect(light).toEqual({
				match: { color: "light" },
				css: {
					background: "@color.gray-200",
					"&:dark": { background: "@color.gray-200" },
				},
			});
		});

		it("should have correct dark compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			const dark = recipe.compoundVariants!.find((cv) => cv.match.color === "dark");

			expect(dark).toEqual({
				match: { color: "dark" },
				css: {
					background: "@color.gray-700",
					"&:dark": { background: "@color.gray-700" },
				},
			});
		});

		it("should have correct neutral compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					background: "@color.gray-200",
					"&:dark": { background: "@color.gray-700" },
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s, {
				base: { height: "2px" },
			});

			expect(recipe.base!.height).toBe("2px");
			expect(recipe.base!.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useDropdownSeparatorRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
