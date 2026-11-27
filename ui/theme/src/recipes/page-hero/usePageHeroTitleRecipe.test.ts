import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { usePageHeroTitleRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"fontWeight",
		"lineHeight",
		"marginTop",
		"marginBottom",
		"color",
		"fontSize",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("usePageHeroTitleRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePageHeroTitleRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("page-hero-title");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePageHeroTitleRecipe(s);

		expect(recipe.base).toEqual({
			fontWeight: "@font-weight.bold",
			lineHeight: "@line-height.tight",
			marginTop: "0",
			marginBottom: "0",
			color: "inherit",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct font sizes", () => {
			const s = createInstance();
			const recipe = usePageHeroTitleRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { fontSize: "@font-size.2xl" },
				md: { fontSize: "@font-size.3xl" },
				lg: { fontSize: "@font-size.4xl" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePageHeroTitleRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePageHeroTitleRecipe(s, {
				base: { fontWeight: "@font-weight.semibold" },
			});

			expect(recipe.base!.fontWeight).toBe("@font-weight.semibold");
			expect(recipe.base!.lineHeight).toBe("@line-height.tight");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = usePageHeroTitleRecipe(s, {
				filter: { size: ["sm", "md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = usePageHeroTitleRecipe(s, {
				filter: { size: ["lg"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
