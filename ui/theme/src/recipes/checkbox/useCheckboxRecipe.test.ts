import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";
import { useBeforeModifier } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useCheckboxRecipe } from "./useCheckboxRecipe";

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
		"position",
		"paddingBlock",
		"width",
		"height",
		"top",
		"insetInlineStart",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	// Tokens referenced inside composite values (calc, box-shadow) resolve
	// when the recipe registers its utilities.
	for (const name of ["font-size.xs", "font-size.sm", "font-size.md", "line-height.normal"]) {
		s.variable(name, "0");
	}
	useDarkModifier(s);
	useBeforeModifier(s);
	return s;
}

describe("useCheckboxRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCheckboxRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("checkbox");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCheckboxRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "flex-start",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toMatchObject({
				gap: "@0.5",
				fontSize: "@font-size.sm",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCheckboxRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	it("should not define compound variants", () => {
		const s = createInstance();
		const recipe = useCheckboxRecipe(s);

		expect(recipe.compoundVariants ?? []).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s, {
				filter: { size: ["sm"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});

	describe("Open Components rules", () => {
		type Block = Record<string, unknown>;

		const boxSizes = { sm: "0.875rem", md: "1rem", lg: "1.25rem" };
		const fontSizes = { sm: "xs", md: "sm", lg: "md" };

		it("checkbox/target-size draws a 1.5rem hit area centred on the box", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s);

			expect(recipe.base?.position).toBe("relative");
			expect(recipe.base?.["&:before"]).toEqual({
				position: "absolute",
				width: "1.5rem",
				height: "1.5rem",
			});
			// The label is padded to the hit area, so the hit area starts at its top
			// edge unless the first line is taller, and half the difference between
			// box and hit area before the box.
			for (const [size, css] of Object.entries(recipe.variants!.size)) {
				const box = boxSizes[size as keyof typeof boxSizes];
				const font = fontSizes[size as keyof typeof fontSizes];
				expect(css["&:before"]).toEqual({
					top: `max(0px, calc((@font-size.${font} * @line-height.normal - 1.5rem) / 2))`,
					insetInlineStart: `calc((${box} - 1.5rem) / 2)`,
				});
			}
		});

		it("checkbox/resizable pads each size to the hit area in rem and top-aligns a wrapping label", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s);

			expect(recipe.base?.alignItems).toBe("flex-start");
			for (const [size, css] of Object.entries(recipe.variants!.size)) {
				const font = fontSizes[size as keyof typeof fontSizes];
				expect(css.paddingBlock).toBe(
					`max(0px, calc((1.5rem - @font-size.${font} * @line-height.normal) / 2))`,
				);
			}
		});

		it("checkbox/mirrors-in-rtl places the hit area with a logical property", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s);

			for (const css of Object.values(recipe.variants!.size) as Array<Block>) {
				const before = css["&:before"] as Block;
				expect(before).toHaveProperty("insetInlineStart");
				expect(before).not.toHaveProperty("left");
				expect(before).not.toHaveProperty("right");
			}
		});

		it("checkbox/stable-size changes no size in any label state", () => {
			const s = createInstance();
			useCheckboxRecipe(s);

			for (const name of [
				".checkbox:has(.checkbox-field:disabled)",
				'.checkbox:has(.checkbox-field[aria-readonly="true"])',
			]) {
				const rule = s.root.children.find(
					(child) => child.type === "selector" && child.query === name,
				);
				expect(rule, name).toBeDefined();
				for (const property of ["width", "height", "padding", "gap"]) {
					expect((rule as { declarations: Block }).declarations).not.toHaveProperty(property);
				}
			}
		});

		it("checkbox/read-only gives the label of a read-only box a default cursor", () => {
			const s = createInstance();
			useCheckboxRecipe(s);

			const rule = s.root.children.find(
				(child) =>
					child.type === "selector" &&
					child.query === '.checkbox:has(.checkbox-field[aria-readonly="true"])',
			) as { declarations: Block } | undefined;
			expect(rule?.declarations).toMatchObject({ cursor: "default" });
		});

		it("checkbox/forced-colors marks a disabled label with GrayText instead of opacity", () => {
			const s = createInstance();
			useCheckboxRecipe(s);

			const rule = s.root.children.find(
				(child) =>
					child.type === "selector" && child.query === ".checkbox:has(.checkbox-field:disabled)",
			) as { declarations: Block; children: Array<Block> } | undefined;
			expect(rule?.declarations).toMatchObject({
				opacity: "0.5",
				cursor: "not-allowed",
			});
			const media = rule?.children.find(
				(child) => child.identifier === "media" && child.rule === "(forced-colors: active)",
			) as { declarations: Block } | undefined;
			expect(media?.declarations).toEqual({ opacity: "1", color: "GrayText" });
		});

		it("checkbox/disabled-inert dims a disabled box and its label together, once", () => {
			const s = createInstance();
			useCheckboxRecipe(s);

			const find = (query: string) =>
				s.root.children.find((child) => child.type === "selector" && child.query === query) as
					| { declarations: Block }
					| undefined;
			expect(find(".checkbox:has(.checkbox-field:disabled)")?.declarations).toMatchObject({
				opacity: "0.5",
				cursor: "not-allowed",
			});
			expect(find(".checkbox .checkbox-field:disabled")?.declarations).toEqual({
				opacity: "1",
			});
		});

		it("checkbox/hover-capable gives the label no hover style", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s);

			const keys = [
				...Object.keys(recipe.base ?? {}),
				...Object.values(recipe.variants!.size).flatMap((css) => Object.keys(css)),
			];
			expect(keys.length).toBeGreaterThan(0);
			for (const key of keys) {
				expect(key).not.toContain(":hover");
			}
		});

		it("checkbox/contrast keeps the label in @color.text", () => {
			const s = createInstance();
			const recipe = useCheckboxRecipe(s);

			expect(recipe.base?.color).toBe("@color.text");
		});
	});
});
