import { createUseRecipe } from "@styleframe/theme";
import type { RecipeConfig } from "@styleframe/theme";

/**
 * Shared recipe-definition builders for sectioned overlay components
 * (modal, drawer). Co-located in the canonical `modal/` folder and imported by
 * siblings via relative path — mirroring `input/createFieldRecipe.ts`.
 *
 * The `${name}` parameter prefixes both the recipe name and the setup selectors
 * so each consumer (`modal`, `drawer`) gets its own class namespace while
 * sharing identical CSS.
 */

/**
 * Container surface colors — background / text / border for the panel itself.
 * Shared by the modal and drawer container recipes. The `neutral` soft panel
 * gains a border in the dark theme, where the backdrop barely dims a dark page.
 */
export const overlaySurfaceCompoundVariants: NonNullable<RecipeConfig["compoundVariants"]> = [
	// Light color (neutral light-mode values, fixed across themes)
	{
		match: { color: "light", variant: "solid" },
		css: {
			background: "@color.white",
			color: "@color.text",
			borderColor: "@color.gray-200",
			"&:dark": {
				background: "@color.white",
				color: "@color.text-inverted",
				borderColor: "@color.gray-200",
			},
		},
	},
	{
		match: { color: "light", variant: "soft" },
		css: {
			background: "@color.gray-50",
			color: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-50",
				color: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "light", variant: "subtle" },
		css: {
			background: "@color.gray-50",
			color: "@color.gray-700",
			borderColor: "@color.gray-200",
			"&:dark": {
				background: "@color.gray-50",
				color: "@color.gray-700",
				borderColor: "@color.gray-200",
			},
		},
	},

	// Dark color (neutral dark-mode values, fixed across themes)
	{
		match: { color: "dark", variant: "solid" },
		css: {
			background: "@color.gray-900",
			color: "@color.text-inverted",
			borderColor: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-900",
				color: "@color.text",
				borderColor: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "dark", variant: "soft" },
		css: {
			background: "@color.gray-800",
			color: "@color.gray-300",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
			},
		},
	},
	{
		match: { color: "dark", variant: "subtle" },
		css: {
			background: "@color.gray-800",
			color: "@color.gray-300",
			borderColor: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-700",
			},
		},
	},

	// Neutral color (adaptive: light in light mode, dark in dark mode)
	{
		match: { color: "neutral", variant: "solid" },
		css: {
			background: "@color.white",
			color: "@color.text",
			borderColor: "@color.gray-200",
			"&:dark": {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "neutral", variant: "soft" },
		css: {
			background: "@color.gray-50",
			color: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "neutral", variant: "subtle" },
		css: {
			background: "@color.gray-50",
			color: "@color.gray-700",
			borderColor: "@color.gray-200",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-700",
			},
		},
	},
];

/**
 * Header / footer separator border colors. The `soft` variant hides the
 * separators; `solid`/`subtle` show them.
 */
const overlaySeparatorCompoundVariants: NonNullable<RecipeConfig["compoundVariants"]> = [
	// Light
	{
		match: { color: "light", variant: "solid" },
		css: {
			borderTopColor: "@color.gray-200",
			borderBottomColor: "@color.gray-200",
			"&:dark": {
				borderTopColor: "@color.gray-200",
				borderBottomColor: "@color.gray-200",
			},
		},
	},
	{
		match: { color: "light", variant: "soft" },
		css: {
			borderTopColor: "transparent",
			borderBottomColor: "transparent",
			"&:dark": {
				borderTopColor: "transparent",
				borderBottomColor: "transparent",
			},
		},
	},
	{
		match: { color: "light", variant: "subtle" },
		css: {
			borderTopColor: "@color.gray-200",
			borderBottomColor: "@color.gray-200",
			"&:dark": {
				borderTopColor: "@color.gray-200",
				borderBottomColor: "@color.gray-200",
			},
		},
	},

	// Dark
	{
		match: { color: "dark", variant: "solid" },
		css: {
			borderTopColor: "@color.gray-700",
			borderBottomColor: "@color.gray-700",
			"&:dark": {
				borderTopColor: "@color.gray-700",
				borderBottomColor: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "dark", variant: "soft" },
		css: {
			borderTopColor: "transparent",
			borderBottomColor: "transparent",
			"&:dark": {
				borderTopColor: "transparent",
				borderBottomColor: "transparent",
			},
		},
	},
	{
		match: { color: "dark", variant: "subtle" },
		css: {
			borderTopColor: "@color.gray-700",
			borderBottomColor: "@color.gray-700",
			"&:dark": {
				borderTopColor: "@color.gray-700",
				borderBottomColor: "@color.gray-700",
			},
		},
	},

	// Neutral
	{
		match: { color: "neutral", variant: "solid" },
		css: {
			borderTopColor: "@color.gray-200",
			borderBottomColor: "@color.gray-200",
			"&:dark": {
				borderTopColor: "@color.gray-700",
				borderBottomColor: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "neutral", variant: "soft" },
		css: {
			borderTopColor: "transparent",
			borderBottomColor: "transparent",
			"&:dark": {
				borderTopColor: "transparent",
				borderBottomColor: "transparent",
			},
		},
	},
	{
		match: { color: "neutral", variant: "subtle" },
		css: {
			borderTopColor: "@color.gray-200",
			borderBottomColor: "@color.gray-200",
			"&:dark": {
				borderTopColor: "@color.gray-700",
				borderBottomColor: "@color.gray-700",
			},
		},
	},
];

/** Padding / gap sizes shared by the header and footer sections. */
const sectionSizeVariants = {
	sm: {
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingInlineStart: "@0.75",
		paddingInlineEnd: "@0.75",
		gap: "@0.5",
	},
	md: {
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingInlineStart: "@1",
		paddingInlineEnd: "@1",
		gap: "@0.75",
	},
	lg: {
		paddingTop: "@1",
		paddingBottom: "@1",
		paddingInlineStart: "@1.25",
		paddingInlineEnd: "@1.25",
		gap: "@1",
	},
};

const colorVariants = {
	light: {},
	dark: {},
	neutral: {},
};

const styleVariants = {
	solid: {},
	soft: {},
	subtle: {},
};

const sectionDefaultVariants = {
	color: "neutral",
	variant: "solid",
	size: "md",
} as const;

/**
 * Header recipe (`${name}-header`) — top section with a bottom separator.
 * It never shrinks, so the title stays in view while the body scrolls.
 * The setup callback hides separators when the header is the first/last child.
 */
export function createOverlayHeaderRecipe(name: string) {
	return createUseRecipe(
		`${name}-header`,
		{
			base: {
				display: "flex",
				alignItems: "center",
				flexShrink: "0",
				gap: "@0.75",
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingInlineStart: "@1",
				paddingInlineEnd: "@1",
				borderTopWidth: "@border-width.thin",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				borderBottomWidth: "@border-width.thin",
				borderBottomStyle: "@border-style.solid",
				borderBottomColor: "transparent",
			},
			variants: {
				color: colorVariants,
				variant: styleVariants,
				size: sectionSizeVariants,
			},
			compoundVariants: overlaySeparatorCompoundVariants,
			defaultVariants: sectionDefaultVariants,
		},
		(s) => {
			s.selector(`.${name}-header:first-child`, {
				borderTopColor: "transparent",
			});
			s.selector(`.${name}-header:last-child`, {
				borderBottomColor: "transparent",
			});
		},
	);
}

/**
 * Footer recipe (`${name}-footer`) — bottom section with end-aligned actions
 * and a top separator. Its actions wrap onto a new row on a narrow screen, and
 * it never shrinks, so the actions stay in view while the body scrolls.
 */
export function createOverlayFooterRecipe(name: string) {
	return createUseRecipe(
		`${name}-footer`,
		{
			base: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				flexWrap: "wrap",
				flexShrink: "0",
				gap: "@0.75",
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingInlineStart: "@1",
				paddingInlineEnd: "@1",
				borderTopWidth: "@border-width.thin",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				borderBottomWidth: "@border-width.thin",
				borderBottomStyle: "@border-style.solid",
				borderBottomColor: "transparent",
			},
			variants: {
				color: colorVariants,
				variant: styleVariants,
				size: sectionSizeVariants,
			},
			compoundVariants: overlaySeparatorCompoundVariants,
			defaultVariants: sectionDefaultVariants,
		},
		(s) => {
			s.selector(`.${name}-footer:first-child`, {
				borderTopColor: "transparent",
			});
			s.selector(`.${name}-footer:last-child`, {
				borderBottomColor: "transparent",
			});
		},
	);
}

/**
 * Body recipe (`${name}-body`) — main content area. No separators or compound
 * variants; size controls padding and gap. When the panel reaches its maximum
 * height, the body is the part that shrinks and scrolls.
 */
export function createOverlayBodyRecipe(name: string) {
	return createUseRecipe(`${name}-body`, {
		base: {
			display: "flex",
			flexDirection: "column",
			minHeight: "0",
			overflowY: "auto",
			gap: "@0.5",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingInlineStart: "@1",
			paddingInlineEnd: "@1",
		},
		variants: {
			color: colorVariants,
			variant: styleVariants,
			size: {
				sm: {
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingInlineStart: "@0.75",
					paddingInlineEnd: "@0.75",
					gap: "@0.375",
				},
				md: {
					paddingTop: "@0.75",
					paddingBottom: "@0.75",
					paddingInlineStart: "@1",
					paddingInlineEnd: "@1",
					gap: "@0.5",
				},
				lg: {
					paddingTop: "@1",
					paddingBottom: "@1",
					paddingInlineStart: "@1.25",
					paddingInlineEnd: "@1.25",
					gap: "@0.75",
				},
			},
			fullscreen: {
				true: { flexGrow: "1" },
				false: {},
			},
		},
		defaultVariants: {
			...sectionDefaultVariants,
			fullscreen: "false",
		} as const,
	});
}

/**
 * Backdrop recipe (`${name}-overlay`) — the full-screen dimmed layer behind the
 * panel. No variants.
 */
export function createBackdropRecipe(name: string) {
	return createUseRecipe(`${name}-overlay`, {
		base: {
			position: "fixed",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "rgba(0, 0, 0, 0.75)",
			zIndex: "1000",
		},
		variants: {},
		compoundVariants: [],
		defaultVariants: {},
	});
}
