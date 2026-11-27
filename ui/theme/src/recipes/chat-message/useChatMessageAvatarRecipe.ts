import { createUseRecipe } from "@styleframe/theme";

/**
 * Chat message avatar recipe — leading slot for an avatar or icon.
 * Independent of the media recipe: consumers drop a raw <img> or icon
 * inside an element styled by this recipe and get correct sizing/shape.
 */
export const useChatMessageAvatarRecipe = createUseRecipe("chat-message-avatar", {
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: "0",
		overflow: "hidden",
		borderRadius: "@border-radius.full",
		background: "@color.gray-200",
		color: "@color.gray-700",
		"&:dark": {
			background: "@color.gray-800",
			color: "@color.gray-300",
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
			outline: {},
			soft: {},
			subtle: {},
			ghost: {},
		},
		size: {
			sm: { width: "@1.5", height: "@1.5" },
			md: { width: "@2", height: "@2" },
			lg: { width: "@2.5", height: "@2.5" },
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "subtle",
		size: "md",
	},
});
