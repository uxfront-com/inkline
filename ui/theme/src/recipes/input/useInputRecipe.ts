import { createFieldRecipe } from "./createFieldRecipe";

/**
 * Input wrapper recipe. The `.input` class sits on a wrapper element that
 * contains an inline `#prefix` slot, a nested `<input class="input-field">`,
 * and an inline `#suffix` slot. The wrapper owns the visual field (border,
 * background, padding, focus ring via `:focus-within`); the nested input is
 * transparent and inherits typography.
 *
 * The wrapper also reads the native `<input>`'s own `aria-invalid="true"`,
 * `readonly` and `disabled` attributes through `:has()`, so the class axes and
 * the attributes give the same look.
 *
 * Supports color (light, dark, neutral), variant (default, soft, ghost),
 * size, and three boolean axes — `invalid`, `disabled`, `readonly` — that
 * map to the equivalent native `<input>` attributes from the consumer.
 *
 * Built from the shared field surface in `./createFieldRecipe`; the input
 * wrapper sits inline (inline-flex, vertically centered).
 */
export const useInputRecipe = createFieldRecipe(
	"input",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
		},
	},
	(s) => {
		const { selector } = s;

		// On touch screens the input's text is at least 16px, or Safari on iOS
		// zooms in when it gets focus. The input also gets a hit area at least
		// 44px tall, reaching past the smaller fields: its 16px text sets a 24px
		// line, and a transparent 10px border above and below, pulled back by a
		// negative margin, adds the rest without moving anything. The
		// padding-box clip keeps the browser's autofill color off that border.
		selector(".input-field", {
			"@media (any-pointer: coarse)": {
				fontSize: "max(1em, 1rem)",
				marginBlock: "calc(@spacing * -0.625)",
				borderBlock: "calc(@spacing * 0.625) solid transparent",
				backgroundClip: "padding-box",
			},
		});
	},
);
