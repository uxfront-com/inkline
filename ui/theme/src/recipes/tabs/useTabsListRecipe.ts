import { createUseRecipe } from "@styleframe/theme";

/**
 * Tabs list recipe — the bar (`role="tablist"`) that holds the triggers. The
 * `orientation` axis flips the flex direction (row when horizontal, column
 * when vertical). Each `variant` paints a different track:
 *  - `line` → a thin rule along the active edge (bottom when horizontal, right
 *    when vertical); the color is set per `color` so light/dark stay fixed.
 *  - `pill` → a filled, rounded, padded segmented container.
 *  - `soft` → no track; spacing only.
 *
 * The track color is written on both candidate edges (bottom + right); only the
 * edge that the orientation compounds give a width to is actually visible.
 */
export const useTabsListRecipe = createUseRecipe("tabs-list", {
	base: {
		display: "flex",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			line: {},
			pill: {
				borderRadius: "@border-radius.lg",
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
			},
			soft: {},
		},
		size: {
			sm: { gap: "@0.25" },
			md: { gap: "@0.375" },
			lg: { gap: "@0.5" },
		},
		orientation: {
			horizontal: {
				flexDirection: "row",
				alignItems: "center",
			},
			vertical: {
				flexDirection: "column",
				alignItems: "stretch",
			},
		},
	},
	compoundVariants: [
		// Line track color (light/dark fixed, neutral adaptive). Painted on both
		// candidate edges; the orientation compounds below decide which is shown.
		{
			match: { color: "light" as const, variant: "line" as const },
			css: {
				borderBottomColor: "@color.gray-200",
				borderRightColor: "@color.gray-200",
				"&:dark": {
					borderBottomColor: "@color.gray-200",
					borderRightColor: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "line" as const },
			css: {
				borderBottomColor: "@color.gray-700",
				borderRightColor: "@color.gray-700",
				"&:dark": {
					borderBottomColor: "@color.gray-700",
					borderRightColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "line" as const },
			css: {
				borderBottomColor: "@color.gray-200",
				borderRightColor: "@color.gray-200",
				"&:dark": {
					borderBottomColor: "@color.gray-700",
					borderRightColor: "@color.gray-700",
				},
			},
		},

		// Pill track background (light/dark fixed, neutral adaptive).
		{
			match: { color: "light" as const, variant: "pill" as const },
			css: {
				background: "@color.gray-100",
				"&:dark": { background: "@color.gray-100" },
			},
		},
		{
			match: { color: "dark" as const, variant: "pill" as const },
			css: {
				background: "@color.gray-800",
				"&:dark": { background: "@color.gray-800" },
			},
		},
		{
			match: { color: "neutral" as const, variant: "pill" as const },
			css: {
				background: "@color.gray-100",
				"&:dark": { background: "@color.gray-800" },
			},
		},

		// Line track edge — width/style only; the color comes from the color
		// compounds above.
		{
			match: { variant: "line" as const, orientation: "horizontal" as const },
			css: {
				borderBottomWidth: "@border-width.thin",
				borderBottomStyle: "@border-style.solid",
			},
		},
		{
			match: { variant: "line" as const, orientation: "vertical" as const },
			css: {
				borderRightWidth: "@border-width.thin",
				borderRightStyle: "@border-style.solid",
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "line",
		size: "md",
		orientation: "horizontal",
	},
});
