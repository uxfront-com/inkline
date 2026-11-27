import { styleframe } from "@styleframe/core";
import { wcagContrast } from "culori";

import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { useCheckboxFieldRecipe } from "./useCheckboxFieldRecipe";
import { useCheckboxGroupRecipe } from "./useCheckboxGroupRecipe";

type Block = Record<string, unknown>;
type Node = {
  type: string;
  query?: string;
  declarations: Record<string, unknown>;
};

/**
 * The Checkbox Group page asks for 4.5:1 for the legend against the page
 * (WCAG 1.4.3). The group also draws the invalid border on every box, which
 * needs 3:1 against the page and the box's own fill (WCAG 1.4.11). Every
 * color of `checkbox-field` is checked in the light and the dark theme, since
 * the `light` and `dark` colors keep their look in either mode.
 */
describe("checkbox group contrast", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  const field = useCheckboxFieldRecipe(s);
  const group = useCheckboxGroupRecipe(s);

  const themes = {
    light: colorValues as Record<string, string>,
    dark: darkModeColorValues as Record<string, string>,
  };
  type Theme = keyof typeof themes;

  function resolve(token: string, theme: Theme): string {
    const name = token.slice("@color.".length);
    const themed = themes[theme][name];
    if (themed) {
      return themed.startsWith("@") ? resolve(themed, theme) : themed;
    }
    const variable = s.root.variables.find((v) => v.name === `color.${name}`);
    if (!variable) {
      throw new Error(`Unknown token ${token}`);
    }
    return String(variable.value);
  }

  const pages = (theme: Theme) => [themes[theme].background!, themes[theme].surface!];

  // A setup selector's declaration, as the `@color.<name>` token it references.
  function selectorColor(query: string, property: string) {
    const node = s.root.children.find((child) => (child as Node).query === query) as
      | Node
      | undefined;
    expect(node, query).toBeDefined();
    return `@${(node!.declarations[property] as { name: string }).name}`;
  }

  it.each(["light", "dark"] as const)(
    "checkbox-group/legend-contrast gives the legend 4.5:1 against the %s page",
    (theme) => {
      const legend = selectorColor(".checkbox-group > legend", "color");
      expect(group.base!.color).toBe(legend);
      for (const page of pages(theme)) {
        expect(
          wcagContrast(resolve(legend, theme), page),
          `${legend} against ${page}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  const cases = field.compoundVariants!.flatMap((cv) => {
    const css = cv.css as Block;
    const inDark = { ...css, ...(css["&:dark"] as Block | undefined) };
    return (["light", "dark"] as const).map((theme) => ({
      name: `${cv.match.color} in the ${theme} theme`,
      theme,
      fill: resolve((theme === "light" ? css : inDark).backgroundColor as string, theme),
    }));
  });

  it("covers the three colors in both themes", () => {
    expect(cases).toHaveLength(6);
  });

  it.each(cases)(
    "checkbox-group/invalid-state gives the invalid border 3:1 against the page and the box's fill, $name",
    ({ theme, fill }) => {
      const error = resolve(
        selectorColor(
          '.checkbox-group[aria-invalid="true"] .checkbox > .checkbox-field',
          "borderColor",
        ),
        theme,
      );
      for (const neighbour of [...pages(theme), fill]) {
        expect(wcagContrast(error, neighbour), neighbour).toBeGreaterThanOrEqual(3);
      }
    },
  );
});
