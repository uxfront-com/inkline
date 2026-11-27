import { createUseRecipe } from "@styleframe/theme";

/**
 * Radio wrapper recipe — sits on the `<label>` that wraps a
 * `<input class="radio-field">` and its text. Owns the inline layout
 * (gap, alignment), label typography, and dims the label when the nested
 * field is disabled. The visual circle lives on `radio-field`.
 *
 * The label is the radio's target. Each size sets a `min-height` in `rem`, the
 * height the Open Components standard gives the Input of the same size, so
 * the row grows with larger text or a label that wraps. On
 * touch screens each row is at least 44px tall. The gap sits between the
 * circle and its text whatever the direction, so the circle stays before its
 * label in right-to-left layouts.
 *
 * The touch-screen height and the disabled-label dimming use `:has()`, which is
 * a raw CSS selector rather than a registered modifier, so they are declared
 * via the `setup` callback.
 * Forced colors mode ignores the dimming's meaning, so the label turns
 * `GrayText` there instead.
 */
export const useRadioRecipe = createUseRecipe(
	"radio",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
			boxSizing: "border-box",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
			lineHeight: "@line-height.normal",
		},
		variants: {
			size: {
				sm: {
					gap: "@0.375",
					fontSize: "@font-size.xs",
					minHeight: "2rem",
				},
				md: {
					gap: "@0.5",
					fontSize: "@font-size.sm",
					minHeight: "2.25rem",
				},
				lg: {
					gap: "@0.625",
					fontSize: "@font-size.md",
					minHeight: "2.5rem",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		const { selector } = s;

		// On touch screens each row is at least 44px tall. `:has()` lifts the rule
		// above the size's own `min-height` utility, whatever order they're in.
		selector(".radio:has(> .radio-field)", {
			"@media (any-pointer: coarse)": {
				minHeight: "2.75rem",
			},
		});

		// Dim the label when the nested field is disabled.
		selector(".radio:has(.radio-field:disabled)", {
			opacity: "0.5",
			cursor: "not-allowed",
			"@media (forced-colors: active)": {
				color: "GrayText",
				opacity: "1",
			},
		});
	},
);
