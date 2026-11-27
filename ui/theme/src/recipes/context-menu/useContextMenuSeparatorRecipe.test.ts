import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useContextMenuSeparatorRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"width",
		"height",
		"borderWidth",
		"marginTop",
		"marginBottom",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useContextMenuSeparatorRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useContextMenuSeparatorRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("context-menu-separator");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useContextMenuSeparatorRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			width: "100%",
			height: "1px",
			borderWidth: "0",
			marginTop: "@0.25",
			marginBottom: "@0.25",
		});
	});

	it("should have only a color axis", () => {
		const s = createInstance();
		const recipe = useContextMenuSeparatorRecipe(s);

		expect(Object.keys(recipe.variants!)).toEqual(["color"]);
		expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useContextMenuSeparatorRecipe(s);

		expect(recipe.defaultVariants).toEqual({ color: "neutral" });
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useContextMenuSeparatorRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have correct neutral compound variant (adaptive)", () => {
			const s = createInstance();
			const recipe = useContextMenuSeparatorRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "neutral");

			expect(cv?.css).toEqual({
				background: "@color.gray-200",
				"&:dark": { background: "@color.gray-700" },
			});
		});
	});

	describe("filter", () => {
		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useContextMenuSeparatorRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants).toHaveLength(1);
		});
	});
});
