import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useCardRecipe } from "./index";

function createInstance({ focus = true } = {}) {
	const s = styleframe();
	s.variable("color.primary", "#007a99");
	if (focus) {
		s.variable("color.focus", "@color.primary");
	}
	for (const name of [
		"position",
		"display",
		"flexDirection",
		"flexBasis",
		"alignItems",
		"minWidth",
		"overflowWrap",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"overflow",
		"fontSize",
		"lineHeight",
		"boxShadow",
		"background",
		"color",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"gap",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

type Rule = {
	type: string;
	query?: string;
	identifier?: string;
	rule?: string;
	declarations: Record<string, unknown>;
	children: Array<Rule>;
};

const heading = ":is(h1, h2, h3, h4, h5, h6)";
const headerLink = `> .card-header ${heading} a[href]`;

function findSelector(s: ReturnType<typeof createInstance>, query: string) {
	const rule = s.root.children.find(
		(child) => child.type === "selector" && (child as Rule).query === query,
	) as Rule | undefined;
	expect(rule, query).toBeDefined();
	return rule!;
}

function findChild(rule: Rule, type: string, key: string) {
	return rule.children.find((child) =>
		type === "selector" ? child.query === key : child.rule === key,
	);
}

describe("useCardRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCardRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("card");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCardRecipe(s);

		expect(recipe.base).toEqual({
			position: "relative",
			display: "flex",
			flexDirection: "column",
			flexBasis: "100%",
			minWidth: "0",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			lineHeight: "@line-height.normal",
			boxShadow: "@box-shadow.sm",
			overflowWrap: "break-word",
		});
	});

	describe("Open Components rules", () => {
		it("card/focus-visible draws a 2px ring in the focus colour around the card when its link has focus", () => {
			const s = createInstance();
			useCardRecipe(s);

			const focus = findSelector(s, `.card:has(${headerLink}:focus-visible)`);
			expect(focus.declarations).toEqual({
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: { type: "reference", name: "color.focus" },
				outlineOffset: "2px",
			});
		});

		it("card/focus-visible falls back to the primary colour when color.focus is absent", () => {
			const s = createInstance({ focus: false });
			useCardRecipe(s);

			const focus = findSelector(s, `.card:has(${headerLink}:focus-visible)`);
			expect(focus.declarations.outlineColor).toEqual({
				type: "reference",
				name: "color.primary",
			});
		});

		it("card/stretched-link stretches the heading's link over the card with a pseudo-element", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(recipe.base!.position).toBe("relative");

			const link = findSelector(s, `.card ${headerLink}`);
			expect(link.declarations).toEqual({
				color: "inherit",
				textDecoration: "none",
				outline: "none",
			});
			expect(findChild(link, "selector", "&::after")?.declarations).toEqual({
				content: '""',
				position: "absolute",
				inset: "-1px",
			});
		});

		it("card/actions-above lifts every other interactive element above the stretched link", () => {
			const s = createInstance();
			useCardRecipe(s);

			const interactive = ":is(a[href], button, input, select, textarea, summary, [tabindex])";
			// Zero specificity, so a recipe or utility class that positions the
			// element itself, like the slider thumb's, still wins.
			const actions = findSelector(
				s,
				`:where(.card > :is(.card-media, .card-body, .card-footer) ${interactive}, .card > .card-header ${interactive}:not(${heading} *))`,
			);
			expect(actions.declarations).toEqual({
				position: "relative",
				zIndex: "1",
			});
		});

		it("card/resizable fixes no height and wraps long words instead of clipping them", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(recipe.base!.overflow).toBeUndefined();
			expect(recipe.base!.height).toBeUndefined();
			expect(recipe.base!.maxHeight).toBeUndefined();
			expect(recipe.base!.overflowWrap).toBe("break-word");
			expect(recipe.base!.minWidth).toBe("0");
		});

		it("card/stable-size changes only colours and the outline in its hover and focus states", () => {
			const s = createInstance();
			useCardRecipe(s);

			const allowed = [
				"borderColor",
				"outlineWidth",
				"outlineStyle",
				"outlineColor",
				"outlineOffset",
				"textDecorationLine",
				"textUnderlineOffset",
			];
			const collect = (rule: Rule): Array<string> => [
				...Object.keys(rule.declarations),
				...rule.children.flatMap(collect),
			];

			const states = [
				findSelector(s, `.card:has(${headerLink}:hover)`),
				findSelector(s, `.card:has(${headerLink}:focus-visible)`),
				findChild(findSelector(s, `.card ${headerLink}`), "at-rule", "(hover: hover)")!,
			];
			for (const state of states) {
				for (const property of collect(state)) {
					expect(allowed).toContain(property);
				}
			}
		});

		it("card/state-selectors styles hover and focus from the link, not the card", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const blocks = [
				recipe.base!,
				...Object.values(recipe.variants!).flatMap((axis) => Object.values(axis)),
				...recipe.compoundVariants!.map((cv) => cv.css!),
			];
			for (const block of blocks) {
				for (const key of Object.keys(block)) {
					expect(key).not.toMatch(/hover|focus/);
				}
			}

			findSelector(s, `.card:has(${headerLink}:hover)`);
			findSelector(s, `.card:has(${headerLink}:focus-visible)`);
		});

		it("card/hover-capable applies every hover style inside @media (hover: hover)", () => {
			const s = createInstance();
			useCardRecipe(s);

			const hover = findSelector(s, `.card:has(${headerLink}:hover)`);
			expect(hover.declarations).toEqual({});
			expect(hover.children.map((child) => child.rule)).toEqual([
				"(hover: hover)",
				"(hover: hover) and (prefers-contrast: more)",
			]);
			expect(findChild(hover, "at-rule", "(hover: hover)")?.declarations).toEqual({
				borderColor: "color-mix(in srgb, currentColor 45%, transparent)",
			});

			const link = findSelector(s, `.card ${headerLink}`);
			const underline = findChild(link, "at-rule", "(hover: hover)");
			expect(findChild(underline!, "selector", "&:hover")?.declarations).toEqual({
				textDecorationLine: "underline",
				textUnderlineOffset: "0.2em",
			});
		});

		it("card/forced-colors keeps the border and the focus ring in system colours", () => {
			const s = createInstance();
			useCardRecipe(s);

			const card = findSelector(s, ".card.card.card");
			expect(findChild(card, "at-rule", "(forced-colors: active)")?.declarations).toEqual({
				borderColor: "CanvasText",
			});

			const focus = findSelector(s, `.card:has(${headerLink}:focus-visible)`);
			expect(findChild(focus, "at-rule", "(forced-colors: active)")?.declarations).toEqual({
				outlineColor: "Highlight",
			});
		});

		it("card/more-contrast draws the border in the text colour at full strength, on hover too", () => {
			const s = createInstance();
			useCardRecipe(s);

			const card = findSelector(s, ".card.card.card");
			expect(findChild(card, "at-rule", "(prefers-contrast: more)")?.declarations).toEqual({
				borderColor: "currentColor",
			});

			const hover = findSelector(s, `.card:has(${headerLink}:hover)`);
			expect(
				findChild(hover, "at-rule", "(hover: hover) and (prefers-contrast: more)")?.declarations,
			).toEqual({ borderColor: "currentColor" });
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					borderRadius: "@border-radius.sm",
				},
				md: {
					borderRadius: "@border-radius.md",
				},
				lg: {
					borderRadius: "@border-radius.lg",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCardRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct light solid compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.gray-900",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.white",
						color: "@color.gray-900",
						borderColor: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct dark solid compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-900",
					color: "@color.gray-100",
					borderColor: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.gray-100",
						borderColor: "@color.gray-700",
					},
				},
			});
		});

		it("should have correct neutral solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

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
						borderColor: "@color.gray-700",
					},
				},
			});
		});

		it("should have correct neutral subtle compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const neutralSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);

			expect(neutralSubtle).toEqual({
				match: { color: "neutral", variant: "subtle" },
				css: {
					background: "@color.gray-50",
					color: "@color.gray-700",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-700",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.flexDirection).toBe("column");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				filter: { variant: ["solid", "soft"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
			expect(
				recipe.compoundVariants!.every(
					(cv) => cv.match.variant === "solid" || cv.match.variant === "soft",
				),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
