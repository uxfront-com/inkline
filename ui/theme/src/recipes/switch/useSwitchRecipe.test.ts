import { styleframe } from "@styleframe/core";
import { useAnyPointerCoarseModifier, useDarkModifier } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useSwitchRecipe } from "./useSwitchRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"cursor",
		"userSelect",
		"color",
		"lineHeight",
		"opacity",
		"gap",
		"fontSize",
		"minHeight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useAnyPointerCoarseModifier(s);
	return s;
}

describe("useSwitchRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("switch");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
		});
	});

	it("switch/target-size makes the label a hit area at least 24px tall, and 44px on touch screens", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.base?.minHeight).toBe("1.5rem");
		expect(recipe.base?.["&:any-pointer-coarse"]).toEqual({
			minHeight: "2.75rem",
		});
	});

	it("switch/read-only keeps the label from looking clickable", () => {
		const s = createInstance();
		useSwitchRecipe(s);

		const selector = s.root.children.find(
			(child) =>
				child.type === "selector" &&
				(child as { query: string }).query === '.switch:has(.switch-field[aria-readonly="true"])',
		) as { declarations: Record<string, unknown> } | undefined;
		expect(selector?.declarations).toEqual({ cursor: "default" });
	});

	it("switch/forced-colors keeps the disabled label at full opacity", () => {
		const s = createInstance();
		useSwitchRecipe(s);

		const selector = s.root.children.find(
			(child) =>
				child.type === "selector" &&
				(child as { query: string }).query === ".switch:has(.switch-field:disabled)",
		) as
			| {
					declarations: Record<string, unknown>;
					children: Array<{
						type: string;
						rule?: string;
						declarations: Record<string, unknown>;
					}>;
			  }
			| undefined;
		expect(selector?.declarations).toMatchObject({ opacity: "0.5" });
		const forced = selector?.children.find(
			(child) => child.type === "at-rule" && child.rule === "(forced-colors: active)",
		);
		expect(forced?.declarations).toEqual({ opacity: "1" });
	});

	describe("variants", () => {
		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				gap: "@0.5",
				fontSize: "@font-size.sm",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	it("should not define compound variants", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.compoundVariants ?? []).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s, {
				filter: { size: ["sm"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
