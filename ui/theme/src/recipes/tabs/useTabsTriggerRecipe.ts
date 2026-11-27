import { createUseRecipe } from "@styleframe/theme";

/**
 * Tabs trigger recipe — the individual tab button (`role="tab"`). The
 * interactive base (focus-visible ring, disabled dimming) mirrors the button
 * recipe. The active tab is matched through the `aria-selected` modifier, so
 * the selected styling stays inline in the compound variants. Each `variant`
 * renders the active state differently:
 *  - `line` → a colored rule on the active edge (bottom when horizontal, right
 *    when vertical), overlapping the list track via a negative margin.
 *  - `pill` → a raised surface (background + shadow).
 *  - `soft` → a subtle tinted fill.
 *
 * Colors are the Container set (light/dark/neutral): light/dark stay fixed
 * across themes, neutral adapts via `&:dark`. The inactive indicator border is
 * transparent and the `&:aria-selected` rule — higher specificity — paints it.
 */
export const useTabsTriggerRecipe = createUseRecipe("tabs-trigger", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "inherit",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.sm",
		lineHeight: "@line-height.normal",
		background: "transparent",
		borderWidth: "0",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		color: "@color.text",
		cursor: "pointer",
		whiteSpace: "nowrap",
		userSelect: "none",
		textDecoration: "none",
		outline: "none",
		transitionProperty: "color, background-color, border-color, box-shadow",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
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
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			line: {
				borderRadius: "0",
			},
			pill: {
				borderRadius: "@border-radius.md",
			},
			soft: {
				borderRadius: "@border-radius.md",
			},
		},
		size: {
			sm: {
				fontSize: "@font-size.xs",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.875",
				paddingRight: "@0.875",
				gap: "@0.5",
			},
		},
		orientation: {
			horizontal: {
				justifyContent: "center",
			},
			vertical: {
				justifyContent: "flex-start",
				width: "100%",
				textAlign: "left",
			},
		},
	},
	compoundVariants: [
		// --- Light color (fixed across themes) ---
		{
			match: { color: "light" as const, variant: "line" as const },
			css: {
				color: "@color.gray-600",
				"&:hover": { color: "@color.gray-900" },
				"&:aria-selected": {
					color: "@color.gray-900",
					borderBottomColor: "@color.gray-900",
					borderRightColor: "@color.gray-900",
				},
				"&:dark": { color: "@color.gray-600" },
				"&:dark:hover": { color: "@color.gray-900" },
				"&:dark:aria-selected": {
					color: "@color.gray-900",
					borderBottomColor: "@color.gray-900",
					borderRightColor: "@color.gray-900",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "pill" as const },
			css: {
				color: "@color.gray-600",
				"&:hover": { color: "@color.gray-900" },
				"&:aria-selected": {
					background: "@color.white",
					color: "@color.gray-900",
					boxShadow: "@box-shadow.sm",
				},
				"&:dark": { color: "@color.gray-600" },
				"&:dark:hover": { color: "@color.gray-900" },
				"&:dark:aria-selected": {
					background: "@color.white",
					color: "@color.gray-900",
					boxShadow: "@box-shadow.sm",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				color: "@color.gray-600",
				"&:hover": {
					color: "@color.gray-900",
					background: "@color.gray-100",
				},
				"&:aria-selected": {
					background: "@color.gray-100",
					color: "@color.gray-900",
				},
				"&:dark": { color: "@color.gray-600" },
				"&:dark:hover": {
					color: "@color.gray-900",
					background: "@color.gray-100",
				},
				"&:dark:aria-selected": {
					background: "@color.gray-100",
					color: "@color.gray-900",
				},
			},
		},

		// --- Dark color (fixed across themes) ---
		{
			match: { color: "dark" as const, variant: "line" as const },
			css: {
				color: "@color.gray-400",
				"&:hover": { color: "@color.white" },
				"&:aria-selected": {
					color: "@color.white",
					borderBottomColor: "@color.white",
					borderRightColor: "@color.white",
				},
				"&:dark": { color: "@color.gray-400" },
				"&:dark:hover": { color: "@color.white" },
				"&:dark:aria-selected": {
					color: "@color.white",
					borderBottomColor: "@color.white",
					borderRightColor: "@color.white",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "pill" as const },
			css: {
				color: "@color.gray-400",
				"&:hover": { color: "@color.white" },
				"&:aria-selected": {
					background: "@color.gray-900",
					color: "@color.white",
					boxShadow: "@box-shadow.sm",
				},
				"&:dark": { color: "@color.gray-400" },
				"&:dark:hover": { color: "@color.white" },
				"&:dark:aria-selected": {
					background: "@color.gray-900",
					color: "@color.white",
					boxShadow: "@box-shadow.sm",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				color: "@color.gray-400",
				"&:hover": {
					color: "@color.white",
					background: "@color.gray-800",
				},
				"&:aria-selected": {
					background: "@color.gray-800",
					color: "@color.white",
				},
				"&:dark": { color: "@color.gray-400" },
				"&:dark:hover": {
					color: "@color.white",
					background: "@color.gray-800",
				},
				"&:dark:aria-selected": {
					background: "@color.gray-800",
					color: "@color.white",
				},
			},
		},

		// --- Neutral color (adaptive: light in light mode, dark in dark mode) ---
		{
			match: { color: "neutral" as const, variant: "line" as const },
			css: {
				color: "@color.gray-600",
				"&:hover": { color: "@color.gray-900" },
				"&:aria-selected": {
					color: "@color.gray-900",
					borderBottomColor: "@color.gray-900",
					borderRightColor: "@color.gray-900",
				},
				"&:dark": { color: "@color.gray-400" },
				"&:dark:hover": { color: "@color.white" },
				"&:dark:aria-selected": {
					color: "@color.white",
					borderBottomColor: "@color.white",
					borderRightColor: "@color.white",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "pill" as const },
			css: {
				color: "@color.gray-600",
				"&:hover": { color: "@color.gray-900" },
				"&:aria-selected": {
					background: "@color.white",
					color: "@color.gray-900",
					boxShadow: "@box-shadow.sm",
				},
				"&:dark": { color: "@color.gray-400" },
				"&:dark:hover": { color: "@color.white" },
				"&:dark:aria-selected": {
					background: "@color.gray-900",
					color: "@color.white",
					boxShadow: "@box-shadow.sm",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "soft" as const },
			css: {
				color: "@color.gray-600",
				"&:hover": {
					color: "@color.gray-900",
					background: "@color.gray-100",
				},
				"&:aria-selected": {
					background: "@color.gray-100",
					color: "@color.gray-900",
				},
				"&:dark": { color: "@color.gray-400" },
				"&:dark:hover": {
					color: "@color.white",
					background: "@color.gray-800",
				},
				"&:dark:aria-selected": {
					background: "@color.gray-800",
					color: "@color.white",
				},
			},
		},

		// --- Line indicator edge: width + overlap; the color is set above. ---
		{
			match: { variant: "line" as const, orientation: "horizontal" as const },
			css: {
				borderBottomWidth: "2px",
				borderBottomColor: "transparent",
				marginBottom: "-1px",
			},
		},
		{
			match: { variant: "line" as const, orientation: "vertical" as const },
			css: {
				borderRightWidth: "2px",
				borderRightColor: "transparent",
				marginRight: "-1px",
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
