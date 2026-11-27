import { createUseRecipe } from "@styleframe/theme";

/**
 * Switch field recipe — sits on the native `<input type="checkbox" role="switch">`.
 *
 * Renders a sliding pill switch with no extra markup. The native element drives
 * every state: the track is a full-radius pill, and the thumb is a circle
 * painted as a `background-image` gradient (`::before` / `::after` are
 * unreliable on form controls), so it takes any color token. `:checked` fills
 * the track with `@color.primary` and moves the thumb from the inline start to
 * the inline end, so on and off differ by more than color, and the thumb
 * mirrors in right-to-left layouts. Sizes are in `rem`, so the switch grows
 * with the text.
 *
 * States are styled from the attributes on the `<input>`: `:focus-visible`
 * draws a `@color.focus` ring, `[aria-invalid="true"]` an error border doubled
 * by an inset shadow, `[aria-readonly="true"]` a dashed border, and `:disabled`
 * dims it. None of them changes the switch's size.
 *
 * The `color` axis sets the *unchecked* track, which keeps 3:1 against the
 * page in both themes, with a thumb at 3:1 against it. `neutral` is the same in
 * both themes; `light` and `dark` are fixed. The on-track is always
 * `@color.primary` with a white thumb.
 *
 * Forced colors mode would paint the track over with the page's background
 * and hide the thumb, so the field opts out of it with `&:forced-colors` and
 * the setup callback draws every state in system colors. Those rules replace
 * state utilities of the same specificity, so they're raw selectors whose
 * attributes lift them above the utilities, whatever order the generated CSS
 * ends up in.
 */
const thumb = (color: string) =>
	`radial-gradient(circle closest-side, ${color} calc(100% - 1px), transparent 100%)`;

export const useSwitchFieldRecipe = createUseRecipe(
	"switch-field",
	{
		base: {
			appearance: "none",
			WebkitAppearance: "none",
			boxSizing: "border-box",
			display: "inline-block",
			flexShrink: "0",
			cursor: "pointer",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderRadius: "@border-radius.full",
			backgroundImage: thumb("@color.white"),
			backgroundRepeat: "no-repeat",
			backgroundPosition: "0.125rem center",
			transitionProperty: "background-color, background-position, border-color",
			transitionDuration: "150ms",
			transitionTimingFunction: "@easing.ease-in-out",
			"&:checked": {
				backgroundColor: "@color.primary",
				borderColor: "@color.primary",
				backgroundPosition: "calc(100% - 0.125rem) center",
			},
			"&:rtl": {
				backgroundPosition: "right 0.125rem center",
			},
			"&:rtl:checked": {
				backgroundPosition: "left 0.125rem center",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.focus",
				outlineOffset: "2px",
			},
			"&:aria-invalid": {
				borderColor: "@color.error",
				boxShadow: "inset 0 0 0 1px @color.error",
			},
			"&:aria-invalid:checked": {
				borderColor: "@color.error",
			},
			// The fill stops at the border, so the dashes show against the page.
			"&:aria-readonly": {
				borderStyle: "@border-style.dashed",
				backgroundClip: "padding-box",
				cursor: "default",
			},
			"&:disabled": {
				opacity: "0.5",
				cursor: "not-allowed",
			},
			// The thumb jumps rather than slides.
			"&:motion-reduce": {
				transitionProperty: "background-color, border-color",
			},
			"&:forced-colors": {
				forcedColorAdjust: "none",
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
					width: "2rem",
					height: "1.125rem",
					backgroundSize: "0.875rem 0.875rem",
				},
				md: {
					width: "2.25rem",
					height: "1.25rem",
					backgroundSize: "1rem 1rem",
				},
				lg: {
					width: "2.75rem",
					height: "1.5rem",
					backgroundSize: "1.25rem 1.25rem",
				},
			},
		},
		compoundVariants: [
			// Light track — fixed across themes. Its border marks it on a light page,
			// and its darker thumb keeps 3:1 against it.
			{
				match: { color: "light" as const },
				css: {
					backgroundColor: "@color.gray-200",
					borderColor: "@color.gray-500",
					backgroundImage: thumb("@color.gray-600"),
					"&:checked": {
						backgroundImage: thumb("@color.white"),
					},
				},
			},
			// Dark track — fixed across themes. Its lighter border marks it on a
			// dark page.
			{
				match: { color: "dark" as const },
				css: {
					backgroundColor: "@color.gray-700",
					borderColor: "@color.gray-450",
				},
			},
			// Neutral track — one gray that keeps 3:1 against the page in both
			// themes, and against its white thumb. With more contrast, its border
			// takes the text color. `light` and `dark` keep their own fixed border,
			// which holds 3:1 against the page in both themes.
			{
				match: { color: "neutral" as const },
				css: {
					backgroundColor: "@color.gray-450",
					borderColor: "@color.gray-450",
					"&:contrast-more": {
						borderColor: "@color.text",
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

		// Forced colors: the field keeps its own colors, in system colors. The
		// `[type="checkbox"]` attribute lifts each rule above the state utilities
		// it replaces, so the order of the generated CSS doesn't matter.
		const field = '.switch-field[type="checkbox"]';
		selector(field, {
			"@media (forced-colors: active)": {
				backgroundColor: "Canvas",
				borderColor: "CanvasText",
				backgroundImage: thumb("CanvasText"),
			},
		});
		selector(`${field}:checked`, {
			"@media (forced-colors: active)": {
				backgroundColor: "Highlight",
				borderColor: "Highlight",
				backgroundImage: thumb("HighlightText"),
			},
		});
		// Invalid keeps its second pixel of border, which tells it apart without
		// color, around the Highlight fill too.
		selector(`${field}[aria-invalid="true"], ${field}[aria-invalid="true"]:checked`, {
			"@media (forced-colors: active)": {
				borderColor: "CanvasText",
				boxShadow: "inset 0 0 0 1px CanvasText",
			},
		});
		selector(`${field}:focus-visible`, {
			"@media (forced-colors: active)": {
				outlineColor: "Highlight",
			},
		});
		// Disabled can't show through opacity here, so it turns GrayText.
		selector(`${field}:disabled`, {
			"@media (forced-colors: active)": {
				backgroundColor: "Canvas",
				borderColor: "GrayText",
				backgroundImage: thumb("GrayText"),
				boxShadow: "none",
				opacity: "1",
			},
		});
	},
);
