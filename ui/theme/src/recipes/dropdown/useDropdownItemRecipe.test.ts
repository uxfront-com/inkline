import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useActiveModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useHoverModifier,
} from "@styleframe/theme";

import { useDropdownItemRecipe } from "./index";

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

describe("useDropdownItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDropdownItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("dropdown-item");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useDropdownItemRecipe(s);

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
			const recipe = useDropdownItemRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.5",
				borderRadius: "@border-radius.sm",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useDropdownItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct light solid compound variant with hover/focus/active", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					color: "@color.text",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-150" },
					"&:dark": { color: "@color.text-inverted" },
					"&:dark:hover": { background: "@color.gray-100" },
					"&:dark:focus": { background: "@color.gray-100" },
					"&:dark:active": { background: "@color.gray-150" },
				},
			});
		});

		it("should have correct dark solid compound variant with hover/focus/active", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					color: "@color.white",
					"&:hover": { background: "@color.gray-800" },
					"&:focus": { background: "@color.gray-800" },
					"&:active": { background: "@color.gray-750" },
					"&:dark": { color: "@color.white" },
					"&:dark:hover": { background: "@color.gray-800" },
					"&:dark:focus": { background: "@color.gray-800" },
					"&:dark:active": { background: "@color.gray-750" },
				},
			});
		});

		it("should have correct neutral solid compound variant with adaptive hover/focus/active", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					color: "@color.text",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-150" },
					"&:dark": { color: "@color.white" },
					"&:dark:hover": { background: "@color.gray-800" },
					"&:dark:focus": { background: "@color.gray-800" },
					"&:dark:active": { background: "@color.gray-750" },
				},
			});
		});

		it("should have correct neutral soft compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const neutralSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "soft",
			);

			expect(neutralSoft).toEqual({
				match: { color: "neutral", variant: "soft" },
				css: {
					color: "@color.gray-700",
					"&:hover": { background: "@color.gray-200" },
					"&:focus": { background: "@color.gray-200" },
					"&:active": { background: "@color.gray-250" },
					"&:dark": { color: "@color.gray-300" },
					"&:dark:hover": { background: "@color.gray-750" },
					"&:dark:focus": { background: "@color.gray-750" },
					"&:dark:active": { background: "@color.gray-700" },
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.width).toBe("100%");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
