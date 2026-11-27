import "@angular/compiler";
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

// Every component the built package exports must be compiled. A class the Angular compiler skips
// still reaches `dist/` as a plain decorator call. With the JIT compiler loaded, Angular's own
// `@Component` decorator still gives it a component definition, but one with no inputs, so the
// host's bindings never reach it. The input check is the one that catches that: never drop it.

interface ComponentReport {
	selectors: Array<string>;
	props: Array<string>;
	models: Array<string>;
	events: Array<string>;
}

interface ApiReport {
	entries: Record<string, Array<string>>;
	components: Record<string, ComponentReport>;
}

interface ComponentDef {
	selectors: Array<Array<unknown>>;
	inputs: Record<string, unknown>;
	outputs: Record<string, string>;
}

const report: ApiReport = JSON.parse(readFileSync(new URL("api.json", import.meta.url), "utf8"));

const bundles: Record<string, string> = {
	".": "../dist/fesm2022/index.mjs",
	"./headless": "../dist/fesm2022/headless.mjs",
};

for (const [entry, names] of Object.entries(report.entries)) {
	describe(`the built ${entry} entry`, async () => {
		const bundle = bundles[entry];
		if (!bundle) {
			throw new Error(`api.json lists ${entry}, which this test doesn't load`);
		}
		const module: Record<string, unknown> = await import(bundle);

		it.each(names)("compiles %s with every input, model and event", (name) => {
			const component = report.components[name];
			if (!component) {
				throw new Error(`api.json lists ${name} in ${entry} but has no report for it`);
			}
			const def = (module[name] as { ɵcmp?: ComponentDef } | undefined)?.ɵcmp;

			expect(def, `${name} has no component definition`).toBeDefined();
			expect(def!.selectors.flat()).toEqual(component.selectors);
			expect(Object.keys(def!.inputs).sort()).toEqual(
				[...component.props, ...component.models].sort(),
			);
			expect(Object.keys(def!.outputs).sort()).toEqual(
				[...component.events, ...component.models.map((model) => `${model}Change`)].sort(),
			);
		});
	});
}
