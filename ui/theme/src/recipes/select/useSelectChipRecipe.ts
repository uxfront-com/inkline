import { createUseRecipe } from "@styleframe/theme";

/**
 * Select chip recipe for the dismissable tags shown in a multi-select `.select`
 * trigger, one per selected value. Modeled on the Badge recipe but scoped to the
 * Container palette (light, dark, neutral) so chips read as part of the control
 * surface rather than as standalone colored badges. Supports variant (solid,
 * outline, soft, subtle) and size. The nested `.select-chip-remove` dismiss
 * button (registered in setup) inherits the chip's text color.
 */
export const useSelectChipRecipe = createUseRecipe(
	"select-chip",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			fontWeight: "@font-weight.medium",
			fontSize: "@font-size.xs",
			lineHeight: "1",
			maxWidth: "100%",
			paddingTop: "@0.125",
			paddingBottom: "@0.125",
			paddingLeft: "@0.375",
			paddingRight: "@0.375",
			borderRadius: "@border-radius.md",
		},
		variants: {
			color: {
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
					fontSize: "@font-size.2xs",
					lineHeight: "@line-height.normal",
					paddingTop: "@0.125",
					paddingBottom: "@0.125",
					paddingLeft: "@0.25",
					paddingRight: "@0.25",
					gap: "@0.125",
					borderRadius: "@border-radius.sm",
				},
				md: {
					fontSize: "@font-size.xs",
					lineHeight: "@line-height.tight",
					paddingTop: "@0.25",
					paddingBottom: "@0.25",
					paddingLeft: "@0.375",
					paddingRight: "@0.375",
					gap: "@0.25",
					borderRadius: "@border-radius.md",
				},
				lg: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
					gap: "@0.375",
					borderRadius: "@border-radius.md",
				},
			},
		},
		compoundVariants: [
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
			variant: "soft",
			size: "sm",
		},
	},
	(s) => {
		const { selector } = s;

		// Dismiss button — inherits the chip's text color, sized in `em` so it
		// scales with the chip. The "×" glyph is supplied by the consumer.
		selector(".select-chip-remove", {
			display: "inline-flex",
			flexShrink: "0",
			alignItems: "center",
			justifyContent: "center",
			width: "1em",
			height: "1em",
			marginLeft: "0.125em",
			padding: "0",
			border: "none",
			background: "transparent",
			color: "inherit",
			borderRadius: "@border-radius.sm",
			cursor: "pointer",
			opacity: "0.7",
			transitionProperty: "opacity",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:hover": {
				opacity: "1",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "1px",
			},
		});
	},
);
