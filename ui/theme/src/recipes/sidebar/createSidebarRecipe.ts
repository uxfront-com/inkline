import { createUseRecipe } from "@styleframe/theme";

/**
 * Shared sidebar recipe builders.
 *
 * `sidebar-menu-button` is the canonical interactive nav item; `sidebar-menu-sub-button`
 * extends the exact same surface (only the recipe name differs), so the
 * color/variant/size/state system lives in a single place. Likewise the two square icon
 * buttons — `sidebar-menu-action` and `sidebar-group-action` — share one builder. These
 * builders are intentionally not re-exported from the package barrel; they are internal to
 * the sidebar recipes, mirroring `input/createFieldRecipe.ts`.
 */

/**
 * Builds a full-width sidebar nav button (`.sidebar-menu-button` /
 * `.sidebar-menu-sub-button`). A block-level interactive item with `ghost` (transparent,
 * hover reveals a surface) and `subtle` (persistent faint fill + border) styles, an `active`
 * selected highlight (per-color fill, applied after the variant rules so it wins the resting
 * background), and a `disabled` state.
 */
export function createSidebarMenuButtonRecipe(name: string) {
	return createUseRecipe(name, {
		base: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			width: "100%",
			background: "transparent",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			textAlign: "left",
			textDecoration: "none",
			whiteSpace: "nowrap",
			overflow: "hidden",
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
			transitionProperty: "color, background-color, border-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.5",
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
				ghost: {
					background: "transparent",
				},
				subtle: {},
			},
			size: {
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.25",
					paddingBottom: "@0.25",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
					gap: "@0.375",
					borderRadius: "@border-radius.sm",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
					gap: "@0.5",
					borderRadius: "@border-radius.md",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					gap: "@0.625",
					borderRadius: "@border-radius.md",
				},
			},
			active: {
				true: {
					fontWeight: "@font-weight.medium",
				},
				false: {},
			},
			disabled: {
				true: {
					cursor: "not-allowed",
					opacity: "0.5",
					pointerEvents: "none",
				},
				false: {},
			},
		},
		compoundVariants: [
			// Ghost — transparent, hover reveals a surface.
			// Light (fixed across themes)
			{
				match: { color: "light" as const, variant: "ghost" as const },
				css: {
					color: "@color.gray-900",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-150" },
					"&:dark": { color: "@color.gray-900" },
					"&:dark:hover": { background: "@color.gray-100" },
					"&:dark:focus": { background: "@color.gray-100" },
					"&:dark:active": { background: "@color.gray-150" },
				},
			},
			// Dark (fixed across themes)
			{
				match: { color: "dark" as const, variant: "ghost" as const },
				css: {
					color: "@color.gray-200",
					"&:hover": { background: "@color.gray-800" },
					"&:focus": { background: "@color.gray-800" },
					"&:active": { background: "@color.gray-750" },
					"&:dark": { color: "@color.gray-200" },
					"&:dark:hover": { background: "@color.gray-800" },
					"&:dark:focus": { background: "@color.gray-800" },
					"&:dark:active": { background: "@color.gray-750" },
				},
			},
			// Neutral (adaptive)
			{
				match: { color: "neutral" as const, variant: "ghost" as const },
				css: {
					color: "@color.text",
					"&:hover": { background: "@color.gray-100" },
					"&:focus": { background: "@color.gray-100" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": { color: "@color.gray-200" },
					"&:dark:hover": { background: "@color.gray-800" },
					"&:dark:focus": { background: "@color.gray-800" },
					"&:dark:active": { background: "@color.gray-750" },
				},
			},

			// Subtle — persistent faint fill + border.
			// Light (fixed across themes)
			{
				match: { color: "light" as const, variant: "subtle" as const },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-200",
					"&:hover": { background: "@color.gray-150" },
					"&:focus": { background: "@color.gray-150" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": {
						background: "@color.gray-100",
						color: "@color.gray-700",
						borderColor: "@color.gray-200",
					},
					"&:dark:hover": { background: "@color.gray-150" },
					"&:dark:focus": { background: "@color.gray-150" },
					"&:dark:active": { background: "@color.gray-200" },
				},
			},
			// Dark (fixed across themes)
			{
				match: { color: "dark" as const, variant: "subtle" as const },
				css: {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-700",
					"&:hover": { background: "@color.gray-750" },
					"&:focus": { background: "@color.gray-750" },
					"&:active": { background: "@color.gray-700" },
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-700",
					},
					"&:dark:hover": { background: "@color.gray-750" },
					"&:dark:focus": { background: "@color.gray-750" },
					"&:dark:active": { background: "@color.gray-700" },
				},
			},
			// Neutral (adaptive)
			{
				match: { color: "neutral" as const, variant: "subtle" as const },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-200",
					"&:hover": { background: "@color.gray-150" },
					"&:focus": { background: "@color.gray-150" },
					"&:active": { background: "@color.gray-200" },
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-700",
					},
					"&:dark:hover": { background: "@color.gray-750" },
					"&:dark:focus": { background: "@color.gray-750" },
					"&:dark:active": { background: "@color.gray-700" },
				},
			},

			// Active — selected highlight (per color, any variant). Placed last so the
			// filled background wins over the resting variant rules.
			{
				match: { color: "light" as const, active: "true" as const },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-900",
					"&:hover": { background: "@color.gray-150" },
					"&:focus": { background: "@color.gray-150" },
					"&:dark": {
						background: "@color.gray-100",
						color: "@color.gray-900",
					},
					"&:dark:hover": { background: "@color.gray-150" },
					"&:dark:focus": { background: "@color.gray-150" },
				},
			},
			{
				match: { color: "dark" as const, active: "true" as const },
				css: {
					background: "@color.gray-750",
					color: "@color.white",
					"&:hover": { background: "@color.gray-700" },
					"&:focus": { background: "@color.gray-700" },
					"&:dark": { background: "@color.gray-750", color: "@color.white" },
					"&:dark:hover": { background: "@color.gray-700" },
					"&:dark:focus": { background: "@color.gray-700" },
				},
			},
			{
				match: { color: "neutral" as const, active: "true" as const },
				css: {
					background: "@color.gray-100",
					color: "@color.text",
					"&:hover": { background: "@color.gray-150" },
					"&:focus": { background: "@color.gray-150" },
					"&:dark": { background: "@color.gray-750", color: "@color.white" },
					"&:dark:hover": { background: "@color.gray-700" },
					"&:dark:focus": { background: "@color.gray-700" },
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "ghost",
			size: "md",
			active: "false",
			disabled: "false",
		},
	});
}

/**
 * Builds a square, muted icon button (`.sidebar-menu-action` / `.sidebar-group-action`)
 * absolutely anchored to the trailing edge of its menu item or group header (which must be
 * `position: relative`). Transparent at rest with a neutral-adaptive hover surface; sized
 * square via the `size` axis.
 */
export function createSidebarActionRecipe(name: string) {
	return createUseRecipe(name, {
		base: {
			position: "absolute",
			top: "50%",
			right: "0.5rem",
			transform: "translateY(-50%)",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			background: "transparent",
			borderWidth: "0",
			borderRadius: "@border-radius.sm",
			color: "@color.text-weak",
			cursor: "pointer",
			outline: "none",
			transitionProperty: "color, background-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:hover": {
				background: "@color.gray-100",
				color: "@color.text",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
			"&:dark": {
				color: "@color.gray-400",
			},
			"&:dark:hover": {
				background: "@color.gray-800",
				color: "@color.gray-200",
			},
		},
		variants: {
			size: {
				sm: {
					width: "@1.25",
					height: "@1.25",
					fontSize: "@font-size.xs",
				},
				md: {
					width: "@1.5",
					height: "@1.5",
					fontSize: "@font-size.sm",
				},
				lg: {
					width: "@2",
					height: "@2",
					fontSize: "@font-size.md",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	});
}
