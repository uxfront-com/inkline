import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "@styleframe/theme";

import { useChatMessageAvatarRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"flexShrink",
		"overflow",
		"borderRadius",
		"background",
		"color",
		"width",
		"height",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useChatMessageAvatarRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useChatMessageAvatarRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("chat-message-avatar");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useChatMessageAvatarRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			overflow: "hidden",
			borderRadius: "@border-radius.full",
			background: "@color.gray-200",
			color: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useChatMessageAvatarRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark", "neutral"]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useChatMessageAvatarRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"outline",
				"soft",
				"subtle",
				"ghost",
			]);
		});

		it("should have size variants with correct dimensions", () => {
			const s = createInstance();
			const recipe = useChatMessageAvatarRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { width: "@1.5", height: "@1.5" },
				md: { width: "@2", height: "@2" },
				lg: { width: "@2.5", height: "@2.5" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useChatMessageAvatarRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "subtle",
			size: "md",
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useChatMessageAvatarRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});
	});
});
