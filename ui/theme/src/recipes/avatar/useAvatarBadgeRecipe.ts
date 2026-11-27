import { createUseRecipe } from "@styleframe/theme";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

/**
 * Avatar badge recipe — a small status dot anchored to a corner of an `.avatar`.
 * Solid-filled, with a ring (in the page background color) so it
 * reads as a cut-out on the avatar edge. Uses the Full color pattern so the dot
 * can express presence states (success = online, warning = away, error = busy,
 * neutral = offline, …).
 */
export const useAvatarBadgeRecipe = createUseRecipe("avatar-badge", {
	base: {
		position: "absolute",
		display: "inline-flex",
		borderRadius: "@border-radius.full",
		borderWidth: "@border-width.medium",
		borderStyle: "@border-style.solid",
		borderColor: "@color.background",
		boxSizing: "border-box",
	},
	variants: {
		color: {
			primary: {},
			secondary: {},
			success: {},
			info: {},
			warning: {},
			error: {},
			light: {},
			dark: {},
			neutral: {},
		},
		position: {
			"top-left": { top: "0", right: "auto", bottom: "auto", left: "0" },
			"top-right": { top: "0", right: "0", bottom: "auto", left: "auto" },
			"bottom-left": { top: "auto", right: "auto", bottom: "0", left: "0" },
			"bottom-right": { top: "auto", right: "0", bottom: "0", left: "auto" },
		},
		size: {
			xs: {
				width: "8px",
				height: "8px",
			},
			sm: {
				width: "10px",
				height: "10px",
			},
			md: {
				width: "12px",
				height: "12px",
			},
			lg: {
				width: "14px",
				height: "14px",
			},
			xl: {
				width: "18px",
				height: "18px",
			},
		},
	},
	compoundVariants: [
		...colors.map((color) => ({
			match: { color },
			css: {
				background: `@color.${color}`,
			},
		})),
		// Light (fixed light appearance across modes)
		{
			match: { color: "light" as const },
			css: {
				background: "@color.white",
				"&:dark": {
					background: "@color.white",
				},
			},
		},
		// Dark (fixed dark appearance across modes)
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-900",
				"&:dark": {
					background: "@color.gray-900",
				},
			},
		},
		// Neutral (adaptive — light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.gray-400",
				"&:dark": {
					background: "@color.gray-500",
				},
			},
		},
	],
	defaultVariants: {
		color: "success",
		size: "md",
		position: "bottom-right",
	},
});
