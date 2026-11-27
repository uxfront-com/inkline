import { styleframe } from "@styleframe/core";

import { useCalloutDescriptionRecipe } from "./useCalloutDescriptionRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "marginTop", "fontSize", "fontWeight", "lineHeight"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useCalloutDescriptionRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCalloutDescriptionRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("callout-description");
	});

	it("should step down from the title in weight, with the size on the axis", () => {
		const s = createInstance();
		const recipe = useCalloutDescriptionRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			marginTop: "@0.25",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
		});
	});

	it("should not set an explicit colour so it inherits the variant", () => {
		const s = createInstance();
		const recipe = useCalloutDescriptionRecipe(s);

		expect(recipe.base).not.toHaveProperty("color");
	});

	describe("size", () => {
		it("should track the size axis one token below the title at every step", () => {
			const s = createInstance();
			const recipe = useCalloutDescriptionRecipe(s);

			// The title is sm → sm, md → md, lg → lg; the description sits one
			// token below at each size. Mirrors useToastDescriptionRecipe
			// exactly so the two siblings can't drift.
			expect(recipe.variants!.size).toEqual({
				sm: { fontSize: "@font-size.xs" },
				md: { fontSize: "@font-size.sm" },
				lg: { fontSize: "@font-size.md" },
			});
		});

		it("should default to the md size", () => {
			const s = createInstance();
			const recipe = useCalloutDescriptionRecipe(s);

			expect(recipe.defaultVariants).toEqual({ size: "md" });
		});
	});
});
