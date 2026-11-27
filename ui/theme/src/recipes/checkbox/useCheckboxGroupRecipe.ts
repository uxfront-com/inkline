import { createUseRecipe } from "@styleframe/theme";

/**
 * Checkbox group recipe — sits on the `<fieldset>` that holds multiple
 * `.checkbox` rows and its `<legend>`. Supports orientation (vertical /
 * horizontal) and a size axis that sets the gap between rows, and the legend's
 * size and the select-all indent to match `checkbox` of the same size. The
 * fieldset's own border, padding and margin are reset, and its minimum width
 * too, so it never overflows a narrow column.
 *
 * Options run in a column by default. A horizontal group puts 1.5rem between
 * the options of a row and wraps onto the next line rather than overflowing.
 *
 * The parts are plain elements, so they are styled from the `setup` callback:
 * the `<legend>`, which takes the options' text size in a heavier weight, and
 * an optional select-all box. Wrap the select-all `.checkbox` in
 * `[data-slot="select-all"]` and the options after it in
 * `[data-slot="options"]`, and the options sit in from it by its box and gap,
 * on the inline-start side, so their boxes line up with its label.
 *
 * A `<fieldset disabled>` disables every box in it, and each one dims itself
 * from `:disabled`, so the group only dims its legend: in `GrayText` in forced
 * colors mode. The group's `[aria-invalid="true"]` gives every box the
 * checkbox's invalid border, doubled by an inset shadow, so no box grows.
 * `:invalid` isn't used, since it matches a required box before anyone has
 * touched it.
 */
export const useCheckboxGroupRecipe = createUseRecipe(
	"checkbox-group",
	{
		base: {
			display: "flex",
			minWidth: "0",
			margin: "0",
			padding: "0",
			borderWidth: "0",
			color: "@color.text",
		},
		variants: {
			orientation: {
				vertical: {
					flexDirection: "column",
				},
				horizontal: {
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "center",
					// Wrapped lines stay together in a group taller than its content.
					alignContent: "flex-start",
					gapX: "@1.5",
				},
			},
			size: {
				sm: {
					gapY: "@0.5",
				},
				md: {
					gapY: "@0.75",
				},
				lg: {
					gapY: "@1",
				},
			},
		},
		// Hook classes for the legend's size and the select-all indent, which
		// the `setup` callback styles per size.
		compoundVariants: [
			{ match: { size: "sm" as const }, className: "-size-sm" },
			{ match: { size: "md" as const }, className: "-size-md" },
			{ match: { size: "lg" as const }, className: "-size-lg" },
		],
		defaultVariants: {
			orientation: "vertical",
			size: "md",
		},
	},
	(s) => {
		const { selector, ref, css } = s;

		selector(".checkbox-group > legend", {
			padding: "0",
			marginBlockEnd: "@spacing.xs",
			fontWeight: "@font-weight.semibold",
			lineHeight: "@line-height.normal",
			color: "@color.text",
		});

		// The legend is the same size as the options' text in `checkbox`.
		for (const [size, fontSize] of [
			["sm", "@font-size.xs"],
			["md", "@font-size.sm"],
			["lg", "@font-size.md"],
		] as const) {
			selector(`.checkbox-group.-size-${size} > legend`, { fontSize });
		}

		// The select-all box and the options each take a line of their own, and
		// the options take the group's direction and gaps. A width rather than a
		// flex basis, which would set their height in a column and pull them
		// apart in a group taller than its content.
		selector(
			'.checkbox-group > [data-slot="select-all"], .checkbox-group > [data-slot="options"]',
			{
				boxSizing: "border-box",
				width: "100%",
			},
		);

		selector('.checkbox-group > [data-slot="options"]', {
			display: "flex",
			flexDirection: "inherit",
			flexWrap: "inherit",
			alignItems: "inherit",
			gap: "inherit",
		});

		// The indent is the select-all box and its gap in `checkbox` of the
		// same size, so the options' boxes line up with its label.
		for (const [size, box, gap] of [
			["sm", "0.875rem", 0.375],
			["md", "1rem", 0.5],
			["lg", "1.25rem", 0.625],
		] as const) {
			selector(`.checkbox-group.-size-${size} > [data-slot="select-all"] + [data-slot="options"]`, {
				paddingInlineStart: css`calc(${box} + ${ref("spacing")} * ${gap})`,
			});
		}

		selector(".checkbox-group:disabled > legend", {
			opacity: "0.5",
			"@media (forced-colors: active)": {
				opacity: "1",
				color: "GrayText",
			},
		});

		selector('.checkbox-group[aria-invalid="true"] .checkbox > .checkbox-field', {
			borderColor: "@color.error",
			boxShadow: "inset 0 0 0 1px @color.error",
		});

		// The invalid border outranks the box's own forced colors disabled
		// border, so a disabled box keeps its `GrayText` border here.
		selector('.checkbox-group[aria-invalid="true"] .checkbox > .checkbox-field:disabled', {
			"@media (forced-colors: active)": {
				borderColor: "GrayText",
			},
		});
	},
);
