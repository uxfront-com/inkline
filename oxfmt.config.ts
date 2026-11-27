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
	],
});
