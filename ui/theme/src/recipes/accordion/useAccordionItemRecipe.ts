import { createUseRecipe } from "@styleframe/theme";

/**
 * Accordion item recipe.
 * A single disclosure section (header trigger + collapsible content).
 * Renders a bottom divider that is suppressed on the last item via setup.
 *
 * Divider color tracks the `color` axis (shared across both variants).
 */
export const useAccordionItemRecipe = createUseRecipe(
	"accordion-item",
	{
		base: {
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
		},
		variants: {
			color: {
				light: {},
				dark: {},
				neutral: {},
			},
			variant: {
				solid: {},
				ghost: {},
			},
			size: {
				sm: {},
				md: {},
				lg: {},
			},
		},
		compoundVariants: [
			{
				match: { color: "light" as const },
				css: {
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderBottomColor: "@color.gray-200",
					},
				},
			},
			{
				match: { color: "dark" as const },
				css: {
					borderBottomColor: "@color.gray-700",
					"&:dark": {
						borderBottomColor: "@color.gray-700",
					},
				},
			},
			{
				match: { color: "neutral" as const },
				css: {
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderBottomColor: "@color.gray-700",
					},
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			size: "md",
		},
	},
	(s) => {
		// The last item closes the stack — no trailing divider.
		s.selector(".accordion-item:last-child", {
			borderBottomColor: "transparent",
		});
	},
);
