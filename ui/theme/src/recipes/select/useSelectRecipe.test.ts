import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";
import { useFocusWithinModifier, useHoverModifier } from "@styleframe/theme";

import { useSelectRecipe } from "./useSelectRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"flexWrap",
		"gap",
		"fontFamily",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderBottomColor",
		"borderRadius",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"background",
		"color",
		"cursor",
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
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	s.variable("color.text-weakest", "#64748B", { default: true });
	s.variable("color.primary", "#006cff", { default: true });
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusWithinModifier(s);
	return s;
}

describe("useSelectRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSelectRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("select");
	});

	it("should have wrapping, clickable base styles with a focus-within ring", () => {
		const s = createInstance();
		const recipe = useSelectRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			flexWrap: "wrap",
			gap: "@0.375",
			cursor: "pointer",
			"&:focus-within": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have the input-style variant axis (solid, soft, ghost)", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "ghost"]);
		});

		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have invalid, disabled, and readonly boolean variants", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(recipe.variants!.invalid).toEqual({ true: {}, false: {} });
			expect(recipe.variants!.disabled).toEqual({ true: {}, false: {} });
			expect(recipe.variants!.readonly).toEqual({ true: {}, false: {} });
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSelectRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			invalid: "false",
			disabled: "false",
			readonly: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 12 compound variants total", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			// 3 colors × 3 variants = 9, plus 3 standalone (invalid, readonly, disabled)
			expect(recipe.compoundVariants).toHaveLength(12);
		});

		it("should have a neutral solid compound with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral" && v.match.variant === "solid",
			);

			expect(cv).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-450",
					color: "@color.text",
					"&:hover": { borderColor: "@color.gray-500" },
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-500",
						color: "@color.white",
					},
					"&:dark:hover": { borderColor: "@color.gray-450" },
				},
			});
		});

		it.each([
			["light", "solid", "gray-450", "gray-500", "gray-450", "gray-500"],
			["light", "soft", "gray-450", "gray-500", "gray-450", "gray-500"],
			["dark", "solid", "gray-500", "gray-450", "gray-500", "gray-450"],
			["dark", "soft", "gray-500", "gray-450", "gray-500", "gray-450"],
			["neutral", "solid", "gray-450", "gray-500", "gray-500", "gray-450"],
			["neutral", "soft", "gray-450", "gray-500", "gray-500", "gray-450"],
		])(
			"should give the %s %s compound its rest and hover border tokens",
			(color, variant, rest, hover, darkRest, darkHover) => {
				const s = createInstance();
				const recipe = useSelectRecipe(s);

				const cv = recipe.compoundVariants!.find(
					(v) => v.match.color === color && v.match.variant === variant,
				);

				expect(cv?.css).toMatchObject({
					borderColor: `@color.${rest}`,
					"&:hover": { borderColor: `@color.${hover}` },
					"&:dark": { borderColor: `@color.${darkRest}` },
					"&:dark:hover": { borderColor: `@color.${darkHover}` },
				});
			},
		);

		it.each([
			["light", "gray-450", "gray-500", "gray-450", "gray-500"],
			["dark", "gray-500", "gray-450", "gray-500", "gray-450"],
			["neutral", "gray-450", "gray-500", "gray-500", "gray-450"],
		])(
			"should give the %s ghost compound a bottom border and square bottom corners",
			(color, rest, hover, darkRest, darkHover) => {
				const s = createInstance();
				const recipe = useSelectRecipe(s);

				const cv = recipe.compoundVariants!.find(
					(v) => v.match.color === color && v.match.variant === "ghost",
				);

				expect(cv?.css).toMatchObject({
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: `@color.${rest}`,
					borderBottomLeftRadius: "0",
					borderBottomRightRadius: "0",
					"&:hover": { borderBottomColor: `@color.${hover}` },
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						borderBottomColor: `@color.${darkRest}`,
					},
					"&:dark:hover": { borderBottomColor: `@color.${darkHover}` },
				});
			},
		);

		it("should have an invalid compound overriding the focus ring color", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.invalid === "true");

			expect(cv?.css).toEqual({
				borderColor: "@color.error",
				borderBottomColor: "@color.error",
				"&:hover": {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
				},
				"&:focus-within": { outlineColor: "@color.error" },
				"&:dark": {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
				},
				"&:dark:hover": {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
				},
			});
		});

		it("should have a read-only compound with a dashed border and a tinted fill", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.readonly === "true");

			expect(cv).toEqual({
				match: { readonly: "true" },
				css: {
					background: "@color.gray-50",
					borderStyle: "@border-style.dashed",
					cursor: "default",
					"&:dark": {
						background: "@color.gray-800",
					},
				},
			});
		});

		it("should have a disabled compound that blocks interaction", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.disabled === "true");

			expect(cv).toEqual({
				match: { disabled: "true" },
				css: {
					opacity: "0.5",
					cursor: "not-allowed",
					pointerEvents: "none",
				},
			});
		});
	});

	describe("setup callback", () => {
		it("should register .select-value, .select-icon, and .select.-open selectors", () => {
			const s = createInstance();
			useSelectRecipe(s);

			const queries = s.root.children
				.filter((child) => child.type === "selector")
				.map((child) => (child as { query: string }).query);

			expect(queries).toContain(".select-value");
			expect(queries).toContain(".select-icon");
			expect(queries).toContain(".select.-open");
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s, { base: { display: "flex" } });

			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune color-scoped compounds", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s, { filter: { color: ["neutral"] } });

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(
				recipe.compoundVariants!.every(
					(cv) => cv.match.color === undefined || cv.match.color === "neutral",
				),
			).toBe(true);
			expect(recipe.compoundVariants!.length).toBeLessThan(12);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s, { filter: { color: ["light"] } });

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
		});
	});
});
