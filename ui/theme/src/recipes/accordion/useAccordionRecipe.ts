import { createUseRecipe } from "@styleframe/theme";

/**
 * Accordion root container recipe.
 * Wraps a stack of accordion items.
 *
 * - `solid` renders an enclosed, bordered surface (card-like).
 * - `ghost` is chromeless — only the item dividers remain.
 *
 * Supports color (light, dark, neutral), variant (solid, ghost), and size axes.
 */
export const useAccordionRecipe = createUseRecipe("accordion", {
	base: {
		display: "flex",
		flexDirection: "column",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		overflow: "hidden",
		lineHeight: "@line-height.normal",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			ghost: {
				background: "transparent",
				borderColor: "transparent",
			},
		},
		size: {
			sm: {
				borderRadius: "@border-radius.sm",
			},
			md: {
				borderRadius: "@border-radius.md",
			},
			lg: {
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		// Only `solid` paints a surface + border; `ghost` stays chromeless.
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.white",
					color: "@color.text-inverted",
					borderColor: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.text-inverted",
				borderColor: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.text",
					borderColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "solid" as const },
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
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
