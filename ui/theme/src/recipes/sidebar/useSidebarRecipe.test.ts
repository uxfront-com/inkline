import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useSidebarRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"flexShrink",
		"width",
		"height",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"overflow",
		"lineHeight",
		"fontSize",
		"background",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSidebarRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSidebarRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("sidebar");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSidebarRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			flexShrink: "0",
			width: "@sidebar.width",
			height: "100%",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			overflow: "hidden",
			lineHeight: "@line-height.normal",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});

		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have a collapsed boolean axis", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			expect(Object.keys(recipe.variants!.collapsed)).toEqual(["true", "false"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSidebarRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			collapsed: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 10 compound variants total", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			// 3 colors × 3 variants = 9, plus the collapsed className hook
			expect(recipe.compoundVariants).toHaveLength(10);
		});

		it("should have correct neutral solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

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

		it("should use mode-independent tokens for the fixed light and dark solid surfaces", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			// `light`/`dark` are fixed across themes, so their text must not rely on the
			// adaptive `@color.text` / `@color.text-inverted` tokens — those only swap under
			// `[data-theme="dark"]`, while the `&:dark` modifier also fires on
			// `prefers-color-scheme: dark`, which would flip the text to the wrong value and
			// leave it unreadable on the fixed surface.
			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);
			expect(lightSolid!.css).toEqual({
				background: "@color.white",
				color: "@color.gray-900",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.white",
					color: "@color.gray-900",
					borderColor: "@color.gray-200",
				},
			});

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);
			expect(darkSolid!.css).toEqual({
				background: "@color.gray-900",
				color: "@color.gray-100",
				borderColor: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.gray-100",
					borderColor: "@color.gray-700",
				},
			});
		});

		it("should emit a -collapsed className hook", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s);

			const collapsed = recipe.compoundVariants!.find((cv) => cv.match.collapsed === "true");

			expect(collapsed).toEqual({
				match: { collapsed: "true" },
				className: "-collapsed",
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s, {
				base: { width: "20rem" },
			});

			expect(recipe.base!.width).toBe("20rem");
			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune color compound variants while keeping the collapsed hook", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s, {
				filter: { color: ["neutral"] },
			});

			const colorCompounds = recipe.compoundVariants!.filter((cv) => cv.match.color !== undefined);
			expect(colorCompounds).toHaveLength(3);
			expect(colorCompounds.every((cv) => cv.match.color === "neutral")).toBe(true);
			expect(recipe.compoundVariants!.some((cv) => cv.match.collapsed === "true")).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSidebarRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.collapsed).toBe("false");
		});
	});
});
