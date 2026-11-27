import { styleframe } from "@styleframe/core";
import { formatHex8, wcagContrast } from "culori";

import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { overlaySurfaceCompoundVariants } from "./createOverlayRecipes";
import { useModalFooterRecipe } from "./useModalFooterRecipe";
import { useModalHeaderRecipe } from "./useModalHeaderRecipe";
import { useModalRecipe } from "./useModalRecipe";

type Slot = Record<string, unknown>;

/**
 * WCAG 1.4.3 asks for 4.5:1 between text and its background. The title, the
 * description and the content inherit the panel's text color, so each shared
 * surface is checked in the light theme and, through its `&:dark` slot,
 * against the dark theme's token values. The `light` and `dark` colors keep
 * their look in either theme, so they are checked in both too.
 */
describe("modal contrast", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  const darkTheme = s.root.themes.find((theme) => theme.name === "dark");

  function resolve(token: string, dark: boolean): string {
    const name = token.slice(1);
    const variable =
      (dark && darkTheme?.variables.find((v) => v.name === name)) ||
      s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unknown token ${token}`);
    }
    if (typeof variable.value !== "string") {
      throw new Error(`Token ${variable.name} isn't a plain value`);
    }
    return variable.value;
  }

  const cases = overlaySurfaceCompoundVariants.flatMap((cv) => {
    const css = cv.css as Slot;
    return [
      { theme: "light", dark: false, declarations: css },
      { theme: "dark", dark: true, declarations: css["&:dark"] as Slot },
    ].map((entry) => ({
      name: `${cv.match.color} ${cv.match.variant} in the ${entry.theme} theme`,
      ...entry,
    }));
  });

  it("covers the nine color × variant surfaces in both themes", () => {
    expect(cases).toHaveLength(18);
  });

  it.each(cases)(
    "dialog/contrast gives the text of $name at least 4.5:1 against the panel",
    ({ declarations, dark }) => {
      const text = resolve(declarations.color as string, dark);
      const panel = resolve(declarations.background as string, dark);

      expect(wcagContrast(text, panel)).toBeGreaterThanOrEqual(4.5);
    },
  );
});

/**
 * The `light` and `dark` colors keep one look in both themes, and only
 * `neutral` adapts. Every `light` and `dark` compound of the panel, the header
 * and the footer is resolved in each theme, its `&:dark` slot applied in the
 * dark one, and the two must match.
 */
describe("modal fixed colors", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  const darkTheme = s.root.themes.find((theme) => theme.name === "dark");

  function resolve(token: string, dark: boolean): string {
    const name = token.slice(1);
    const variable =
      (dark && darkTheme?.variables.find((v) => v.name === name)) ||
      s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unknown token ${token}`);
    }
    const value = variable.value as unknown;
    if (typeof value === "object" && value !== null && (value as Slot).type === "reference") {
      return resolve(`@${(value as { name: string }).name}`, dark);
    }
    return String(value);
  }

  function applied(css: Slot, dark: boolean) {
    const plain = Object.entries(css).filter(([, value]) => typeof value !== "object");
    const declarations = dark
      ? [...plain, ...Object.entries((css["&:dark"] as Slot) ?? {})]
      : plain;
    return Object.fromEntries(
      declarations.map(([property, value]) => [
        property,
        typeof value === "string" && value.startsWith("@color.")
          ? formatHex8(resolve(value, dark))
          : value,
      ]),
    );
  }

  const cases = (
    [
      ["panel", useModalRecipe(s)],
      ["header", useModalHeaderRecipe(s)],
      ["footer", useModalFooterRecipe(s)],
    ] as const
  ).flatMap(([part, recipe]) =>
    (recipe as ReturnType<typeof useModalRecipe>)
      .compoundVariants!.filter((cv) => cv.match.color === "light" || cv.match.color === "dark")
      .map((cv) => ({
        name: `${cv.match.color} ${cv.match.variant} ${part}`,
        css: cv.css as Slot,
      })),
  );

  it("covers the six light and dark compounds of each part", () => {
    expect(cases).toHaveLength(18);
  });

  it.each(cases)("modal/fixed-colors keeps the $name the same in both themes", ({ css }) => {
    expect(applied(css, true)).toEqual(applied(css, false));
  });
});
