import { styleframe } from "@styleframe/core";
import { wcagContrast } from "culori";

import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { useSelectRecipe } from "./useSelectRecipe";

type Slot = Record<string, unknown>;

const MIN_CONTRAST = 3;

const pageBackgrounds = [
  colorValues.surface,
  colorValues.background,
  darkModeColorValues.background,
  darkModeColorValues.surface,
];

/**
 * WCAG 1.4.11 asks for 3:1 between a control's boundary and what sits next to
 * it. This walks every color × variant compound of the Select trigger, at rest
 * and on hover, in light and dark mode, and checks its border token against the
 * trigger's own fill, the read-only fill and every page background.
 */
function createInstance() {
  const s = styleframe();
  useDesignTokensPreset(s);
  useModifiersPreset(s);
  useUtilitiesPreset(s);
  return s;
}

function collectPairs() {
  const s = createInstance();
  const recipe = useSelectRecipe(s);

  const dark = s.root.themes.find((theme) => theme.name === "dark");
  const resolve = (value: unknown, isDark: boolean): string => {
    const name = String(value).replace(/^@/, "");
    const variable =
      (isDark && dark?.variables.find((v) => v.name === name)) ||
      s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unresolved token ${String(value)}`);
    }
    return String(variable.value);
  };

  const readonlyCss = recipe.compoundVariants!.find((cv) => cv.match.readonly === "true")!
    .css as Slot;

  const pairs: Array<{ label: string; border: string; against: string }> = [];

  for (const cv of recipe.compoundVariants!) {
    if (!cv.match.color || !cv.match.variant) {
      continue;
    }
    const css = cv.css as Slot;

    const slots: Array<[string, Slot, Slot, boolean]> = [
      ["rest", css, css, false],
      ["hover", (css["&:hover"] ?? {}) as Slot, css, false],
      ["dark rest", css["&:dark"] as Slot, css["&:dark"] as Slot, true],
      ["dark hover", (css["&:dark:hover"] ?? {}) as Slot, css["&:dark"] as Slot, true],
    ];

    for (const [state, slot, fillSlot, isDark] of slots) {
      const borderToken =
        slot.borderColor && slot.borderColor !== "transparent"
          ? slot.borderColor
          : slot.borderBottomColor;
      const label = `${cv.match.color} ${cv.match.variant} ${state}`;
      if (!borderToken) {
        throw new Error(`${label} has no border token`);
      }

      const border = resolve(borderToken, isDark);
      const fills = [
        fillSlot.background,
        isDark ? (readonlyCss["&:dark"] as Slot).background : readonlyCss.background,
      ].filter((fill) => fill && fill !== "transparent");

      for (const against of [...fills.map((fill) => resolve(fill, isDark)), ...pageBackgrounds]) {
        pairs.push({ label, border, against });
      }
    }
  }

  return pairs;
}

describe("useSelectRecipe border contrast", () => {
  const pairs = collectPairs();

  it("should check every color × variant compound in all four slots", () => {
    expect(new Set(pairs.map((pair) => pair.label)).size).toBe(9 * 4);
  });

  it.each(pairs)(
    "$label border $border has at least 3:1 against $against",
    ({ border, against }) => {
      expect(wcagContrast(border, against)).toBeGreaterThanOrEqual(MIN_CONTRAST);
    },
  );
});
