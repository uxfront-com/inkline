import { styleframe } from "@styleframe/core";
import { useDisabledModifier } from "@styleframe/theme";
import { useDarkModifier } from "@styleframe/theme";
import { useFocusVisibleModifier, useHoverModifier } from "@styleframe/theme";

import { useSidebarMenuActionRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"top",
		"right",
		"transform",
		"display",
		"alignItems",
		"justifyContent",
		"flexShrink",
		"background",
		"borderWidth",
		"borderRadius",
		"color",
		"cursor",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"width",
		"height",
		"fontSize",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusVisibleModifier(s);
	useDisabledModifier(s);
	return s;
}

describe("useSidebarMenuActionRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSidebarMenuActionRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("sidebar-menu-action");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSidebarMenuActionRecipe(s);

		expect(recipe.base).toEqual({
			position: "absolute",
			top: "50%",
			right: "0.5rem",
			transform: "translateY(-50%)",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			background: "transparent",
			borderWidth: "0",
			borderRadius: "@border-radius.sm",
			color: "@color.text-weak",
			cursor: "pointer",
			outline: "none",
			transitionProperty: "color, background-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:hover": {
				background: "@color.gray-100",
				color: "@color.text",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
			"&:dark": {
				color: "@color.gray-400",
			},
			"&:dark:hover": {
				background: "@color.gray-800",
				color: "@color.gray-200",
			},
		});
	});

	it("should have size variants with correct styles", () => {
		const s = createInstance();
		const recipe = useSidebarMenuActionRecipe(s);

		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		expect(recipe.variants!.size.md).toEqual({
			width: "@1.5",
			height: "@1.5",
			fontSize: "@font-size.sm",
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSidebarMenuActionRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSidebarMenuActionRecipe(s, {
				base: { color: "@color.text" },
			});

			expect(recipe.base!.color).toBe("@color.text");
			expect(recipe.base!.display).toBe("inline-flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useSidebarMenuActionRecipe(s, {
				filter: { size: ["sm", "lg"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "lg"]);
			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
