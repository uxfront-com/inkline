import { createUseRecipe } from "@styleframe/theme";

/**
 * Accordion content recipe — the height animator.
 *
 * Uses the pure-CSS grid-rows trick: the wrapper animates
 * `grid-template-rows` from `0fr` (collapsed) to `1fr` (expanded) when it
 * carries `data-state="open"`. No JS height measurement required.
 *
 * Structure: `.accordion-content` (this grid) > clip wrapper (`> *`, styled in
 * setup) > `useAccordionBodyRecipe` (the padded inner). The clip must carry the
 * padding-free `overflow: hidden` / `min-height: 0` so the `0fr` row can
 * collapse to exactly 0 — padding on the grid child would floor the row at the
 * padding height and leave the panel partially visible when closed.
 *
 * Color/variant/size axes are present for parity with the other parts but only
 * structural styles are applied here.
 */
export const useAccordionContentRecipe = createUseRecipe(
	"accordion-content",
	{
		base: {
			display: "grid",
			gridTemplateRows: "0fr",
			transitionProperty: "grid-template-rows",
			transitionTimingFunction: "@easing.ease-out-cubic",
			transitionDuration: "@duration.normal",
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
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			size: "md",
		},
	},
	(s) => {
		s.selector('.accordion-content[data-state="open"]', {
			gridTemplateRows: "1fr",
		});
		// The single grid child is the overflow clip. Padding lives on the body
		// *inside* it, never on this element, so the 0fr row collapses to 0.
		s.selector(".accordion-content > *", {
			overflow: "hidden",
			minHeight: "0",
		});
	},
);
