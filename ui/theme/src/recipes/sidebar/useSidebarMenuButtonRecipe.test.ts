import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useActiveModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useHoverModifier,
} from "@styleframe/theme";

import { useSidebarMenuButtonRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"width",
		"background",
		"fontWeight",
		"lineHeight",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"textAlign",
		"textDecoration",
		"whiteSpace",
		"overflow",
		"cursor",
		"userSelect",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"fontSize",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"gap",
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

describe("useSidebarMenuButtonRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSidebarMenuButtonRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("sidebar-menu-button");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSidebarMenuButtonRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			width: "100%",
			background: "transparent",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			textAlign: "left",
			textDecoration: "none",
			whiteSpace: "nowrap",
			overflow: "hidden",
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
			transitionProperty: "color, background-color, border-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
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
			const recipe = useSidebarMenuButtonRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have ghost and subtle style variants", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["ghost", "subtle"]);
		});

		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have active and disabled boolean axes", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			expect(Object.keys(recipe.variants!.active)).toEqual(["true", "false"]);
			expect(Object.keys(recipe.variants!.disabled)).toEqual(["true", "false"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSidebarMenuButtonRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "ghost",
			size: "md",
			active: "false",
			disabled: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			// 3 colors × 2 variants (ghost/subtle) = 6, plus 3 per-color active fills
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral ghost compound variant", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			const neutralGhost = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "ghost",
			);

			expect(neutralGhost).toEqual({
				match: { color: "neutral", variant: "ghost" },
				css: {
					color: "@color.text",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": { color: "@color.gray-200" },
					"&:dark:hover": { background: "@color.gray-800" },
					"&:dark:focus": { background: "@color.gray-800" },
					"&:dark:active": { background: "@color.gray-750" },
				},
			});
		});

		it("should have a per-color active highlight placed after the variant rules", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			const neutralActive = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.active === "true",
			);

			expect(neutralActive).toEqual({
				match: { color: "neutral", active: "true" },
				css: {
					background: "@color.gray-100",
					color: "@color.text",
					"&:hover": { background: "@color.gray-150" },
					"&:focus": { background: "@color.gray-150" },
					"&:dark": { background: "@color.gray-750", color: "@color.white" },
					"&:dark:hover": { background: "@color.gray-700" },
					"&:dark:focus": { background: "@color.gray-700" },
				},
			});

			const variantIndex = recipe.compoundVariants!.findIndex(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);
			const activeIndex = recipe.compoundVariants!.findIndex(
				(cv) => cv.match.color === "neutral" && cv.match.active === "true",
			);
			expect(activeIndex).toBeGreaterThan(variantIndex);
		});

		it("should use mode-independent text for the fixed light color", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s);

			// The `light` button sits on a fixed light surface, so its text must stay dark in
			// both color schemes. Using the adaptive `@color.text` / `@color.text-inverted`
			// tokens here renders light text under `prefers-color-scheme: dark` (when the
			// design tokens are not in their `[data-theme="dark"]` values).
			const lightGhost = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "ghost",
			);
			expect(lightGhost!.css!.color).toBe("@color.gray-900");
			expect((lightGhost!.css!["&:dark"] as { color: string }).color).toBe("@color.gray-900");

			const lightActive = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.active === "true",
			);
			expect(lightActive!.css!.color).toBe("@color.gray-900");
			expect((lightActive!.css!["&:dark"] as { color: string }).color).toBe("@color.gray-900");
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s, {
				base: { justifyContent: "center" },
			});

			expect(recipe.base!.justifyContent).toBe("center");
			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune their compounds", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
			// neutral ghost + neutral subtle + neutral active
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSidebarMenuButtonRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("ghost");
		});
	});
});
