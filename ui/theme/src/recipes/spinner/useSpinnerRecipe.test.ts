import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useSpinnerRecipe } from "./useSpinnerRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"position",
		"alignItems",
		"justifyContent",
		"flexShrink",
		"fontSize",
		"lineHeight",
		"verticalAlign",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSpinnerRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSpinnerRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("spinner");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSpinnerRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			position: "relative",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			fontSize: "@font-size.sm",
			lineHeight: "@line-height.normal",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["primary", "light", "dark", "neutral"]);
		});

		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["auto", "sm", "md", "lg", "inherit"]);
		});

		it("should have correct size variant styles", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(recipe.variants!.size).toEqual({
				auto: {},
				sm: {},
				md: {},
				lg: {},
				inherit: { fontSize: "inherit", verticalAlign: "-0.125em" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSpinnerRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "primary",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 4 compound variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(4);
		});

		it("should have correct primary compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "primary");
			expect(cv?.css).toEqual({
				color: "@color.primary",
				"&:dark": {
					color: "@color.primary-400",
				},
			});
		});

		it("should have correct light compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "light");
			expect(cv?.css).toEqual({
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.gray-700",
				},
			});
		});

		it("should have correct dark compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "dark");
			expect(cv?.css).toEqual({
				color: "@color.white",
				"&:dark": {
					color: "@color.white",
				},
			});
		});

		it("should have correct neutral compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "neutral");
			expect(cv?.css).toEqual({
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.white",
				},
			});
		});
	});

	describe("Open Components rules", () => {
		it("spinner/em-sized adds an inherit size that takes the font size of the text around it and centres on it", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(recipe.variants!.size.inherit).toEqual({
				fontSize: "inherit",
				verticalAlign: "-0.125em",
			});
			expect(recipe.defaultVariants?.size).toBe("md");
		});

		it("spinner/stable-layout keeps the spinner from shrinking in a row", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(recipe.base?.flexShrink).toBe("0");
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				filter: { color: ["primary"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["primary"]);
		});

		it("should prune compound variants when filtering", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				filter: { color: ["primary", "neutral"] },
			});

			expect(recipe.compoundVariants!.length).toBe(2);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
