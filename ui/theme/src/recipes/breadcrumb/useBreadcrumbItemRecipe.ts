import { createUseRecipe } from "@styleframe/theme";

/**
 * Breadcrumb item recipe for individual breadcrumb links.
 * Supports color (light, dark, neutral), size, active, and disabled axes.
 * The separator is registered via a setup callback as a global selector
 * (`.breadcrumb-item:not(:last-child)::after`). Override the glyph by
 * setting `--breadcrumb--separator-content` on the item or any ancestor.
 */
export const useBreadcrumbItemRecipe = createUseRecipe("breadcrumb-item", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		cursor: "pointer",
		background: "transparent",
		fontWeight: "@font-weight.normal",
		lineHeight: "@line-height.normal",
		textDecoration: "none",
		transitionProperty: "color, background-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		outline: "none",
		"&:hover": {
			textDecoration: "none",
		},
		"&:focus": {
			textDecoration: "none",
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
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.xs",
			},
			md: {
				fontSize: "@font-size.sm",
			},
			lg: {
				fontSize: "@font-size.md",
			},
		},
		active: {
			true: {
				fontWeight: "@font-weight.semibold",
			},
			false: {},
		},
		disabled: {
			true: {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
			false: {},
		},
	},
	compoundVariants: [
		// Light color (fixed across themes — always dark text for light backgrounds)
		{
			match: { color: "light" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:dark": {
					color: "@color.text-inverted",
				},
				"&:dark:hover": {
					color: "@color.gray-900",
				},
				"&:dark:focus": {
					color: "@color.gray-900",
				},
				"&:dark:active": {
					color: "@color.gray-900",
				},
			},
		},

		// Dark color (fixed across themes — matches neutral's dark mode appearance)
		{
			match: { color: "dark" as const },
			css: {
				color: "@color.gray-200",
				"&:hover": {
					color: "@color.white",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: "@color.white",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: "@color.white",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:dark": {
					color: "@color.gray-200",
				},
				"&:dark:hover": {
					color: "@color.white",
				},
				"&:dark:focus": {
					color: "@color.white",
				},
				"&:dark:active": {
					color: "@color.white",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:dark": {
					color: "@color.gray-200",
				},
				"&:dark:hover": {
					color: "@color.white",
				},
				"&:dark:focus": {
					color: "@color.white",
				},
				"&:dark:active": {
					color: "@color.white",
				},
			},
		},

		// Active item (current page) — suppress link affordance regardless of color
		{
			match: { active: "true" as const },
			css: {
				cursor: "default",
				"&:hover": {
					textDecoration: "none",
				},
				"&:focus": {
					textDecoration: "none",
				},
				"&:active": {
					textDecoration: "none",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
		active: "false",
		disabled: "false",
	},
});
