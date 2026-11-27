import { createUseRecipe } from "@styleframe/theme";

/**
 * Accordion body recipe — the padded inner content of a panel.
 *
 * This sits *inside* the content recipe's overflow clip (content grid > clip >
 * body), so it owns the padding and typography. The padding must live here and
 * never on the clip itself, otherwise it would floor the collapsing grid row at
 * the padding height and leave the panel partially visible when closed.
 *
 * Text color is inherited from the accordion surface; only padding and
 * typography scale with the size axis.
 */
export const useAccordionBodyRecipe = createUseRecipe("accordion-body", {
	base: {},
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
			sm: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.25",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.75",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
			},
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
