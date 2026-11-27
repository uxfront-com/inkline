import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { usePopoverBodyRecipe } from "./index";

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
		"minHeight",
		"overflowY",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("usePopoverBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePopoverBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("popover-body");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePopoverBodyRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			gap: "@0.5",
			minHeight: "0",
			overflowY: "auto",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
		});
	});

	it("should have correct size variants", () => {
		const s = createInstance();
		const recipe = usePopoverBodyRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.5",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@0.75",
			},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePopoverBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	it("should not have compound variants", () => {
		const s = createInstance();
		const recipe = usePopoverBodyRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});

	it("popover/fits-screen scrolls the body when its content doesn't fit", () => {
		const s = createInstance();
		const recipe = usePopoverBodyRecipe(s);

		expect(recipe.base!.minHeight).toBe("0");
		expect(recipe.base!.overflowY).toBe("auto");
	});
});
