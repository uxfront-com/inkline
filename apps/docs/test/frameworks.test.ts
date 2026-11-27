import { readFileSync } from "node:fs";

import { beforeAll, describe, expect, it } from "vitest";

import {
	LANDING_FRAMEWORKS,
	LANDING_PATHS,
	isLandingFramework,
	landingFramework,
} from "../app/data/frameworks.ts";

const installation = readFileSync(
	new URL("../content/docs/01.getting-started/01.installation.md", import.meta.url),
	"utf8",
);
const page = readFileSync(new URL("../app/pages/[framework].vue", import.meta.url), "utf8");

let frameworks: Array<{ value: string; label: string }> = [];

beforeAll(async () => {
	// app.config.ts calls Nuxt's auto-imported defineAppConfig(), which only
	// returns its argument.
	(globalThis as { defineAppConfig?: unknown }).defineAppConfig = (config: unknown) => config;
	const { default: config } = await import("../app/app.config.ts");
	frameworks = config.docsTheme.frameworks;
});

/**
 * The landing pages, /react to /astro: one entry each in app/data/frameworks.ts,
 * which the page, the prerender list and the sitemap all read.
 */
describe("the framework landing pages", () => {
	it("has one entry for each framework in docsTheme.frameworks, in its order", () => {
		expect(LANDING_FRAMEWORKS.map(({ value, label }) => ({ value, label }))).toEqual(
			frameworks.map(({ value, label }) => ({ value, label })),
		);
		expect(LANDING_PATHS).toEqual(frameworks.map(({ value }) => `/${value}`));
	});

	it.each(LANDING_FRAMEWORKS)("installs and imports @inkline/$value only", (framework) => {
		expect(framework.install).toBe(`npm install @inkline/${framework.value}`);
		expect(framework.example.code).toContain(`from "@inkline/${framework.value}"`);
		if (framework.stylesheet) {
			expect(framework.stylesheet).toBe(`@inkline/${framework.value}/css`);
		}
	});

	// The installation page is the source: a change there shows up here.
	it.each(LANDING_FRAMEWORKS)("matches the installation page for $label", (framework) => {
		expect(installation).toContain(framework.install);
		expect(installation).toContain(
			`Peer dependency: \`${framework.peer.name}\` ${framework.peer.version}`,
		);
		expect(installation).toContain(
			`[${framework.example.title}]\n${framework.example.code}\n\`\`\``,
		);
		if (framework.stylesheet) {
			expect(installation).toContain(`import "${framework.stylesheet}";`);
		} else {
			expect(installation).not.toContain(`@inkline/${framework.value}/css`);
		}
	});

	it("accepts the seven frameworks and rejects every other segment", () => {
		for (const { value } of frameworks) {
			expect(isLandingFramework(value)).toBe(true);
		}
		for (const value of ["docs", "foo", "", "React", "raw", undefined, ["vue"]]) {
			expect(isLandingFramework(value)).toBe(false);
			expect(landingFramework(value)).toBeUndefined();
		}
	});

	it("validates the page's segment with the same check", () => {
		expect(page).toContain("validate: (route) => isLandingFramework(route.params.framework)");
	});
});
