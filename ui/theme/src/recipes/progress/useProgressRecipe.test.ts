import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { expectKeyframesRegistered } from "../../__tests__/expectKeyframesRegistered";
import { useProgressBarRecipe, useProgressRecipe } from "./useProgressRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"width",
		"height",
		"overflow",
		"borderRadius",
		"background",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"flexDirection",
		"marginLeft",
		"marginBottom",
		"marginTop",
		"animationName",
		"animationDuration",
		"animationTimingFunction",
		"animationIterationCount",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useProgressRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useProgressRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("progress");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useProgressRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			overflow: "hidden",
			borderRadius: "@border-radius.md",
		});
	});

	describe("variants", () => {
		it("should have non-semantic color variants only", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have orientation variants", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			expect(recipe.variants!.orientation).toEqual({
				horizontal: {
					width: "100%",
				},
				vertical: {
					flexDirection: "column-reverse",
					height: "100%",
				},
			});
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: {
					height: "@0.25",
					borderRadius: "@border-radius.sm",
				},
				sm: {
					height: "@0.375",
					borderRadius: "@border-radius.sm",
				},
				md: {
					height: "@0.5",
					borderRadius: "@border-radius.md",
				},
				lg: {
					height: "@0.75",
					borderRadius: "@border-radius.md",
				},
				xl: {
					height: "@1",
					borderRadius: "@border-radius.lg",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useProgressRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			orientation: "horizontal",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 8 compound variants total", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			// 3 non-semantic colors + 5 vertical × size overrides = 8
			expect(recipe.compoundVariants).toHaveLength(8);
		});

		it("should have correct light color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const light = recipe.compoundVariants!.find((cv) => cv.match.color === "light");

			expect(light).toEqual({
				match: { color: "light" },
				css: {
					background: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct dark color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const dark = recipe.compoundVariants!.find((cv) => cv.match.color === "dark");

			expect(dark).toEqual({
				match: { color: "dark" },
				css: {
					background: "@color.gray-800",
					"&:dark": {
						background: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral color compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					background: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-800",
					},
				},
			});
		});

		it("should have vertical × size compound variants", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const verticalMd = recipe.compoundVariants!.find(
				(cv) => cv.match.orientation === "vertical" && cv.match.size === "md",
			);

			expect(verticalMd).toEqual({
				match: { orientation: "vertical", size: "md" },
				css: {
					height: "auto",
					width: "@0.5",
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				filter: { color: ["light", "dark"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				filter: { color: ["neutral"] },
			});

			const colorOnlyCvs = recipe.compoundVariants!.filter(
				(cv) => cv.match.color && !cv.match.orientation,
			);
			expect(colorOnlyCvs).toHaveLength(1);
			expect(colorOnlyCvs.every((cv) => cv.match.color === "neutral")).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});

describe("useProgressBarRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useProgressBarRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("progress-bar");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useProgressBarRecipe(s);

		expect(recipe.base).toEqual({
			borderRadius: "@border-radius.md",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "300ms",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"primary",
				"secondary",
				"success",
				"info",
				"warning",
				"error",
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have orientation variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(recipe.variants!.orientation).toEqual({
				horizontal: {
					height: "100%",
					transitionProperty: "width",
				},
				vertical: {
					width: "100%",
					transitionProperty: "height",
				},
			});
		});

		it("should have inverted variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(recipe.variants!.inverted).toEqual({
				true: {},
				false: {},
			});
		});

		it("should have animation variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(Object.keys(recipe.variants!.animation)).toEqual([
				"none",
				"carousel",
				"carousel-inverse",
				"swing",
				"elastic",
			]);
		});

		it("should have correct carousel animation styles", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(recipe.variants!.animation.carousel).toEqual({
				animationName: "progress-carousel",
				animationDuration: "1.5s",
				animationTimingFunction: "linear",
				animationIterationCount: "infinite",
			});
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: { borderRadius: "@border-radius.sm" },
				sm: { borderRadius: "@border-radius.sm" },
				md: { borderRadius: "@border-radius.md" },
				lg: { borderRadius: "@border-radius.md" },
				xl: { borderRadius: "@border-radius.lg" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useProgressBarRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "primary",
			orientation: "horizontal",
			inverted: "false",
			animation: "none",
			size: "md",
		});
	});

	it("should register every keyframes referenced by an animationName", () => {
		const s = createInstance();
		useProgressBarRecipe(s);

		for (const name of [
			"progress-carousel",
			"progress-carousel-inverse",
			"progress-swing",
			"progress-elastic",
			"progress-carousel-vertical",
			"progress-carousel-inverse-vertical",
			"progress-swing-vertical",
			"progress-elastic-vertical",
		]) {
			expectKeyframesRegistered(s, name);
		}
	});

	describe("compound variants", () => {
		it("should have correct total compound variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			// 6 semantic colors + 3 non-semantic (light/dark/neutral)
			// + 2 inverted × orientation + 4 animation × vertical = 15
			expect(recipe.compoundVariants).toHaveLength(15);
		});

		it("should have correct compound variant for standard colors", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const primary = recipe.compoundVariants!.find((cv) => cv.match.color === "primary");

			expect(primary).toEqual({
				match: { color: "primary" },
				css: {
					background: "@color.primary",
				},
			});
		});

		it("should have correct light color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const light = recipe.compoundVariants!.find((cv) => cv.match.color === "light");

			expect(light).toEqual({
				match: { color: "light" },
				css: {
					background: "@color.gray-400",
					"&:dark": {
						background: "@color.gray-400",
					},
				},
			});
		});

		it("should have correct dark color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const dark = recipe.compoundVariants!.find((cv) => cv.match.color === "dark");

			expect(dark).toEqual({
				match: { color: "dark" },
				css: {
					background: "@color.gray-600",
					"&:dark": {
						background: "@color.gray-600",
					},
				},
			});
		});

		it("should have correct neutral color compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const neutral = recipe.compoundVariants!.find((cv) => cv.match.color === "neutral");

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					background: "@color.gray-400",
					"&:dark": {
						background: "@color.gray-600",
					},
				},
			});
		});

		it("should have inverted × horizontal compound variant", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const invertedH = recipe.compoundVariants!.find(
				(cv) => cv.match.inverted === "true" && cv.match.orientation === "horizontal",
			);

			expect(invertedH).toEqual({
				match: { inverted: "true", orientation: "horizontal" },
				css: { marginLeft: "auto" },
			});
		});

		it("should have inverted × vertical compound variant", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const invertedV = recipe.compoundVariants!.find(
				(cv) => cv.match.inverted === "true" && cv.match.orientation === "vertical",
			);

			expect(invertedV).toEqual({
				match: { inverted: "true", orientation: "vertical" },
				css: { marginBottom: "auto" },
			});
		});

		it("should have vertical animation override compound variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const carouselVertical = recipe.compoundVariants!.find(
				(cv) => cv.match.animation === "carousel" && cv.match.orientation === "vertical",
			);

			expect(carouselVertical).toEqual({
				match: { animation: "carousel", orientation: "vertical" },
				css: { animationName: "progress-carousel-vertical" },
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				base: { borderRadius: "@border-radius.lg" },
			});

			expect(recipe.base!.borderRadius).toBe("@border-radius.lg");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				filter: { color: ["primary", "success"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["primary", "success"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				filter: { color: ["primary"] },
			});

			const colorOnlyCvs = recipe.compoundVariants!.filter(
				(cv) => cv.match.color && !cv.match.inverted && !cv.match.animation,
			);
			expect(colorOnlyCvs).toHaveLength(1);
			expect(colorOnlyCvs.every((cv) => cv.match.color === "primary")).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
