/**
 * The accent each toast `color` carries, scoped to the two parts that key off
 * the variant — the leading icon and the progress bar. The toast body stays
 * neutral for every color (Nuxt UI's model), so the color lands here rather
 * than on the surface.
 *
 * Because the icon and the progress bar must always agree on the accent, both
 * read this single map — one source of truth for "what does this color mean."
 * Semantic colors use their mode-stable token; `light`/`dark`/`neutral` reuse
 * the same foreground the callout/badge family gives these colors in its
 * outline variant, so the accent vocabulary stays consistent across the family.
 */
export const toastAccentColorVariants = {
	primary: { color: "@color.primary" },
	secondary: { color: "@color.secondary" },
	success: { color: "@color.success" },
	info: { color: "@color.info" },
	warning: { color: "@color.warning" },
	error: { color: "@color.error" },
	light: {
		color: "@color.text-inverted",
		"&:dark": { color: "@color.text" },
	},
	dark: {
		color: "@color.text",
		"&:dark": { color: "@color.text-inverted" },
	},
	neutral: {
		color: "@color.text",
		"&:dark": { color: "@color.gray-200" },
	},
} as const;
