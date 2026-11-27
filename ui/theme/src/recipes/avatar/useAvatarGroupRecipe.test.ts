import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useAvatarGroupRecipe } from "./useAvatarGroupRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"boxSizing",
		"zIndex",
		"marginLeft",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	// Variables referenced by the recipe's setup() selectors (ring + overlap).
	s.variable("border-width.medium", "2px", { default: true });
	s.variable("border-style.solid", "solid", { default: true });
	s.variable("color.background", "#ffffff", { default: true });
	useDarkModifier(s);
	return s;
}

describe("useAvatarGroupRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useAvatarGroupRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("avatar-group");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useAvatarGroupRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
		});
	});

	describe("variants", () => {
		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useAvatarGroupRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["xs", "sm", "md", "lg", "xl"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useAvatarGroupRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have one marker class per size", () => {
			const s = createInstance();
			const recipe = useAvatarGroupRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(5);
		});

		it("should map each size to a marker className", () => {
			const s = createInstance();
			const recipe = useAvatarGroupRecipe(s);

			const md = recipe.compoundVariants!.find((cv) => cv.match.size === "md");

			expect(md).toEqual({
				match: { size: "md" },
				className: "-md",
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useAvatarGroupRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants and prune marker classes", () => {
			const s = createInstance();
			const recipe = useAvatarGroupRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useAvatarGroupRecipe(s, {
				filter: { size: ["lg"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
