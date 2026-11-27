import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { expectKeyframesRegistered } from "../../__tests__/expectKeyframesRegistered";
import { useSkeletonRecipe } from "./useSkeletonRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"background",
		"borderRadius",
		"height",
		"opacity",
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

describe("useSkeletonRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("skeleton");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			background: "@color.gray-200",
			borderRadius: "@border-radius.md",
			animationName: "skeleton-pulse",
			animationDuration: "2s",
			animationTimingFunction: "@easing.ease-in-out",
			animationIterationCount: "infinite",
			"&:dark": {
				background: "@color.gray-800",
			},
		});
	});

	describe("variants", () => {
		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useSkeletonRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["xs", "sm", "md", "lg", "xl"]);
		});

		it("should have correct size variant styles", () => {
			const s = createInstance();
			const recipe = useSkeletonRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: { height: "@0.5" },
				sm: { height: "@0.75" },
				md: { height: "@1" },
				lg: { height: "@1.5" },
				xl: { height: "@2" },
			});
		});

		it("should have rounded variant with true and false keys", () => {
			const s = createInstance();
			const recipe = useSkeletonRecipe(s);

			expect(Object.keys(recipe.variants!.rounded)).toEqual(["true", "false"]);
		});

		it("should have correct rounded variant styles", () => {
			const s = createInstance();
			const recipe = useSkeletonRecipe(s);

			expect(recipe.variants!.rounded).toEqual({
				true: { borderRadius: "@border-radius.full" },
				false: {},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
			rounded: "false",
		});
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s);

		expect(recipe.compoundVariants).toEqual(undefined);
	});

	it("should register the keyframes referenced by animationName", () => {
		const s = createInstance();
		useSkeletonRecipe(s);

		expectKeyframesRegistered(s, "skeleton-pulse");
	});

	it("should support config overrides", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s, {
			base: { display: "inline-block" },
		});

		expect(recipe.base!.display).toBe("inline-block");
		expect(recipe.base!.background).toBe("@color.gray-200");
	});

	it("should support filter for size variants", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s, {
			filter: {
				size: ["sm", "md"],
			},
		});

		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
	});

	it("should clear default variant when filtered out", () => {
		const s = createInstance();
		const recipe = useSkeletonRecipe(s, {
			filter: {
				size: ["xs", "sm"],
			},
		});

		expect(recipe.defaultVariants!.size).toBeUndefined();
	});
});
