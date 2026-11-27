import { createUseRecipe } from "@styleframe/theme";

/**
 * Popover arrow recipe using CSS border-triangle technique.
 * Arrow border and background match the popover container.
 *
 * `placement` names the side of the anchor the popover opens on, like the
 * popover's own axis, so the arrow points back at the anchor. The outer
 * triangle draws in `color` and its `:after` in its own `color`, which the
 * color compounds set. Inside a top-layer popover, it sits on the edge that
 * faces the anchor.
 */
export const usePopoverArrowRecipe = createUseRecipe(
	"popover-arrow",
	{
		base: {
			width: "0",
			height: "0",
			position: "absolute",
			zIndex: "@z-index.popover",
			"&:after": {
				position: "absolute",
				zIndex: "0",
			},
			// Forced colours draw the transparent sides of the triangle too, so the
			// arrow steps aside and the panel's own edge marks the popover.
			"&:forced-colors": {
				display: "none",
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
				subtle: {},
			},
			placement: {
				top: {
					borderInlineStartWidth: "calc(@popover.arrow.size + 1px)",
					borderInlineStartStyle: "@border-style.solid",
					borderInlineStartColor: "transparent",
					borderInlineEndWidth: "calc(@popover.arrow.size + 1px)",
					borderInlineEndStyle: "@border-style.solid",
					borderInlineEndColor: "transparent",
					borderTopWidth: "calc(@popover.arrow.size + 1px)",
					borderTopStyle: "@border-style.solid",
					borderTopColor: "currentColor",
					"&:after": {
						borderInlineStartWidth: "@popover.arrow.size",
						borderInlineStartStyle: "@border-style.solid",
						borderInlineStartColor: "transparent",
						borderInlineEndWidth: "@popover.arrow.size",
						borderInlineEndStyle: "@border-style.solid",
						borderInlineEndColor: "transparent",
						borderTopWidth: "@popover.arrow.size",
						borderTopStyle: "@border-style.solid",
						borderTopColor: "currentColor",
						insetInlineStart: "calc(@popover.arrow.size * -1)",
						top: "calc(@popover.arrow.size * -1 - 1px)",
					},
				},
				bottom: {
					borderInlineStartWidth: "calc(@popover.arrow.size + 1px)",
					borderInlineStartStyle: "@border-style.solid",
					borderInlineStartColor: "transparent",
					borderInlineEndWidth: "calc(@popover.arrow.size + 1px)",
					borderInlineEndStyle: "@border-style.solid",
					borderInlineEndColor: "transparent",
					borderBottomWidth: "calc(@popover.arrow.size + 1px)",
					borderBottomStyle: "@border-style.solid",
					borderBottomColor: "currentColor",
					"&:after": {
						borderInlineStartWidth: "@popover.arrow.size",
						borderInlineStartStyle: "@border-style.solid",
						borderInlineStartColor: "transparent",
						borderInlineEndWidth: "@popover.arrow.size",
						borderInlineEndStyle: "@border-style.solid",
						borderInlineEndColor: "transparent",
						borderBottomWidth: "@popover.arrow.size",
						borderBottomStyle: "@border-style.solid",
						borderBottomColor: "currentColor",
						insetInlineStart: "calc(@popover.arrow.size * -1)",
						top: "1px",
					},
				},
				start: {
					borderTopWidth: "calc(@popover.arrow.size + 1px)",
					borderTopStyle: "@border-style.solid",
					borderTopColor: "transparent",
					borderBottomWidth: "calc(@popover.arrow.size + 1px)",
					borderBottomStyle: "@border-style.solid",
					borderBottomColor: "transparent",
					borderInlineStartWidth: "calc(@popover.arrow.size + 1px)",
					borderInlineStartStyle: "@border-style.solid",
					borderInlineStartColor: "currentColor",
					"&:after": {
						borderTopWidth: "@popover.arrow.size",
						borderTopStyle: "@border-style.solid",
						borderTopColor: "transparent",
						borderBottomWidth: "@popover.arrow.size",
						borderBottomStyle: "@border-style.solid",
						borderBottomColor: "transparent",
						borderInlineStartWidth: "@popover.arrow.size",
						borderInlineStartStyle: "@border-style.solid",
						borderInlineStartColor: "currentColor",
						insetInlineStart: "calc(@popover.arrow.size * -1 - 1px)",
						top: "calc(@popover.arrow.size * -1)",
					},
				},
				end: {
					borderTopWidth: "calc(@popover.arrow.size + 1px)",
					borderTopStyle: "@border-style.solid",
					borderTopColor: "transparent",
					borderBottomWidth: "calc(@popover.arrow.size + 1px)",
					borderBottomStyle: "@border-style.solid",
					borderBottomColor: "transparent",
					borderInlineEndWidth: "calc(@popover.arrow.size + 1px)",
					borderInlineEndStyle: "@border-style.solid",
					borderInlineEndColor: "currentColor",
					"&:after": {
						borderTopWidth: "@popover.arrow.size",
						borderTopStyle: "@border-style.solid",
						borderTopColor: "transparent",
						borderBottomWidth: "@popover.arrow.size",
						borderBottomStyle: "@border-style.solid",
						borderBottomColor: "transparent",
						borderInlineEndWidth: "@popover.arrow.size",
						borderInlineEndStyle: "@border-style.solid",
						borderInlineEndColor: "currentColor",
						insetInlineStart: "1px",
						top: "calc(@popover.arrow.size * -1)",
					},
				},
			},
		},
		compoundVariants: [
			// Light color (fixed across themes)
			{
				match: { color: "light" as const, variant: "solid" as const },
				css: {
					color: "@color.gray-200",
					"&:after": {
						color: "@color.white",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:after": {
						color: "@color.white",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					color: "@color.gray-50",
					"&:after": {
						color: "@color.gray-50",
					},
					"&:dark": {
						color: "@color.gray-50",
					},
					"&:dark:after": {
						color: "@color.gray-50",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "subtle" as const },
				css: {
					color: "@color.gray-200",
					"&:after": {
						color: "@color.gray-50",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:after": {
						color: "@color.gray-50",
					},
				},
			},

			// Dark color (fixed across themes)
			{
				match: { color: "dark" as const, variant: "solid" as const },
				css: {
					color: "@color.gray-700",
					"&:after": {
						color: "@color.gray-900",
					},
					"&:dark": {
						color: "@color.gray-700",
					},
					"&:dark:after": {
						color: "@color.gray-900",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "soft" as const },
				css: {
					color: "@color.gray-800",
					"&:after": {
						color: "@color.gray-800",
					},
					"&:dark": {
						color: "@color.gray-800",
					},
					"&:dark:after": {
						color: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "subtle" as const },
				css: {
					color: "@color.gray-700",
					"&:after": {
						color: "@color.gray-800",
					},
					"&:dark": {
						color: "@color.gray-700",
					},
					"&:dark:after": {
						color: "@color.gray-800",
					},
				},
			},

			// Neutral color (adaptive: light in light mode, dark in dark mode)
			{
				match: { color: "neutral" as const, variant: "solid" as const },
				css: {
					color: "@color.gray-200",
					"&:after": {
						color: "@color.white",
					},
					"&:dark": {
						color: "@color.gray-700",
					},
					"&:dark:after": {
						color: "@color.gray-900",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					color: "@color.gray-50",
					"&:after": {
						color: "@color.gray-50",
					},
					"&:dark": {
						color: "@color.gray-800",
					},
					"&:dark:after": {
						color: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "subtle" as const },
				css: {
					color: "@color.gray-200",
					"&:after": {
						color: "@color.gray-50",
					},
					"&:dark": {
						color: "@color.gray-700",
					},
					"&:dark:after": {
						color: "@color.gray-800",
					},
				},
			},

			// Placement, read by the top-layer selectors in the setup callback
			{ match: { placement: "top" as const }, className: "-placement-top" },
			{
				match: { placement: "bottom" as const },
				className: "-placement-bottom",
			},
			{ match: { placement: "start" as const }, className: "-placement-start" },
			{ match: { placement: "end" as const }, className: "-placement-end" },
		],
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			placement: "top",
		},
	},
	(s) => {
		const { selector, variable } = s;

		variable("popover.arrow.size", "0.375rem", { default: true });

		// Inside a top-layer popover, on the edge that faces the anchor and
		// centred on it, with its base over the popover's border.
		selector(".popover[popover] > .popover-arrow.-placement-top", {
			top: "100%",
			insetInlineStart: "calc(50% - @popover.arrow.size - 1px)",
		});
		selector(".popover[popover] > .popover-arrow.-placement-bottom", {
			bottom: "100%",
			insetInlineStart: "calc(50% - @popover.arrow.size - 1px)",
		});
		selector(".popover[popover] > .popover-arrow.-placement-start", {
			top: "calc(50% - @popover.arrow.size - 1px)",
			insetInlineStart: "100%",
		});
		selector(".popover[popover] > .popover-arrow.-placement-end", {
			top: "calc(50% - @popover.arrow.size - 1px)",
			insetInlineEnd: "100%",
		});
	},
);
