import { createUseRecipe } from "@styleframe/theme";

/**
 * Chat message actions row recipe — flex layout for action buttons displayed
 * below the bubble. Hover-reveal is a markup concern (e.g., opacity toggled
 * on the parent message group), not a recipe variant.
 */
export const useChatMessageActionsRecipe = createUseRecipe("chat-message-actions", {
	base: {
		display: "flex",
		flexDirection: "row",
		gap: "@0.25",
		marginTop: "@0.25",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		side: {
			start: {},
			end: { justifyContent: "flex-end" },
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
			ghost: {},
		},
		size: {
			sm: { gap: "@0.125", marginTop: "@0.125" },
			md: { gap: "@0.25", marginTop: "@0.25" },
			lg: { gap: "@0.375", marginTop: "@0.375" },
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "subtle",
		size: "md",
		side: "start",
	},
});
