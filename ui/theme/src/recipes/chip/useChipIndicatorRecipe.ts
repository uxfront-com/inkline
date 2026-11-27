import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

/**
 * Chip indicator recipe for the notification dot positioned at a corner.
 */
export const useChipIndicatorRecipe = createUseRecipe("chip-indicator", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		borderRadius: "@border-radius.full",
		fontWeight: "@font-weight.medium",
		lineHeight: "1",
		whiteSpace: "nowrap",
		zIndex: "@z-index.base",
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
			soft: {},
		},
		size: {
			xs: {
				width: "@0.375",
				height: "@0.375",
				fontSize: "@font-size.3xs",
			},
			sm: {
				minWidth: "@0.75",
				height: "@0.75",
				fontSize: "@font-size.3xs",
				paddingLeft: "@0.125",
				paddingRight: "@0.125",
			},
			md: {
				minWidth: "@1",
				height: "@1",
				fontSize: "@font-size.2xs",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
			},
			lg: {
				minWidth: "@1.25",
				height: "@1.25",
				fontSize: "@font-size.xs",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
			},
			xl: {
				minWidth: "@1.5",
				height: "@1.5",
				fontSize: "@font-size.sm",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
			},
		},
		position: {
			"top-right": {
				top: "0",
				right: "0",
				transform: "translate(50%, -50%)",
			},
			"top-left": {
				top: "0",
				left: "0",
				transform: "translate(-50%, -50%)",
			},
			"bottom-right": {
				bottom: "0",
				right: "0",
				transform: "translate(50%, 50%)",
			},
			"bottom-left": {
				bottom: "0",
				left: "0",
				transform: "translate(-50%, 50%)",
			},
		},
		inset: {
			true: {},
			false: {},
		},
	},
	compoundVariants: [
		// Semantic colors
		...colors.flatMap((color) => [
			{
				match: { color, variant: "solid" as const },
				css: {
					background: `@color.${color}`,
					color: "@color.white",
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
		]),

		// Light color (fixed light appearance)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				"&:dark": {
					background: "@color.white",
					color: "@color.text-inverted",
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

		// Dark color (fixed dark appearance)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.white",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
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

		// Neutral color (adaptive)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
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

		// Position x Inset compound variants (remove half-offset when inset)
		{
			match: { position: "top-right" as const, inset: "true" as const },
			css: {
				transform: "translate(0, 0)",
			},
		},
		{
			match: { position: "top-left" as const, inset: "true" as const },
			css: {
				transform: "translate(0, 0)",
			},
		},
		{
			match: { position: "bottom-right" as const, inset: "true" as const },
			css: {
				transform: "translate(0, 0)",
			},
		},
		{
			match: { position: "bottom-left" as const, inset: "true" as const },
			css: {
				transform: "translate(0, 0)",
			},
		},
	],
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
		position: "top-right",
		inset: "false",
	},
});
