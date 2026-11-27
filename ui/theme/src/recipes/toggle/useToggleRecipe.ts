import { createUseRecipe } from "@styleframe/theme";

/**
 * Toggle recipe — a two-state `<button>` that looks like a button and carries
 * an on/off state via `aria-pressed`. "A checkbox that looks like a toggleable
 * button."
 *
 * The three visual styles mirror the matching `button` recipe variants so a
 * toggle reads like a button at rest: `solid` (the default) is a filled surface
 * with a subtle border, `outline` is transparent with a border, and `ghost` is
 * transparent with none. Each gives hover, focus, and active feedback; the ON
 * state reuses the hover fill: `&:aria-pressed` mirrors `:hover` (and
 * `&:dark:aria-pressed` mirrors `&:dark:hover`), so a held toggle reads like a
 * hovered button.
 * `aria-pressed` is never a recipe argument; it is runtime DOM state the
 * `&:aria-pressed` rule targets (just as `:hover` is not an argument).
 *
 * Colours follow the form-control family (`checkbox` / `switch` / `input`):
 * `light` and `dark` are fixed across themes (their `&:dark` blocks re-assert
 * the surface), while `neutral` is adaptive and flips its fills under `&:dark`.
 */
export const useToggleRecipe = createUseRecipe("toggle", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.sm",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		lineHeight: "@line-height.normal",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		cursor: "pointer",
		transitionProperty: "color, background-color, border-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		textDecoration: "none",
		whiteSpace: "nowrap",
		userSelect: "none",
		outline: "none",
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
		"&:disabled": {
			cursor: "not-allowed",
			opacity: "0.75",
			pointerEvents: "none",
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
			outline: {},
			ghost: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.xs",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.875",
				paddingRight: "@0.875",
				gap: "@0.5",
				borderRadius: "@border-radius.md",
			},
		},
	},
	// Each block mirrors the matching `button` recipe variant; the toggle adds the ON
	// state by reusing `:hover` on `&:aria-pressed` (and `&:dark:hover` on
	// `&:dark:aria-pressed`), so a held toggle looks like a hovered button.
	compoundVariants: [
		// Light surface — fixed light appearance; the `&:dark` block re-asserts the
		// surface (flipping text to stay readable) so it never adopts the dark theme.
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-100" },
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
				"&:hover": {
					background: "@color.gray-100",
					color: "@color.text",
				},
				"&:focus": {
					background: "@color.gray-100",
					color: "@color.text",
				},
				"&:active": {
					background: "@color.gray-200",
					color: "@color.text",
				},
				"&:aria-pressed": {
					background: "@color.gray-100",
					color: "@color.text",
				},
				"&:dark": { color: "@color.text", borderColor: "@color.gray-300" },
				"&:dark:hover": { color: "@color.text-inverted" },
				"&:dark:focus": { color: "@color.text-inverted" },
				"&:dark:active": { color: "@color.text-inverted" },
				"&:dark:aria-pressed": { color: "@color.text-inverted" },
			},
		},
		{
			match: { color: "light" as const, variant: "ghost" as const },
			css: {
				color: "@color.text-inverted",
				"&:hover": {
					background: "@color.gray-100",
					color: "@color.text",
				},
				"&:focus": {
					background: "@color.gray-100",
					color: "@color.text",
				},
				"&:active": {
					background: "@color.gray-200",
					color: "@color.text",
				},
				"&:aria-pressed": {
					background: "@color.gray-100",
					color: "@color.text",
				},
				"&:dark": { color: "@color.text" },
				"&:dark:hover": { color: "@color.text-inverted" },
				"&:dark:focus": { color: "@color.text-inverted" },
				"&:dark:active": { color: "@color.text-inverted" },
				"&:dark:aria-pressed": { color: "@color.text-inverted" },
			},
		},
		// Dark surface — fixed dark appearance; the `&:dark` block re-asserts the
		// surface so it stays dark in either theme.
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-800",
				"&:hover": { background: "@color.gray-800" },
				"&:focus": { background: "@color.gray-800" },
				"&:active": { background: "@color.gray-750" },
				"&:aria-pressed": { background: "@color.gray-800" },
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
				"&:hover": {
					background: "@color.gray-800",
					color: "@color.text-inverted",
				},
				"&:focus": {
					background: "@color.gray-800",
					color: "@color.text-inverted",
				},
				"&:active": {
					background: "@color.gray-750",
					color: "@color.text-inverted",
				},
				"&:aria-pressed": {
					background: "@color.gray-800",
					color: "@color.text-inverted",
				},
				"&:dark": {
					color: "@color.text-inverted",
					borderColor: "@color.gray-600",
				},
				"&:dark:hover": { color: "@color.text" },
				"&:dark:focus": { color: "@color.text" },
				"&:dark:active": { color: "@color.text" },
				"&:dark:aria-pressed": { color: "@color.text" },
			},
		},
		{
			match: { color: "dark" as const, variant: "ghost" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					background: "@color.gray-800",
					color: "@color.text-inverted",
				},
				"&:focus": {
					background: "@color.gray-800",
					color: "@color.text-inverted",
				},
				"&:active": {
					background: "@color.gray-750",
					color: "@color.text-inverted",
				},
				"&:aria-pressed": {
					background: "@color.gray-800",
					color: "@color.text-inverted",
				},
				"&:dark": { color: "@color.text-inverted" },
				"&:dark:hover": { color: "@color.text" },
				"&:dark:focus": { color: "@color.text" },
				"&:dark:active": { color: "@color.text" },
				"&:dark:aria-pressed": { color: "@color.text" },
			},
		},
		// Neutral surface — adaptive. Light in light mode, dark in dark mode; the
		// `&:dark` block flips the surface and its hover/active fills.
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-100" },
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
				},
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-800" },
			},
		},
		{
			match: { color: "neutral" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-100" },
				"&:dark": { color: "@color.gray-200", borderColor: "@color.gray-600" },
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-800" },
			},
		},
		{
			match: { color: "neutral" as const, variant: "ghost" as const },
			css: {
				color: "@color.text",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-100" },
				"&:dark": { color: "@color.gray-200" },
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-800" },
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
