import { createMenuItemRecipe } from "../dropdown/createMenuRecipe";

/**
 * Context menu item recipe for clickable rows inside a `.context-menu` panel.
 * Extends the shared menu item with two booleans:
 *
 * - `inset` — adds leading padding so rows without a leading icon align with
 *   checkbox/radio rows that reserve a leading indicator gutter.
 * - `destructive` — recolors the row for high-risk actions (error text + a
 *   red-tinted hover/focus background), layered on top of the surface color so
 *   it wins regardless of the menu's color/variant.
 *
 * The setup callback registers `.context-menu-item-indicator`, the absolutely
 * positioned leading slot that holds the check/dot for checkbox & radio items
 * (pair it with `inset`). Color and variant should match the parent panel.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useContextMenuItemRecipe = createMenuItemRecipe(
	"context-menu-item",
	{
		base: {
			// Anchor for the absolutely positioned indicator slot.
			position: "relative",
			// Let long labels wrap within the panel's max-width instead of
			// overflowing it (the shared item base sets `white-space: nowrap`).
			whiteSpace: "normal",
		},
		variants: {
			inset: {
				true: {},
				false: {},
			},
			destructive: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Inset rows reserve a leading gutter so their label aligns with
			// checkbox/radio rows that show an indicator.
			{
				match: { inset: "true" as const },
				css: {
					paddingLeft: "@2",
				},
			},
			// Destructive rows — error text with a red-tinted hover/focus surface.
			// Appended last so it overrides the color×variant rules.
			{
				match: { destructive: "true" as const },
				css: {
					color: "@color.error",
					"&:hover": { background: "@color.error-100" },
					"&:focus": { background: "@color.error-100" },
					"&:active": { background: "@color.error-150" },
					"&:dark": { color: "@color.error-400" },
					"&:dark:hover": { background: "@color.error-900" },
					"&:dark:focus": { background: "@color.error-900" },
					"&:dark:active": { background: "@color.error-800" },
				},
			},
		],
		defaultVariants: {
			inset: "false",
			destructive: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// Leading indicator slot for checkbox & radio rows — pinned into the inset
		// gutter and vertically centered, so the check/dot does not affect layout.
		// Uses em units (like `.select-option-check`) so it scales with the row's
		// font size and avoids eager `@`-token resolution inside setup.
		selector(".context-menu-item-indicator", {
			position: "absolute",
			left: "0.5em",
			top: "50%",
			transform: "translateY(-50%)",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "1em",
			height: "1em",
			pointerEvents: "none",
		});
	},
);
