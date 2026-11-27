import { createUseRecipe } from "@styleframe/theme";

export const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export const variants = ["solid", "outline", "soft", "subtle"] as const;

/**
 * Full badge recipe with color, variant, and size variants.
 * Includes all Nuxt UI-inspired styling options.
 */
export const useBadgeRecipe = createUseRecipe("badge", {
	base: {
		display: "inline-flex",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		alignItems: "center",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.sm",
		lineHeight: "1",
		paddingTop: "@0.25",
		paddingBottom: "@0.25",
		paddingLeft: "@0.375",
		paddingRight: "@0.375",
		borderRadius: "@border-radius.md",
	},
	variants: {
		color: {
			primary: {},
			secondary: {},
			success: {},
			info: {},
			warning: {},
			error: {},
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			xs: {
				fontSize: "@font-size.2xs",
				lineHeight: "@line-height.normal",
				paddingTop: "@0.125",
				paddingBottom: "@0.125",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
				gap: "@0.125",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				fontSize: "@font-size.xs",
				lineHeight: "@line-height.tight",
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
				gap: "@0.25",
				borderRadius: "@border-radius.md",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.5",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.lg",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.625",
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		...colors.flatMap((color) => [
			{
				match: { color, variant: "solid" as const },
				css: {
					background: `@color.${color}`,
					color: "@color.white",
					borderColor: `@color.${color}-shade-50`,
					"&:dark": {
						borderColor: `@color.${color}-tint-50`,
					},
				},
			},
			{
				match: { color, variant: "outline" as const },
				css: {
					color: `@color.${color}`,
					borderColor: `@color.${color}`,
				},
			},
			{
				match: { color, variant: "soft" as const },
				css: {
					background: `@color.${color}-100`,
					color: `@color.${color}-700`,
					"&:dark": {
						background: `@color.${color}-800`,
						color: `@color.${color}-400`,
					},
				},
			},
			{
				match: { color, variant: "subtle" as const },
				css: {
					background: `@color.${color}-100`,
					color: `@color.${color}-700`,
					borderColor: `@color.${color}-300`,
					"&:dark": {
						background: `@color.${color}-800`,
						color: `@color.${color}-400`,
						borderColor: `@color.${color}-600`,
					},
				},
			},
		]),

		// Light color (neutral light-mode values, fixed across themes)
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
			match: { color: "light" as const, variant: "outline" as const },
			css: {
				color: "@color.text-inverted",
				borderColor: "@color.gray-300",
				"&:dark": {
					color: "@color.text",
					borderColor: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-100",
					color: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
				"&:dark": {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
				},
			},
		},

		// Dark color (neutral dark-mode values, fixed across themes)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-800",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-600",
				"&:dark": {
					color: "@color.text-inverted",
					borderColor: "@color.gray-600",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-800",
				color: "@color.gray-300",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-600",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-600",
				},
			},
		},

		// Neutral color (light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:dark": {
					color: "@color.gray-200",
					borderColor: "@color.gray-600",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-600",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "sm",
	},
});
