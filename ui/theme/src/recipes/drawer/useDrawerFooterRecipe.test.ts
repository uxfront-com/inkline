import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useDrawerFooterRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"flexWrap",
		"gap",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
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

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
	return s.root.children.find(
		(child) => child.type === "selector" && (child as { query: string }).query === query,
	);
}

describe("useDrawerFooterRecipe", () => {
	it("namespaces the recipe and separators to drawer and right-aligns actions", () => {
		const s = createInstance();
		const recipe = useDrawerFooterRecipe(s);

		expect(recipe.name).toBe("drawer-footer");
		expect(recipe.base!.justifyContent).toBe("flex-end");
		expect(recipe.compoundVariants).toHaveLength(9);
		expect(findSelector(s, ".drawer-footer:first-child")).toBeDefined();
		expect(findSelector(s, ".drawer-footer:last-child")).toBeDefined();
	});
});
