import { createUseRecipe } from "@styleframe/theme";

/**
 * Avatar recipe — a circular (or square) container that shows a user image with
 * a text/initials fallback. The fallback surface is driven by a Minimal color
 * pattern (primary / light / dark / neutral) and a solid / soft variant. The
 * `<img>` child is clipped to the avatar shape via the setup selector below, so
 * the avatar can stay `position: relative` (no `overflow: hidden`) and still
 * host an `.avatar-badge` status dot at its edge.
 */
export const useAvatarRecipe = createUseRecipe(
	"avatar",
	{
		base: {
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			fontWeight: "@font-weight.medium",
			lineHeight: "1",
			textTransform: "uppercase",
			userSelect: "none",
			verticalAlign: "middle",
		},
		variants: {
			color: {
				primary: {},
				light: {},
				dark: {},
				neutral: {},
			},
			variant: {
				solid: {},
				soft: {},
			},
			shape: {
				circle: {
					borderRadius: "@border-radius.full",
				},
				square: {
					borderRadius: "@border-radius.md",
				},
			},
			size: {
				xs: {
					width: "@1.5",
					height: "@1.5",
					fontSize: "@font-size.2xs",
				},
				sm: {
					width: "@2",
					height: "@2",
					fontSize: "@font-size.xs",
				},
				md: {
					width: "@2.5",
					height: "@2.5",
					fontSize: "@font-size.sm",
				},
				lg: {
					width: "@3",
					height: "@3",
					fontSize: "@font-size.md",
				},
				xl: {
					width: "@4",
					height: "@4",
					fontSize: "@font-size.lg",
				},
			},
		},
		compoundVariants: [
			// Primary (semantic, adapts to dark mode)
			{
				match: { color: "primary" as const, variant: "solid" as const },
				css: {
					background: "@color.primary",
					color: "@color.white",
				},
			},
			{
				match: { color: "primary" as const, variant: "soft" as const },
				css: {
					background: "@color.primary-100",
					color: "@color.primary-700",
					"&:dark": {
						background: "@color.primary-800",
						color: "@color.primary-400",
					},
				},
			},
			// Light (fixed light appearance across modes)
			{
				match: { color: "light" as const, variant: "solid" as const },
				css: {
					background: "@color.white",
					color: "@color.text",
					"&:dark": {
						background: "@color.white",
						color: "@color.text-inverted",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-100",
						color: "@color.gray-700",
					},
				},
			},
			// Dark (fixed dark appearance across modes)
			{
				match: { color: "dark" as const, variant: "solid" as const },
				css: {
					background: "@color.gray-900",
					color: "@color.white",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-800",
					color: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
					},
				},
			},
			// Neutral (adaptive — light in light mode, dark in dark mode)
			{
				match: { color: "neutral" as const, variant: "solid" as const },
				css: {
					background: "@color.gray-500",
					color: "@color.white",
					"&:dark": {
						background: "@color.gray-600",
						color: "@color.white",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
					},
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "soft",
			size: "md",
			shape: "circle",
		},
	},
	(s) => {
		const { selector } = s;

		// Clip the avatar image to the avatar shape and cover the box.
		selector(".avatar > img", {
			width: "100%",
			height: "100%",
			objectFit: "cover",
			borderRadius: "inherit",
		});
	},
);
