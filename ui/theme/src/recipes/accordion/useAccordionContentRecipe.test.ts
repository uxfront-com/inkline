import { styleframe } from "@styleframe/core";

import { useAccordionContentRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"gridTemplateRows",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useAccordionContentRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useAccordionContentRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("accordion-content");
	});

	it("should collapse via grid-template-rows and animate it", () => {
		const s = createInstance();
		const recipe = useAccordionContentRecipe(s);

		expect(recipe.base).toEqual({
			display: "grid",
			gridTemplateRows: "0fr",
			transitionProperty: "grid-template-rows",
			transitionTimingFunction: "@easing.ease-out-cubic",
			transitionDuration: "@duration.normal",
		});
	});

	it("should expose the standard axes for parity", () => {
		const s = createInstance();
		const recipe = useAccordionContentRecipe(s);

		expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "ghost"]);
		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
	});

	it("should not declare compound variants", () => {
		const s = createInstance();
		const recipe = useAccordionContentRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useAccordionContentRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});
});
