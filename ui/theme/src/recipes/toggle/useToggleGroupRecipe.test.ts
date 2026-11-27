import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useToggleGroupRecipe } from "./useToggleGroupRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "flexDirection", "flexWrap", "alignItems", "gap"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useToggleGroupRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToggleGroupRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toggle-group");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useToggleGroupRecipe(s);

		expect(recipe.base).toEqual({ display: "flex" });
	});

	describe("variants", () => {
		it("should have all orientation variants", () => {
			const s = createInstance();
			const recipe = useToggleGroupRecipe(s);

			expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal", "vertical"]);
			expect(recipe.variants!.orientation.horizontal).toEqual({
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
			});
			expect(recipe.variants!.orientation.vertical).toEqual({
				flexDirection: "column",
			});
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useToggleGroupRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({ gap: "@0.75" });
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useToggleGroupRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			orientation: "horizontal",
			size: "md",
		});
	});

	it("should not define compound variants", () => {
		const s = createInstance();
		const recipe = useToggleGroupRecipe(s);

		expect(recipe.compoundVariants ?? []).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useToggleGroupRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base?.display).toBe("inline-flex");
		});
	});

	describe("filter", () => {
		it("should filter orientation variants", () => {
			const s = createInstance();
			const recipe = useToggleGroupRecipe(s, {
				filter: { orientation: ["vertical"] },
			});

			expect(Object.keys(recipe.variants!.orientation)).toEqual(["vertical"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useToggleGroupRecipe(s, {
				filter: { orientation: ["vertical"] },
			});

			expect(recipe.defaultVariants?.orientation).toBeUndefined();
		});
	});
});
