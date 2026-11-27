import { styleframe, validate } from "@styleframe/core";
import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";

import * as recipes from "./recipes";

describe("validate with every preset and recipe", () => {
	it("reports no diagnostics", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useModifiersPreset(s);
		useUtilitiesPreset(s);

		const recipeComposables = Object.entries(recipes).filter(
			([name, value]) => /^use\w+Recipe$/.test(name) && typeof value === "function",
		);
		expect(recipeComposables.length).toBeGreaterThan(40);

		for (const [, useRecipe] of recipeComposables) {
			(useRecipe as (s: ReturnType<typeof styleframe>) => unknown)(s);
		}

		expect(validate(s)).toEqual([]);
	});
});
