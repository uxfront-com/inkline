import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useSidebarSeparatorRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"width",
		"height",
		"borderWidth",
		"flexShrink",
		"marginTop",
		"marginBottom",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSidebarSeparatorRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSidebarSeparatorRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("sidebar-separator");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSidebarSeparatorRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			width: "100%",
			height: "1px",
			borderWidth: "0",
			flexShrink: "0",
			marginTop: "@0.25",
			marginBottom: "@0.25",
		});
	});

	it("should have all color variants", () => {
		const s = createInstance();
		const recipe = useSidebarSeparatorRecipe(s);

		expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSidebarSeparatorRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useSidebarSeparatorRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have correct neutral compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useSidebarSeparatorRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					background: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-700",
					},
				},
			});
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune compounds", () => {
			const s = createInstance();
			const recipe = useSidebarSeparatorRecipe(s, {
				filter: { color: ["dark"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["dark"]);
			expect(recipe.compoundVariants).toHaveLength(1);
			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
