import { createUseRecipe } from "@styleframe/theme";

/**
 * Nav container recipe for navigation lists.
 * Supports orientation (horizontal/vertical) and size axes.
 */
export const useNavRecipe = createUseRecipe("nav", {
	base: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		listStyle: "none",
		paddingLeft: "0",
		marginTop: "0",
		marginBottom: "0",
	},
	variants: {
		orientation: {
			horizontal: {
				flexDirection: "row",
			},
			vertical: {
				flexDirection: "column",
				alignItems: "flex-start",
			},
		},
		size: {
			sm: {
				fontSize: "@font-size.xs",
				gap: "@0.25",
			},
			md: {
				fontSize: "@font-size.sm",
				gap: "@0.5",
			},
			lg: {
				fontSize: "@font-size.md",
				gap: "@0.75",
			},
		},
	},
	compoundVariants: [
		{
			match: { orientation: "horizontal" as const },
			className: "-horizontal",
		},
		{
			match: { orientation: "vertical" as const },
			className: "-vertical",
		},
	],
	defaultVariants: {
		orientation: "horizontal",
		size: "md",
	},
});
