import { createUseRecipe } from "@styleframe/theme";

/**
 * Radio field recipe — sits on the native `<input type="radio">`.
 *
 * Renders a custom circle with no extra markup. The native element drives every
 * state: `:checked` fills the circle with `@color.primary` and paints a white
 * dot as a `background-image` SVG, so a checked radio differs by its shape and
 * not by its colour alone. `:focus-visible` shows a `@color.focus` ring outside
 * the circle, and `:disabled` dims it. Radios have no `:indeterminate` state,
 * so — unlike `checkbox-field` — there is no dash mark. No state changes the
 * circle's size: the group's invalid state (`useRadioGroupRecipe`) doubles the
 * ring with an inset shadow rather than a wider border.
 *
 * The dot is an inline SVG `background-image` (the same technique the sanitize
 * layer uses for the `<select>` arrow) rather than a filled `::before` — it
 * stays crisp and centered at every size via `background-size: contain`. The
 * circle is sized in `rem`, so it grows with the text beside it, and has no
 * margin, so the browser's uneven default doesn't break the mirroring in
 * right-to-left layouts.
 *
 * The `color` axis only controls the *unchecked* surface (background + ring)
 * and its dark-mode adaptation, mirroring the `input` recipe's
 * `light` / `dark` / `neutral` colors. Each ring has 3:1 against the page and
 * its own fill in both themes (`radioGroupContrast.test.ts`). The field's `color`
 * is the full-strength ring each surface takes when `prefers-contrast: more`
 * is set, where both gray levels resolve to `currentColor`. The adaptive
 * `neutral` color re-asserts the checked fill under `&:dark` so it keeps
 * winning against the attribute-based dark surface (`[data-theme="dark"]`),
 * which would otherwise out-specify the base `&:checked` rule.
 *
 * Forced colors mode drops the fill, which leaves the white dot on the
 * system's canvas, so there the browser draws its own radio, in the user's
 * colours, with a `Highlight` focus ring.
 */
const dotImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E\")";

export const useRadioFieldRecipe = createUseRecipe(
	"radio-field",
	{
		base: {
			appearance: "none",
			WebkitAppearance: "none",
			boxSizing: "border-box",
			display: "inline-block",
			flexShrink: "0",
			margin: "0",
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
				backgroundImage: dotImage,
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
			"&:forced-colors": {
				appearance: "auto",
				WebkitAppearance: "auto",
			},
			"&:forced-colors:checked": {
				backgroundImage: "none",
			},
			"&:forced-colors:focus-visible": {
				outlineColor: "Highlight",
			},
			"&:forced-colors:disabled": {
				opacity: "1",
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
					borderRadius: "@border-radius.full",
				},
				md: {
					width: "1rem",
					height: "1rem",
					borderRadius: "@border-radius.full",
				},
				lg: {
					width: "1.25rem",
					height: "1.25rem",
					borderRadius: "@border-radius.full",
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
					color: "@color.gray-900",
				},
			},
			// Dark surface — fixed across themes.
			{
				match: { color: "dark" as const },
				css: {
					backgroundColor: "@color.gray-900",
					borderColor: "@color.gray-500",
					color: "@color.white",
				},
			},
			// Neutral surface — adaptive. The `&:dark` unchecked rule gains
			// attribute-selector specificity, so the checked fill is re-asserted
			// under `&:dark:checked` to keep winning.
			{
				match: { color: "neutral" as const },
				css: {
					backgroundColor: "@color.white",
					borderColor: "@color.gray-450",
					color: "@color.gray-900",
					"&:dark": {
						backgroundColor: "@color.gray-900",
						borderColor: "@color.gray-500",
						color: "@color.white",
					},
					"&:dark:checked": {
						backgroundColor: "@color.primary",
						borderColor: "@color.primary",
					},
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			size: "md",
		},
	},
	(s) => {
		const { selector } = s;

		// With more contrast, both ring grays resolve to the field's color, so
		// every unchecked ring is drawn at full strength.
		selector(".radio-field", ({ media }) => {
			media("(prefers-contrast: more)", ({ variable }) => {
				variable("color.gray-450", "currentColor", { default: true });
				variable("color.gray-500", "currentColor", { default: true });
			});
		});
	},
);
