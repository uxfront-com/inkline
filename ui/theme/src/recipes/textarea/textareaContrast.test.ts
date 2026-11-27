import { styleframe } from "@styleframe/core";
import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { oklch, rgb, wcagContrast } from "culori";

import { FIELD_MUTED_TEXT } from "../input/createFieldRecipe";
import { useTextareaPrefixRecipe } from "./useTextareaPrefixRecipe";
import { useTextareaRecipe } from "./useTextareaRecipe";
import { useTextareaSuffixRecipe } from "./useTextareaSuffixRecipe";

type Slot = Record<string, unknown>;

/**
 * The Textarea page asks for 4.5:1 for the text, the placeholder and the
 * count, and 3:1 for the border and the focus ring (WCAG 1.4.3, 1.4.11). The
 * count goes in the suffix, which shares the placeholder's muted color. Every
 * color × variant compound of the textarea recipe is checked in the light and
 * the dark theme, since the `light` and `dark` colors keep their look in
 * either mode. A transparent fill shows the page, so it is checked
 * against both page backgrounds: those of its theme for `neutral`, and the
 * light or dark ones `light` and `dark` are documented for. The borders of
 * `light` and `dark` are checked against the pages of both themes.
 */
describe("useTextareaRecipe contrast", () => {
	const s = styleframe();
	useDesignTokensPreset(s);
	useModifiersPreset(s);
	useUtilitiesPreset(s);
	const recipe = useTextareaRecipe(s);

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

	// `light` and `dark` keep one look in both themes, so each sits on the page
	// it is documented for in either theme: a light page for `light` and a dark
	// page for `dark`. `neutral` sits on the page of its theme.
	const surfaces = (color: string, theme: Theme) =>
		color === "light" || color === "dark" ? pages(color) : pages(theme);

	// A border marks the field wherever it sits, so the borders of `light` and
	// `dark` hold 3:1 against the pages of both themes. `neutral` sits on the
	// pages of its theme.
	const borderPages = (color: string, theme: Theme) =>
		color === "light" || color === "dark" ? [...pages("light"), ...pages("dark")] : pages(theme);

	// The muted text is the text color at this share, composited in sRGB over
	// the fill, as `color-mix(in srgb, currentColor n%, transparent)` paints it.
	const mutedShare = Number(/currentColor (\d+)%/.exec(FIELD_MUTED_TEXT)?.[1]) / 100;
	function srgb(color: string) {
		const { l, c, h } = oklch(color);
		return rgb({ mode: "oklch", l, c, h: h || 0 })!;
	}
	function muted(text: string, fill: string) {
		const [fg, bg] = [srgb(text), srgb(fill)];
		const channel = (key: "r" | "g" | "b") => {
			const value = mutedShare * fg[key] + (1 - mutedShare) * bg[key];
			return Math.round(Math.min(1, Math.max(0, value)) * 255)
				.toString(16)
				.padStart(2, "0");
		};
		return `#${channel("r")}${channel("g")}${channel("b")}`;
	}

	const invalid = recipe.compoundVariants!.find((cv) => cv.match.invalid === "true")!.css as Slot;

	const cases = recipe
		.compoundVariants!.filter((cv) => cv.match.color && cv.match.variant)
		.flatMap((cv) => {
			const css = cv.css as Slot;
			const inDark = { ...css, ...(css["&:dark"] as Slot) };
			return (["light", "dark"] as const).map((theme) => {
				const slot = theme === "light" ? css : inDark;
				const hover = (
					theme === "light" ? css["&:hover-capable:hover"] : css["&:dark:hover-capable:hover"]
				) as Slot;
				const color = cv.match.color as string;
				const fills =
					slot.background === "transparent"
						? surfaces(color, theme)
						: [resolve(slot.background as string, theme)];
				const borders = [slot, hover]
					.flatMap((block) => [block.borderColor, block.borderBottomColor])
					.filter(
						(value): value is string => typeof value === "string" && value.startsWith("@color."),
					)
					.map((token) => resolve(token, theme));
				return {
					name: `${cv.match.color} ${cv.match.variant} in the ${theme} theme`,
					theme,
					color,
					text: resolve(slot.color as string, theme),
					fills,
					borders,
				};
			});
		});

	it("covers the nine color × variant compounds in both themes", () => {
		expect(cases).toHaveLength(18);
	});

	it.each(cases)("textarea/contrast gives the text 4.5:1 on $name", ({ text, fills }) => {
		for (const fill of fills) {
			expect(wcagContrast(text, fill), fill).toBeGreaterThanOrEqual(4.5);
		}
	});

	it("textarea/contrast paints the placeholder, and a count in the prefix or suffix, in the muted text color", () => {
		expect(useTextareaPrefixRecipe(s).base!.color).toBe(FIELD_MUTED_TEXT);
		expect(useTextareaSuffixRecipe(s).base!.color).toBe(FIELD_MUTED_TEXT);
		const field = s.root.children.find(
			(child) =>
				child.type === "selector" && (child as { query: string }).query === ".textarea-field",
		) as { children: Array<{ query: string; declarations: Slot }> };
		expect(
			field.children.find((child) => child.query === "&::placeholder")?.declarations.color,
		).toBe(FIELD_MUTED_TEXT);
	});

	it.each(cases)(
		"textarea/contrast gives the placeholder and the count 4.5:1 on $name",
		({ text, fills }) => {
			for (const fill of fills) {
				expect(wcagContrast(muted(text, fill), fill), fill).toBeGreaterThanOrEqual(4.5);
			}
		},
	);

	it.each(["light", "dark"] as const)(
		"textarea/contrast gives the focus ring 3:1 against the %s page",
		(theme) => {
			expect((recipe.base!["&:focus-within"] as Slot).outlineColor).toBe("@color.focus");
			const focus = resolve("@color.focus", theme);
			for (const page of pages(theme)) {
				expect(wcagContrast(focus, page), page).toBeGreaterThanOrEqual(3);
			}
		},
	);

	it.each(cases)(
		"textarea/boundary-contrast gives the border 3:1 at rest and on hover on $name",
		({ theme, color, fills, borders }) => {
			expect(borders.length).toBeGreaterThan(0);
			for (const border of borders) {
				for (const neighbour of [...borderPages(color, theme), ...fills]) {
					expect(
						wcagContrast(border, neighbour),
						`${border} against ${neighbour}`,
					).toBeGreaterThanOrEqual(3);
				}
			}
		},
	);

	it.each(cases)(
		"textarea/boundary-contrast gives the invalid border 3:1 on $name",
		({ theme, color, fills }) => {
			const error = resolve(invalid.borderColor as string, theme);
			for (const neighbour of [...borderPages(color, theme), ...fills]) {
				expect(wcagContrast(error, neighbour), neighbour).toBeGreaterThanOrEqual(3);
			}
		},
	);
});
