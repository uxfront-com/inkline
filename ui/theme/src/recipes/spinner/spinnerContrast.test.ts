import { styleframe } from "@styleframe/core";
import { oklch, rgb, wcagContrast } from "culori";

import { useDarkModifier } from "@styleframe/theme";
import { useDesignTokensPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { useSpinnerOverlayRecipe } from "./useSpinnerOverlayRecipe";
import { useSpinnerRecipe } from "./useSpinnerRecipe";

type Slot = Record<string, unknown>;

/**
 * The Spinner page asks for 3:1 between the indicator and what's behind it
 * (WCAG 1.4.11), and the label is text, so it needs 4.5:1 (WCAG 1.4.3). The
 * label has no color of its own and takes the spinner's. The spinner has no
 * fill either, so each color is checked against what it sits on, in the light
 * and the dark theme. `primary` and `neutral` adapt, so they sit on the
 * theme's own page backgrounds. `light` and `dark` keep one color in either
 * theme: `light` is a dark stroke for light surfaces (the light theme's page
 * backgrounds), and `dark` a white one for dark surfaces (the dark theme's
 * page backgrounds, and the overlay's backdrop over every page background).
 */
describe("spinner contrast", () => {
  const s = styleframe();
  useDesignTokensPreset(s);
  for (const name of [
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "alignItems",
    "justifyContent",
    "flexShrink",
    "fontSize",
    "lineHeight",
    "verticalAlign",
    "background",
    "zIndex",
    "color",
  ]) {
    s.utility(name, ({ value }) => ({ [name]: value }));
  }
  useDarkModifier(s);

  const themes = {
    light: colorValues as Record<string, string>,
    dark: darkModeColorValues as Record<string, string>,
  };
  type Theme = keyof typeof themes;

  const darkTheme = s.root.themes.find((theme) => theme.name === "dark");

  // Each token is read from the theme's own variables, falling back to the
  // root, and references are followed in the same theme.
  function resolve(token: string, theme: Theme): string {
    const name = token.slice(1);
    const variable =
      (theme === "dark" && darkTheme?.variables.find((v) => v.name === name)) ||
      s.root.variables.find((v) => v.name === name);
    if (!variable) {
      throw new Error(`Unknown token ${token}`);
    }
    const value = variable.value as unknown;
    if (typeof value === "object" && value !== null && (value as Slot).type === "reference") {
      return resolve(`@${(value as Slot).name}`, theme);
    }
    return String(value);
  }

  // The backdrop is translucent, so it's composited over the page in sRGB.
  function srgb(color: string) {
    const { l, c, h } = oklch(color);
    return rgb({ mode: "oklch", l, c, h: h || 0 })!;
  }
  const backdropColor = useSpinnerOverlayRecipe(s).base!.background as string;
  const backdrop = srgb(backdropColor);
  const alpha = oklch(backdropColor).alpha;
  function overlay(page: string): string {
    const under = srgb(page);
    const channel = (key: "r" | "g" | "b") => {
      const value = alpha * backdrop[key] + (1 - alpha) * under[key];
      return Math.round(Math.min(1, Math.max(0, value)) * 255)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${channel("r")}${channel("g")}${channel("b")}`;
  }

  it("composites the overlay's translucent backdrop over the page", () => {
    expect(alpha).toBeGreaterThan(0);
    expect(alpha).toBeLessThan(1);
    expect(overlay("#ffffff")).toBe("#404040");
  });

  const pages: Record<Theme, Array<string>> = {
    light: [themes.light.background!, themes.light.surface!],
    dark: [themes.dark.background!, themes.dark.surface!],
  };

  function surfaces(color: string, theme: Theme): Array<string> {
    if (color === "light") {
      return pages.light;
    }
    if (color === "dark") {
      return [...pages.dark, ...[...pages.light, ...pages.dark].map(overlay)];
    }
    return pages[theme];
  }

  const cases = useSpinnerRecipe(s).compoundVariants!.flatMap((cv) => {
    const css = cv.css as Slot;
    const inDark = { ...css, ...(css["&:dark"] as Slot) };
    return (["light", "dark"] as const).map((theme) => ({
      name: `${cv.match.color} in the ${theme} theme`,
      variant: cv.match.color as string,
      color: resolve((theme === "light" ? css : inDark).color as string, theme),
      surfaces: surfaces(cv.match.color as string, theme),
    }));
  });

  it("covers the four colors in both themes", () => {
    expect(cases).toHaveLength(8);
  });

  it.each(["light", "dark"])(
    "keeps the %s color the same in the light and the dark theme",
    (variant) => {
      const [inLight, inDark] = cases
        .filter((entry) => entry.variant === variant)
        .map((entry) => entry.color);
      expect(inLight).toBeDefined();
      expect(inDark).toBe(inLight);
    },
  );

  it.each(cases)(
    "spinner/contrast gives the indicator of $name at least 3:1 against what it sits on",
    ({ color, surfaces }) => {
      for (const surface of surfaces) {
        expect(wcagContrast(color, surface), surface).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it.each(cases)(
    "spinner/contrast gives the label of $name at least 4.5:1 against what it sits on",
    ({ color, surfaces }) => {
      for (const surface of surfaces) {
        expect(wcagContrast(color, surface), surface).toBeGreaterThanOrEqual(4.5);
      }
    },
  );
});
