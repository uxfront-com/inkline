import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useSliderTrackRecipe } from "./useSliderTrackRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"overflow",
		"borderRadius",
		"width",
		"height",
		"flexDirection",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSliderTrackRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSliderTrackRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("slider-track");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSliderTrackRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			overflow: "hidden",
			borderRadius: "@border-radius.full",
		});
	});

	describe("variants", () => {
		it("should have non-semantic color variants only", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have orientation variants", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s);

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
			const recipe = useSliderTrackRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: { height: "@0.25" },
				sm: { height: "@0.375" },
				md: { height: "@0.5" },
				lg: { height: "@0.75" },
				xl: { height: "@1" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSliderTrackRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			orientation: "horizontal",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 8 compound variants total", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s);

			// 3 non-semantic colors + 5 vertical × size overrides = 8
			expect(recipe.compoundVariants).toHaveLength(8);
		});

		it("should have correct neutral color compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s);

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
			const recipe = useSliderTrackRecipe(s);

			const verticalMd = recipe.compoundVariants!.find(
				(cv) => cv.match.orientation === "vertical" && cv.match.size === "md",
			);

			expect(verticalMd).toEqual({
				match: { orientation: "vertical", size: "md" },
				css: {
					height: "100%",
					width: "@0.5",
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s, {
				base: { overflow: "visible" },
			});

			expect(recipe.base!.overflow).toBe("visible");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useSliderTrackRecipe(s, {
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
			const recipe = useSliderTrackRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
