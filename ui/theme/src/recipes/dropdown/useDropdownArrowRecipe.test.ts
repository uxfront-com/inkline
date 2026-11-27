import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";
import { useAfterModifier } from "@styleframe/theme";

import { useDropdownArrowRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"width",
		"height",
		"borderLeftWidth",
		"borderLeftStyle",
		"borderLeftColor",
		"borderRightWidth",
		"borderRightStyle",
		"borderRightColor",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
		"zIndex",
		"left",
		"top",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useAfterModifier(s);
	return s;
}

describe("useDropdownArrowRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDropdownArrowRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("dropdown-arrow");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useDropdownArrowRecipe(s);

		expect(recipe.base).toEqual({
			width: "0",
			height: "0",
			borderLeftWidth: "calc(@dropdown.arrow.size + 1px)",
			borderLeftStyle: "@border-style.solid",
			borderLeftColor: "transparent",
			borderRightWidth: "calc(@dropdown.arrow.size + 1px)",
			borderRightStyle: "@border-style.solid",
			borderRightColor: "transparent",
			borderBottomWidth: "calc(@dropdown.arrow.size + 1px)",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
			position: "absolute",
			zIndex: "@z-index.dropdown",
			"&:after": {
				borderLeftWidth: "@dropdown.arrow.size",
				borderLeftStyle: "@border-style.solid",
				borderLeftColor: "transparent",
				borderRightWidth: "@dropdown.arrow.size",
				borderRightStyle: "@border-style.solid",
				borderRightColor: "transparent",
				borderBottomWidth: "@dropdown.arrow.size",
				borderBottomStyle: "@border-style.solid",
				borderBottomColor: "transparent",
				position: "absolute",
				left: "calc(@dropdown.arrow.size * -1)",
				top: "1px",
				zIndex: "0",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useDropdownArrowRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useDropdownArrowRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft", "subtle"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useDropdownArrowRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useDropdownArrowRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral solid compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownArrowRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					borderBottomColor: "@color.gray-200",
					"&:after": {
						borderBottomColor: "@color.white",
					},
					"&:dark": {
						borderBottomColor: "@color.gray-700",
					},
					"&:dark:after": {
						borderBottomColor: "@color.gray-900",
					},
				},
			});
		});

		it("should have correct light soft compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownArrowRecipe(s);

			const lightSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "soft",
			);

			expect(lightSoft).toEqual({
				match: { color: "light", variant: "soft" },
				css: {
					borderBottomColor: "@color.gray-100",
					"&:after": {
						borderBottomColor: "@color.gray-100",
					},
					"&:dark": {
						borderBottomColor: "@color.gray-100",
					},
					"&:dark:after": {
						borderBottomColor: "@color.gray-100",
					},
				},
			});
		});

		it("should have correct dark subtle compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownArrowRecipe(s);

			const darkSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "subtle",
			);

			expect(darkSubtle).toEqual({
				match: { color: "dark", variant: "subtle" },
				css: {
					borderBottomColor: "@color.gray-700",
					"&:after": {
						borderBottomColor: "@color.gray-800",
					},
					"&:dark": {
						borderBottomColor: "@color.gray-700",
					},
					"&:dark:after": {
						borderBottomColor: "@color.gray-800",
					},
				},
			});
		});
	});
});
