import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useActiveModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useHoverModifier,
} from "@styleframe/theme";

import { useBreadcrumbItemRecipe } from "./index";

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
		"color",
		"content",
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

describe("useBreadcrumbItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useBreadcrumbItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("breadcrumb-item");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useBreadcrumbItemRecipe(s);

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
			const recipe = useBreadcrumbItemRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.xs",
				},
				md: {
					fontSize: "@font-size.sm",
				},
				lg: {
					fontSize: "@font-size.md",
				},
			});
		});

		it("should have active variants", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			expect(recipe.variants!.active).toEqual({
				true: {
					fontWeight: "@font-weight.semibold",
				},
				false: {},
			});
		});

		it("should have disabled variants", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			expect(recipe.variants!.disabled).toEqual({
				true: {
					cursor: "not-allowed",
					opacity: "0.5",
					pointerEvents: "none",
				},
				false: {},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useBreadcrumbItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
			active: "false",
			disabled: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 4 compound variants total", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			// 3 colors + 1 active override
			expect(recipe.compoundVariants).toHaveLength(4);
		});

		it("should have correct light color compound variant", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			const light = recipe.compoundVariants!.find((cv) => cv.match.color === "light");

			expect(light).toEqual({
				match: { color: "light" },
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
						color: "@color.text-inverted",
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

		it("should have correct dark color compound variant", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			const dark = recipe.compoundVariants!.find((cv) => cv.match.color === "dark");

			expect(dark).toEqual({
				match: { color: "dark" },
				css: {
					color: "@color.gray-200",
					"&:hover": {
						color: "@color.white",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:focus": {
						color: "@color.white",
						textDecoration: "underline",
						textUnderlineOffset: "4px",
					},
					"&:active": {
						color: "@color.white",
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

		it("should have correct neutral color compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
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

		it("should have correct active compound variant that suppresses link affordance", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s);

			const active = recipe.compoundVariants!.find((cv) => cv.match.active === "true");

			expect(active).toEqual({
				match: { active: "true" },
				css: {
					cursor: "default",
					"&:hover": {
						textDecoration: "none",
					},
					"&:focus": {
						textDecoration: "none",
					},
					"&:active": {
						textDecoration: "none",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base!.display).toBe("flex");
			expect(recipe.base!.cursor).toBe("pointer");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => !cv.match.color || cv.match.color === "neutral"),
			).toBe(true);
		});

		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s, {
				filter: { size: ["sm", "lg"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "lg"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useBreadcrumbItemRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
