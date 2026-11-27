import { createUseRecipe } from "@styleframe/theme";

/**
 * Toast recipe for transient, floating feedback notifications.
 *
 * Unlike its callout sibling, the toast body is *neutral for every color*.
 * Following Nuxt UI's model, the `color` axis does not tint the surface — it
 * lives on the icon and the progress bar (see `toastAccentColors`), which carry
 * the semantic accent while the card itself stays a clean white/dark surface.
 * So this recipe has no `color` axis and no color compound variants at all; the
 * only surface axis is `variant`, which sets the neutral treatment:
 *   - `solid`  — opaque white card (dark: near-black), the highest-contrast
 *     surface, matching Nuxt UI's default toast.
 *   - `soft`   — a faint gray fill, borderless.
 *   - `subtle` — the same faint fill with a hairline border.
 * The base still floats (box-shadow elevation) and is sized to its content,
 * where a callout is an inline, full-width surface.
 */
export const useToastRecipe = createUseRecipe(
	"toast",
	{
		base: {
			position: "relative",
			overflow: "hidden",
			display: "flex",
			alignItems: "flex-start",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			boxShadow: "@box-shadow.lg",
			fontWeight: "@font-weight.medium",
			fontSize: "@font-size.sm",
			lineHeight: "@line-height.normal",
			paddingTop: "@1",
			paddingBottom: "@1",
			paddingLeft: "@1.25",
			paddingRight: "@1.25",
			gap: "@1",
			borderRadius: "@border-radius.lg",
		},
		variants: {
			variant: {
				solid: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
				},
				soft: {
					background: "@color.gray-50",
					color: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
					},
				},
				subtle: {
					background: "@color.gray-50",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-600",
					},
				},
			},
			size: {
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					gap: "@0.5",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@1",
					paddingBottom: "@1",
					paddingLeft: "@1.25",
					paddingRight: "@1.25",
					gap: "@1",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@1.25",
					paddingBottom: "@1.25",
					paddingLeft: "@1.5",
					paddingRight: "@1.5",
					gap: "@1.25",
				},
			},
			orientation: {
				horizontal: {
					flexDirection: "row",
					alignItems: "center",
				},
				vertical: {
					flexDirection: "column",
				},
			},
		},
		defaultVariants: {
			variant: "solid",
			size: "md",
			orientation: "horizontal",
		},
	},
	(s) => {
		// The base `display: flex` utility outranks the UA `[hidden]` rule, so
		// dismissal needs an explicit collapse.
		s.selector(".toast[hidden]", {
			display: "none",
		});
	},
);
