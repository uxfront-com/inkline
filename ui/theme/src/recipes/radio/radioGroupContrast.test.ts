import { styleframe } from "@styleframe/core";
import { useDesignTokensPreset, useModifiersPreset, useUtilitiesPreset } from "@styleframe/theme";
import { colorValues, darkModeColorValues } from "@styleframe/theme";
import { wcagContrast } from "culori";

import { useRadioFieldRecipe } from "./useRadioFieldRecipe";
import { useRadioGroupRecipe } from "./useRadioGroupRecipe";
import { useRadioRecipe } from "./useRadioRecipe";

type Block = Record<string, unknown>;
type Node = {
	type: string;
	query?: string;
	name?: string;
	declarations: Record<string, unknown>;
	children: Array<Node>;
};

/**
 * The Radio Group page asks for 4.5:1 for the legend, labels, hint and error
 * message, and 3:1 for the focus ring, the ring of an unchecked radio and the
 * fill of a checked one (WCAG 1.4.3, 1.4.11). Every color of `radio-field` is
 * checked in the light and the dark theme, since the `light` and `dark` colors
 * keep their look in either mode, against both page backgrounds of the theme
 * and against the radio's own fill.
 */
describe("radio recipes contrast", () => {
	const s = styleframe();
	useDesignTokensPreset(s);
	useModifiersPreset(s);
	useUtilitiesPreset(s);
	const radio = useRadioRecipe(s);
	const field = useRadioFieldRecipe(s);
	useRadioGroupRecipe(s);

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

	// A setup selector's color, as the `@color.<name>` token it references.
	function selectorColor(query: string, nested?: string) {
		const node = s.root.children.find((child) => (child as Node).query === query) as
			| Node
			| undefined;
		expect(node, query).toBeDefined();
		const block = nested ? node!.children.find((child) => child.query === nested)! : node!;
		const value = block.declarations.color as { name: string };
		return `@${value.name}`;
	}

	const checked = field.base!["&:checked"] as Block;

	const cases = field.compoundVariants!.flatMap((cv) => {
		const css = cv.css as Block;
		const inDark = { ...css, ...(css["&:dark"] as Block | undefined) };
		return (["light", "dark"] as const).map((theme) => {
			const slot = theme === "light" ? css : inDark;
			return {
				name: `${cv.match.color} in the ${theme} theme`,
				theme,
				fill: resolve(slot.backgroundColor as string, theme),
				ring: resolve(slot.borderColor as string, theme),
				strongRing: resolve(slot.color as string, theme),
			};
		});
	});

	it("covers the three colors in both themes", () => {
		expect(cases).toHaveLength(6);
	});

	it.each(cases)(
		"radio-group/indicator-contrast gives the unchecked ring 3:1 against the page and its fill, $name",
		({ theme, fill, ring }) => {
			for (const neighbour of [...pages(theme), fill]) {
				expect(
					wcagContrast(ring, neighbour),
					`${ring} against ${neighbour}`,
				).toBeGreaterThanOrEqual(3);
			}
		},
	);

	// The full-strength ring contrasts with the radio's own fill. A fixed
	// surface on the other theme's page (a white `light` radio on a dark page)
	// is outlined by its fill, so there either the ring or the fill has 3:1.
	it.each(cases)(
		"radio-group/more-contrast gives the full-strength ring 3:1 against its fill, and keeps the circle 3:1 against the page, $name",
		({ theme, fill, strongRing }) => {
			expect(wcagContrast(strongRing, fill)).toBeGreaterThanOrEqual(3);
			for (const page of pages(theme)) {
				expect(
					Math.max(wcagContrast(strongRing, page), wcagContrast(fill, page)),
					page,
				).toBeGreaterThanOrEqual(3);
			}
		},
	);

	it.each(["light", "dark"] as const)(
		"radio-group/indicator-contrast gives the checked fill 3:1 against the %s page, and the dot 3:1 against the fill",
		(theme) => {
			const fill = resolve(checked.backgroundColor as string, theme);
			for (const page of pages(theme)) {
				expect(wcagContrast(fill, page), page).toBeGreaterThanOrEqual(3);
			}
			// The SVG dot is drawn in white.
			expect(checked.backgroundImage).toContain("fill='white'");
			expect(wcagContrast(resolve("@color.white", theme), fill)).toBeGreaterThanOrEqual(3);
		},
	);

	it.each(cases)(
		"radio-group/indicator-contrast gives the invalid ring 3:1 against the page and its fill, $name",
		({ theme, fill }) => {
			const error = resolve("@color.error", theme);
			for (const neighbour of [...pages(theme), fill]) {
				expect(wcagContrast(error, neighbour), neighbour).toBeGreaterThanOrEqual(3);
			}
		},
	);

	it.each(["light", "dark"] as const)(
		"radio-group/contrast gives the focus ring 3:1 against the %s page",
		(theme) => {
			expect((field.base!["&:focus-visible"] as Block).outlineColor).toBe("@color.focus");
			const focus = resolve("@color.focus", theme);
			for (const page of pages(theme)) {
				expect(wcagContrast(focus, page), page).toBeGreaterThanOrEqual(3);
			}
		},
	);

	it.each(["light", "dark"] as const)(
		"radio-group/contrast gives the labels, legend and hint 4.5:1 against the %s page",
		(theme) => {
			const texts = [
				radio.base!.color as string,
				selectorColor(".radio-group > legend"),
				selectorColor('.radio-group > [data-slot="hint"]'),
			];
			for (const text of texts) {
				for (const page of pages(theme)) {
					expect(
						wcagContrast(resolve(text, theme), page),
						`${text} against ${page}`,
					).toBeGreaterThanOrEqual(4.5);
				}
			}
		},
	);

	it.each(["light", "dark"] as const)(
		"radio-group/contrast gives the error message 4.5:1 against the %s page",
		(theme) => {
			const query = '.radio-group > [data-slot="error"]';
			const error =
				theme === "light"
					? selectorColor(query)
					: selectorColor(query, ':is(.dark-theme, [data-theme="dark"]) &');
			for (const page of pages(theme)) {
				expect(wcagContrast(resolve(error, theme), page), page).toBeGreaterThanOrEqual(4.5);
			}
		},
	);
});
