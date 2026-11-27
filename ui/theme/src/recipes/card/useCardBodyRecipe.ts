import { createUseRecipe } from "@styleframe/theme";

/**
 * Card body recipe for main content area.
 */
export const useCardBodyRecipe = createUseRecipe("card-body", {
	base: {
		display: "flex",
		flexDirection: "column",
		gap: "@0.5",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingInline: "@1",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingInline: "@0.75",
				gap: "@0.375",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingInline: "@1",
				gap: "@0.5",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingInline: "@1.25",
				gap: "@0.75",
			},
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
