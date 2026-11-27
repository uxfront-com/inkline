import { styleframe } from "@styleframe/core";
import { wcagContrast } from "culori";

import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { useCardRecipe } from "./useCardRecipe";

type Slot = Record<string, unknown>;

/**
 * WCAG 1.4.3 asks for 4.5:1 between text and its background, and 1.4.11 for
 * 3:1 between the focus ring and what it sits on. The card's text, the body
 * and the footer included, inherits the color compound's text color, so each
 * compound's text is checked against its own background in the light and dark
 * themes. The ring is drawn outside the card, so it's checked against the
 * light and dark page backgrounds.
 */
describe("card contrast", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  const recipe = useCardRecipe(s);

  function resolve(value: unknown, theme: Slot = colorValues): string {
    if (typeof value === "object" && value !== null && "name" in value) {
      return resolve(`@${(value as { name: string }).name}`, theme);
    }
    const token = String(value);
    if (!token.startsWith("@")) {
      return token;
    }
    const name = token.slice(1);
    const themed = name.startsWith("color.") ? theme[name.slice("color.".length)] : undefined;
    if (themed !== undefined) {
      return resolve(themed, theme);
    }
    const variable = s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unknown token ${token}`);
    }
    return resolve(variable.value, theme);
  }

  const cases = recipe.compoundVariants!.flatMap((cv) => {
    const css = cv.css as Slot;
    const dark = css["&:dark"] as Slot;
    return [
      { theme: "light", declarations: css, values: colorValues },
      { theme: "dark", declarations: dark, values: darkModeColorValues },
    ].map((entry) => ({
      name: `${cv.match.color} ${cv.match.variant} in the ${entry.theme} theme`,
      ...entry,
    }));
  });

  it("covers the nine color × variant compounds in both themes", () => {
    expect(cases).toHaveLength(18);
  });

  it.each(cases)("card/contrast gives $name text of at least 4.5:1", ({ declarations, values }) => {
    const text = resolve(declarations.color, values);
    const background = resolve(declarations.background, values);
    expect(
      wcagContrast(text, background),
      `${String(declarations.color)} on ${String(declarations.background)}`,
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each([
    { theme: "light", values: colorValues },
    { theme: "dark", values: darkModeColorValues },
  ])("card/contrast gives the focus ring at least 3:1 against the $theme page", ({ values }) => {
    const ring = resolve("@color.focus", values);
    for (const page of [values.background, values.surface]) {
      expect(wcagContrast(ring, page), `${ring} on ${page}`).toBeGreaterThanOrEqual(3);
    }
  });
});
