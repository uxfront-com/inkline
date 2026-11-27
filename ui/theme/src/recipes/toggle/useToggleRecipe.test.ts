import { styleframe } from "@styleframe/core";
import { useAriaPressedModifier } from "@styleframe/theme";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import {
	useActiveModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useHoverModifier,
} from "@styleframe/theme";
import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { describe, expect, it } from "vitest";

import { useToggleRecipe } from "./useToggleRecipe";

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
		"gap",
		"color",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusModifier(s);
	useActiveModifier(s);
	useFocusVisibleModifier(s);
	useDisabledModifier(s);
	useAriaPressedModifier(s);
	return s;
}

describe("useToggleRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toggle");
	});

	it("should build against the design-tokens, utilities, and modifiers presets", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useUtilitiesPreset(s);
		useModifiersPreset(s);

		// Reproduces the real init environment: every declared property must
		// resolve to a registered utility and every `&:` key to a modifier
		// (including `&:aria-pressed`).
		expect(() => useToggleRecipe(s)).not.toThrow();
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
		});
	});

	it("should style focus-visible and disabled states", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.base?.["&:focus-visible"]).toMatchObject({
			outlineColor: "@color.primary",
		});
		expect(recipe.base?.["&:disabled"]).toEqual({
			cursor: "not-allowed",
			opacity: "0.75",
			pointerEvents: "none",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "outline", "ghost"]);
			expect(recipe.variants!.variant.solid).toEqual({});
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

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

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should give solid a filled surface, outline a border, and ghost neither at rest", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			const cssFor = (variant: string) =>
				recipe.compoundVariants!.find(
					(v) => v.match.color === "neutral" && v.match.variant === variant,
				)!.css as Record<string, unknown>;

			// solid mirrors the button's solid resting surface: filled + subtle border.
			expect(cssFor("solid").background).toBe("@color.white");
			expect(cssFor("solid").borderColor).toBe("@color.gray-200");
			// outline is transparent with a border; ghost is transparent with none.
			expect(cssFor("outline").background).toBeUndefined();
			expect(cssFor("outline").borderColor).toBe("@color.gray-300");
			expect(cssFor("ghost").background).toBeUndefined();
			expect(cssFor("ghost").borderColor).toBeUndefined();
		});

		it("should reuse the :hover fill on :aria-pressed for every compound variant", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			for (const cv of recipe.compoundVariants!) {
				const css = cv.css as Record<string, Record<string, string>>;
				expect(css["&:aria-pressed"]).toEqual(css["&:hover"]);
				if (css["&:dark:hover"]) {
					expect(css["&:dark:aria-pressed"]).toEqual(css["&:dark:hover"]);
				}
			}
		});

		it("should adapt the neutral/solid variant in dark mode and re-assert the pressed fill", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral" && v.match.variant === "solid",
			);
			expect(cv?.css).toEqual({
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-100" },
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
				},
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-800" },
			});
		});

		it("should keep light and dark surfaces fixed by re-asserting them under :dark", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			const darkBlockFor = (color: string) =>
				(
					recipe.compoundVariants!.find(
						(v) => v.match.color === color && v.match.variant === "solid",
					)!.css as Record<string, unknown>
				)["&:dark"];

			// The light surface stays white in dark mode (text flips to keep contrast).
			expect(darkBlockFor("light")).toEqual({
				background: "@color.white",
				color: "@color.text-inverted",
				borderColor: "@color.gray-200",
			});
			// The dark surface stays gray-900 in dark mode.
			expect(darkBlockFor("dark")).toEqual({
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-800",
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base?.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune compound variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
