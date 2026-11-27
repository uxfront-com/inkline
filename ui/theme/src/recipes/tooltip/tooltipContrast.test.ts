import { styleframe } from "@styleframe/core";
import { wcagContrast } from "culori";

import { useDesignTokensPreset } from "@styleframe/theme";
import { useModifiersPreset } from "@styleframe/theme";
import { useUtilitiesPreset } from "@styleframe/theme";
import { useTooltipRecipe } from "./useTooltipRecipe";

type Slot = Record<string, unknown>;

const MIN_TEXT_CONTRAST = 4.5;

/**
 * WCAG 1.4.3 asks for 4.5:1 between text and what it sits on. This walks
 * every color × variant compound of the tooltip, in light and dark mode, and
 * checks its text token against its own fill. The arrow takes the same fill
 * and holds no text. The tooltip's border is decoration, as the Tooltip page
 * says, so it isn't held to 3:1; forced colours draw it in CanvasText.
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
  const recipe = useTooltipRecipe(s);

  const dark = s.root.themes.find((theme) => theme.name === "dark");
  const resolve = (value: unknown, isDark: boolean): string => {
    const name = String(value).replace(/^@/, "");
    const variable =
      (isDark && dark?.variables.find((v) => v.name === name)) ||
      s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unresolved token ${String(value)}`);
    }
    if (typeof variable.value !== "string") {
      throw new Error(`Token ${variable.name} isn't a plain value`);
    }
    return variable.value;
  };

  const pairs: Array<{ label: string; text: string; background: string }> = [];

  for (const cv of recipe.compoundVariants!) {
    if (!cv.match.color || !cv.match.variant) {
      continue;
    }
    const css = cv.css as Slot;

    for (const [theme, slot, isDark] of [
      ["light", css, false],
      ["dark", css["&:dark"] as Slot, true],
    ] as const) {
      pairs.push({
        label: `${cv.match.color} ${cv.match.variant} in ${theme} mode`,
        text: resolve(slot.color, isDark),
        background: resolve(slot.background, isDark),
      });
    }
  }

  return pairs;
}

describe("tooltip contrast", () => {
  const pairs = collectPairs();

  it("should check every color × variant compound in both themes", () => {
    expect(pairs).toHaveLength(9 * 2);
  });

  it.each(pairs)("tooltip/contrast $label has text of at least 4.5:1", ({ text, background }) => {
    expect(wcagContrast(text, background)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);
  });
});
