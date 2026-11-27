import { createUseRecipe } from "@styleframe/theme";

/**
 * Spinner circle recipe.
 * Styles the SVG spinner element with rotation animation and size variants.
 * With reduced motion it pulses instead of turning.
 */
export const useSpinnerCircleRecipe = createUseRecipe(
	"spinner-circle",
	{
		base: {
			flexShrink: "0",
			animationName: "spinner-rotate",
			animationDuration: "1.2s",
			animationTimingFunction: "linear",
			animationIterationCount: "infinite",
			transformOrigin: "center center",
			// The duration and the iteration count are important: the sanitize
			// preset stops every animation under reduced motion, and the pulse
			// has to keep going to show that something's happening.
			"&:motion-reduce": {
				animationName: "spinner-pulse",
				animationDuration: "1.6s !important",
				animationTimingFunction: "@easing.ease-in-out",
				animationIterationCount: "infinite !important",
			},
		},
		variants: {
			size: {
				auto: {
					width: "100%",
					height: "100%",
				},
				sm: {
					width: "@2",
					height: "@2",
				},
				md: {
					width: "@3",
					height: "@3",
				},
				lg: {
					width: "@4",
					height: "@4",
				},
				inherit: {
					width: "1em",
					height: "1em",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		s.keyframes("spinner-rotate", {
			"100%": {
				transform: "rotate(360deg)",
			},
		});

		s.keyframes("spinner-dash", {
			"0%": {
				strokeDasharray: "1, 200",
				strokeDashoffset: "0",
			},
			"50%": {
				strokeDasharray: "89, 200",
				strokeDashoffset: "-35px",
			},
			"100%": {
				strokeDasharray: "89, 200",
				strokeDashoffset: "-124px",
			},
		});

		s.keyframes("spinner-pulse", {
			"50%": {
				opacity: "0.4",
			},
		});

		s.selector(".spinner-circle circle", {
			stroke: "currentColor",
			fill: "none",
			strokeWidth: "4",
			strokeDasharray: "89, 200",
			strokeDashoffset: "-35px",
			animationName: "spinner-dash",
			animationDuration: "1.2s",
			animationTimingFunction: "linear",
			animationIterationCount: "infinite",
			strokeLinecap: "round",
			// The arc stops growing and shrinking too, so nothing moves.
			"@media (prefers-reduced-motion: reduce)": {
				animationName: "none",
			},
		});
	},
);
