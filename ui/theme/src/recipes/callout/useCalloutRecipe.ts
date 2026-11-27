import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

/**
 * Callout recipe for contextual feedback messages.
 * Supports color, variant, size, and orientation axes.
 */
export const useCalloutRecipe = createUseRecipe(
	"callout",
	{
		base: {
			display: "flex",
			flexBasis: "100%",
			alignItems: "flex-start",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			fontWeight: "@font-weight.medium",
			fontSize: "@font-size.sm",
			lineHeight: "@line-height.normal",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			gap: "@0.75",
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
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					gap: "@0.5",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.75",
					paddingBottom: "@0.75",
					paddingLeft: "@1",
					paddingRight: "@1",
					gap: "@0.75",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@1",
					paddingBottom: "@1",
					paddingLeft: "@1.25",
					paddingRight: "@1.25",
					gap: "@1",
				},
			},
			orientation: {
				horizontal: {
					flexDirection: "row",
					alignItems: "center",
				},
				vertical: {
					flexDirection: "column",
				},
			},
		},
		compoundVariants: [
			// Standard colors
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
					borderColor: "@color.gray-200",
					"&:dark": {
						color: "@color.text",
						borderColor: "@color.gray-200",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-50",
					color: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-50",
						color: "@color.gray-700",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "subtle" as const },
				css: {
					background: "@color.gray-50",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-50",
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
					color: "@color.text-inverted",
					borderColor: "@color.gray-800",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.text",
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
					borderColor: "@color.gray-200",
					"&:dark": {
						color: "@color.gray-200",
						borderColor: "@color.gray-600",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-50",
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
					background: "@color.gray-50",
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
			variant: "subtle",
			size: "md",
			orientation: "horizontal",
		},
	},
	(s) => {
		// The base `display: flex` utility outranks the UA `[hidden]` rule, so
		// dismissal needs an explicit collapse.
		s.selector(".callout[hidden]", {
			display: "none",
		});
	},
);
