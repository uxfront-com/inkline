import { createMenuItemRecipe } from "../dropdown/createMenuRecipe";

/**
 * Per color × variant background for the open state, mirroring the menu item's
 * hover surface so an open submenu trigger reads like a hovered row. `[light,
 * dark]` are the light- and dark-mode backgrounds.
 */
const openBackground = {
	light: {
		solid: ["gray-100", "gray-100"],
		soft: ["gray-200", "gray-200"],
		subtle: ["gray-200", "gray-200"],
	},
	dark: {
		solid: ["gray-800", "gray-800"],
		soft: ["gray-750", "gray-750"],
		subtle: ["gray-750", "gray-750"],
	},
	neutral: {
		solid: ["gray-100", "gray-800"],
		soft: ["gray-200", "gray-750"],
		subtle: ["gray-200", "gray-750"],
	},
} as const;

const colors = ["light", "dark", "neutral"] as const;
const variants = ["solid", "soft", "subtle"] as const;

/**
 * Context menu sub-trigger recipe for rows that open a nested submenu. Extends
 * the shared menu item with an `open` boolean that paints the row with its
 * hover surface while the submenu is open. The setup callback registers
 * `.context-menu-sub-trigger-icon`, the trailing chevron pushed to the row's far
 * edge with `margin-left: auto`. Color and variant should match the parent panel.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useContextMenuSubTriggerRecipe = createMenuItemRecipe(
	"context-menu-sub-trigger",
	{
		base: {
			// Match the wrapping rows so the panel's max-width caps cleanly (the
			// shared item base sets `white-space: nowrap`).
			whiteSpace: "normal",
		},
		variants: {
			open: {
				true: {},
				false: {},
			},
		},
		compoundVariants: colors.flatMap((color) =>
			variants.map((variant) => {
				const [light, dark] = openBackground[color][variant];
				return {
					match: { color, variant, open: "true" as const },
					css: {
						background: `@color.${light}`,
						"&:dark": { background: `@color.${dark}` },
					},
				};
			}),
		),
		defaultVariants: {
			open: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// Trailing chevron, pushed to the row's far edge. Uses em units so it
		// scales with the row's font size and avoids eager `@`-token resolution.
		selector(".context-menu-sub-trigger-icon", {
			marginLeft: "auto",
			flexShrink: "0",
			width: "1em",
			height: "1em",
		});
	},
);
