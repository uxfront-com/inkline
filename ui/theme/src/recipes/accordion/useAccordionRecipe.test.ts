import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useAccordionRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"overflow",
		"lineHeight",
		"background",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useAccordionRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useAccordionRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("accordion");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useAccordionRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			overflow: "hidden",
			lineHeight: "@line-height.normal",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have solid and ghost style variants", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "ghost"]);
		});

		it("should strip chrome on the ghost variant", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s);

			expect(recipe.variants!.variant.ghost).toEqual({
				background: "transparent",
				borderColor: "transparent",
			});
		});

		it("should have size variants with correct border radius", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { borderRadius: "@border-radius.sm" },
				md: { borderRadius: "@border-radius.md" },
				lg: { borderRadius: "@border-radius.lg" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useAccordionRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants (solid surface per color)", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
			expect(recipe.compoundVariants!.every((cv) => cv.match.variant === "solid")).toBe(true);
		});

		it("should have correct neutral solid surface with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s);

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
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s, {
				base: { overflow: "visible" },
			});

			expect(recipe.base!.overflow).toBe("visible");
			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune compounds", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants!.every((cv) => cv.match.color === "neutral")).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should filter the variant axis", () => {
			const s = createInstance();
			const recipe = useAccordionRecipe(s, {
				filter: { variant: ["ghost"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["ghost"]);
			// All solid-only compounds are pruned for the ghost-only build.
			expect(recipe.compoundVariants).toHaveLength(0);
		});
	});
});
