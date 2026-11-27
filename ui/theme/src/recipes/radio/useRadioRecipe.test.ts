import { styleframe } from "@styleframe/core";
import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useRadioRecipe } from "./useRadioRecipe";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	useModifiersPreset(s);
	useUtilitiesPreset(s);
	return s;
}

describe("useRadioRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useRadioRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("radio");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useRadioRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useRadioRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				gap: "@0.5",
				fontSize: "@font-size.sm",
				minHeight: "2.25rem",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useRadioRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	it("should not define compound variants", () => {
		const s = createInstance();
		const recipe = useRadioRecipe(s);

		expect(recipe.compoundVariants ?? []).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useRadioRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useRadioRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useRadioRecipe(s, {
				filter: { size: ["sm"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
