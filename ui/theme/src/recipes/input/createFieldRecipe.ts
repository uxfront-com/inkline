import type { Styleframe, VariantDeclarationsBlock } from "@styleframe/core";
import { createUseRecipe } from "@styleframe/theme";
import type { RecipeConfig } from "@styleframe/theme";

/**
 * The muted text of a field (its placeholder, prefix and suffix): the field's
 * own text color at 75%, which keeps 4.5:1 on every color, variant and mode
 * (`fieldSurfaceContrast.test.ts`).
 */
export const FIELD_MUTED_TEXT = "color-mix(in srgb, currentColor 75%, transparent)";

/**
 * The shared field surface as a compound-variant array: the nine color×variant
 * combinations plus the `invalid` and `disabled` state overrides, and
 * optionally the `readonly` state. Extracted so sibling recipes can paint the
 * exact same surface without re-declaring it — the Input/Textarea wrappers
 * consume it with the read-only state, while the OTP cell consumes it directly
 * on the `<input>` without one. Each consumer draws its own focus ring, and the
 * surface sets none: the Input and Textarea wrappers draw `@color.focus` in
 * every state, while the OTP cell keeps its own ring.
 *
 * Hover styles sit behind `hover-capable`, so a tap doesn't leave a field
 * looking hovered. Order matters: `invalid` precedes `readonly`/`disabled` so
 * its error border wins over the color/variant rules but can still be dimmed by
 * the disabled state. Like the builders below, it is intentionally not
 * re-exported from the package barrel — it is internal to the field recipes
 * family.
 */
export function fieldSurfaceCompoundVariants({
	includeReadonly = true,
}: {
	includeReadonly?: boolean;
} = {}): NonNullable<RecipeConfig["compoundVariants"]> {
	return [
		// Light color (fixed across themes)
		{
			match: { color: "light", variant: "default" },
			css: {
				background: "@color.white",
				borderColor: "@color.gray-450",
				color: "@color.text",
				"&:hover-capable:hover": {
					borderColor: "@color.gray-500",
				},
				"&:dark": {
					background: "@color.white",
					borderColor: "@color.gray-450",
					color: "@color.text-inverted",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.gray-500",
				},
			},
		},
		{
			match: { color: "light", variant: "soft" },
			css: {
				background: "@color.gray-100",
				borderColor: "@color.gray-450",
				color: "@color.text",
				"&:hover-capable:hover": {
					borderColor: "@color.gray-500",
				},
				"&:dark": {
					background: "@color.gray-100",
					borderColor: "@color.gray-450",
					color: "@color.text-inverted",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.gray-500",
				},
			},
		},
		{
			match: { color: "light", variant: "ghost" },
			css: {
				background: "transparent",
				borderColor: "transparent",
				borderBottomColor: "@color.gray-450",
				borderBottomLeftRadius: "0",
				borderBottomRightRadius: "0",
				color: "@color.text",
				"&:hover-capable:hover": {
					borderBottomColor: "@color.gray-500",
				},
				"&:dark": {
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: "@color.gray-450",
					color: "@color.text-inverted",
				},
				"&:dark:hover-capable:hover": {
					borderBottomColor: "@color.gray-500",
				},
			},
		},

		// Dark color (fixed across themes)
		{
			match: { color: "dark", variant: "default" },
			css: {
				background: "@color.gray-900",
				borderColor: "@color.gray-500",
				color: "@color.white",
				"&:hover-capable:hover": {
					borderColor: "@color.gray-450",
				},
				"&:dark": {
					background: "@color.gray-900",
					borderColor: "@color.gray-500",
					color: "@color.white",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.gray-450",
				},
			},
		},
		{
			match: { color: "dark", variant: "soft" },
			css: {
				background: "@color.gray-800",
				borderColor: "@color.gray-500",
				color: "@color.gray-300",
				"&:hover-capable:hover": {
					borderColor: "@color.gray-450",
				},
				"&:dark": {
					background: "@color.gray-800",
					borderColor: "@color.gray-500",
					color: "@color.gray-300",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.gray-450",
				},
			},
		},
		{
			match: { color: "dark", variant: "ghost" },
			css: {
				background: "transparent",
				borderColor: "transparent",
				borderBottomColor: "@color.gray-500",
				borderBottomLeftRadius: "0",
				borderBottomRightRadius: "0",
				color: "@color.gray-300",
				"&:hover-capable:hover": {
					borderBottomColor: "@color.gray-450",
				},
				"&:dark": {
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: "@color.gray-500",
					color: "@color.gray-300",
				},
				"&:dark:hover-capable:hover": {
					borderBottomColor: "@color.gray-450",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral", variant: "default" },
			css: {
				background: "@color.white",
				borderColor: "@color.gray-450",
				color: "@color.text",
				"&:hover-capable:hover": {
					borderColor: "@color.gray-500",
				},
				"&:dark": {
					background: "@color.gray-900",
					borderColor: "@color.gray-500",
					color: "@color.white",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.gray-450",
				},
			},
		},
		{
			match: { color: "neutral", variant: "soft" },
			css: {
				background: "@color.gray-100",
				borderColor: "@color.gray-450",
				color: "@color.text",
				"&:hover-capable:hover": {
					borderColor: "@color.gray-500",
				},
				"&:dark": {
					background: "@color.gray-800",
					borderColor: "@color.gray-500",
					color: "@color.gray-300",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.gray-450",
				},
			},
		},
		{
			match: { color: "neutral", variant: "ghost" },
			css: {
				background: "transparent",
				borderColor: "transparent",
				borderBottomColor: "@color.gray-450",
				borderBottomLeftRadius: "0",
				borderBottomRightRadius: "0",
				color: "@color.text",
				"&:hover-capable:hover": {
					borderBottomColor: "@color.gray-500",
				},
				"&:dark": {
					background: "transparent",
					borderColor: "transparent",
					borderBottomColor: "@color.gray-500",
					color: "@color.white",
				},
				"&:dark:hover-capable:hover": {
					borderBottomColor: "@color.gray-450",
				},
			},
		},

		// Invalid state — an error border, doubled by an inset shadow so the field
		// doesn't grow. It sets the bottom color too, so it replaces the ghost
		// underline's color. The focus ring keeps `@color.focus`.
		{
			match: { invalid: "true" },
			css: {
				borderColor: "@color.error",
				borderBottomColor: "@color.error",
				boxShadow: "inset 0 0 0 1px @color.error",
				"&:hover-capable:hover": {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
				},
				"&:dark": {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
				},
				"&:dark:hover-capable:hover": {
					borderColor: "@color.error",
					borderBottomColor: "@color.error",
				},
			},
		},

		// Read-only state — dashed border and default cursor. The fill stays, so
		// the value keeps its contrast on every color.
		...(includeReadonly
			? [
					{
						match: { readonly: "true" },
						css: {
							borderStyle: "@border-style.dashed",
							cursor: "default",
						},
					},
				]
			: []),

		// Disabled state — dim, not-allowed cursor. No `pointer-events: none`:
		// it would hide the cursor too. In forced colors mode opacity alone
		// loses the contrast that sets it apart, so the field turns `GrayText`
		// there instead.
		{
			match: { disabled: "true" },
			css: {
				opacity: "0.5",
				cursor: "not-allowed",
				"&:forced-colors": {
					borderColor: "GrayText",
					color: "GrayText",
					opacity: "1",
				},
				"&:dark:forced-colors": {
					borderColor: "GrayText",
					color: "GrayText",
				},
			},
		},
	];
}

/**
 * Builds a field-wrapper recipe (`.input` / `.textarea`). Merges the shared
 * field surface with per-field `extras` (e.g. the `display`/`alignItems` base
 * deltas, or textarea's `resize` axis) and registers the transparent nested
 * `.${name}-field` reset. The optional `setup` runs additional rules after the
 * field reset (e.g. textarea's resize selectors).
 *
 * Generic over the extra variant axes so the merged variants flow into the
 * recipe's type — `useTextareaRecipe(...)` keeps a precise `resize` axis.
 */
export function createFieldRecipe<
	const ExtraVariants extends Record<string, Record<string, VariantDeclarationsBlock>> = Record<
		string,
		Record<string, VariantDeclarationsBlock>
	>,
>(
	name: string,
	extras: {
		base?: VariantDeclarationsBlock;
		variants?: ExtraVariants;
		compoundVariants?: RecipeConfig["compoundVariants"];
		defaultVariants?: Record<string, string>;
	} = {},
	setup?: (s: Styleframe) => void,
) {
	/**
	 * Shared variant axes: color, visual style, size, and the three boolean
	 * states. Sizes set a `min-height` in rem, so a field grows with its text
	 * instead of clipping it. The padding is the same on both sides, so it
	 * mirrors in right-to-left layouts as it is.
	 */
	const fieldRecipeVariants = {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			default: {},
			soft: {},
			ghost: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.xs",
				minHeight: "2rem",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.sm",
				minHeight: "2.25rem",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				minHeight: "2.5rem",
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
	};

	return createUseRecipe(
		name,
		{
			/**
			 * Shared field-recipe definitions for the Input and Textarea families.
			 *
			 * Input is the canonical field recipe; Textarea extends the same surface. Both
			 * the input and textarea recipe files build their parts from the factories
			 * below, so the color/variant/size/state system lives in a single place. These
			 * builders are intentionally not re-exported from the package barrel &mdash;
			 * they are internal to the field recipes.
			 *
			 * Common field-wrapper base, minus `display`/`alignItems` (each field sets its
			 * own: inline-flex/center for input, flex/flex-start for textarea).
			 */
			base: {
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
				outline: "none",
				transitionProperty: "color, background-color, border-color",
				transitionTimingFunction: "@easing.ease-in-out",
				transitionDuration: "150ms",
				"&:focus-within": {
					outlineWidth: "2px",
					outlineStyle: "solid",
					outlineColor: "@color.focus",
					outlineOffset: "2px",
				},
				"&:forced-colors:focus-within": {
					outlineColor: "Highlight",
				},
				...extras.base,
			},
			variants: {
				...fieldRecipeVariants,
				...extras.variants,
			} as typeof fieldRecipeVariants & ExtraVariants,
			/**
			 * The 12 compound variants: 9 color×variant combinations plus the invalid,
			 * read-only, and disabled state overrides, from the shared field surface
			 * (read-only included), then any per-field extras.
			 */
			compoundVariants: [...fieldSurfaceCompoundVariants(), ...(extras.compoundVariants ?? [])],
			/** Shared default selections (everything except textarea's `resize`). */
			defaultVariants: {
				color: "neutral",
				variant: "default",
				size: "md",
				invalid: "false",
				disabled: "false",
				readonly: "false",
				...extras.defaultVariants,
			},
		},
		(s) => {
			useFieldSelector(s, `.${name}-field`);
			useFieldStateSelectors(s, name);
			setup?.(s);
		},
	);
}

/**
 * Builds an inline addon recipe (prefix/suffix) rendered inside the field
 * wrapper, sharing its surface. `side` selects the inner padding edge:
 * `paddingInlineEnd` for a leading prefix, `paddingInlineStart` for a trailing
 * suffix, so the gap follows the text in right-to-left layouts. The text is the
 * field's own color at {@link FIELD_MUTED_TEXT}, like the placeholder.
 */
export function createFieldAddonRecipe(
	name: string,
	side: "paddingInlineStart" | "paddingInlineEnd",
) {
	return createUseRecipe(name, {
		base: {
			display: "inline-flex",
			alignItems: "center",
			flexShrink: "0",
			color: FIELD_MUTED_TEXT,
			whiteSpace: "nowrap",
			userSelect: "none",
		},
		variants: {
			size: {
				sm: { fontSize: "@font-size.xs", [side]: "@0.375", gap: "@0.25" },
				md: { fontSize: "@font-size.sm", [side]: "@0.5", gap: "@0.375" },
				lg: { fontSize: "@font-size.md", [side]: "@0.625", gap: "@0.5" },
			},
		},
		defaultVariants: {
			size: "md",
		},
	});
}

/**
 * Registers the shared reset for the transparent native control nested inside a
 * field wrapper (`.input-field`, `.textarea-field`). The control is transparent,
 * borderless, and has no padding of its own &mdash; it inherits typography and
 * color from the wrapper, which owns the visual field.
 *
 * The `query` argument lets each field recipe target its own nested element, so
 * the same reset backs both the input and textarea recipes.
 */
export function useFieldSelector(s: Styleframe, query: string) {
	const { selector } = s;

	selector(query, {
		flexGrow: "1",
		minWidth: "0",
		width: "100%",
		background: "transparent",
		border: "none",
		outline: "none",
		padding: "0",
		color: "inherit",
		fontFamily: "inherit",
		fontSize: "inherit",
		fontWeight: "inherit",
		lineHeight: "inherit",
		"&::placeholder": {
			color: FIELD_MUTED_TEXT,
			// Firefox lowers the placeholder's opacity on its own.
			opacity: "1",
		},
		"&:disabled": {
			cursor: "not-allowed",
		},
	});
}

/**
 * Registers the state hooks that style a field wrapper from the attributes on
 * its nested native control, beside the `invalid`, `readonly` and `disabled`
 * class variants: `[aria-invalid="true"]`, `[readonly]` and `:disabled`. They
 * read the attributes that assistive technologies report, so what people see
 * and what they hear can't drift apart. `:invalid` isn't used, since it
 * matches a required field before anyone has typed in it, and neither is
 * `:read-only`, since it also matches every element that isn't editable.
 *
 * `:has()` has no modifier, so these are raw selectors, and their nested
 * blocks are plain CSS. The invalid hover repeats the error border because the
 * dark hover utilities have the same specificity as `:has()` and come later.
 *
 * With `prefers-contrast: more`, the two gray levels the borders use resolve
 * to the field's text color inside the wrapper, so every border, at rest and
 * on hover, in either mode, is drawn at full strength.
 */
export function useFieldStateSelectors(s: Styleframe, name: string) {
	const { selector } = s;
	const control = (state: string) => `.${name}:has(> .${name}-field${state})`;

	selector(control('[aria-invalid="true"]'), {
		borderColor: "@color.error",
		borderBottomColor: "@color.error",
		boxShadow: "inset 0 0 0 1px @color.error",
		"@media (hover: hover)": {
			"&:hover": {
				borderColor: "@color.error",
				borderBottomColor: "@color.error",
			},
		},
	});

	selector(control("[readonly]"), {
		borderStyle: "@border-style.dashed",
		cursor: "default",
	});

	selector(control(":disabled"), {
		opacity: "0.5",
		cursor: "not-allowed",
		"@media (forced-colors: active)": {
			borderColor: "GrayText",
			color: "GrayText",
			opacity: "1",
		},
	});

	selector(`.${name}`, ({ media }) => {
		media("(prefers-contrast: more)", ({ variable }) => {
			variable("color.gray-450", "currentColor", { default: true });
			variable("color.gray-500", "currentColor", { default: true });
		});
	});
}
