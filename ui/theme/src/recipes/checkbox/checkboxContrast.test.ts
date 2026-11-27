import { styleframe } from "@styleframe/core";
import { wcagContrast } from "culori";

import { useDesignTokensPreset, useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { useCheckboxFieldRecipe } from "./useCheckboxFieldRecipe";
import { useCheckboxRecipe } from "./useCheckboxRecipe";

type Slot = Record<string, unknown>;
type Theme = "light" | "dark";

/**
 * WCAG 1.4.3 asks for 4.5:1 for the label, and 1.4.11 for 3:1 between the
 * box's border, a checked box's fill and the focus ring and the colours next
 * to them, and between the check or dash and the fill. Every pair is checked
 * in the light and dark themes. The `light` and `dark` colors keep their look
 * in either mode, so their borders are checked against every page background.
 */
describe("checkbox contrast", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  useUtilitiesPreset(s);
  useModifiersPreset(s);
  const field = useCheckboxFieldRecipe(s);
  const wrapper = useCheckboxRecipe(s);

  const darkValues: Record<string, string> = darkModeColorValues;

  function resolve(token: string, theme: Theme): string {
    const name = token.replace(/^@/, "");
    const key = name.replace(/^color\./, "");
    if (theme === "dark" && typeof darkValues[key] === "string") {
      return darkValues[key].startsWith("@") ? resolve(darkValues[key], theme) : darkValues[key];
    }
    const variable = s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unknown token ${token}`);
    }
    const value = variable.value as unknown;
    if (typeof value === "object" && value !== null && "name" in value) {
      return resolve(`@${(value as { name: string }).name}`, theme);
    }
    return String(value);
  }

  const pages: Record<Theme, Array<string>> = {
    light: [colorValues.background, colorValues.surface],
    dark: [darkModeColorValues.background, darkModeColorValues.surface],
  };
  const allPages = [...pages.light, ...pages.dark];

  // Reads the token at a path in a recipe block, like `["&:dark", "borderColor"]`.
  function token(block: unknown, ...path: Array<string>): string {
    const value = path.reduce<unknown>(
      (current, key) => (current as Slot | undefined)?.[key],
      block,
    );
    if (typeof value !== "string") {
      throw new Error(`No token at ${path.join(" > ")}`);
    }
    return value;
  }

  const base = field.base;
  const compound = (color: string) =>
    field.compoundVariants!.find((cv) => cv.match.color === color)?.css;

  // The unchecked surface of each color in each theme, and the pages it can sit on.
  const surfaces = (["light", "dark"] as const).flatMap((theme) => {
    const neutralPrefix = theme === "dark" ? ["&:dark"] : [];
    return [
      ...(["light", "dark"] as const).map((color) => ({
        name: `${color} ${theme}`,
        theme,
        fill: token(compound(color), "backgroundColor"),
        border: token(compound(color), "borderColor"),
        contrastMore: token(compound(color), "&:contrast-more", "borderColor"),
        pages: allPages,
      })),
      {
        name: `neutral ${theme}`,
        theme,
        fill: token(compound("neutral"), ...neutralPrefix, "backgroundColor"),
        border: token(compound("neutral"), ...neutralPrefix, "borderColor"),
        contrastMore: token(
          compound("neutral"),
          theme === "dark" ? "&:dark:contrast-more" : "&:contrast-more",
          "borderColor",
        ),
        pages: pages[theme],
      },
    ];
  });

  it("covers three colors in two themes", () => {
    expect(surfaces).toHaveLength(6);
  });

  it.each(surfaces)(
    "checkbox/boundary-contrast: the $name border has 3:1 against its fill and the page",
    ({ theme, fill, border, pages: neighbours }) => {
      for (const neighbour of [resolve(fill, theme), ...neighbours]) {
        expect(
          wcagContrast(resolve(border, theme), neighbour),
          `${border} against ${neighbour}`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(surfaces)(
    "checkbox/more-contrast: the $name border is stronger than its default against its fill",
    ({ theme, fill, border, contrastMore }) => {
      const surface = resolve(fill, theme);
      expect(wcagContrast(resolve(contrastMore, theme), surface)).toBeGreaterThan(
        wcagContrast(resolve(border, theme), surface),
      );
      expect(wcagContrast(resolve(contrastMore, theme), surface)).toBeGreaterThanOrEqual(4.5);
    },
  );

  it.each(surfaces)(
    "checkbox/invalid-state: the $name invalid border has 3:1 against its fill and the page",
    ({ theme, fill, pages: neighbours }) => {
      const error = resolve(token(base, "&:aria-invalid", "borderColor"), theme);
      for (const neighbour of [resolve(fill, theme), ...neighbours]) {
        expect(wcagContrast(error, neighbour), `error against ${neighbour}`).toBeGreaterThanOrEqual(
          3,
        );
      }
    },
  );

  it.each(["light", "dark"] as const)(
    "checkbox/boundary-contrast: the checked fill has 3:1 against the %s page, and the mark 3:1 against the fill",
    (theme) => {
      for (const state of ["&:checked", "&:indeterminate"]) {
        const fill = resolve(token(base, state, "backgroundColor"), theme);
        for (const page of pages[theme]) {
          expect(wcagContrast(fill, page)).toBeGreaterThanOrEqual(3);
        }
        // The mark is drawn in white.
        expect(token(base, state, "backgroundImage")).toContain("stroke='white'");
        expect(wcagContrast("#ffffff", fill)).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(["light", "dark"] as const)(
    "checkbox/contrast: the label has 4.5:1 and the focus ring 3:1 against the %s page",
    (theme) => {
      const label = resolve(token(wrapper.base, "color"), theme);
      const ring = resolve(token(base, "&:focus-visible", "outlineColor"), theme);
      for (const page of pages[theme]) {
        expect(wcagContrast(label, page)).toBeGreaterThanOrEqual(4.5);
        expect(wcagContrast(ring, page)).toBeGreaterThanOrEqual(3);
      }
    },
  );
});
