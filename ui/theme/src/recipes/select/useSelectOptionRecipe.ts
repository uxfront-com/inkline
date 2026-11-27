import { createMenuItemRecipe } from "../dropdown/createMenuRecipe";

/**
 * Select option recipe for `<li role="option">` rows inside a `.select-panel`.
 * Mirrors the Dropdown item (hover/focus/active states per color × variant) and
 * adds a selected state via the `aria-selected` modifier — a subtle tint plus a
 * medium weight — and reveals the nested `.select-option-check` indicator
 * (registered in setup). Disabled is handled through both the native `:disabled`
 * and the `aria-disabled` modifiers so it works on buttons and listbox items.
 * Color and variant should match the parent panel.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useSelectOptionRecipe = createMenuItemRecipe(
	"select-option",
	{
		base: {
			// Weight is theme- and color-independent; the selected background is
			// set per color in compoundVariants so `light`/`dark` stay theme-fixed.
			"&:aria-selected": {
				fontWeight: "@font-weight.medium",
			},
			"&:aria-disabled": {
				cursor: "not-allowed",
				opacity: "0.75",
				pointerEvents: "none",
			},
		},
		compoundVariants: [
			// Selected-row tint (per color so `light`/`dark` stay fixed across
			// themes; only `neutral` adapts). Applied on top of the color×variant
			// rules above for `[aria-selected="true"]` rows.
			{
				match: { color: "light" as const },
				css: {
					"&:aria-selected": { background: "@color.gray-100" },
					"&:dark:aria-selected": { background: "@color.gray-100" },
				},
			},
			{
				match: { color: "dark" as const },
				css: {
					"&:aria-selected": { background: "@color.gray-800" },
					"&:dark:aria-selected": { background: "@color.gray-800" },
				},
			},
			{
				match: { color: "neutral" as const },
				css: {
					"&:aria-selected": { background: "@color.gray-100" },
					"&:dark:aria-selected": { background: "@color.gray-800" },
				},
			},
		],
	},
	(s) => {
		const { selector } = s;

		// Trailing check indicator — pinned to the option's far edge via
		// `margin-left: auto`, hidden until the option is selected. This frees the
		// leading edge for an optional `.select-icon` (e.g. a country flag).
		selector(".select-option-check", {
			display: "inline-flex",
			flexShrink: "0",
			alignItems: "center",
			justifyContent: "center",
			marginLeft: "auto",
			width: "1em",
			height: "1em",
			opacity: "0",
			color: "inherit",
		});

		selector('.select-option[aria-selected="true"] .select-option-check', {
			opacity: "1",
		});
	},
);
