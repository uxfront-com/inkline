import { createUseRecipe } from "@styleframe/theme";

/**
 * Context menu shortcut recipe for the keyboard-hint text shown at the trailing
 * edge of a `.context-menu-item` (e.g. "⌘C"). Pushed right with `margin-left:
 * auto`, rendered in a muted, wide-tracked, smaller type. Supports color (light,
 * dark, neutral) — for the muted tone in each mode — and size axes.
 */
export const useContextMenuShortcutRecipe = createUseRecipe("context-menu-shortcut", {
	base: {
		marginLeft: "auto",
		paddingLeft: "@1",
		fontSize: "@font-size.xs",
		letterSpacing: "0.1em",
		lineHeight: "@line-height.normal",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: { fontSize: "@font-size.2xs" },
			md: { fontSize: "@font-size.xs" },
			lg: { fontSize: "@font-size.sm" },
		},
	},
	compoundVariants: [
		{
			match: { color: "light" as const },
			css: {
				color: "@color.gray-500",
				"&:dark": { color: "@color.gray-500" },
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				color: "@color.gray-400",
				"&:dark": { color: "@color.gray-400" },
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				color: "@color.gray-500",
				"&:dark": { color: "@color.gray-400" },
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});
