import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useCalendarRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"gap",
		"padding",
		"background",
		"color",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"fontSize",
		"lineHeight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useCalendarRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCalendarRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("calendar");
	});

	it("should be a flex-column surface with a dark-mode treatment", () => {
		const s = createInstance();
		const recipe = useCalendarRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			flexDirection: "column",
			borderRadius: "@border-radius.lg",
			borderColor: "@color.gray-200",
		});
		expect(recipe.base?.["&:dark"]).toEqual({
			background: "@color.gray-900",
			borderColor: "@color.gray-800",
		});
	});

	describe("variants", () => {
		it("should expose the size axis", () => {
			const s = createInstance();
			const recipe = useCalendarRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				gap: "@0.5",
				padding: "@0.75",
			});
		});
	});

	it("should bridge each size to a marker class for the cell-size cascade", () => {
		const s = createInstance();
		const recipe = useCalendarRecipe(s);

		expect(recipe.compoundVariants).toHaveLength(3);
		for (const size of ["sm", "md", "lg"]) {
			const cv = recipe.compoundVariants!.find((v) => v.match.size === size);
			expect(cv?.className).toBe(`-size-${size}`);
			expect(cv?.css).toBeUndefined();
		}
	});

	it("should default to the md size", () => {
		const s = createInstance();
		const recipe = useCalendarRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useCalendarRecipe(s, {
				base: { borderRadius: "@border-radius.xl" },
			});

			expect(recipe.base!.borderRadius).toBe("@border-radius.xl");
			expect(recipe.base!.display).toBe("inline-flex");
		});
	});

	describe("filter", () => {
		it("should filter the size axis", () => {
			const s = createInstance();
			const recipe = useCalendarRecipe(s, {
				filter: { size: ["sm", "md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
		});
	});
});
