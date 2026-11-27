import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { usePageHeroLinksRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"flexWrap",
		"gap",
		"fontSize",
		"justifyContent",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("usePageHeroLinksRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePageHeroLinksRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("page-hero-links");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePageHeroLinksRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: "@1",
			fontSize: "@font-size.sm",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct gap and font-size", () => {
			const s = createInstance();
			const recipe = usePageHeroLinksRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { gap: "@0.75", fontSize: "@font-size.xs" },
				md: { gap: "@1", fontSize: "@font-size.sm" },
				lg: { gap: "@1.25", fontSize: "@font-size.md" },
			});
		});

		it("should have alignment variants with correct justify-content", () => {
			const s = createInstance();
			const recipe = usePageHeroLinksRecipe(s);

			expect(recipe.variants!.alignment).toEqual({
				start: { justifyContent: "flex-start" },
				center: { justifyContent: "center" },
				end: { justifyContent: "flex-end" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePageHeroLinksRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
			alignment: "center",
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePageHeroLinksRecipe(s, {
				base: { fontSize: "@font-size.md" },
			});

			expect(recipe.base!.fontSize).toBe("@font-size.md");
			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = usePageHeroLinksRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});
	});
});
