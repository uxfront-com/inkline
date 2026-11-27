import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useChatMessageRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "flexDirection", "alignItems", "justifyContent", "gap", "width"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useChatMessageRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useChatMessageRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("chat-message");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useChatMessageRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "row",
			alignItems: "flex-start",
			gap: "@0.75",
			width: "100%",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"outline",
				"soft",
				"subtle",
				"ghost",
			]);
		});

		it("should have size variants with correct gap", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { gap: "@0.5" },
				md: { gap: "@0.75" },
				lg: { gap: "@1" },
			});
		});

		it("should have side variants with logical alignment", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s);

			expect(recipe.variants!.side).toEqual({
				start: { justifyContent: "flex-start" },
				end: {
					justifyContent: "flex-start",
					flexDirection: "row-reverse",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useChatMessageRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
			variant: "subtle",
			side: "start",
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.flexDirection).toBe("row");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should filter side axis", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s, {
				filter: { side: ["end"] },
			});

			expect(Object.keys(recipe.variants!.side)).toEqual(["end"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useChatMessageRecipe(s, {
				filter: { side: ["end"] },
			});

			expect(recipe.defaultVariants?.side).toBeUndefined();
			expect(recipe.defaultVariants?.color).toBe("neutral");
		});
	});
});
