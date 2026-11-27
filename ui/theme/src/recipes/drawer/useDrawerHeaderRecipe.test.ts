import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useDrawerHeaderRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
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

describe("useDrawerHeaderRecipe", () => {
	it("namespaces the recipe and separators to drawer", () => {
		const s = createInstance();
		const recipe = useDrawerHeaderRecipe(s);

		expect(recipe.name).toBe("drawer-header");
		expect(recipe.compoundVariants).toHaveLength(9);
		expect(findSelector(s, ".drawer-header:first-child")).toBeDefined();
		expect(findSelector(s, ".drawer-header:last-child")).toBeDefined();
	});
});
