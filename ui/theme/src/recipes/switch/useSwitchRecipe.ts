import { createUseRecipe } from "@styleframe/theme";

/**
 * Switch wrapper recipe — sits on the `<label>` that wraps a
 * `<input class="switch-field">` and its text. Owns the inline layout
 * (gap, alignment), label typography, and dims the label when the nested
 * field is disabled. The visual switch lives on `switch-field`.
 *
 * The label is the switch's hit area: it's at least 24px tall, and 44px on
 * touch screens, however small the track is, and a click anywhere on it flips
 * the switch.
 *
 * The disabled and read-only label states use `:has()`, which is a raw CSS
 * selector rather than a registered modifier, so they are declared via the
 * `setup` callback.
 */
export const useSwitchRecipe = createUseRecipe(
	"switch",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
			lineHeight: "@line-height.normal",
			minHeight: "1.5rem",
			"&:any-pointer-coarse": {
				minHeight: "2.75rem",
			},
		},
		variants: {
			size: {
				sm: {
					gap: "@0.375",
					fontSize: "@font-size.xs",
				},
				md: {
					gap: "@0.5",
					fontSize: "@font-size.sm",
				},
				lg: {
					gap: "@0.625",
					fontSize: "@font-size.md",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		const { selector } = s;

		// Dim the label when the nested field is disabled. Forced colors mode
		// shows the disabled state in `GrayText` instead, at full opacity.
		selector(".switch:has(.switch-field:disabled)", {
			opacity: "0.5",
			cursor: "not-allowed",
			"@media (forced-colors: active)": {
				opacity: "1",
			},
		});

		// A read-only switch can't be flipped from its label either.
		selector('.switch:has(.switch-field[aria-readonly="true"])', {
			cursor: "default",
		});
	},
);
