import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useContextMenuShortcutRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"marginLeft",
		"paddingLeft",
		"fontSize",
		"letterSpacing",
		"lineHeight",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useContextMenuShortcutRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useContextMenuShortcutRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("context-menu-shortcut");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useContextMenuShortcutRecipe(s);

		expect(recipe.base).toEqual({
			marginLeft: "auto",
			paddingLeft: "@1",
			fontSize: "@font-size.xs",
			letterSpacing: "0.1em",
			lineHeight: "@line-height.normal",
		});
	});

	describe("variants", () => {
		it("should have color and size axes", () => {
			const s = createInstance();
			const recipe = useContextMenuShortcutRecipe(s);

			expect(Object.keys(recipe.variants!)).toEqual(["color", "size"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useContextMenuShortcutRecipe(s);

		expect(recipe.defaultVariants).toEqual({ color: "neutral", size: "md" });
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useContextMenuShortcutRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have a muted, adaptive neutral color", () => {
			const s = createInstance();
			const recipe = useContextMenuShortcutRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "neutral");

			expect(cv?.css).toEqual({
				color: "@color.gray-500",
				"&:dark": { color: "@color.gray-400" },
			});
		});
	});

	describe("filter", () => {
		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useContextMenuShortcutRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.compoundVariants).toHaveLength(1);
		});
	});
});
