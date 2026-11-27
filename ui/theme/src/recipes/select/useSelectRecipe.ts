import { createUseRecipe } from "@styleframe/theme";

/**
 * Select trigger recipe. The `.select` class sits on the clickable control that
 * opens the listbox panel and displays the current value(s). It owns the visual
 * field (border, background, padding, focus ring via `:focus-within`) like the
 * Input wrapper, but lays its children out in a wrapping row so multi-select
 * chips (`.select-chip`) and the trailing chevron (`.select-arrow`) flow nicely.
 *
 * Supports color (light, dark, neutral), variant (solid, soft, ghost), size,
 * and three boolean axes — `invalid`, `disabled`, `readonly` — mirroring the
 * Input recipe. The nested `.select-value` slot (registered in setup) holds the
 * placeholder/value text and truncates with an ellipsis.
 */
export const useSelectRecipe = createUseRecipe(
	"select",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
			flexWrap: "wrap",
			gap: "@0.375",
			fontFamily: "inherit",
			fontSize: "@font-size.sm",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			paddingTop: "@0.5",
			paddingBottom: "@0.5",
			paddingLeft: "@0.75",
			paddingRight: "@0.75",
			background: "transparent",
			color: "@color.text",
			cursor: "pointer",
			outline: "none",
			transitionProperty: "color, background-color, border-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:focus-within": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
		},
		variants: {
			color: {
				light: {},
				dark: {},
				neutral: {},
			},
			variant: {
				solid: {},
				soft: {},
				ghost: {},
			},
			size: {
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
					borderRadius: "@border-radius.sm",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					borderRadius: "@border-radius.md",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.625",
					paddingBottom: "@0.625",
					paddingLeft: "@0.875",
					paddingRight: "@0.875",
					borderRadius: "@border-radius.md",
				},
			},
			invalid: {
				true: {},
				false: {},
			},
			disabled: {
				true: {},
				false: {},
			},
			readonly: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Light color (fixed across themes)
			{
				match: { color: "light" as const, variant: "solid" as const },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-450",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-500",
					},
					"&:dark": {
						background: "@color.white",
						borderColor: "@color.gray-450",
						color: "@color.text-inverted",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-500",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-100",
					borderColor: "@color.gray-450",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-500",
					},
					"&:dark": {
						background: "@color.gray-100",
						borderColor: "@color.gray-450",
						color: "@color.text-inverted",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-500",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "ghost" as const },
				css: {
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: "@color.gray-450",
					borderBottomLeftRadius: "0",
					borderBottomRightRadius: "0",
					color: "@color.text",
					"&:hover": {
						borderBottomColor: "@color.gray-500",
					},
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						borderBottomColor: "@color.gray-450",
						color: "@color.text-inverted",
					},
					"&:dark:hover": {
						borderBottomColor: "@color.gray-500",
					},
				},
			},

			// Dark color (fixed across themes)
			{
				match: { color: "dark" as const, variant: "solid" as const },
				css: {
					background: "@color.gray-900",
					borderColor: "@color.gray-500",
					color: "@color.white",
					"&:hover": {
						borderColor: "@color.gray-450",
					},
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-500",
						color: "@color.white",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-450",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-800",
					borderColor: "@color.gray-500",
					color: "@color.gray-300",
					"&:hover": {
						borderColor: "@color.gray-450",
					},
					"&:dark": {
						background: "@color.gray-800",
						borderColor: "@color.gray-500",
						color: "@color.gray-300",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-450",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "ghost" as const },
				css: {
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: "@color.gray-500",
					borderBottomLeftRadius: "0",
					borderBottomRightRadius: "0",
					color: "@color.gray-300",
					"&:hover": {
						borderBottomColor: "@color.gray-450",
					},
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						borderBottomColor: "@color.gray-500",
						color: "@color.gray-300",
					},
					"&:dark:hover": {
						borderBottomColor: "@color.gray-450",
					},
				},
			},

			// Neutral color (adaptive: light in light mode, dark in dark mode)
			{
				match: { color: "neutral" as const, variant: "solid" as const },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-450",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-500",
					},
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-500",
						color: "@color.white",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-450",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-100",
					borderColor: "@color.gray-450",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-500",
					},
					"&:dark": {
						background: "@color.gray-800",
						borderColor: "@color.gray-500",
						color: "@color.gray-300",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-450",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "ghost" as const },
				css: {
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: "@color.gray-450",
					borderBottomLeftRadius: "0",
					borderBottomRightRadius: "0",
					color: "@color.text",
					"&:hover": {
						borderBottomColor: "@color.gray-500",
					},
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						borderBottomColor: "@color.gray-500",
						color: "@color.white",
					},
					"&:dark:hover": {
						borderBottomColor: "@color.gray-450",
					},
				},
			},

			// Invalid state — overrides border and focus ring to error color. It also
			// sets the bottom colour, so a ghost trigger's underline turns red too.
			{
				match: { invalid: "true" as const },
				css: {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
					"&:hover": {
						borderColor: "@color.error",
						borderBottomColor: "@color.error",
					},
					"&:focus-within": {
						outlineColor: "@color.error",
					},
					"&:dark": {
						borderColor: "@color.error",
						borderBottomColor: "@color.error",
					},
					"&:dark:hover": {
						borderColor: "@color.error",
						borderBottomColor: "@color.error",
					},
				},
			},

			// Read-only state — subtle background shift, dashed border, default cursor.
			{
				match: { readonly: "true" as const },
				css: {
					background: "@color.gray-50",
					borderStyle: "@border-style.dashed",
					cursor: "default",
					"&:dark": {
						background: "@color.gray-800",
					},
				},
			},

			// Disabled state — dim, not-allowed cursor, block interaction.
			{
				match: { disabled: "true" as const },
				css: {
					opacity: "0.5",
					cursor: "not-allowed",
					pointerEvents: "none",
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			size: "md",
			invalid: "false",
			disabled: "false",
			readonly: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// Value/placeholder slot — grows to fill, truncates with an ellipsis.
		selector(".select-value", {
			flexGrow: "1",
			minWidth: "0",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			color: "inherit",
			"&.-placeholder": {
				color: "@color.text-weakest",
			},
		});

		// Shared leading media slot (e.g. a country flag) — reused by the trigger's
		// selected value, options, and chips. Sized in `em` so it scales with the
		// surrounding font; `flex-shrink: 0` keeps it from being squished by a long
		// label. The icon content (img/svg/emoji) is consumer-supplied.
		selector(".select-icon", {
			display: "inline-flex",
			flexShrink: "0",
			alignItems: "center",
			justifyContent: "center",
			width: "1.25em",
			height: "1.25em",
		});

		// Keep the focus ring while the panel is open (consumer toggles `.-open`).
		selector(".select.-open", {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		});
	},
);
