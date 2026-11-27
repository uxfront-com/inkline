import { styleframe } from "@styleframe/core";

import { useSidebarContentRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"flexGrow",
		"flexShrink",
		"minHeight",
		"overflowY",
		"overflowX",
		"gap",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useSidebarContentRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSidebarContentRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("sidebar-content");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSidebarContentRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			flexGrow: "1",
			flexShrink: "1",
			minHeight: "0",
			overflowY: "auto",
			overflowX: "hidden",
		});
	});

	it("should have size variants with correct styles", () => {
		const s = createInstance();
		const recipe = useSidebarContentRecipe(s);

		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		expect(recipe.variants!.size.md).toEqual({
			gap: "@0.5",
			paddingTop: "@0.5",
			paddingBottom: "@0.5",
			paddingLeft: "@0.5",
			paddingRight: "@0.5",
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSidebarContentRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useSidebarContentRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
