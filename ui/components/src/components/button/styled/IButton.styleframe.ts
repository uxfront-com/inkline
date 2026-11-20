import { styleframe } from "virtual:styleframe";
import { useButtonRecipe, useSpinnerCircleRecipe, useSpinnerRecipe } from "@styleframe/theme";

const s = styleframe();

export const buttonRecipe = useButtonRecipe(s);
export const spinnerRecipe = useSpinnerRecipe(s);
export const spinnerCircleRecipe = useSpinnerCircleRecipe(s);

// Each rule below fills a gap in the theme's recipes. The PR lists them.

// `block` is Inkline's prop, and the theme has no full-width style.
s.selector(".button--block", { width: "100%" });

// An icon-only button is square: its inline padding matches its block padding at each size, and the
// icon takes the line's height as its width. The theme has no icon-only style yet.
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

// Temporary: copies the theme's rules on Styleframe `main`, until Inkline takes the theme release
// that has them. The spinner takes the size and colour of the text, which 3.8.1's spinner has no
// size for.
s.selector(".button[data-loading] > .spinner", {
  width: "1em",
  height: "1em",
  color: "currentColor",
});

// Temporary, as above: 3.8.1 styles only native `:disabled`, so a focusable disabled or loading
// button gets the same look from `aria-disabled`, and a loading button keeps its full opacity,
// since the spinner shows why it can't be used.
s.selector('.button[aria-disabled="true"]', {
  cursor: "not-allowed",
  opacity: "0.75",
});
s.selector('.button[data-loading]:is(:disabled, [aria-disabled="true"])', {
  opacity: "1",
});
