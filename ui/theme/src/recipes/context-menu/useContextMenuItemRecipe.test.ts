import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useActiveModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useHoverModifier,
} from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useContextMenuItemRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"width",
		"background",
		"fontWeight",
		"fontSize",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"lineHeight",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"gap",
		"cursor",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"textAlign",
		"textDecoration",
		"whiteSpace",
		"userSelect",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"color",
		"position",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusModifier(s);
	useFocusVisibleModifier(s);
	useActiveModifier(s);
	useDisabledModifier(s);
	return s;
}

describe("useContextMenuItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useContextMenuItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("context-menu-item");
	});

	it("should have correct base styles (shared item surface + relative anchor)", () => {
		const s = createInstance();
		const recipe = useContextMenuItemRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			width: "100%",
			background: "transparent",
			fontWeight: "@font-weight.normal",
			fontSize: "@font-size.sm",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.sm",
			lineHeight: "@line-height.normal",
			paddingTop: "@0.375",
			paddingBottom: "@0.375",
			paddingLeft: "@0.625",
			paddingRight: "@0.625",
			gap: "@0.5",
			cursor: "pointer",
			transitionProperty: "color, background-color, border-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			textAlign: "left",
			textDecoration: "none",
			whiteSpace: "normal",
			userSelect: "none",
			outline: "none",
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.75",
				pointerEvents: "none",
			},
			position: "relative",
		});
	});

	describe("variants", () => {
		it("should have color, variant, size, inset, and destructive axes", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s);

			expect(Object.keys(recipe.variants!)).toEqual([
				"color",
				"variant",
				"size",
				"inset",
				"destructive",
			]);
			expect(Object.keys(recipe.variants!.inset)).toEqual(["true", "false"]);
			expect(Object.keys(recipe.variants!.destructive)).toEqual(["true", "false"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useContextMenuItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			inset: "false",
			destructive: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 11 compound variants (9 surface + inset + destructive)", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(11);
		});

		it("should keep the shared neutral solid surface states", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) =>
					v.match.color === "neutral" &&
					v.match.variant === "solid" &&
					v.match.inset === undefined &&
					v.match.destructive === undefined,
			);

			expect(cv?.css).toEqual({
				color: "@color.text",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-150" },
				"&:dark": { color: "@color.white" },
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
			});
		});

		it("should add leading padding for inset rows", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.inset === "true");

			expect(cv?.css).toEqual({ paddingLeft: "@2" });
		});

		it("should recolor destructive rows with error tones (wins over surface)", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.destructive === "true");

			expect(cv?.css).toEqual({
				color: "@color.error",
				"&:hover": { background: "@color.error-100" },
				"&:focus": { background: "@color.error-100" },
				"&:active": { background: "@color.error-150" },
				"&:dark": { color: "@color.error-400" },
				"&:dark:hover": { background: "@color.error-900" },
				"&:dark:focus": { background: "@color.error-900" },
				"&:dark:active": { background: "@color.error-800" },
			});

			// Destructive is the last compound so it overrides the surface color.
			expect(recipe.compoundVariants!.at(-1)).toBe(cv);
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base!.display).toBe("block");
			expect(recipe.base!.width).toBe("100%");
		});
	});

	describe("filter", () => {
		it("should prune surface compounds but keep inset/destructive", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			// 3 neutral surface + inset + destructive
			expect(recipe.compoundVariants).toHaveLength(5);
			expect(
				recipe.compoundVariants!.every(
					(cv) => cv.match.color === undefined || cv.match.color === "neutral",
				),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useContextMenuItemRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.inset).toBe("false");
		});
	});
});
