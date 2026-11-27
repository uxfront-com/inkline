import shared from "@uxfront/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
	...shared,
	ignorePatterns: [
		...(shared.ignorePatterns ?? []),
		".context/**",
		".old/**",
		"ui/**/.styleframe/**",
		// Generated files their checks compare byte for byte: `ui/*/test/api.json`, which
		// `ui/components/scripts/api-report.ts` writes one name to a line and `api:check` compares;
		// `ui/components/src/recipes.ts`, from `ui/components/scripts/recipes.ts`; and the expectations
		// `unframework test --update` writes.
		"ui/*/test/api.json",
		"ui/components/src/recipes.ts",
		"ui/components/test/**/__expected__/**",
		// `apps/docs/app/data/frameworks.ts` copies this page's code blocks for the framework landing
		// pages, and `apps/docs/test/frameworks.test.ts` checks that the page still contains each copy.
		"apps/docs/content/docs/01.getting-started/01.installation.md",
	],
});
