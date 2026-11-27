import { createUseRecipe } from "@styleframe/theme";

/**
 * OTP / pin-input container recipe. The `.otp` class sits on the wrapper that
 * lays out the row of single-character `.otp-cell` inputs. It owns only the
 * layout — a horizontal flex row whose `size` axis scales the gap between
 * cells so it tracks the cell size — mirroring `useCheckboxGroupRecipe`.
 *
 * All surface styling (color, variant, state) lives on the cell
 * (`useOtpCellRecipe`); this recipe carries no color or variant axis.
 */
export const useOtpRecipe = createUseRecipe("otp", {
	base: {
		display: "inline-flex",
		alignItems: "center",
	},
	variants: {
		size: {
			sm: {
				gap: "@0.5",
			},
			md: {
				gap: "@0.75",
			},
			lg: {
				gap: "@1",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
