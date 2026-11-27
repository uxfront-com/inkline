import { createUseRecipe } from "@styleframe/theme";

/**
 * InputDate segment recipe. The `.input-date-segment` class sits on each
 * individually-focusable date/time field part (day, month, year, hour, minute)
 * rendered inside the `.input-date-field` row. Like the OTP cell it is the
 * focusable element itself, but unlike the cell it is inline and unboxed: it is
 * transparent, inherits typography and color from the wrapper, centers its
 * digits with tabular figures, and only paints a highlight on `:focus`.
 *
 * Carries no color/variant axis — the surface lives on the `.input-date`
 * wrapper. Its single `size` axis scales the font, horizontal padding, and
 * corner radius so the segment tracks the wrapper size. The focus highlight uses
 * absolute tokens (`@color.primary` background, `@color.white` text) so it reads
 * correctly in both light and dark mode.
 */
export const useInputDateSegmentRecipe = createUseRecipe("input-date-segment", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		boxSizing: "border-box",
		fontFamily: "inherit",
		fontWeight: "@font-weight.normal",
		lineHeight: "@line-height.normal",
		fontVariantNumeric: "tabular-nums",
		paddingTop: "@0.125",
		paddingBottom: "@0.125",
		background: "transparent",
		color: "inherit",
		outline: "none",
		transitionProperty: "color, background-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		"&:focus": {
			background: "@color.primary",
			color: "@color.white",
		},
	},
	variants: {
		size: {
			sm: {
				fontSize: "@font-size.xs",
				paddingLeft: "@0.125",
				paddingRight: "@0.125",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
				borderRadius: "@border-radius.sm",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
				borderRadius: "@border-radius.md",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
