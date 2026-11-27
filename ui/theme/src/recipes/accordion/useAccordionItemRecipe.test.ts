import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useAccordionItemRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of ["borderBottomWidth", "borderBottomStyle", "borderBottomColor"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useAccordionItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useAccordionItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("accordion-item");
	});

	it("should have a transparent bottom divider by default", () => {
		const s = createInstance();
		const recipe = useAccordionItemRecipe(s);

		expect(recipe.base).toEqual({
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useAccordionItemRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have solid and ghost style variants", () => {
			const s = createInstance();
			const recipe = useAccordionItemRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "ghost"]);
		});
	});

	describe("compound variants", () => {
		it("should have one divider compound per color", () => {
			const s = createInstance();
			const recipe = useAccordionItemRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should set an adaptive divider color for neutral", () => {
			const s = createInstance();
			const recipe = useAccordionItemRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderBottomColor: "@color.gray-700",
					},
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useAccordionItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("filter", () => {
		it("should keep only the matching color compound", () => {
			const s = createInstance();
			const recipe = useAccordionItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants).toHaveLength(1);
			expect(recipe.compoundVariants![0]?.match.color).toBe("neutral");
		});
	});
});
