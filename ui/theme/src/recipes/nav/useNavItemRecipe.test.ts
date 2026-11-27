import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useHoverModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useActiveModifier,
} from "@styleframe/theme";

import { useNavItemRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"cursor",
		"background",
		"fontWeight",
		"lineHeight",
		"textDecoration",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"fontSize",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"color",
		"borderColor",
		"borderWidth",
		"borderRadius",
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

describe("useNavItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useNavItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("nav-item");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useNavItemRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			cursor: "pointer",
			background: "transparent",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
			textDecoration: "none",
			transitionProperty: "color, background-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			outline: "none",
			"&:hover": {
				textDecoration: "none",
			},
			"&:focus": {
				textDecoration: "none",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["ghost", "link"]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.25",
					paddingBottom: "@0.25",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@1",
					paddingRight: "@1",
				},
			});
		});
	});

	it("should have active variants", () => {
		const s = createInstance();
		const recipe = useNavItemRecipe(s);

		expect(recipe.variants!.active).toEqual({
			true: {
				fontWeight: "@font-weight.semibold",
			},
			false: {},
		});
	});

	it("should have disabled variants", () => {
		const s = createInstance();
		const recipe = useNavItemRecipe(s);

		expect(recipe.variants!.disabled).toEqual({
			true: {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
			false: {},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useNavItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "ghost",
			size: "md",
			active: "false",
			disabled: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 6 compound variants total", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			// 3 colors × 2 variants = 6
			expect(recipe.compoundVariants).toHaveLength(6);
		});

		it("should have correct light ghost compound variant", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			const lightGhost = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "ghost",
			);

			expect(lightGhost).toEqual({
				match: { color: "light", variant: "ghost" },
				css: {
					color: "@color.gray-900",
					"&:hover": {
						color: "@color.gray-900",
						background: "@color.gray-100",
					},
					"&:focus": {
						color: "@color.gray-900",
						background: "@color.gray-100",
					},
					"&:active": {
						background: "@color.gray-200",
					},
					"&:dark": {
						color: "@color.gray-900",
					},
					"&:dark:hover": {
						color: "@color.gray-900",
						background: "@color.gray-100",
					},
					"&:dark:focus": {
						color: "@color.gray-900",
						background: "@color.gray-100",
					},
					"&:dark:active": {
						background: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct light link compound variant", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			const lightLink = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "link",
			);

			expect(lightLink).toEqual({
				match: { color: "light", variant: "link" },
				css: {
					color: "@color.gray-900",
					"&:hover": {
						color: "@color.gray-900",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:focus": {
						color: "@color.gray-900",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:active": {
						color: "@color.gray-900",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:dark": {
						color: "@color.gray-900",
					},
					"&:dark:hover": {
						color: "@color.gray-900",
					},
					"&:dark:focus": {
						color: "@color.gray-900",
					},
					"&:dark:active": {
						color: "@color.gray-900",
					},
				},
			});
		});

		it("should have correct dark ghost compound variant", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			const darkGhost = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "ghost",
			);

			expect(darkGhost).toEqual({
				match: { color: "dark", variant: "ghost" },
				css: {
					color: "@color.gray-200",
					"&:hover": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:focus": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:active": {
						background: "@color.gray-750",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:hover": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:focus": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:active": {
						background: "@color.gray-750",
					},
				},
			});
		});

		it("should have correct neutral ghost compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			const neutralGhost = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "ghost",
			);

			expect(neutralGhost).toEqual({
				match: { color: "neutral", variant: "ghost" },
				css: {
					color: "@color.text",
					"&:hover": {
						color: "@color.text",
						background: "@color.gray-100",
					},
					"&:focus": {
						color: "@color.text",
						background: "@color.gray-100",
					},
					"&:active": {
						background: "@color.gray-200",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:hover": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:focus": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:active": {
						background: "@color.gray-750",
					},
				},
			});
		});

		it("should have correct neutral link compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s);

			const neutralLink = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "link",
			);

			expect(neutralLink).toEqual({
				match: { color: "neutral", variant: "link" },
				css: {
					color: "@color.text",
					"&:hover": {
						color: "@color.gray-900",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:focus": {
						color: "@color.gray-900",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:active": {
						color: "@color.gray-900",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:hover": {
						color: "@color.white",
					},
					"&:dark:focus": {
						color: "@color.white",
					},
					"&:dark:active": {
						color: "@color.white",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base!.display).toBe("flex");
			expect(recipe.base!.cursor).toBe("pointer");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => !cv.match.color || cv.match.color === "neutral"),
			).toBe(true);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s, {
				filter: { variant: ["ghost"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["ghost"]);
			expect(
				recipe.compoundVariants!.every((cv) => !cv.match.variant || cv.match.variant === "ghost"),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useNavItemRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("ghost");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
