import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useHoverModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useActiveModifier,
} from "@styleframe/theme";

import { usePaginationItemRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
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
		"background",
		"color",
		"textUnderlineOffset",
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

describe("usePaginationItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePaginationItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("pagination-item");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePaginationItemRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			fontWeight: "@font-weight.medium",
			fontSize: "@font-size.sm",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			lineHeight: "@line-height.normal",
			paddingTop: "@0.5",
			paddingBottom: "@0.5",
			paddingLeft: "@0.75",
			paddingRight: "@0.75",
			cursor: "pointer",
			transitionProperty: "color, background-color, border-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			textDecoration: "none",
			"&:hover": { textDecoration: "none" },
			"&:focus": { textDecoration: "none" },
			"&:active": { textDecoration: "none" },
			whiteSpace: "nowrap",
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
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"outline",
				"soft",
				"subtle",
				"ghost",
				"link",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			});
		});
	});

	it("should have active variants", () => {
		const s = createInstance();
		const recipe = usePaginationItemRecipe(s);

		expect(recipe.variants!.active).toEqual({
			true: {
				fontWeight: "@font-weight.semibold",
			},
			false: {},
		});
	});

	it("should have disabled variants", () => {
		const s = createInstance();
		const recipe = usePaginationItemRecipe(s);

		expect(recipe.variants!.disabled).toEqual({
			true: {
				cursor: "not-allowed",
				opacity: "0.75",
				pointerEvents: "none",
			},
			false: {},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePaginationItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "ghost",
			size: "md",
			active: "false",
			disabled: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 18 compound variants total", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			// 3 colors × 6 variants = 18
			expect(recipe.compoundVariants).toHaveLength(18);
		});

		it("should have correct light solid compound variant", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "light" && v.match.variant === "solid",
			);

			expect(cv).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": {
						background: "@color.white",
						color: "@color.text-inverted",
						borderColor: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct light ghost compound variant", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "light" && v.match.variant === "ghost",
			);

			expect(cv).toEqual({
				match: { color: "light", variant: "ghost" },
				css: {
					color: "@color.text",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": {
						color: "@color.text-inverted",
					},
					"&:dark:hover": { background: "@color.gray-100" },
					"&:dark:focus": { background: "@color.gray-100" },
					"&:dark:active": { background: "@color.gray-200" },
				},
			});
		});

		it("should have correct dark solid compound variant", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "dark" && v.match.variant === "solid",
			);

			expect(cv).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
					"&:hover": { background: "@color.gray-800", color: "@color.white" },
					"&:focus": { background: "@color.gray-800", color: "@color.white" },
					"&:active": { background: "@color.gray-750", color: "@color.white" },
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral ghost compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral" && v.match.variant === "ghost",
			);

			expect(cv).toEqual({
				match: { color: "neutral", variant: "ghost" },
				css: {
					color: "@color.text",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:hover": {
						background: "@color.gray-800",
						color: "@color.gray-200",
					},
					"&:dark:focus": {
						background: "@color.gray-800",
						color: "@color.gray-200",
					},
					"&:dark:active": {
						background: "@color.gray-750",
						color: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct neutral solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral" && v.match.variant === "solid",
			);

			expect(cv).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
					"&:dark:hover": {
						background: "@color.gray-800",
						color: "@color.white",
					},
					"&:dark:focus": {
						background: "@color.gray-800",
						color: "@color.white",
					},
					"&:dark:active": {
						background: "@color.gray-750",
						color: "@color.white",
					},
				},
			});
		});

		it("should have a compound variant entry for every color × variant pair", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s);

			const colors = ["light", "dark", "neutral"];
			const variants = ["solid", "outline", "soft", "subtle", "ghost", "link"];
			for (const color of colors) {
				for (const variant of variants) {
					const cv = recipe.compoundVariants!.find(
						(v) => v.match.color === color && v.match.variant === variant,
					);
					expect(cv, `${color} + ${variant}`).toBeDefined();
				}
			}
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base!.display).toBe("flex");
			expect(recipe.base!.cursor).toBe("pointer");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => !cv.match.color || cv.match.color === "neutral"),
			).toBe(true);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s, {
				filter: { variant: ["ghost", "solid"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "ghost"]);
			expect(
				recipe.compoundVariants!.every(
					(cv) => !cv.match.variant || cv.match.variant === "ghost" || cv.match.variant === "solid",
				),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = usePaginationItemRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("ghost");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
