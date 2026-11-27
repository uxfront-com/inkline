import { createUseRecipe } from "@styleframe/theme";

/**
 * Checkbox field recipe — sits on the native `<input type="checkbox">`.
 *
 * Renders a custom box with no extra markup. The native element drives every
 * state: `:checked` and `:indeterminate` fill the box with `@color.primary` and
 * paint a white checkmark / dash as a `background-image` SVG, `:focus-visible`
 * shows a ring in `@color.focus`, and `:disabled` dims it. Read-only and
 * invalid come from `[aria-readonly="true"]` and `[aria-invalid="true"]`, never
 * from `:read-only` or `:invalid`: `:read-only` matches every checkbox, and
 * `:invalid` matches a required box before anyone has touched it.
 *
 * The mark is an inline SVG `background-image` (the same technique the sanitize
 * layer uses for the `<select>` arrow) rather than a rotated `::after` border —
 * it stays crisp and centered at every size via `background-size: contain`.
 *
 * No state changes the box's size: the invalid border's second pixel is an
 * inset shadow, read-only swaps the border style, and the focus ring is an
 * outline outside the border. Sizes are in `rem`, and each size centres the box
 * on the first line of the matching `checkbox` size's label.
 *
 * Forced colors mode drops backgrounds, so the checked and indeterminate fills
 * become `Highlight`, disabled becomes `GrayText` instead of an opacity, and the
 * mark gains a dark outline, so it shows on any system highlight colour.
 *
 * The `color` axis only controls the *unchecked* surface (background + border)
 * and its dark-mode adaptation, mirroring the `input` recipe's
 * `light` / `dark` / `neutral` colors. The adaptive `neutral` color re-asserts
 * the checked fill and the invalid border under `&:dark` so they keep winning
 * against the attribute-based dark surface (`[data-theme="dark"]`), which would
 * otherwise out-specify the base `&:checked` and `&:aria-invalid` rules.
 */
const checkmarkImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6'/%3E%3C/svg%3E\")";

const dashImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M4 8h8'/%3E%3C/svg%3E\")";

// The same marks over a dark outline, for forced colors mode, where the fill is
// the user's `Highlight` colour, which may be light or dark.
const outlinedCheckmarkImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6' stroke='black' stroke-width='4'/%3E%3Cpath d='M3.5 8.5l3 3 6-6' stroke='white' stroke-width='2'/%3E%3C/svg%3E\")";

const outlinedDashImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke-linecap='round'%3E%3Cpath d='M4 8h8' stroke='black' stroke-width='4'/%3E%3Cpath d='M4 8h8' stroke='white' stroke-width='2'/%3E%3C/svg%3E\")";

export const useCheckboxFieldRecipe = createUseRecipe("checkbox-field", {
	base: {
		appearance: "none",
		WebkitAppearance: "none",
		boxSizing: "border-box",
		// Above the `checkbox` hit area, which is positioned too, so the box
		// still gets its own hover and press.
		position: "relative",
		display: "inline-block",
		flexShrink: "0",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		cursor: "pointer",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "contain",
		transitionProperty: "color, background-color, border-color",
		transitionDuration: "150ms",
		transitionTimingFunction: "@easing.ease-in-out",
		"&:checked": {
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
			backgroundImage: checkmarkImage,
		},
		"&:indeterminate": {
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
			backgroundImage: dashImage,
		},
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.focus",
			outlineOffset: "2px",
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
		},
		// Read-only: a dashed border, with the fill kept inside it, so a checked
		// box still shows its mark without looking like one you can change.
		"&:aria-readonly": {
			borderStyle: "@border-style.dashed",
			backgroundClip: "padding-box",
			cursor: "default",
		},
		// Invalid: a second pixel of border, drawn inside, so the box doesn't grow.
		"&:aria-invalid": {
			borderColor: "@color.error",
			boxShadow: "inset 0 0 0 1px @color.error",
		},
		// The checked border ties with the invalid one on specificity, so invalid
		// is re-asserted on checked and indeterminate boxes.
		"&:aria-invalid:checked": {
			borderColor: "@color.error",
		},
		"&:aria-invalid:indeterminate": {
			borderColor: "@color.error",
		},
		"&:forced-colors:checked": {
			backgroundColor: "Highlight",
			borderColor: "Highlight",
			backgroundImage: outlinedCheckmarkImage,
		},
		"&:forced-colors:indeterminate": {
			backgroundColor: "Highlight",
			borderColor: "Highlight",
			backgroundImage: outlinedDashImage,
		},
		"&:forced-colors:focus-visible": {
			outlineColor: "Highlight",
		},
		"&:forced-colors:disabled": {
			opacity: "1",
			borderColor: "GrayText",
		},
		"&:forced-colors:disabled:checked": {
			backgroundColor: "GrayText",
			borderColor: "GrayText",
		},
		"&:forced-colors:disabled:indeterminate": {
			backgroundColor: "GrayText",
			borderColor: "GrayText",
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
				width: "0.875rem",
				height: "0.875rem",
				marginBlock: "calc((@font-size.xs * @line-height.normal - 0.875rem) / 2)",
				borderRadius: "@border-radius.sm",
			},
			md: {
				width: "1rem",
				height: "1rem",
				marginBlock: "calc((@font-size.sm * @line-height.normal - 1rem) / 2)",
				borderRadius: "@border-radius.sm",
			},
			lg: {
				width: "1.25rem",
				height: "1.25rem",
				marginBlock: "calc((@font-size.md * @line-height.normal - 1.25rem) / 2)",
				borderRadius: "@border-radius.md",
			},
		},
	},
	compoundVariants: [
		// Light surface — fixed across themes. The base `&:checked` fill
		// out-specifies this unchecked rule in every mode, so no dark override.
		{
			match: { color: "light" as const },
			css: {
				backgroundColor: "@color.white",
				borderColor: "@color.gray-450",
				"&:contrast-more": {
					borderColor: "@color.gray-900",
				},
			},
		},
		// Dark surface — fixed across themes.
		{
			match: { color: "dark" as const },
			css: {
				backgroundColor: "@color.gray-900",
				borderColor: "@color.gray-500",
				"&:contrast-more": {
					borderColor: "@color.white",
				},
			},
		},
		// Neutral surface — adaptive. The `&:dark` unchecked rule gains
		// attribute-selector specificity, so the checked fill and the invalid
		// border are re-asserted under `&:dark:*` to keep winning.
		{
			match: { color: "neutral" as const },
			css: {
				backgroundColor: "@color.white",
				borderColor: "@color.gray-450",
				"&:contrast-more": {
					borderColor: "@color.text",
				},
				"&:dark": {
					backgroundColor: "@color.gray-900",
					borderColor: "@color.gray-500",
				},
				"&:dark:contrast-more": {
					borderColor: "@color.text",
				},
				"&:dark:checked": {
					backgroundColor: "@color.primary",
					borderColor: "@color.primary",
				},
				"&:dark:indeterminate": {
					backgroundColor: "@color.primary",
					borderColor: "@color.primary",
				},
				"&:dark:aria-invalid": {
					borderColor: "@color.error",
				},
				"&:dark:forced-colors:checked": {
					backgroundColor: "Highlight",
					borderColor: "Highlight",
				},
				"&:dark:forced-colors:indeterminate": {
					backgroundColor: "Highlight",
					borderColor: "Highlight",
				},
				"&:dark:forced-colors:disabled": {
					borderColor: "GrayText",
				},
				"&:dark:forced-colors:disabled:checked": {
					backgroundColor: "GrayText",
					borderColor: "GrayText",
				},
				"&:dark:forced-colors:disabled:indeterminate": {
					backgroundColor: "GrayText",
					borderColor: "GrayText",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});
