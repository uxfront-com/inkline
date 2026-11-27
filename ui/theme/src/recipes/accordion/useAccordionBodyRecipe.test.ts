import { styleframe } from "@styleframe/core";

import { useAccordionBodyRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of ["fontSize", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useAccordionBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("accordion-body");
	});

	it("should keep the base padding-free (the clip wrapper owns overflow)", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		// Padding lives only on the size variants, never on the base — the grid
		// child clip (styled by the content recipe) carries overflow/min-height.
		expect(recipe.base).toEqual({});
	});

	it("should scale padding and font with size", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.variants!.size.md).toEqual({
			fontSize: "@font-size.sm",
			paddingTop: "@0.5",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
		});
	});

	it("should not declare compound variants", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});
});
