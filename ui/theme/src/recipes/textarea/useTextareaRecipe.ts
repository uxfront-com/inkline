import { createFieldRecipe } from "../input/createFieldRecipe";

/**
 * Textarea wrapper recipe. The `.textarea` class sits on a wrapper element that
 * contains an optional inline `#prefix` slot, a nested
 * `<textarea class="textarea-field">`, and an optional inline `#suffix` slot.
 * The wrapper owns the visual field (border, background, padding, focus ring via
 * `:focus-within`); the nested textarea is transparent and inherits typography.
 *
 * Mirrors the Input recipe — color (light, dark, neutral), variant (default,
 * soft, ghost), size, and the `invalid` / `disabled` / `readonly` boolean axes
 * that map to the equivalent native `<textarea>` attributes — and adds a
 * `resize` axis (none, vertical, horizontal, both). Built from the same shared
 * field surface as Input (`../input/createFieldRecipe`); the textarea wrapper is
 * a top-aligned block (flex, flex-start). Because `resize` must apply to the
 * real `<textarea>`, each value adds a marker class on the wrapper and the setup
 * maps it onto the nested `.textarea-field`. The `autogrow` axis works the same
 * way: the textarea grows with its text through `field-sizing: content`, up to
 * the rows in its `data-max-rows` attribute.
 */
export const useTextareaRecipe = createFieldRecipe(
	"textarea",
	{
		base: {
			display: "flex",
			alignItems: "flex-start",
		},
		variants: {
			resize: {
				none: {},
				vertical: {},
				horizontal: {},
				both: {},
			},
			autogrow: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			{ match: { resize: "none" }, className: "-resize-none" },
			{ match: { resize: "vertical" }, className: "-resize-vertical" },
			{ match: { resize: "horizontal" }, className: "-resize-horizontal" },
			{ match: { resize: "both" }, className: "-resize-both" },
			{ match: { autogrow: "true" }, className: "-autogrow" },
		],
		defaultVariants: {
			resize: "vertical",
			autogrow: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// The textarea is never shorter than its rows (2 by default), even when
		// people resize it or it grows. `attr()` reads the `rows` attribute, in
		// lines of its own line height. Browsers without typed `attr()` drop the
		// declaration: there `rows` still sets the starting height, except with
		// `autogrow`, which then starts at the height of its text. On touch
		// screens its text is at least 16px, or Safari on iOS zooms in when it
		// gets focus. The textarea takes the pointer, so it is the one that is
		// at least 44px tall there, whatever its rows: the second rule keeps
		// its rows too where typed `attr()` works, and the first holds where
		// it doesn't.
		selector(".textarea-field", {
			minHeight: "calc(attr(rows type(<number>), 2) * 1lh)",
			"@media (any-pointer: coarse)": {
				fontSize: "max(1em, 1rem)",
				minHeight: "2.75rem",
			},
		});
		selector(".textarea-field", {
			"@media (any-pointer: coarse)": {
				minHeight: "max(calc(attr(rows type(<number>), 2) * 1lh), 2.75rem)",
			},
		});

		selector(".textarea.-resize-none .textarea-field", { resize: "none" });
		// Only taller or shorter, so it never outgrows its column. `block`
		// follows the writing mode, and `vertical` is for browsers that don't
		// know it.
		selector(".textarea.-resize-vertical .textarea-field", {
			resize: "vertical",
			"@supports (resize: block)": {
				resize: "block",
			},
		});
		selector(".textarea.-resize-horizontal .textarea-field", {
			resize: "horizontal",
		});
		selector(".textarea.-resize-both .textarea-field", { resize: "both" });
		// Same specificity as the resize selectors, so it wins by coming last.
		selector(".textarea .textarea-field:disabled", { resize: "none" });
		// It grows with its text, so there's nothing left to resize. Without a
		// `data-max-rows`, `attr()` has no value and the height has no cap. A
		// browser without `field-sizing` keeps the resize handle instead, so
		// people can still make room.
		selector(".textarea.-autogrow .textarea-field", {
			"@supports (field-sizing: content)": {
				fieldSizing: "content",
				resize: "none",
				maxHeight: "calc(attr(data-max-rows type(<number>)) * 1lh)",
			},
		});
	},
);
