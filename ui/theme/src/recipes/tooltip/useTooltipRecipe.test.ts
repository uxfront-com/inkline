import { styleframe } from "@styleframe/core";
import type { AtRule, Selector } from "@styleframe/core";
import { useDarkModifier, useForcedColorsModifier } from "@styleframe/theme";
import { useAfterModifier } from "@styleframe/theme";

import { useTooltipRecipe, useTooltipArrowRecipe } from "./useTooltipRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"fontWeight",
		"fontSize",
		"lineHeight",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"borderRadius",
		"boxShadow",
		"zIndex",
		"maxWidth",
		"background",
		"color",
		"width",
		"height",
		"borderLeftWidth",
		"borderLeftStyle",
		"borderLeftColor",
		"borderRightWidth",
		"borderRightStyle",
		"borderRightColor",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
		"position",
		"left",
		"top",
		"overflowWrap",
		"borderInlineStartWidth",
		"borderInlineStartStyle",
		"borderInlineStartColor",
		"borderInlineEndWidth",
		"borderInlineEndStyle",
		"borderInlineEndColor",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
		"insetInlineStart",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useForcedColorsModifier(s);
	useAfterModifier(s);
	s.variable("spacing.xs", "0.5rem");
	s.variable("duration.fast", "150ms");
	s.variable("easing.ease-out", "ease-out");
	return s;
}

function findSelector(s: ReturnType<typeof createInstance>, query: string): Selector | undefined {
	return s.root.children.find(
		(child): child is Selector => child.type === "selector" && child.query === query,
	);
}

// Writes a resolved declaration value back as the `@token` string it came from.
function toText(value: unknown): string {
	if (typeof value === "string") {
		return value;
	}
	const token = value as {
		type: string;
		name?: string;
		value?: Array<unknown>;
	};
	if (token.type === "reference") {
		return `@${token.name}`;
	}
	if (token.type === "css") {
		return token.value!.map(toText).join("");
	}
	return String(value);
}

function declarationsOf(selector: { declarations: object } | undefined) {
	return Object.fromEntries(
		Object.entries(selector?.declarations ?? {}).map(([key, value]) => [key, toText(value)]),
	);
}

describe("useTooltipRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("tooltip");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			fontWeight: "@font-weight.medium",
			fontSize: "@font-size.sm",
			lineHeight: "@line-height.normal",
			paddingTop: "@0.375",
			paddingBottom: "@0.375",
			paddingLeft: "@0.625",
			paddingRight: "@0.625",
			borderRadius: "@border-radius.md",
			boxShadow: "@box-shadow.sm",
			zIndex: "@z-index.tooltip",
			maxWidth: "32ch",
			overflowWrap: "anywhere",
			"&:forced-colors": {
				borderColor: "CanvasText",
				background: "Canvas",
				color: "CanvasText",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.25",
					paddingBottom: "@0.25",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
					borderRadius: "@border-radius.sm",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
					borderRadius: "@border-radius.md",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					borderRadius: "@border-radius.md",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "dark",
			variant: "solid",
			size: "md",
			placement: "top",
		});
	});

	describe("compound variants", () => {
		it("should have 13 compound variants total", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			// 3 colors × 3 variants = 9, plus 4 placement classes
			expect(recipe.compoundVariants).toHaveLength(13);
		});

		it("should have correct dark/solid compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-900",
					color: "@color.text-inverted",
					borderColor: "@color.gray-800",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.text",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct light/solid compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.white",
						color: "@color.text-inverted",
						borderColor: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct neutral/solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral/subtle compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const neutralSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);

			expect(neutralSubtle).toEqual({
				match: { color: "neutral", variant: "subtle" },
				css: {
					background: "@color.gray-50",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-600",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				base: { maxWidth: "320px" },
			});

			expect(recipe.base!.maxWidth).toBe("320px");
			expect(recipe.base!.display).toBe("inline-flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { color: ["dark", "light"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { color: ["dark"] },
			});

			const colorCompounds = recipe.compoundVariants!.filter((cv) => cv.match.color);
			expect(colorCompounds.every((cv) => cv.match.color === "dark")).toBe(true);
			expect(colorCompounds).toHaveLength(3);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { variant: ["solid", "soft"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
			expect(
				recipe
					.compoundVariants!.filter((cv) => cv.match.variant)
					.every((cv) => cv.match.variant === "solid" || cv.match.variant === "soft"),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});

describe("useTooltipArrowRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("tooltip-arrow");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.base).toEqual({
			width: "0",
			height: "0",
			position: "absolute",
			zIndex: "@z-index.tooltip",
			"&:after": {
				position: "absolute",
				zIndex: "0",
			},
			"&:forced-colors": {
				display: "none",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "dark",
			variant: "solid",
			placement: "top",
		});
	});

	describe("compound variants", () => {
		it("should have 13 compound variants total", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			// 3 colors × 3 variants = 9, plus 4 placement classes
			expect(recipe.compoundVariants).toHaveLength(13);
		});

		it("should have correct dark/solid compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					color: "@color.gray-800",
					"&:after": {
						color: "@color.gray-900",
					},
					"&:dark": {
						color: "@color.gray-800",
					},
					"&:dark:after": {
						color: "@color.gray-900",
					},
				},
			});
		});

		it("should have correct neutral/solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					color: "@color.gray-200",
					"&:after": {
						color: "@color.white",
					},
					"&:dark": {
						color: "@color.gray-800",
					},
					"&:dark:after": {
						color: "@color.gray-900",
					},
				},
			});
		});

		it("should have correct neutral/subtle compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			const neutralSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);

			expect(neutralSubtle).toEqual({
				match: { color: "neutral", variant: "subtle" },
				css: {
					color: "@color.gray-300",
					"&:after": {
						color: "@color.gray-50",
					},
					"&:dark": {
						color: "@color.gray-600",
					},
					"&:dark:after": {
						color: "@color.gray-800",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s, {
				base: { width: "12px" },
			});

			expect(recipe.base!.width).toBe("12px");
			expect(recipe.base!.height).toBe("0");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s, {
				filter: { color: ["dark"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["dark"]);
			expect(recipe.compoundVariants!.filter((cv) => cv.match.color)).toHaveLength(3);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
		});
	});
});

describe("tooltip Open Components rules", () => {
	it("tooltip/wraps wraps long text at a maximum width in ch", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.base!.maxWidth).toBe("32ch");
		expect(recipe.base!.overflowWrap).toBe("anywhere");
		expect(recipe.base!.overflow).toBeUndefined();
		expect(recipe.base!.whiteSpace).toBeUndefined();
	});

	it("tooltip/top-layer positions a [popover] element as fixed, with the offset as margin", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(declarationsOf(findSelector(s, ".tooltip[popover]"))).toMatchObject({
			position: "fixed",
			inset: "auto",
			margin: "@tooltip.offset",
			width: "max-content",
			overflow: "visible",
		});
		expect(findSelector(s, ".tooltip[popover]:not(:popover-open)")?.declarations).toEqual({
			display: "none",
		});
		expect(s.root.variables.map((v) => v.name)).toContain("tooltip.offset");
		expect(recipe.base!.zIndex).toBe("@z-index.tooltip");
	});

	it("tooltip/top-layer leaves an element without the popover attribute in place", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.base!.position).toBeUndefined();
		expect(findSelector(s, ".tooltip")).toBeUndefined();
	});

	it("tooltip/flips sets position-area from the placement axis and flips with position-try-fallbacks", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(Object.keys(recipe.variants!.placement)).toEqual(["top", "bottom", "start", "end"]);
		expect(recipe.defaultVariants!.placement).toBe("top");
		for (const placement of ["top", "bottom", "start", "end"] as const) {
			expect(recipe.compoundVariants!.find((cv) => cv.match.placement === placement)).toEqual({
				match: { placement },
				className: `-placement-${placement}`,
			});
		}

		expect(findSelector(s, ".tooltip[popover]")?.declarations).toMatchObject({
			positionArea: "top",
			positionTryFallbacks: "flip-block, flip-inline",
		});
		expect(findSelector(s, ".tooltip[popover].-placement-top")?.declarations).toEqual({
			positionArea: "top",
		});
		expect(findSelector(s, ".tooltip[popover].-placement-bottom")?.declarations).toEqual({
			positionArea: "bottom",
		});
		expect(findSelector(s, ".tooltip[popover].-placement-start")?.declarations).toEqual({
			positionArea: "self-inline-start",
		});
		expect(findSelector(s, ".tooltip[popover].-placement-end")?.declarations).toEqual({
			positionArea: "self-inline-end",
		});
	});

	it("tooltip/reduced-motion fades in without growing under prefers-reduced-motion: reduce", () => {
		const s = createInstance();
		useTooltipRecipe(s);

		const opening = findSelector(s, ".tooltip[popover]:popover-open");
		expect(toText(opening?.declarations.transition)).toBe(
			"opacity @duration.fast @easing.ease-out, scale @duration.fast @easing.ease-out",
		);

		const growing = opening?.children.find(
			(child): child is AtRule => child.type === "at-rule" && child.identifier === "starting-style",
		);
		expect(growing?.declarations).toEqual({ opacity: "0", scale: "0.96" });

		const media = opening?.children.find(
			(child): child is AtRule => child.type === "at-rule" && child.identifier === "media",
		);
		expect(media?.rule).toBe("(prefers-reduced-motion: reduce)");
		expect(declarationsOf(media)).toEqual({
			transition: "opacity @duration.fast @easing.ease-out",
		});
		const startingStyle = media?.children.find(
			(child): child is AtRule => child.type === "at-rule" && child.identifier === "starting-style",
		);
		expect(startingStyle?.declarations).toEqual({ scale: "1" });
	});

	it("tooltip/forced-colors marks its edge with a border in the system's text colour", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.base!.borderWidth).toBe("@border-width.thin");
		expect(recipe.base!.borderStyle).toBe("@border-style.solid");
		expect(recipe.base!["&:forced-colors"]).toEqual({
			borderColor: "CanvasText",
			background: "Canvas",
			color: "CanvasText",
		});
	});
});

describe("tooltip-arrow Open Components rules", () => {
	it("tooltip/points-at-trigger turns the arrow with the placement axis", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);
		const placement = recipe.variants!.placement;

		expect(Object.keys(placement)).toEqual(["top", "bottom", "start", "end"]);
		expect(recipe.defaultVariants!.placement).toBe("top");
		// Only the side that faces the tooltip is coloured, on both triangles, so
		// the point faces the trigger. The inner one sits 1px inside the outer.
		expect(placement.top).toEqual({
			borderInlineStartWidth: "calc(@tooltip.arrow.size + 1px)",
			borderInlineStartStyle: "@border-style.solid",
			borderInlineStartColor: "transparent",
			borderInlineEndWidth: "calc(@tooltip.arrow.size + 1px)",
			borderInlineEndStyle: "@border-style.solid",
			borderInlineEndColor: "transparent",
			borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "currentColor",
			"&:after": {
				borderInlineStartWidth: "@tooltip.arrow.size",
				borderInlineStartStyle: "@border-style.solid",
				borderInlineStartColor: "transparent",
				borderInlineEndWidth: "@tooltip.arrow.size",
				borderInlineEndStyle: "@border-style.solid",
				borderInlineEndColor: "transparent",
				borderTopWidth: "@tooltip.arrow.size",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "currentColor",
				insetInlineStart: "calc(@tooltip.arrow.size * -1)",
				top: "calc(@tooltip.arrow.size * -1 - 1px)",
			},
		});
		expect(placement.bottom).toEqual({
			borderInlineStartWidth: "calc(@tooltip.arrow.size + 1px)",
			borderInlineStartStyle: "@border-style.solid",
			borderInlineStartColor: "transparent",
			borderInlineEndWidth: "calc(@tooltip.arrow.size + 1px)",
			borderInlineEndStyle: "@border-style.solid",
			borderInlineEndColor: "transparent",
			borderBottomWidth: "calc(@tooltip.arrow.size + 1px)",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "currentColor",
			"&:after": {
				borderInlineStartWidth: "@tooltip.arrow.size",
				borderInlineStartStyle: "@border-style.solid",
				borderInlineStartColor: "transparent",
				borderInlineEndWidth: "@tooltip.arrow.size",
				borderInlineEndStyle: "@border-style.solid",
				borderInlineEndColor: "transparent",
				borderBottomWidth: "@tooltip.arrow.size",
				borderBottomStyle: "@border-style.solid",
				borderBottomColor: "currentColor",
				insetInlineStart: "calc(@tooltip.arrow.size * -1)",
				top: "1px",
			},
		});
		expect(placement.start).toEqual({
			borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			borderBottomWidth: "calc(@tooltip.arrow.size + 1px)",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
			borderInlineStartWidth: "calc(@tooltip.arrow.size + 1px)",
			borderInlineStartStyle: "@border-style.solid",
			borderInlineStartColor: "currentColor",
			"&:after": {
				borderTopWidth: "@tooltip.arrow.size",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				borderBottomWidth: "@tooltip.arrow.size",
				borderBottomStyle: "@border-style.solid",
				borderBottomColor: "transparent",
				borderInlineStartWidth: "@tooltip.arrow.size",
				borderInlineStartStyle: "@border-style.solid",
				borderInlineStartColor: "currentColor",
				insetInlineStart: "calc(@tooltip.arrow.size * -1 - 1px)",
				top: "calc(@tooltip.arrow.size * -1)",
			},
		});
		expect(placement.end).toEqual({
			borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			borderBottomWidth: "calc(@tooltip.arrow.size + 1px)",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
			borderInlineEndWidth: "calc(@tooltip.arrow.size + 1px)",
			borderInlineEndStyle: "@border-style.solid",
			borderInlineEndColor: "currentColor",
			"&:after": {
				borderTopWidth: "@tooltip.arrow.size",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				borderBottomWidth: "@tooltip.arrow.size",
				borderBottomStyle: "@border-style.solid",
				borderBottomColor: "transparent",
				borderInlineEndWidth: "@tooltip.arrow.size",
				borderInlineEndStyle: "@border-style.solid",
				borderInlineEndColor: "currentColor",
				insetInlineStart: "1px",
				top: "calc(@tooltip.arrow.size * -1)",
			},
		});
		for (const placement of ["top", "bottom", "start", "end"] as const) {
			expect(recipe.compoundVariants!.find((cv) => cv.match.placement === placement)).toEqual({
				match: { placement },
				className: `-placement-${placement}`,
			});
		}
	});

	it("tooltip/points-at-trigger centres the arrow on the edge that faces the trigger", () => {
		const s = createInstance();
		useTooltipArrowRecipe(s);

		const centred = "calc(50% - @tooltip.arrow.size - 1px)";
		expect(
			declarationsOf(findSelector(s, ".tooltip[popover] > .tooltip-arrow.-placement-top")),
		).toEqual({ top: "100%", insetInlineStart: centred });
		expect(
			declarationsOf(findSelector(s, ".tooltip[popover] > .tooltip-arrow.-placement-bottom")),
		).toEqual({ bottom: "100%", insetInlineStart: centred });
		expect(
			declarationsOf(findSelector(s, ".tooltip[popover] > .tooltip-arrow.-placement-start")),
		).toEqual({ top: centred, insetInlineStart: "100%" });
		expect(
			declarationsOf(findSelector(s, ".tooltip[popover] > .tooltip-arrow.-placement-end")),
		).toEqual({ top: centred, insetInlineEnd: "100%" });
	});

	it("tooltip/forced-colors hides the arrow, whose transparent sides would show", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.base!["&:forced-colors"]).toEqual({ display: "none" });
	});
});
