import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";

import { usePageHeroHeadlineRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "flexDirection", "gap", "alignItems", "textAlign"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("usePageHeroHeadlineRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePageHeroHeadlineRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("page-hero-headline");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePageHeroHeadlineRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			gap: "@1",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct gaps", () => {
			const s = createInstance();
			const recipe = usePageHeroHeadlineRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { gap: "@0.75" },
				md: { gap: "@1" },
				lg: { gap: "@1.25" },
			});
		});

		it("should have alignment variants with align-items + text-align", () => {
			const s = createInstance();
			const recipe = usePageHeroHeadlineRecipe(s);

			expect(recipe.variants!.alignment).toEqual({
				start: {
					alignItems: "flex-start",
					textAlign: "left",
				},
				center: {
					alignItems: "center",
					textAlign: "center",
				},
				end: {
					alignItems: "flex-end",
					textAlign: "right",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePageHeroHeadlineRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
			alignment: "center",
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePageHeroHeadlineRecipe(s, {
				base: { gap: "@2" },
			});

			expect(recipe.base!.gap).toBe("@2");
			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = usePageHeroHeadlineRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = usePageHeroHeadlineRecipe(s, {
				filter: { alignment: ["start"] },
			});

			expect(recipe.defaultVariants?.alignment).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
