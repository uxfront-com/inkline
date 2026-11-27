import { useButtonRecipe, useSpinnerCircleRecipe, useSpinnerRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();

export const buttonRecipe = useButtonRecipe(s);
export const spinnerRecipe = useSpinnerRecipe(s);
export const spinnerCircleRecipe = useSpinnerCircleRecipe(s);

// The rules below add what the theme's recipes leave to Inkline.

// `block` is Inkline's prop, and the theme has no full-width style.
s.selector(".button--block", { width: "100%" });

// An icon-only button is square: its inline padding matches its block padding at each size, and the
// icon takes the line's height as its width. The theme has its own icon-only style since 3.11.0, so
// these rules and the label rule below duplicate it until a follow-up removes them.
s.selector('.button[data-icon-only] > [data-slot="leading"]', {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "1lh",
});
for (const [size, step] of [
	["xs", 0.25],
	["sm", 0.375],
	["md", 0.5],
	["lg", 0.625],
	["xl", 0.75],
] as const) {
	const padding = s.css`calc(${s.ref("spacing")} * ${step})`;
	s.selector(`.button[data-icon-only][data-size="${size}"]`, {
		paddingLeft: padding,
		paddingRight: padding,
	});
}

// An icon-only button hides its label visually, and the label still names it. The label is the
// headless button's part, which takes no class, so the sr-only utility can't reach it.
s.selector('.button[data-icon-only] > [data-slot="label"]', {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	borderWidth: "0",
});
