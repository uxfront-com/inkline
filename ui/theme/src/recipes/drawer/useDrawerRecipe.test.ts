import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useDrawerRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"zIndex",
		"display",
		"flexDirection",
		"overflow",
		"boxShadow",
		"lineHeight",
		"borderStyle",
		"borderColor",
		"borderWidth",
		"top",
		"right",
		"bottom",
		"left",
		"width",
		"height",
		"maxWidth",
		"maxHeight",
		"borderLeftWidth",
		"borderRightWidth",
		"borderTopWidth",
		"borderBottomWidth",
		"background",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
	return s.root.children.find(
		(child) => child.type === "selector" && (child as { query: string }).query === query,
	);
}

describe("useDrawerRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDrawerRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("drawer");
	});

	it("should have correct base styles (fixed, elevated, borderless)", () => {
		const s = createInstance();
		const recipe = useDrawerRecipe(s);

		expect(recipe.base).toEqual({
			position: "fixed",
			zIndex: "1000",
			display: "flex",
			flexDirection: "column",
			overflow: "hidden",
			boxShadow: "@box-shadow.lg",
			lineHeight: "@line-height.normal",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderWidth: "0",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});

		it("should expose sizes (dimension applied via side × size compounds)", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(recipe.variants!.size).toEqual({ sm: {}, md: {}, lg: {} });
		});

		it("should have all four sides", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(Object.keys(recipe.variants!.side)).toEqual(["left", "right", "top", "bottom"]);
		});

		it("should anchor the right side with a left border", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(recipe.variants!.side.right).toEqual({
				top: "0",
				bottom: "0",
				right: "0",
				maxWidth: "100vw",
				borderLeftWidth: "@border-width.thin",
			});
		});

		it("should anchor the top side with a bottom border", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(recipe.variants!.side.top).toEqual({
				top: "0",
				left: "0",
				right: "0",
				maxHeight: "100vh",
				borderBottomWidth: "@border-width.thin",
			});
		});
	});

	it("should default to neutral solid md on the right", () => {
		const s = createInstance();
		const recipe = useDrawerRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			side: "right",
		});
	});

	describe("compound variants", () => {
		it("should have 9 surface + 6 left/right width = 15 compounds", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(15);
		});

		it("should paint the neutral solid surface with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

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

		it("should set width for horizontal sides and leave vertical sides content-sized", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s);

			const rightMd = recipe.compoundVariants!.find(
				(cv) => cv.match.side === "right" && cv.match.size === "md",
			);
			expect(rightMd).toEqual({
				match: { side: "right", size: "md" },
				css: { width: "20rem" },
			});

			// top/bottom drawers are sized by their content — no size compound
			// sets their height
			const verticalSizeCompound = recipe.compoundVariants!.find(
				(cv) => cv.match.side === "top" || cv.match.side === "bottom",
			);
			expect(verticalSizeCompound).toBeUndefined();
		});
	});

	describe("setup", () => {
		it("registers body-fill and section-pin selectors", () => {
			const s = createInstance();
			useDrawerRecipe(s);

			// body grows to fill the panel and scrolls on overflow
			expect(findSelector(s, ".drawer-body")).toBeDefined();
			// header/footer keep their natural height
			expect(findSelector(s, ".drawer-header")).toBeDefined();
			expect(findSelector(s, ".drawer-footer")).toBeDefined();
		});
	});

	describe("filter", () => {
		it("should filter the side axis and prune its compounds", () => {
			const s = createInstance();
			const recipe = useDrawerRecipe(s, {
				filter: { side: ["left", "right"] },
			});

			expect(Object.keys(recipe.variants!.side)).toEqual(["left", "right"]);
			// 9 surface (no side in match) + 2 sides × 3 sizes = 15
			expect(recipe.compoundVariants).toHaveLength(15);
		});
	});
});
