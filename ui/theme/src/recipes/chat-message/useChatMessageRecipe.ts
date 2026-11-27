import { createUseRecipe } from "@styleframe/theme";

/**
 * Chat message root recipe — a flex container wrapping an optional leading
 * avatar/icon and a content bubble. Owns the side axis (start/end) for
 * alignment, with logical sides that flip under dir="rtl".
 */
export const useChatMessageRecipe = createUseRecipe("chat-message", {
	base: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: "@0.75",
		width: "100%",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: { gap: "@0.5" },
			md: { gap: "@0.75" },
			lg: { gap: "@1" },
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
			ghost: {},
		},
		side: {
			start: {
				justifyContent: "flex-start",
			},
			end: {
				justifyContent: "flex-start",
				flexDirection: "row-reverse",
			},
		},
	},
	defaultVariants: {
		color: "neutral",
		size: "md",
		variant: "subtle",
		side: "start",
	},
});
