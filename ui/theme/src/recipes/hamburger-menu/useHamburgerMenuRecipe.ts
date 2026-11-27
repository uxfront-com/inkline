import { createUseRecipe } from "@styleframe/theme";

/**
 * Hamburger menu toggle button recipe.
 * Renders a three-bar icon button that animates into a different glyph
 * (X, arrow, plus, minus) when the `active` state is true.
 * Inspired by Inkline's HamburgerMenu component.
 */
export const useHamburgerMenuRecipe = createUseRecipe(
	"hamburger-menu",
	{
		base: {
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			background: "transparent",
			borderWidth: "0",
			borderStyle: "none",
			borderColor: "transparent",
			color: "@color.text",
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
			transitionProperty: "opacity",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:hover": {
				opacity: "0.8",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
				borderRadius: "@border-radius.sm",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
		},
		variants: {
			color: {
				light: {},
				dark: {},
				neutral: {},
			},
			size: {
				sm: {
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.375",
					paddingRight: "@0.375",
				},
				md: {
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
				},
				lg: {
					paddingTop: "@0.625",
					paddingBottom: "@0.625",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
				},
			},
			animation: {
				close: {},
				"arrow-up": {},
				"arrow-down": {},
				"arrow-left": {},
				"arrow-right": {},
				minus: {},
				plus: {},
			},
			active: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Color compound variants — set parent `color` which drives bar color via currentColor
			{
				match: { color: "light" as const },
				css: {
					color: "@color.gray-900",
					"&:dark": {
						color: "@color.gray-900",
					},
				},
			},
			{
				match: { color: "dark" as const },
				css: {
					color: "@color.white",
					"&:dark": {
						color: "@color.white",
					},
				},
			},
			{
				match: { color: "neutral" as const },
				css: {
					color: "@color.gray-900",
					"&:dark": {
						color: "@color.white",
					},
				},
			},

			// Size modifiers — className hooks for setup-callback descendant styles
			{
				match: { size: "sm" as const },
				className: "-sm",
			},
			{
				match: { size: "md" as const },
				className: "-md",
			},
			{
				match: { size: "lg" as const },
				className: "-lg",
			},

			// Animation modifiers — className hooks for per-animation transforms
			{
				match: { animation: "close" as const },
				className: "-close",
			},
			{
				match: { animation: "arrow-up" as const },
				className: "-arrow-up",
			},
			{
				match: { animation: "arrow-down" as const },
				className: "-arrow-down",
			},
			{
				match: { animation: "arrow-left" as const },
				className: "-arrow-left",
			},
			{
				match: { animation: "arrow-right" as const },
				className: "-arrow-right",
			},
			{
				match: { animation: "minus" as const },
				className: "-minus",
			},
			{
				match: { animation: "plus" as const },
				className: "-plus",
			},

			// Active modifier — applied when the menu is open
			{
				match: { active: "true" as const },
				className: "-active",
			},
		],
		defaultVariants: {
			color: "neutral",
			size: "md",
			animation: "close",
			active: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// Base bar element — acts as the middle bar; ::before and ::after render top/bottom bars.
		selector(".hamburger-menu-inner", {
			position: "relative",
			display: "inline-block",
			background: "currentColor",
			borderRadius: "1px",
			transitionProperty: "transform, background-color",
			transitionDuration: "0.22s",
			transitionTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
			transitionDelay: "0.12s",
		});

		selector(".hamburger-menu-inner::before", {
			content: '""',
			position: "absolute",
			left: "0",
			width: "100%",
			background: "currentColor",
			borderRadius: "inherit",
			transitionProperty: "top, transform",
			transitionDuration: "0.1s, 0.22s",
			transitionTimingFunction: "ease-in, cubic-bezier(0.55, 0.055, 0.675, 0.19)",
			transitionDelay: "0.25s, 0s",
		});

		selector(".hamburger-menu-inner::after", {
			content: '""',
			position: "absolute",
			left: "0",
			width: "100%",
			background: "currentColor",
			borderRadius: "inherit",
			transitionProperty: "top, transform",
			transitionDuration: "0.1s, 0.22s",
			transitionTimingFunction: "ease-in, cubic-bezier(0.55, 0.055, 0.675, 0.19)",
			transitionDelay: "0.25s, 0s",
		});

		// Size-specific bar dimensions and offsets
		selector(".hamburger-menu.-sm .hamburger-menu-inner", {
			width: "14px",
			height: "2px",
			marginTop: "5px",
			marginBottom: "5px",
		});
		selector(".hamburger-menu.-sm .hamburger-menu-inner::before", {
			top: "-5px",
			height: "2px",
		});
		selector(".hamburger-menu.-sm .hamburger-menu-inner::after", {
			top: "5px",
			height: "2px",
		});

		selector(".hamburger-menu.-md .hamburger-menu-inner", {
			width: "20px",
			height: "2px",
			marginTop: "6px",
			marginBottom: "6px",
		});
		selector(".hamburger-menu.-md .hamburger-menu-inner::before", {
			top: "-6px",
			height: "2px",
		});
		selector(".hamburger-menu.-md .hamburger-menu-inner::after", {
			top: "6px",
			height: "2px",
		});

		selector(".hamburger-menu.-lg .hamburger-menu-inner", {
			width: "26px",
			height: "3px",
			marginTop: "8px",
			marginBottom: "8px",
		});
		selector(".hamburger-menu.-lg .hamburger-menu-inner::before", {
			top: "-8px",
			height: "3px",
		});
		selector(".hamburger-menu.-lg .hamburger-menu-inner::after", {
			top: "8px",
			height: "3px",
		});

		// close — middle bar rotates 225° (tilts to 45°) forming one X arm;
		// ::before fades out; ::after converges to center and rotates perpendicular,
		// forming the other X arm. No fading of middle bar to avoid "stays visible too long" feel.
		selector(".hamburger-menu.-close.-active .hamburger-menu-inner", {
			transform: "rotate(225deg)",
			transitionDelay: "0.12s",
		});
		selector(".hamburger-menu.-close.-active .hamburger-menu-inner::before", {
			top: "0",
			opacity: "0",
			transitionProperty: "top, opacity",
			transitionDuration: "0.1s, 0.1s",
			transitionTimingFunction: "ease-out, ease-out",
			transitionDelay: "0s, 0.12s",
		});
		selector(".hamburger-menu.-close.-active .hamburger-menu-inner::after", {
			top: "0",
			transform: "rotate(-90deg)",
			transitionProperty: "top, transform",
			transitionDuration: "0.1s, 0.22s",
			transitionTimingFunction: "ease-out, cubic-bezier(0.215, 0.61, 0.355, 1)",
			transitionDelay: "0s, 0.12s",
		});

		// arrow-left — bars stay at original offsets; translate 20% left and tilt
		// inward so their inner ends meet at the left of the inner element.
		selector(".hamburger-menu.-arrow-left.-active .hamburger-menu-inner::before", {
			transform: "translate3d(-20%, 0, 0) rotate(-45deg) scale(0.7, 1)",
		});
		selector(".hamburger-menu.-arrow-left.-active .hamburger-menu-inner::after", {
			transform: "translate3d(-20%, 0, 0) rotate(45deg) scale(0.7, 1)",
		});

		// arrow-right — mirror of arrow-left.
		selector(".hamburger-menu.-arrow-right.-active .hamburger-menu-inner::before", {
			transform: "translate3d(20%, 0, 0) rotate(45deg) scale(0.7, 1)",
		});
		selector(".hamburger-menu.-arrow-right.-active .hamburger-menu-inner::after", {
			transform: "translate3d(20%, 0, 0) rotate(-45deg) scale(0.7, 1)",
		});

		// arrow-up — inner rotates -90° (CCW), bars use arrow-right pattern;
		// in global coordinates this yields an arrow pointing up.
		selector(".hamburger-menu.-arrow-up.-active .hamburger-menu-inner", {
			transform: "rotate(-90deg)",
		});
		selector(".hamburger-menu.-arrow-up.-active .hamburger-menu-inner::before", {
			transform: "translate3d(20%, 0, 0) rotate(45deg) scale(0.7, 1)",
		});
		selector(".hamburger-menu.-arrow-up.-active .hamburger-menu-inner::after", {
			transform: "translate3d(20%, 0, 0) rotate(-45deg) scale(0.7, 1)",
		});

		// arrow-down — inner rotates 90° (CW), bars use arrow-right pattern;
		// in global coordinates this yields an arrow pointing down.
		selector(".hamburger-menu.-arrow-down.-active .hamburger-menu-inner", {
			transform: "rotate(90deg)",
		});
		selector(".hamburger-menu.-arrow-down.-active .hamburger-menu-inner::before", {
			transform: "translate3d(20%, 0, 0) rotate(45deg) scale(0.7, 1)",
		});
		selector(".hamburger-menu.-arrow-down.-active .hamburger-menu-inner::after", {
			transform: "translate3d(20%, 0, 0) rotate(-45deg) scale(0.7, 1)",
		});

		// minus — ::before and ::after converge to the middle; all three bars
		// overlap visually as a single horizontal bar.
		selector(".hamburger-menu.-minus.-active .hamburger-menu-inner::before", {
			top: "0",
		});
		selector(".hamburger-menu.-minus.-active .hamburger-menu-inner::after", {
			top: "0",
		});

		// plus — middle bar stays horizontal; ::before converges to center (invisible
		// overlap); ::after converges to center AND rotates 90° becoming vertical,
		// forming a + with the middle bar.
		selector(".hamburger-menu.-plus.-active .hamburger-menu-inner::before", {
			top: "0",
		});
		selector(".hamburger-menu.-plus.-active .hamburger-menu-inner::after", {
			top: "0",
			transform: "rotate(90deg)",
			transitionProperty: "top, transform",
			transitionDuration: "0.1s, 0.22s",
			transitionTimingFunction: "ease-out, cubic-bezier(0.215, 0.61, 0.355, 1)",
			transitionDelay: "0s, 0.12s",
		});
	},
);
