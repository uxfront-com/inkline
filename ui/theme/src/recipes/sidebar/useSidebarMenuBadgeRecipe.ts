import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar menu badge recipe. A small count/status chip absolutely anchored to the trailing
 * edge of its menu item (which must be `position: relative`). Muted, neutral-adaptive surface
 * with tabular numerals; the `size` axis scales its height, padding, and font. Hidden when the
 * sidebar is collapsed.
 */
export const useSidebarMenuBadgeRecipe = createUseRecipe("sidebar-menu-badge", {
	base: {
		position: "absolute",
		top: "50%",
		right: "0.5rem",
		transform: "translateY(-50%)",
		pointerEvents: "none",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: "0",
		borderRadius: "@border-radius.sm",
		fontWeight: "@font-weight.medium",
		fontVariantNumeric: "tabular-nums",
		background: "@color.gray-100",
		color: "@color.text-weak",
		"&:dark": {
			background: "@color.gray-800",
			color: "@color.gray-400",
		},
	},
	variants: {
		size: {
			sm: {
				minWidth: "@1",
				height: "@1",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
				fontSize: "@font-size.2xs",
			},
			md: {
				minWidth: "@1.25",
				height: "@1.25",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
				fontSize: "@font-size.xs",
			},
			lg: {
				minWidth: "@1.5",
				height: "@1.5",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
				fontSize: "@font-size.sm",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
