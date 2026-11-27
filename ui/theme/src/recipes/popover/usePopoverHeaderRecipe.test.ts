import { styleframe } from "@styleframe/core";
import type { Selector } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { usePopoverHeaderRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"flexBasis",
		"alignItems",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"overflow",
		"fontSize",
		"lineHeight",
		"boxShadow",
		"background",
		"color",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"gap",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("usePopoverHeaderRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePopoverHeaderRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("popover-header");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePopoverHeaderRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			gap: "@0.75",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			borderTopWidth: "@border-width.thin",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
		});
	});

	it("should have correct size variants", () => {
		const s = createInstance();
		const recipe = usePopoverHeaderRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePopoverHeaderRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = usePopoverHeaderRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should set both borderTopColor and borderBottomColor", () => {
			const s = createInstance();
			const recipe = usePopoverHeaderRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-700",
						borderBottomColor: "@color.gray-700",
					},
				},
			});
		});
	});

	it("popover/edge drops the top separator after a leading arrow, like a first child", () => {
		const s = createInstance();
		usePopoverHeaderRecipe(s);

		const queries = s.root.children
			.filter((child) => child.type === "selector")
			.map((child) => child as Selector);
		for (const query of [
			".popover-header:first-child",
			".popover-arrow:first-child + .popover-header",
		]) {
			expect(queries.find((child) => child.query === query)?.declarations).toEqual({
				borderTopColor: "transparent",
			});
		}
	});
});
