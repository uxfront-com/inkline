import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useModalBodyRecipe } from "./index";

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
		"flexGrow",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
		"flexShrink",
		"minHeight",
		"overflowY",
		"paddingInlineStart",
		"paddingInlineEnd",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useModalBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("modal-body");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			minHeight: "0",
			overflowY: "auto",
			gap: "@0.5",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingInlineStart: "@1",
			paddingInlineEnd: "@1",
		});
	});

	it("should have correct size variants", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingInlineStart: "@0.75",
				paddingInlineEnd: "@0.75",
				gap: "@0.375",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingInlineStart: "@1",
				paddingInlineEnd: "@1",
				gap: "@0.5",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingInlineStart: "@1.25",
				paddingInlineEnd: "@1.25",
				gap: "@0.75",
			},
		});
	});

	it("should have fullscreen variant with true and false keys", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(Object.keys(recipe.variants!.fullscreen)).toEqual(["true", "false"]);
	});

	it("should have correct fullscreen variant styles", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.variants!.fullscreen).toEqual({
			true: { flexGrow: "1" },
			false: {},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			fullscreen: "false",
		});
	});

	it("should not have compound variants", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});
});
