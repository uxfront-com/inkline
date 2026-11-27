import { styleframe } from "@styleframe/core";
import { formatHex8, wcagContrast } from "culori";

import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { useSwitchFieldRecipe } from "./useSwitchFieldRecipe";

type Block = Record<string, unknown>;

/**
 * The Switch page asks for 3:1 between the track and the page, between the
 * thumb and the track, on and off, and for the focus ring (WCAG 1.4.11). Every
 * color is checked against the page backgrounds of the light and the dark
 * theme, since `light` and `dark` keep their look in either mode, and
 * `neutral` uses one gray in both.
 */
describe("useSwitchFieldRecipe contrast", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  useUtilitiesPreset(s);
  useModifiersPreset(s);
  const recipe = useSwitchFieldRecipe(s);

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
    if (typeof variable.value !== "string") {
      throw new Error(`Token ${variable.name} isn't a plain value`);
    }
    return variable.value;
  }

  // The thumb's color token, from inside its gradient.
  function thumbToken(image: unknown): string {
    const token = /@color\.[\w-]+/.exec(String(image))?.[0];
    if (!token) {
      throw new Error(`No color token in ${String(image)}`);
    }
    return token;
  }

  const base = recipe.base as Block;
  const checked = base["&:checked"] as Block;
  const pages = (theme: Theme) => [themes[theme].background!, themes[theme].surface!];

  const cases = (["light", "dark"] as const).flatMap((theme) =>
    recipe.compoundVariants!.flatMap((cv) => {
      const css = cv.css as Block;
      const offThumb = css.backgroundImage ?? base.backgroundImage;
      const onThumb =
        (css["&:checked"] as Block | undefined)?.backgroundImage ?? base.backgroundImage;
      return [
        {
          name: `${cv.match.color} off in the ${theme} theme`,
          theme,
          border: css.borderColor as string,
          fill: css.backgroundColor as string,
          thumb: thumbToken(offThumb),
        },
        {
          name: `${cv.match.color} on in the ${theme} theme`,
          theme,
          border: checked.borderColor as string,
          fill: checked.backgroundColor as string,
          thumb: thumbToken(onThumb),
        },
      ];
    }),
  );

  it("covers the three colors on and off in both themes", () => {
    expect(cases).toHaveLength(12);
  });

  it.each(cases)(
    "switch/contrast: the $name track has 3:1 against the page",
    ({ theme, border }) => {
      for (const page of pages(theme)) {
        expect(
          wcagContrast(resolve(border, theme), page),
          `${border} against ${page}`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(cases)(
    "switch/contrast: the $name thumb has 3:1 against its track",
    ({ theme, fill, thumb }) => {
      expect(
        wcagContrast(resolve(thumb, theme), resolve(fill, theme)),
        `${thumb} against ${fill}`,
      ).toBeGreaterThanOrEqual(3);
    },
  );

  it.each(["light", "dark"] as const)(
    "switch/contrast: the focus ring has 3:1 against the page in the %s theme",
    (theme) => {
      const ring = (base["&:focus-visible"] as Block).outlineColor as string;
      for (const page of pages(theme)) {
        expect(
          wcagContrast(resolve(ring, theme), page),
          `${ring} against ${page}`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(["light", "dark"] as const)(
    "switch/invalid-state: the error border has 3:1 against the page in the %s theme",
    (theme) => {
      const border = (base["&:aria-invalid"] as Block).borderColor as string;
      for (const page of pages(theme)) {
        expect(
          wcagContrast(resolve(border, theme), page),
          `${border} against ${page}`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );
  // With more contrast, `neutral` draws its off border in the text color, and
  // `light` and `dark` keep their own.
  const moreContrast = (["light", "dark"] as const).flatMap((theme) =>
    recipe.compoundVariants!.map((cv) => {
      const css = cv.css as Block;
      const more = css["&:contrast-more"] as Block | undefined;
      return {
        name: `${cv.match.color} in the ${theme} theme`,
        theme,
        border: (more?.borderColor ?? css.borderColor) as string,
      };
    }),
  );

  it.each(moreContrast)(
    "switch/more-contrast: the $name off border has 3:1 against the page",
    ({ theme, border }) => {
      for (const page of pages(theme)) {
        expect(
          wcagContrast(resolve(border, theme), page),
          `${border} against ${page}`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );

  // Every color token in a block, resolved for a theme and written in hex, so
  // one color compares equal whichever way its theme spells it.
  type Applied = string | { [key: string]: Applied };
  function applied(value: unknown, theme: Theme): Applied {
    if (typeof value === "string") {
      return value.replaceAll(/@color\.[\w-]+/g, (token) => formatHex8(resolve(token, theme)));
    }
    return Object.fromEntries(
      Object.entries(value as Block).map(([key, inner]) => [key, applied(inner, theme)]),
    );
  }

  it.each(
    recipe
      .compoundVariants!.filter((cv) => cv.match.color === "light" || cv.match.color === "dark")
      .map((cv) => ({ name: cv.match.color, css: cv.css as Block })),
  )("switch/fixed-colors keeps the $name switch the same in both themes", ({ css }) => {
    expect(css).not.toHaveProperty("&:dark");
    expect(applied(css, "dark")).toEqual(applied(css, "light"));
  });
});
